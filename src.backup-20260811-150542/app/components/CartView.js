"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { selectCartItems, removeFromCart, updateCartItemQuantity } from "../store/cartSlice";
import { getPriceBreakdown, getCartTotals } from "../data/pricing";
import { getStyleById } from "../data/hoodieStyles";
import { getColorById } from "../data/colors";
import { getFabricById } from "../data/fabrics";
import HoodiePreview from "./HoodiePreview";

export default function CartView() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totals = getCartTotals(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Design a hoodie and add it to your cart to see it here.</p>
        <Link
          href="/customize"
          className="mt-6 flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Customize My Hoodie <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6">
      <h1 className="text-xl font-bold text-ink">Your Cart</h1>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          {items.map((item) => (
            <CartRow key={item.id} item={item} dispatch={dispatch} />
          ))}
        </div>

        <aside className="w-full shrink-0 rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-24 lg:w-[320px]">
          <h3 className="text-sm font-semibold text-ink">Cart Summary</h3>
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
          <Link
            href="/checkout"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/customize"
            className="mt-2 block w-full rounded-pill border border-line py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Design Another Hoodie
          </Link>
        </aside>
      </div>
    </div>
  );
}

function CartRow({ item, dispatch }) {
  const { selections } = item;
  const breakdown = getPriceBreakdown(selections);
  const style = getStyleById(selections.productId);
  const bodyColor = getColorById(selections.colors?.body);
  const fabric = getFabricById(selections.fabricId);

  return (
    <div className="flex gap-4 rounded-card border border-line bg-white p-4 shadow-card">
      <div
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg p-3"
        style={{ backgroundColor: `${bodyColor?.hex || "#000"}14` }}
      >
        <HoodiePreview colors={selections.colors} view="front" className="h-full w-full" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-ink">
              {style?.name} / {selections.size}
            </p>
            <p className="text-xs text-zinc-500">
              {fabric?.name} · {bodyColor?.name}
            </p>
            <p className="text-xs text-zinc-500">
              {selections.printingAssignments?.length || 0} print location
              {selections.printingAssignments?.length === 1 ? "" : "s"} ·{" "}
              {selections.accessorySelections?.length || 0} accessories
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
              onClick={() =>
                dispatch(updateCartItemQuantity({ id: item.id, quantity: Math.max(1, selections.quantity - 1) }))
              }
            >
              <Minus className="h-3 w-3" />
            </QtyButton>
            <span className="w-6 text-center text-sm font-semibold">{selections.quantity}</span>
            <QtyButton
              onClick={() => dispatch(updateCartItemQuantity({ id: item.id, quantity: selections.quantity + 1 }))}
            >
              <Plus className="h-3 w-3" />
            </QtyButton>
          </div>
          <span className="text-sm font-bold text-ink">${breakdown.total.toFixed(2)}</span>
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
