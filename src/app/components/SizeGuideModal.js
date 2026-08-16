"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const HOODIE_CHART_CM = [
  { size: "XS", shoulder: 58, length: 65, chest: 57, sleeve: 61 },
  { size: "S", shoulder: 60, length: 66.5, chest: 59.5, sleeve: 62 },
  { size: "M", shoulder: 62, length: 68, chest: 62, sleeve: 63 },
  { size: "L", shoulder: 64, length: 69.5, chest: 64.5, sleeve: 64 },
  { size: "XL", shoulder: 66, length: 71, chest: 67, sleeve: 65 },
  { size: "XXL", shoulder: 68, length: 72.5, chest: 69.5, sleeve: 66 },
];

const TROUSER_CHART_CM = [
  { size: "XS", waist: 66, inseam: 68 },
  { size: "S", waist: 71, inseam: 69 },
  { size: "M", waist: 76, inseam: 70 },
  { size: "L", waist: 81, inseam: 71 },
  { size: "XL", waist: 86, inseam: 72 },
  { size: "XXL", waist: 91, inseam: 73 },
];

const HOODIE_DEFINITIONS = [
  { label: "shoulder", text: "Measured from shoulder point to shoulder point straight across" },
  { label: "length", text: "Measured from highest point of shoulder to bottom edge" },
  { label: "chest", text: "Measured across garment 2cm down from the armholes" },
  { label: "sleeve length", text: "Measured from shoulder seam to sleeve edge" },
];

const TROUSER_DEFINITIONS = [
  { label: "waist", text: "Measured flat across the waistband, unstretched" },
  { label: "inseam", text: "Measured from the crotch seam to the hem" },
];

function cm(value, unit) {
  if (unit === "in") return (value / 2.54).toFixed(1);
  return value % 1 === 0 ? value : value.toFixed(1);
}

const FIT_SIZES = ["S", "M", "L", "XL", "XXL"];

function suggestSize(heightCm, weightKg) {
  let index = 0;
  if (heightCm >= 190) index = 4;
  else if (heightCm >= 184) index = 3;
  else if (heightCm >= 177) index = 2;
  else if (heightCm >= 170) index = 1;
  else index = 0;

  const expectedWeight = 22 * (heightCm / 100) ** 2;
  const diff = weightKg - expectedWeight;
  if (diff > 12) index += 1;
  else if (diff < -12) index -= 1;

  index = Math.min(FIT_SIZES.length - 1, Math.max(0, index));
  return FIT_SIZES[index];
}

function HoodieDiagram() {
  return (
    <Image
      src="/images/hoodie-size-guide.webp"
      alt="Hoodie measurement diagram — shoulder, length, chest, sleeve length"
      width={800}
      height={1000}
      className="h-auto w-full max-w-sm"
    />
  );
}

function TrouserDiagram() {
  return (
    <Image
      src="/images/trouser-size.png"
      alt="Trouser technical flat — front and back"
      width={620}
      height={620}
      className="h-auto w-full max-w-sm"
    />
  );
}

