"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Clock, Palette } from "lucide-react";
import {
  selectCustomizer,
  addPrintingAssignment,
  removePrintingAssignment,
} from "../../../store/customizerSlice";
import { printingMethods, getPrintingMethodById } from "../../../data/printingMethods";
import { placements } from "../../../data/placements";
import { getIcon } from "../../../lib/icons";

export default function PrintingStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const [activeMethodId, setActiveMethodId] = useState(
    customizer.printingAssignments[0]?.methodId || "embroidery"
  );
  const activeMethod = getPrintingMethodById(activeMethodId);

  function toggleLocation(locationId) {
    const existing = customizer.printingAssignments.find((a) => a.locationId === locationId);
    if (existing) {
      dispatch(removePrintingAssignment(existing.id));
    } else {
      dispatch(addPrintingAssignment({ methodId: activeMethodId, locationId }));
    }
  }

  const stitchEstimate = Math.round(activeMethod.pricePerPlacement * 900);
  const productionMinutes = Math.round(activeMethod.pricePerPlacement * 2.5);

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <h1 className="text-xl font-bold text-ink">Printing & Embroidery</h1>
        <p className="mt-1 text-sm text-zinc-500">Choose a decoration method, then assign it to one or more locations.</p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {printingMethods.map((method) => {
            const Icon = getIcon(method.icon);
            const active = activeMethodId === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setActiveMethodId(method.id)}
                className={`flex flex-col items-start gap-1.5 rounded-card border p-3 text-left transition-colors ${
                  active ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line hover:border-primary/50"
                }`}
              >
                <Icon className="h-5 w-5 text-ink" />
                <span className="text-xs font-semibold text-ink">{method.name}</span>
                <span className="text-[11px] text-zinc-500">${method.pricePerPlacement}/location</span>
              </button>
            );
          })}
        </div>

        {activeMethod && (
          <div className="mt-4 rounded-card border border-line bg-surface p-4 text-xs text-zinc-600">
            <p className="font-medium text-ink">{activeMethod.description}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              <span>Max Colors: {activeMethod.maxColors}</span>
              <span>Durability: {activeMethod.durability}</span>
            </div>
          </div>
        )}

        <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Tap a location to assign {activeMethod?.name}
        </p>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {placements
            .filter((p) => activeMethod?.supportedLocations.includes(p.id))
            .map((placement) => {
              const assignment = customizer.printingAssignments.find((a) => a.locationId === placement.id);
              const Icon = getIcon(placement.icon);
              return (
                <button
                  key={placement.id}
                  type="button"
                  onClick={() => toggleLocation(placement.id)}
                  className={`relative flex flex-col items-center gap-1 rounded-card border p-3 text-center transition-colors ${
                    assignment ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line hover:border-primary/50"
                  }`}
                >
                  {assignment && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                      <X className="h-3 w-3" />
                    </span>
                  )}
                  <Icon className="h-5 w-5 text-ink" />
                  <span className="text-[11px] font-medium text-ink">{placement.label}</span>
                  {assignment && (
                    <span className="text-[10px] text-primary">{getPrintingMethodById(assignment.methodId)?.name}</span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {customizer.printingAssignments.length > 0 && (
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Manufacturing Preview</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {activeMethod?.id === "embroidery" ? (
              <Stat icon={Palette} label="Est. Stitch Count" value={stitchEstimate.toLocaleString()} />
            ) : (
              <Stat icon={Palette} label="Ink Coverage" value="Medium" />
            )}
            <Stat icon={Clock} label="Est. Production" value={`${productionMinutes} min`} />
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-[11px] text-zinc-500">{label}</p>
        <p className="font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
