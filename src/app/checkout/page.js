"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";
import { ShoppingBasket } from "lucide-react";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (items.length === 0) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total }),
      });

      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Failed to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-xl uppercase text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart before checking out.</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1536px] px-4 py-8 sm:px-6">
      <h1 className="font-display text-xl uppercase text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-zinc-500">You will be redirected to Stripe to complete your payment securely.</p>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="rounded-card border border-line bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Order Summary</h2>
            <ul className="mt-4 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                    style={{ backgroundColor: `${item.hex}14` }}
                  >
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
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
        </div>

        <aside className="w-full shrink-0 rounded-card border border-line bg-white p-5 lg:sticky lg:top-24 lg:w-[360px]">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Secure Checkout</h3>
          <p className="mt-2 text-xs text-zinc-500">
            You will be redirected to Stripe to enter your shipping and payment details.
          </p>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            <ShoppingBasket className="h-4 w-4" />
            {isLoading ? "Redirecting..." : "Proceed to Stripe"}
          </button>
          <p className="mt-3 text-center text-[11px] text-zinc-400">
            Payments are processed securely by Stripe.
          </p>
        </aside>
      </div>
    </div>
  );
}
