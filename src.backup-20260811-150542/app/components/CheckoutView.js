"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, Lock } from "lucide-react";
import { selectCartItems, clearCart } from "../store/cartSlice";
import { getCartTotals } from "../data/pricing";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export default function CheckoutView() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totals = getCartTotals(items);
  const [form, setForm] = useState(initialForm);
  const [orderNumber, setOrderNumber] = useState(null);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const number = `HH-${Date.now().toString().slice(-8)}`;
    setOrderNumber(number);
    dispatch(clearCart());
  }

  if (orderNumber) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h1 className="mt-4 text-xl font-bold text-ink">Order Confirmed</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Thanks {form.fullName || "for your order"}! Your order <span className="font-semibold text-ink">{orderNumber}</span> has
          been placed.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart before checking out.</p>
        <Link
          href="/customize"
          className="mt-6 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Customize My Hoodie
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6">
      <h1 className="text-xl font-bold text-ink">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <h2 className="text-sm font-semibold text-ink">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={form.fullName} onChange={handleChange("fullName")} required />
              <Field label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
              <Field label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} required />
            </div>
          </div>

          <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <h2 className="text-sm font-semibold text-ink">Shipping Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street Address" value={form.address} onChange={handleChange("address")} required />
              </div>
              <Field label="City" value={form.city} onChange={handleChange("city")} required />
              <Field label="State" value={form.state} onChange={handleChange("state")} required />
              <Field label="ZIP Code" value={form.zip} onChange={handleChange("zip")} required />
            </div>
          </div>
        </div>

        <aside className="w-full shrink-0 rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-24 lg:w-[320px]">
          <h3 className="text-sm font-semibold text-ink">Order Summary</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {items.length} item{items.length === 1 ? "" : "s"} in your order
          </p>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd className="font-medium text-ink">${totals.subtotal.toFixed(2)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-zinc-500">Discount</dt>
                <dd className="font-medium text-success">-${totals.discount.toFixed(2)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm font-semibold text-ink">Total</span>
            <span className="text-xl font-extrabold text-ink">${totals.total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Lock className="h-4 w-4" /> Place Order
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
        className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
      />
    </label>
  );
}
