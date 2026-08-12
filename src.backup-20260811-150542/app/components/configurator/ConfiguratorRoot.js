"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomizer, hydrateConfigurator } from "../../store/customizerSlice";
import ConfiguratorShell from "./ConfiguratorShell";
import SelectHoodieStep from "./steps/SelectHoodieStep";
import SelectFabricStep from "./steps/SelectFabricStep";
import CustomizeColorsStep from "./steps/CustomizeColorsStep";
import PrintingStep from "./steps/PrintingStep";
import AccessoriesStep from "./steps/AccessoriesStep";
import ReviewCheckoutStep from "./steps/ReviewCheckoutStep";

const DesignStudioStep = dynamic(() => import("./steps/DesignStudioStep"), {
  ssr: false,
  loading: () => (
    <div className="rounded-card border border-line bg-white p-6 text-sm text-zinc-500 shadow-card">
      Loading Design Studio…
    </div>
  ),
});

const STEP_COMPONENTS = {
  1: SelectHoodieStep,
  2: SelectFabricStep,
  3: CustomizeColorsStep,
  4: DesignStudioStep,
  5: PrintingStep,
  6: AccessoriesStep,
  7: ReviewCheckoutStep,
};

export default function ConfiguratorRoot() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentStep = useSelector((state) => selectCustomizer(state).currentStep);

  useEffect(() => {
    const shared = searchParams.get("share");
    if (!shared) return;
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(shared)));
      dispatch(hydrateConfigurator(decoded));
    } catch {
      // ignore malformed share payloads
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StepComponent = STEP_COMPONENTS[currentStep] || SelectHoodieStep;

  return (
    <ConfiguratorShell>
      <StepComponent />
    </ConfiguratorShell>
  );
}
