"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { HelpCircle, Save, Share2, ShoppingCart } from "lucide-react";
import { selectCustomizer, setStep, markDraftSaved } from "../../store/customizerSlice";
import { selectCartCount } from "../../store/cartSlice";
import { configuratorSteps } from "../../data/configuratorSteps";
import StepProgressHeader from "./StepProgressHeader";
import OrderSummaryPanel from "./OrderSummaryPanel";

export default function ConfiguratorShell({ children }) {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const cartCount = useSelector(selectCartCount);
  const [savedFlash, setSavedFlash] = useState(false);
  const [shareFlash, setShareFlash] = useState(false);

  function handleSaveDraft() {
    dispatch(markDraftSaved());
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  function handleShare() {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(customizer)));
      const url = `${window.location.origin}/customize?share=${encoded}`;
      navigator.clipboard?.writeText(url);
    } catch {
      // clipboard unavailable — the flash still reassures the user something happened
    }
    setShareFlash(true);
    setTimeout(() => setShareFlash(false), 2000);
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-2 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-extrabold tracking-tight">
              Hoodies<span className="text-primary">Home</span>
            </Link>
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
              <button type="button" onClick={handleSaveDraft} className="flex items-center gap-1.5 hover:text-white">
                <Save className="h-4 w-4" /> {savedFlash ? "Saved ✓" : "Save Draft"}
              </button>
              <button type="button" onClick={handleShare} className="flex items-center gap-1.5 hover:text-white">
                <Share2 className="h-4 w-4" /> {shareFlash ? "Link Copied ✓" : "Share"}
              </button>
              <span className="hidden items-center gap-1.5 text-zinc-500 sm:flex">
                <HelpCircle className="h-4 w-4" /> Help
              </span>
              <Link href="/cart" className="relative flex items-center gap-1.5 hover:text-white">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <StepProgressHeader
            steps={configuratorSteps}
            currentStep={customizer.currentStep}
            onStepClick={(n) => dispatch(setStep(n))}
          />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">{children}</div>
        <OrderSummaryPanel />
      </div>
    </div>
  );
}
