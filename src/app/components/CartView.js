"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { selectCartItems, selectCartTotal, removeFromCart, updateCartItemQuantity } from "../store/cartSlice";
import { product, collections, getVariantsByCollection, getVariantPrimaryImage } from "../data/product";

export default function CartView() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const cartVariantIds = new Set(items.map((item) => item.variantId));
  const relatedVariants = product.variants.filter((v) => !cartVariantIds.has(v.id)).slice(0, 10);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[1536px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-xl uppercase text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add a hoodie to your cart to see it here.</p>
        <Link
          href="/"
          className="mt-6 flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary"
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
        <div className="min-w-0 flex-1 border border-line bg-white">
          {items.map((item, index) => (
            <CartRow key={item.id} item={item} dispatch={dispatch} isLast={index === items.length - 1} />
          ))}
        </div>

        <aside className="w-full shrink-0 border border-line bg-white p-5 lg:sticky lg:top-24 lg:w-[340px]">
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
            className="mt-4 flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary"
          >
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="mt-2 block w-full border border-line py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
          >
            Continue Shopping
          </Link>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout, safe & encrypted
          </p>
        </aside>
      </div>

      {relatedVariants.length > 0 && (
        <div className="mt-16 border-t border-line pt-10 sm:mt-20 sm:pt-12">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg text-ink">01</span>
            <h2 className="font-display text-lg uppercase tracking-tight text-ink">You May Also Like</h2>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {relatedVariants.map((v) => {
              const siblingVariants = getVariantsByCollection(v.collection);
              return (
                <div key={v.id} className="group flex flex-col bg-white">
                  <Link href={`/product/${v.id}`} className="flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                      <span className="absolute left-3 top-3 z-10 text-[8px] font-bold uppercase tracking-wide text-white">
                        New Arrivals
                      </span>
                      <Image
                        src={getVariantPrimaryImage(v)}
                        alt={`${product.name} — ${v.name}`}
                        fill
                        sizes="(min-width: 640px) 25vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-4 pt-3 pb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-ink">
                          {collections.find((c) => c.id === v.collection)?.name}
                        </p>
                        <p className="text-sm text-zinc-500">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500">{v.name}</p>
                    </div>
                  </Link>
                  <div className="flex items-center px-4 pb-2">
                    {siblingVariants.map((sv) => (
                      <Link
                        key={sv.id}
                        href={`/product/${sv.id}`}
                        aria-label={sv.name}
                        title={sv.name}
                        className="h-1.5 w-5 border border-line"
                        style={{ backgroundColor: sv.hex }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CartRow({ item, dispatch, isLast }) {
  return (
    <div className={`flex gap-4 p-4 sm:p-5 ${isLast ? "" : "border-b border-line"}`}>
      <div
        className="relative flex h-24 w-24 shrink-0 items-center justify-center border border-line"
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
      className="flex h-6 w-6 items-center justify-center border border-line text-zinc-600 transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
