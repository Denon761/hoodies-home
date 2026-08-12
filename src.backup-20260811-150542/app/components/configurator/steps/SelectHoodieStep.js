"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Search } from "lucide-react";
import { selectCustomizer, setProduct, setSize } from "../../../store/customizerSlice";
import { hoodieStyles } from "../../../data/hoodieStyles";
import { sizes } from "../../../data/sizes";
import SizePicker from "../../SizePicker";

export default function SelectHoodieStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const tags = useMemo(() => Array.from(new Set(hoodieStyles.flatMap((s) => s.tags))), []);

  const filtered = hoodieStyles.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || s.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <h1 className="text-xl font-bold text-ink">Select Your Hoodie</h1>
      <p className="mt-1 text-sm text-zinc-500">Choose a hoodie style that fits your needs.</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies..."
            className="w-full rounded-full border border-line py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={!activeTag} onClick={() => setActiveTag(null)}>
            All
          </FilterChip>
          {tags.map((tag) => (
            <FilterChip key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((style) => {
          const selected = customizer.productId === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => dispatch(setProduct(style.id))}
              className={`flex flex-col items-center gap-2 rounded-card border p-4 text-center transition-colors ${
                selected ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line hover:border-primary/50"
              }`}
            >
              <div
                className="relative h-24 w-24 overflow-hidden rounded-lg"
                style={{ backgroundColor: `${style.accentColor}14` }}
              >
                <Image src={style.image} alt={style.name} fill className="object-cover" sizes="96px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{style.name}</p>
                <p className="text-xs text-zinc-500">{style.fit}</p>
                <p className="mt-1 text-sm font-bold text-primary">${style.basePrice.toFixed(2)}</p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-zinc-500">No hoodies match your search.</p>
        )}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Size</p>
        <SizePicker sizes={sizes} selectedSize={customizer.size} onSelect={(s) => dispatch(setSize(s))} />
      </div>
    </div>
  );
}

function FilterChip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active ? "border-primary bg-primary text-white" : "border-line text-zinc-600 hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  );
}
