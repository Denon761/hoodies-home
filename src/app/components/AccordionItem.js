"use client";

import { ChevronDown } from "lucide-react";

export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-wide text-ink"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-5 text-sm leading-relaxed text-zinc-600">{children}</div>}
    </div>
  );
}
