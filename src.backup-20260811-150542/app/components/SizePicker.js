"use client";

export default function SizePicker({ sizes, selectedSize, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const active = selectedSize === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition-colors ${
              active ? "border-primary bg-primary text-white" : "border-line text-zinc-600 hover:border-primary/50"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
