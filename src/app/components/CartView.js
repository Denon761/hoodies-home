"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { selectCartItems, selectCartTotal, removeFromCart, updateCartItemQuantity } from "../store/cartSlice";

export default function CartView() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[1536px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-xl uppercase text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart to see it here.</p>
        <Link
          href="/"
          className="mt-6 flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Shop Now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-[1536px] px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-baseline gap-3">
        <h1 className="font-display text-xl uppercase text-ink">Your Cart</h1>
        <span className="text-sm text-zinc-500">
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </span>
      </div>
      <p className="mt-1 text-sm text-zinc-500">Review your items before you check out.</p>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 rounded-card border border-line bg-white">
          {items.map((item, index) => (
            <CartRow key={item.id} item={item} dispatch={dispatch} isLast={index === items.length - 1} />
          ))}
        </div>

        <aside className="w-full shrink-0 rounded-card border border-line bg-white p-5 lg:sticky lg:top-24 lg:w-[340px]">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Order Summary</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd className="font-medium text-ink">${total.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Shipping</dt>
              <dd className="font-medium text-success">Free</dd>
            </div>
          </dl>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm font-semibold text-ink">Total</span>
            <span className="text-xl font-extrabold text-ink">${total.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="mt-2 block w-full rounded-pill border border-line py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Continue Shopping
          </Link>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout, safe & encrypted
          </p>
        </aside>
      </div>
    </div>
  );
}

function CartRow({ item, dispatch, isLast }) {
  return (
    <div className={`flex gap-4 p-4 sm:p-5 ${isLast ? "" : "border-b border-line"}`}>
      <div
        className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${item.hex}14` }}
      >
        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${item.variantId}`} className="text-sm font-semibold text-ink hover:text-primary">
              {item.name}
            </Link>
            <p className="text-xs text-zinc-500">
              {item.variantName} / {item.size}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
            className="shrink-0 text-zinc-400 transition-colors hover:text-red-600"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QtyButton
              onClick={() => dispatch(updateCartItemQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            >
              <Minus className="h-3 w-3" />
            </QtyButton>
            <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
            <QtyButton
              onClick={() => dispatch(updateCartItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              <Plus className="h-3 w-3" />
            </QtyButton>
          </div>
          <span className="text-sm font-bold text-ink">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function QtyButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded-md border border-line text-zinc-600 transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
