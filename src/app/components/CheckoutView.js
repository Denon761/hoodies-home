"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const PAYMENT_TYPE = "card";

function generateOrderNumber() {
  return `HH-${Date.now().toString().slice(-8)}`;
}

export default function CheckoutView() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [form, setForm] = useState(initialForm);
  const [orderNumber] = useState(generateOrderNumber);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-order-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customer: { fullName: form.fullName, email: form.email, phone: form.phone },
          shipping: { address: form.address, city: form.city, state: form.state, zip: form.zip },
          paymentType: PAYMENT_TYPE,
          items,
          total,
        }),
      });
      const data = await res.json();
      setEmailSent(Boolean(data.sent));
    } catch {
      setEmailSent(false);
    }

    setIsConfirmed(true);
    dispatch(clearCart());
    setIsSubmitting(false);
  }

  if (isConfirmed) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h1 className="font-display mt-4 text-xl uppercase text-ink">Order Confirmed</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Thanks {form.fullName || "for your order"}! Your order <span className="font-semibold text-ink">{orderNumber}</span> has
          been placed.
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          {emailSent
            ? `A confirmation has been emailed to ${form.email}.`
            : "We couldn't send a confirmation email, but your order is confirmed."}
        </p>
        <Link
          href="/"
          className="mt-6 border border-ink bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-xl uppercase text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart before checking out.</p>
        <Link
          href="/"
          className="mt-6 border border-ink bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1536px] px-4 py-8 sm:px-6">
      <h1 className="font-display text-xl uppercase text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-zinc-500">Enter your details below to complete your order.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="border border-line bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Personal Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={form.fullName} onChange={handleChange("fullName")} required />
              <Field label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
              <Field label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} required />
            </div>
          </div>

          <div className="border border-line bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Shipping Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street Address" value={form.address} onChange={handleChange("address")} required />
              </div>
              <Field label="City" value={form.city} onChange={handleChange("city")} required />
              <Field label="State" value={form.state} onChange={handleChange("state")} required />
              <Field label="ZIP Code" value={form.zip} onChange={handleChange("zip")} required />
            </div>
          </div>

          <div className="border border-line bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Payment Type</h2>
            <div className="mt-4 flex items-center gap-3 border border-ink bg-ink px-4 py-4 text-white sm:w-64">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-semibold">Credit / Debit Card</span>
            </div>
          </div>
        </div>

        <aside className="w-full shrink-0 border border-line bg-white p-5 lg:sticky lg:top-24 lg:w-[360px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Order Summary</h3>
            <span className="text-xs font-semibold text-zinc-500">#{orderNumber}</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            {items.length} item{items.length === 1 ? "" : "s"} in your order
          </p>

          <ul className="mt-4 space-y-4 border-b border-line pb-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div
                  className="relative h-16 w-16 shrink-0 overflow-hidden border border-line"
                  style={{ backgroundColor: `${item.hex}14` }}
                >
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
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

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Total</span>
            <span className="text-xl font-extrabold text-ink">${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary disabled:opacity-60"
          >
            <Lock className="h-4 w-4" /> {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
          <p className="mt-3 text-center text-[11px] text-zinc-400">
            This is a demo checkout — no payment will be processed.
          </p>
        </aside>
      </form>
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