export default function SizeGuideModal({ open, onClose, onSelectSize }) {
  const [unit, setUnit] = useState("cm");
  const [tab, setTab] = useState("hoodie");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [suggested, setSuggested] = useState(null);

  if (!open) return null;

  const isHoodie = tab === "hoodie";
  const chart = isHoodie ? HOODIE_CHART_CM : TROUSER_CHART_CM;
  const definitions = isHoodie ? HOODIE_DEFINITIONS : TROUSER_DEFINITIONS;

  function handleSuggest() {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return;
    setSuggested(suggestSize(h, w));
  }

  function handleSelectSuggested() {
    if (!suggested) return;
    onSelectSize?.(suggested);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-0 sm:p-6">
      <div className="flex h-full w-full flex-col overflow-y-auto bg-white sm:h-auto sm:max-h-[90vh] sm:max-w-4xl">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <span className="w-8" />
          <h2 className="text-sm font-semibold lowercase tracking-wide text-ink">size guide</h2>
          <button type="button" onClick={onClose} aria-label="Close size guide" className="text-ink hover:text-zinc-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
          <div className="flex border border-line text-xs font-semibold uppercase">
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`px-3 py-1.5 ${unit === "cm" ? "bg-ink text-white" : "text-ink"}`}
            >
              cm
            </button>
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`border-l border-line px-3 py-1.5 ${unit === "in" ? "bg-ink text-white" : "text-ink"}`}
            >
              in
            </button>
          </div>

          <div className="flex border border-line text-xs font-semibold uppercase">
            <button
              type="button"
              onClick={() => setTab("hoodie")}
              className={`px-3 py-1.5 ${isHoodie ? "bg-ink text-white" : "text-ink"}`}
            >
              Hoodie
            </button>
            <button
              type="button"
              onClick={() => setTab("trousers")}
              className={`border-l border-line px-3 py-1.5 ${!isHoodie ? "bg-ink text-white" : "text-ink"}`}
            >
              Trousers
            </button>
          </div>
        </div>

        <div className="mx-5 mt-5 border border-line px-4 py-4 sm:mx-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink">Find Your Size</p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs text-zinc-500">
              Height (cm)
              <input
                type="number"
                inputMode="numeric"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setSuggested(null);
                }}
                placeholder="178"
                className="w-24 border border-line px-2.5 py-2 text-sm text-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-zinc-500">
              Weight (kg)
              <input
                type="number"
                inputMode="numeric"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setSuggested(null);
                }}
                placeholder="72"
                className="w-24 border border-line px-2.5 py-2 text-sm text-ink focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={handleSuggest}
              disabled={!height || !weight}
              className="border border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:border-line disabled:bg-white disabled:text-zinc-400"
            >
              Suggest My Size
            </button>
          </div>

          {suggested && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-sm text-ink">
                Recommended size: <span className="font-semibold">{suggested}</span>
              </p>
              <button
                type="button"
                onClick={handleSelectSuggested}
                className="border border-ink bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Select This Size
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-8 px-5 py-6 sm:grid-cols-2 sm:items-start sm:px-8">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse text-left text-sm">
              <thead>
                <tr className="border border-line bg-surface text-xs font-medium text-ink">
                  <th className="border border-line px-2.5 py-2 font-medium">{unit === "cm" ? "In cm" : "In in"}</th>
                  {isHoodie ? (
                    <>
                      <th className="border border-line px-2.5 py-2 font-medium">Shoulder</th>
                      <th className="border border-line px-2.5 py-2 font-medium">Length</th>
                      <th className="border border-line px-2.5 py-2 font-medium">Chest</th>
                      <th className="border border-line px-2.5 py-2 font-medium">Sleeve length</th>
                    </>
                  ) : (
                    <>
                      <th className="border border-line px-2.5 py-2 font-medium">Waist</th>
                      <th className="border border-line px-2.5 py-2 font-medium">Inseam</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {chart.map((row) => (
                  <tr key={row.size}>
                    <td className="border border-line px-2.5 py-2 font-medium text-ink">{row.size}</td>
                    {isHoodie ? (
                      <>
                        <td className="border border-line px-2.5 py-2">{cm(row.shoulder, unit)}</td>
                        <td className="border border-line px-2.5 py-2">{cm(row.length, unit)}</td>
                        <td className="border border-line px-2.5 py-2">{cm(row.chest, unit)}</td>
                        <td className="border border-line px-2.5 py-2">{cm(row.sleeve, unit)}</td>
                      </>
                    ) : (
                      <>
                        <td className="border border-line px-2.5 py-2">{cm(row.waist, unit)}</td>
                        <td className="border border-line px-2.5 py-2">{cm(row.inseam, unit)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">{isHoodie ? <HoodieDiagram /> : <TrouserDiagram />}</div>

          <div className="space-y-3 sm:col-span-2 sm:border-t sm:border-line sm:pt-5">
            {definitions.map((d) => (
              <p key={d.label} className="text-sm leading-relaxed">
                <span className="block text-xs capitalize text-zinc-400">{d.label}</span>
                <span className="text-ink">{d.text}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
