"use client";

import { Check } from "lucide-react";

export default function SwatchPicker({
  items,
  selectedId,
  selectedIds,
  onSelect,
  multi = false,
  columns = "grid-cols-3 sm:grid-cols-4",
  renderContent,
  getLabel = (item) => item.name,
  getSubLabel,
}) {
  const isSelected = (id) => (multi ? (selectedIds || []).includes(id) : selectedId === id);

  return (
    <div className={`grid ${columns} gap-3`}>
      {items.map((item) => {
        const selected = isSelected(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`relative flex flex-col items-center gap-1.5 rounded-card border p-2.5 text-center transition-colors ${
              selected
                ? "border-primary bg-primary-light ring-1 ring-primary"
                : "border-line hover:border-primary/50"
            }`}
          >
            {selected && (
              <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            )}
            {renderContent(item)}
            <span className="line-clamp-1 text-xs font-medium text-ink">{getLabel(item)}</span>
            {getSubLabel && (
              <span className="text-[11px] text-zinc-500">{getSubLabel(item)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
