"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import {
  selectCustomizer,
  setActiveColorPart,
  setPartColor,
  applyColorPreset,
  setActiveView,
} from "../../../store/customizerSlice";
import { colorParts } from "../../../data/colorParts";
import { colors, colorCategories, getColorById } from "../../../data/colors";
import { colorPresets } from "../../../data/colorPresets";
import { getStyleById } from "../../../data/hoodieStyles";
import HoodiePreview from "../../HoodiePreview";
import ViewSelector from "../../ViewSelector";

const VIBES = [
  { id: "luxury", label: "Luxury", colors: ["black", "charcoal", "gold", "cream"] },
  { id: "minimal", label: "Minimal", colors: ["white", "grey", "black"] },
  { id: "streetwear", label: "Streetwear", colors: ["black", "orange", "grey"] },
  { id: "sport", label: "Sport", colors: ["navy", "white", "red"] },
  { id: "vintage", label: "Vintage", colors: ["brown", "sand", "cream"] },
];

export default function CustomizeColorsStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const style = getStyleById(customizer.productId);
  const [search, setSearch] = useState("");

  const filteredColors = colors.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  function handleAiAssistant(vibe) {
    const parts = ["body", "sleeves", "hoodExterior", "pocket", "cuffs", "waistband"];
    parts.forEach((part, i) => {
      dispatch(setPartColor({ part, colorId: vibe.colors[i % vibe.colors.length] }));
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="rounded-card border border-line bg-white p-4 shadow-card">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Choose Part to Color</p>
        <div className="space-y-1">
          {colorParts.map((part) => (
            <button
              key={part.id}
              type="button"
              onClick={() => dispatch(setActiveColorPart(part.id))}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                customizer.activeColorPart === part.id ? "bg-primary text-white" : "text-zinc-600 hover:bg-surface"
              }`}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: getColorById(customizer.colors[part.id])?.hex || customizer.colors[part.id] }}
              />
              {part.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row">
            <ViewSelector
              views={style?.views || []}
              activeView={customizer.activeView}
              onSelect={(v) => dispatch(setActiveView(v))}
              orientation="horizontal"
            />
            <div className="flex flex-1 items-center justify-center rounded-lg bg-surface p-6">
              <HoodiePreview colors={customizer.colors} view={customizer.activeView} className="h-56 w-56" />
            </div>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-ink">
            Coloring:{" "}
            <span className="text-primary">
              {colorParts.find((p) => p.id === customizer.activeColorPart)?.label}
            </span>
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colors..."
            className="mt-3 w-full rounded-full border border-line px-4 py-2 text-sm focus:border-primary focus:outline-none"
          />

          <div className="mt-4 space-y-4">
            {colorCategories.map((cat) => {
              const catColors = filteredColors.filter((c) => c.category === cat.id);
              if (!catColors.length) return null;
              return (
                <div key={cat.id}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{cat.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {catColors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => dispatch(setPartColor({ part: customizer.activeColorPart, colorId: c.id }))}
                        title={c.name}
                        className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition-shadow ${
                          customizer.colors[customizer.activeColorPart] === c.id ? "ring-primary" : "ring-transparent"
                        }`}
                        style={{ backgroundColor: c.hex, border: "1px solid var(--color-line)" }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
            <label className="text-xs font-medium text-zinc-600">Custom color</label>
            <input
              type="color"
              onChange={(e) =>
                dispatch(setPartColor({ part: customizer.activeColorPart, colorId: e.target.value }))
              }
              className="h-8 w-8 cursor-pointer rounded border border-line"
            />
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Quick Presets</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => dispatch(applyColorPreset(preset))}
                className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary"
              >
                <span className="flex -space-x-1">
                  {[preset.body, preset.hoodInterior, preset.eyelets].map((id, i) => (
                    <span
                      key={i}
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: getColorById(id)?.hex }}
                    />
                  ))}
                </span>
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-dashed border-primary/40 bg-primary-light/40 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <Sparkles className="h-4 w-4 text-primary" /> AI Color Assistant
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {VIBES.map((vibe) => (
              <button
                key={vibe.id}
                type="button"
                onClick={() => handleAiAssistant(vibe)}
                className="rounded-full border border-primary/40 bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary"
              >
                {vibe.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
