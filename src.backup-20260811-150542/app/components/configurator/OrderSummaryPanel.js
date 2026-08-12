"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Truck, ShieldCheck } from "lucide-react";
import { selectCustomizer, setStep } from "../../store/customizerSlice";
import { addToCart } from "../../store/cartSlice";
import { getPriceBreakdown } from "../../data/pricing";
import { getStyleById } from "../../data/hoodieStyles";
import { getFabricById } from "../../data/fabrics";
import { getColorById } from "../../data/colors";
import { getEstimatedDelivery } from "../../lib/date";
import { configuratorSteps, getConfiguratorStepById } from "../../data/configuratorSteps";
import HoodiePreview from "../HoodiePreview";

const TOTAL_STEPS = configuratorSteps.length;

export default function OrderSummaryPanel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const customizer = useSelector(selectCustomizer);
  const breakdown = getPriceBreakdown(customizer);
  const style = getStyleById(customizer.productId);
  const fabric = getFabricById(customizer.fabricId);
  const bodyColor = getColorById(customizer.colors.body);
  const delivery = getEstimatedDelivery();
  const isLastStep = customizer.currentStep >= TOTAL_STEPS;
  const nextStep = getConfiguratorStepById(customizer.currentStep + 1);

  function handleContinue() {
    if (isLastStep) {
      dispatch(addToCart({ selections: { ...customizer }, priceAtAdd: breakdown.total }));
      router.push("/cart");
      return;
    }
    dispatch(setStep(customizer.currentStep + 1));
  }

  return (
    <aside className="w-full shrink-0 rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-28 lg:w-[320px]">
      <div
        className="flex h-40 items-center justify-center rounded-lg p-6"
        style={{ backgroundColor: `${bodyColor?.hex || "#000"}14` }}
      >
        <HoodiePreview colors={customizer.colors} view={customizer.activeView} className="h-full w-full" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-ink">Order Summary</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <Row label="Hoodie" value={style?.name} />
        <Row label="Fabric" value={fabric?.name} />
        <Row label="Colors" value={bodyColor ? `${bodyColor.name} + parts` : "Default"} />
        <Row
          label="Printing"
          value={
            customizer.printingAssignments.length
              ? `${customizer.printingAssignments.length} location${customizer.printingAssignments.length === 1 ? "" : "s"}`
              : "None"
          }
        />
        <Row label="Accessories" value={`${customizer.accessorySelections.length} selected`} />
        <Row label="Size" value={customizer.size} />
      </dl>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-surface px-3 py-2">
        <span className="text-xs font-medium text-zinc-600">Quantity</span>
        <span className="text-sm font-semibold text-ink">{customizer.quantity}</span>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
        <PriceRow label="Subtotal" value={breakdown.subtotal} />
        {breakdown.colorUpgrade > 0 && <PriceRow label="Color Upgrade" value={breakdown.colorUpgrade} />}
        {breakdown.discount > 0 && (
          <PriceRow
            label={`Discount (${Math.round(breakdown.discountRate * 100)}%)`}
            value={-breakdown.discount}
            tone="success"
          />
        )}
        <PriceRow label="Shipping" value={breakdown.shipping} freeIfZero />
        <PriceRow label="Tax" value={breakdown.tax} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-sm font-semibold text-ink">Total</span>
        <span className="text-xl font-extrabold text-ink">${breakdown.total.toFixed(2)}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface p-2.5 text-[11px] text-zinc-600">
        <Truck className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Est. delivery {delivery} · {breakdown.shipping === 0 ? "Free shipping" : "Standard shipping"}
        </span>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {isLastStep ? "Add to Cart" : `Continue to ${nextStep?.label ?? "Next Step"}`} <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure Checkout · 30-Day Guarantee
      </p>
    </aside>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-medium text-ink" title={value}>
        {value}
      </dd>
    </div>
  );
}

function PriceRow({ label, value, tone, freeIfZero }) {
  const display = freeIfZero && value === 0 ? "FREE" : `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className={tone === "success" ? "font-medium text-success" : "font-medium text-ink"}>{display}</span>
    </div>
  );
}
