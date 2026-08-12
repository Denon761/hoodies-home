"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { selectCustomizer, setFabric } from "../../../store/customizerSlice";
import { fabrics, getFabricById } from "../../../data/fabrics";
import SwatchPicker from "../../SwatchPicker";
import AttributeBars from "../../AttributeBars";

const USE_CASES = [
  { id: "everyday", label: "Everyday", fabricId: "premium-cotton" },
  { id: "gym", label: "Gym", fabricId: "performance" },
  { id: "winter", label: "Winter", fabricId: "heavyweight-cotton" },
  { id: "outdoor", label: "Outdoor", fabricId: "performance" },
  { id: "streetwear", label: "Streetwear", fabricId: "french-terry" },
  { id: "work", label: "Work", fabricId: "cotton-fleece" },
];

export default function SelectFabricStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const fabric = getFabricById(customizer.fabricId);
  const [recommendation, setRecommendation] = useState(null);

  function getAiRecommendation(useCase) {
    dispatch(setFabric(useCase.fabricId));
    setRecommendation({ fabric: getFabricById(useCase.fabricId), useCase: useCase.label });
  }

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <h1 className="text-xl font-bold text-ink">Select Your Fabric</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Choose the fabric that best matches your comfort, weight, durability, and intended use.
      </p>

      <div className="mt-6">
        <SwatchPicker
          items={fabrics}
          selectedId={customizer.fabricId}
          onSelect={(id) => dispatch(setFabric(id))}
          columns="grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
          getLabel={(f) => f.name}
          getSubLabel={(f) => `${f.gsm} GSM`}
          renderContent={(f) => (
            <div className="relative h-14 w-14 overflow-hidden rounded-md" style={{ backgroundColor: f.swatchColor }}>
              <Image src={f.image} alt={f.name} fill className="object-cover" sizes="56px" />
              {f.recommended && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-primary px-1.5 py-0.5 text-[8px] font-bold text-white">
                  Best Seller
                </span>
              )}
            </div>
          )}
        />
      </div>

      {fabric && (
        <div className="mt-5 rounded-card border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-ink">{fabric.name}</p>
          <p className="text-xs text-zinc-500">{fabric.description}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {fabric.gsm} GSM · {fabric.priceModifier > 0 ? `+$${fabric.priceModifier.toFixed(2)}` : "Included"}
          </p>
          <div className="mt-3">
            <AttributeBars ratings={fabric.ratings} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {fabric.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill bg-white px-2 py-1 text-[10px] font-medium text-zinc-600 ring-1 ring-line"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-card border border-dashed border-primary/40 bg-primary-light/40 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-primary" /> Where will you wear it?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {USE_CASES.map((useCase) => (
            <button
              key={useCase.id}
              type="button"
              onClick={() => getAiRecommendation(useCase)}
              className="rounded-full border border-primary/40 bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {useCase.label}
            </button>
          ))}
        </div>
        {recommendation && (
          <p className="mt-3 text-xs text-zinc-600">
            <span className="font-semibold text-primary">Recommended: {recommendation.fabric.name}</span> — best
            choice for {recommendation.useCase.toLowerCase()} use.
          </p>
        )}
      </div>
    </div>
  );
}
