"use client";

import { getIcon } from "../lib/icons";

const VIEW_ICONS = {
  front: "User",
  back: "FlipVertical",
  left: "ArrowLeft",
  right: "ArrowRight",
  hood: "Triangle",
  pocket: "Square",
};

const VIEW_LABELS = {
  front: "Front",
  back: "Back",
  left: "Left",
  right: "Right",
  hood: "Hood",
  pocket: "Pocket",
};

export default function ViewSelector({ views, activeView, onSelect, orientation = "vertical" }) {
  return (
    <div className={`flex gap-2 ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}`}>
      {views.map((view) => {
        const Icon = getIcon(VIEW_ICONS[view]);
        const active = activeView === view;
        return (
          <button
            key={view}
            type="button"
            onClick={() => onSelect(view)}
            className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-white"
                : "border-line text-zinc-600 hover:border-primary/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {VIEW_LABELS[view]}
          </button>
        );
      })}
    </div>
  );
}
