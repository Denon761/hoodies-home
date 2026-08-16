"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";
import { getStripe } from "../lib/stripeClient";
import PaymentForm from "../components/PaymentForm";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
];

const INTENT_STORAGE_KEY = "hoodies-home-checkout-intent";

function getCartSignature(items) {
  return JSON.stringify(items.map((item) => [item.id, item.quantity]));
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [form, setForm] = useState(initialForm);
  const [clientSecret, setClientSecret] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const hasRequestedIntent = useRef(false);
  const stripePromise = useRef(getStripe()).current;

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  useEffect(() => {
    if (items.length === 0 || hasRequestedIntent.current) return;

    const signature = getCartSignature(items);
    const cached = sessionStorage.getItem(INTENT_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.signature === signature && parsed.clientSecret) {
          hasRequestedIntent.current = true;
          setClientSecret(parsed.clientSecret);
          setOrderNumber(parsed.orderNumber || "");
          return;
        }
      } catch {
        sessionStorage.removeItem(INTENT_STORAGE_KEY);
      }
    }

    hasRequestedIntent.current = true;

    async function createIntent() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        const data = await res.json();
        if (!res.ok || !data?.clientSecret) {
          throw new Error(data?.error || "Failed to start checkout");
        }

        setClientSecret(data.clientSecret);
        setOrderNumber(data.orderNumber || "");
        sessionStorage.setItem(
          INTENT_STORAGE_KEY,
          JSON.stringify({ signature, clientSecret: data.clientSecret, orderNumber: data.orderNumber || "" })
        );
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
        hasRequestedIntent.current = false;
      } finally {
        setIsLoading(false);
      }
    }

    createIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePaymentSuccess() {
    try {
      await fetch("/api/send-order-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customer: { fullName: form.fullName, email: form.email, phone: form.phone },
          shipping: { address: form.address, city: form.city, state: form.state, zip: form.zip },
          paymentType: "card",
          items,
          total,
        }),
      });
    } catch (err) {
      console.error("Failed to send order confirmation email:", err);
    }

    sessionStorage.removeItem(INTENT_STORAGE_KEY);
    dispatch(clearCart());
    router.push("/checkout/success");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-xl uppercase text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart before checking out.</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 border border-ink bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-xl uppercase text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Enter your contact, shipping, and card details to complete your order.
      </p>

      <div className="mt-6 w-full space-y-6">
        <div className="border border-line bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Contact Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.fullName} onChange={handleChange("fullName")} required />
            <Field label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} required />
          </div>
        </div>

        <div className="border border-line bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Shipping Address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Street Address" value={form.address} onChange={handleChange("address")} required />
            </div>
            <Field label="City" value={form.city} onChange={handleChange("city")} required />
            <Field label="State" value={form.state} onChange={handleChange("state")} required />
            <Field label="ZIP / Postal Code" value={form.zip} onChange={handleChange("zip")} required />
            <label className="block text-xs font-medium text-zinc-600">
              Country
              <select
                value={form.country}
                onChange={handleChange("country")}
                className="mt-1.5 w-full border border-line px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="border border-line bg-white p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Order Summary</h3>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div
                  className="relative h-16 w-16 shrink-0 overflow-hidden border border-line"
                  style={{ backgroundColor: `${item.hex}14` }}
                >
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-ink text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {item.variantName} / {item.size}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-ink">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-semibold text-ink">Total</span>
            <span className="text-xl font-extrabold text-ink">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border border-line bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Card Details</h2>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm form={form} onSuccess={handlePaymentSuccess} onError={setError} />
            </Elements>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              {error ? "Unable to load the payment form." : "Loading payment form..."}
            </p>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-3 text-center text-[11px] text-zinc-400">
            Payments are processed securely by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <label className="block text-xs font-medium text-zinc-600">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full border border-line px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </label>
  );
}
