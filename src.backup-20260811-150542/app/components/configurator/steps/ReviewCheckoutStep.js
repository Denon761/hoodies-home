"use client";

import { useSelector } from "react-redux";
import { Truck } from "lucide-react";
import { selectCustomizer } from "../../../store/customizerSlice";
import { getPriceBreakdown, getBulkPriceTiers } from "../../../data/pricing";
import { getStyleById } from "../../../data/hoodieStyles";
import { getFabricById } from "../../../data/fabrics";
import { getColorById } from "../../../data/colors";
import { colorParts } from "../../../data/colorParts";
import { getPrintingMethodById } from "../../../data/printingMethods";
import { getPlacementById } from "../../../data/placements";
import { getAccessoryById } from "../../../data/accessories";
import { getEstimatedDelivery } from "../../../lib/date";
import HoodiePreview from "../../HoodiePreview";

export default function ReviewCheckoutStep() {
  const customizer = useSelector(selectCustomizer);
  const breakdown = getPriceBreakdown(customizer);
  const tiers = getBulkPriceTiers(customizer);
  const style = getStyleById(customizer.productId);
  const fabric = getFabricById(customizer.fabricId);
  const delivery = getEstimatedDelivery();
  const layerCount = Object.values(customizer.design).reduce((sum, layers) => sum + layers.length, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <h1 className="text-xl font-bold text-ink">Review Your Custom Hoodie</h1>
        <p className="mt-1 text-sm text-zinc-500">Confirm every detail before adding it to your cart.</p>

        <div className="mt-5 grid gap-6 sm:grid-cols-[220px_1fr]">
          <div
            className="flex h-56 items-center justify-center rounded-lg p-6"
            style={{ backgroundColor: `${getColorById(customizer.colors.body)?.hex || "#000"}14` }}
          >
            <HoodiePreview colors={customizer.colors} view={customizer.activeView} className="h-full w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Product" value={style?.name} />
            <Field label="Size" value={customizer.size} />
            <Field label="Fabric" value={fabric ? `${fabric.name} (${fabric.gsm} GSM)` : ""} />
            <Field label="Quantity" value={customizer.quantity} />
            <Field label="Artwork" value={`${layerCount} element${layerCount === 1 ? "" : "s"} placed`} />
            <Field
              label="Colors"
              value={`${
                colorParts.filter((p) => customizer.colors[p.id] !== style?.defaultColors?.[p.id]).length
              } custom part${colorParts.filter((p) => customizer.colors[p.id] !== style?.defaultColors?.[p.id]).length === 1 ? "" : "s"}`}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Colors by Part</p>
            <ul className="space-y-1 text-xs text-zinc-600">
              {colorParts.map((part) => (
                <li key={part.id} className="flex items-center justify-between">
                  <span>{part.label}</span>
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    <span
                      className="h-3 w-3 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: getColorById(customizer.colors[part.id])?.hex || customizer.colors[part.id] }}
                    />
                    {getColorById(customizer.colors[part.id])?.name || "Custom"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Printing</p>
            <ul className="space-y-1 text-xs text-zinc-600">
              {customizer.printingAssignments.length === 0 && <li>None selected</li>}
              {customizer.printingAssignments.map((a) => (
                <li key={a.id} className="flex items-center justify-between">
                  <span>{getPlacementById(a.locationId)?.label}</span>
                  <span className="font-medium text-ink">{getPrintingMethodById(a.methodId)?.name}</span>
                </li>
              ))}
            </ul>

            <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">Accessories</p>
            <ul className="space-y-1 text-xs text-zinc-600">
              {customizer.accessorySelections.length === 0 && <li>None selected</li>}
              {customizer.accessorySelections.map((a) => (
                <li key={a.id} className="flex items-center justify-between">
                  <span>{getAccessoryById(a.id)?.name}</span>
                  <span className="font-medium text-ink">×{a.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Price Breakdown</p>
        <dl className="space-y-1.5 text-sm">
          <Row label={`Base Price (x${customizer.quantity})`} value={breakdown.baseTotal} />
          {breakdown.colorUpgrade > 0 && <Row label="Color Upgrade" value={breakdown.colorUpgrade} />}
          {breakdown.printingLines.map((line) => (
            <Row key={line.id} label={line.label} value={line.total} />
          ))}
          <Row label="Accessories" value={breakdown.accessoriesTotal} />
          {breakdown.discount > 0 && (
            <Row label={`Discount (${Math.round(breakdown.discountRate * 100)}%)`} value={-breakdown.discount} tone="success" />
          )}
          <Row label="Shipping" value={breakdown.shipping} freeIfZero />
          <Row label="Tax" value={breakdown.tax} />
        </dl>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="text-sm font-semibold text-ink">Total</span>
          <span className="text-lg font-extrabold text-ink">${breakdown.total.toFixed(2)}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface p-3 text-xs text-zinc-600">
          <Truck className="h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-semibold text-ink">Estimated Delivery: {delivery}</p>
            <p>Production 2-4 Business Days · Shipping 2-3 Business Days</p>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Bulk Pricing</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2 font-medium">Quantity</th>
                <th className="pb-2 font-medium">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.range} className="border-t border-line">
                  <td className="py-2 text-ink">{tier.range}</td>
                  <td className="py-2 font-semibold text-ink">${tier.unitPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-zinc-500">{label}</p>
      <p className="font-medium text-ink">{value}</p>
    </div>
  );
}

function Row({ label, value, tone, freeIfZero }) {
  const display = freeIfZero && value === 0 ? "FREE" : `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-zinc-500">{label}</dt>
      <dd className={tone === "success" ? "font-medium text-success" : "font-medium text-ink"}>{display}</dd>
    </div>
  );
}
