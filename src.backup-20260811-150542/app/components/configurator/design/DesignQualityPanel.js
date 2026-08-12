"use client";

import { CheckCircle2, AlertTriangle, XCircle, Circle } from "lucide-react";

export default function DesignQualityPanel({ layers }) {
  const checks = [];
  const images = layers.filter((l) => l.type === "image");

  if (images.length === 0) {
    checks.push({ label: "Artwork", status: "none", detail: "No uploaded artwork on this view yet" });
  } else {
    images.forEach((img, i) => {
      const scale = img.naturalWidth && img.width ? img.naturalWidth / img.width : 2;
      const dpi = Math.round(scale * 72);
      const status = dpi >= 200 ? "good" : dpi >= 120 ? "warning" : "critical";
      checks.push({
        label: `Image ${i + 1} Resolution`,
        status,
        detail:
          status === "good"
            ? `~${dpi} DPI — Excellent`
            : status === "warning"
            ? `~${dpi} DPI — Consider a higher-res file`
            : `~${dpi} DPI — Too low for clean printing`,
      });
    });
  }

  const smallText = layers.some((l) => l.type === "text" && l.fontSize < 14);
  checks.push({
    label: "Readability",
    status: smallText ? "warning" : "good",
    detail: smallText ? "Some text may be too small to print clearly" : "Text sizes look good",
  });

  return (
    <div className="rounded-card border border-line bg-white p-4 shadow-card">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Design Quality</p>
      <ul className="space-y-2">
        {checks.map((check, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <StatusIcon status={check.status} />
            <div>
              <p className="font-medium text-ink">{check.label}</p>
              <p className="text-zinc-500">{check.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusIcon({ status }) {
  if (status === "good") return <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />;
  if (status === "warning") return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />;
  if (status === "critical") return <XCircle className="h-4 w-4 shrink-0 text-red-500" />;
  return <Circle className="h-4 w-4 shrink-0 text-zinc-300" />;
}
