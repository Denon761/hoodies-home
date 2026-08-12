"use client";

import { Check } from "lucide-react";

export default function StepProgressHeader({ steps, currentStep, onStepClick }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-1 sm:gap-2">
      {steps.map((step) => {
        const state = step.id === currentStep ? "active" : step.id < currentStep ? "done" : "todo";
        return (
          <li key={step.id} className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => onStepClick(step.id)}
              className="flex items-center gap-1.5"
              disabled={state === "todo"}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  state === "active"
                    ? "bg-primary text-white"
                    : state === "done"
                    ? "bg-success text-white"
                    : "bg-white/10 text-zinc-400"
                }`}
              >
                {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : step.id}
              </span>
              <span
                className={`hidden text-[11px] font-medium sm:inline ${
                  state === "todo" ? "text-zinc-500" : "text-white"
                }`}
              >
                {step.label}
              </span>
            </button>
            {step.id < steps.length && <span className="h-px w-3 bg-white/15 sm:w-6" />}
          </li>
        );
      })}
    </ol>
  );
}
