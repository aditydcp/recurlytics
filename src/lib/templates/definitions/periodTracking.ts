import { PeriodTrackingView } from "@/components/feature/template/PeriodTrackingView";
import type { TemplateDefinition } from "@/types/TemplateType";

export const PeriodTrackingTemplate: TemplateDefinition = {
  id: "period-tracking",
  name: "Period Tracking",
  description: "Menstrual cycle prediction and phase tracking.",
  analyticsModules: ["period"],
  // analyticsModules: ["gap", "cycle", "phase"],
  config: {
    avgCycleLength: 28,
    minCycleLength: 26,
    maxCycleLength: 32,
    menstrualLength: 5,
    follicularFromPeriodLength: 14,
    lutealLength: 14,
  },
  view: PeriodTrackingView,
};