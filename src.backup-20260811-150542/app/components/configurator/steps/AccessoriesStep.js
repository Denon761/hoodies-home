"use client";

import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";
import {
  selectCustomizer,
  toggleAccessorySelection,
  setAccessoryQuantity,
} from "../../../store/customizerSlice";
import { accessories, getAccessoryLocationById } from "../../../data/accessories";
import { getIcon } from "../../../lib/icons";

export default function AccessoriesStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <h1 className="text-xl font-bold text-ink">Add Accessories</h1>
      <p className="mt-1 text-sm text-zinc-500">Make it truly premium with custom details.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((accessory) => {
          const selection = customizer.accessorySelections.find((a) => a.id === accessory.id);
          const Icon = getIcon(accessory.icon);
          const defaultLocation = accessory.locations[0];

          return (
            <div
              key={accessory.id}
              className={`rounded-card border p-4 transition-colors ${
                selection ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-line">
                    <Icon className="h-4 w-4 text-ink" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{accessory.name}</p>
                    <p className="text-xs text-zinc-500">{accessory.description}</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold text-primary">+${accessory.price.toFixed(2)}</span>
              </div>

              <p className="mt-2 text-[11px] text-zinc-500">
                Position: {getAccessoryLocationById(selection?.locationId || defaultLocation)?.label}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(toggleAccessorySelection({ id: accessory.id, locationId: defaultLocation }))
                  }
                  className={`rounded-pill px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selection ? "bg-ink text-white" : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  {selection ? "Remove" : "Add"}
                </button>

                {selection && (
                  <div className="flex items-center gap-2">
                    <QtyButton
                      onClick={() =>
                        dispatch(setAccessoryQuantity({ id: accessory.id, quantity: Math.max(1, selection.quantity - 1) }))
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </QtyButton>
                    <span className="w-5 text-center text-xs font-semibold">{selection.quantity}</span>
                    <QtyButton
                      onClick={() =>
                        dispatch(setAccessoryQuantity({ id: accessory.id, quantity: selection.quantity + 1 }))
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </QtyButton>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QtyButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded-md border border-line bg-white text-zinc-600 transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
