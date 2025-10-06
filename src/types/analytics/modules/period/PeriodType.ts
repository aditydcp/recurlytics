import type { Gap as Cycle } from "@/types/analytics/modules/gap/GapType";

export interface PeriodPrediction {
  date: Date;
  probability: number;
}

export interface PeriodAnalyticsResult {
  avgCycleLength: number | null;
  lastCycles: CycleDetail[];
  nextPrediction: Date | null;
  predictionRange: PeriodPrediction[];
  currentCyclePhases: PhaseRange[] | null;
}

export interface PhaseRange {
  phase: "menstrual" | "follicular" | "ovulation" | "luteal";
  start: Date;
  end: Date;
}

export interface CycleDetail extends Cycle {
  phases: PhaseRange[];
}