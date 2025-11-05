import type {
  Gap as Cycle,
  GapStat as CycleLengthStat,
} from "@/types/analytics/modules/gap/GapType";

export interface PeriodPrediction {
  date: Date;
  probability: number;
}

export interface PeriodAnalyticsResult {
  cycleLengthStats: CycleLengthStat[];
  avgCycleLength: number | null;
  lastCycles: CycleDetail[];
  nextPrediction: Date | null;
  predictionRange: PeriodPrediction[];
  currentCycle: CycleDetail | null;
  currentPhase: PhaseRange | null;
}

export interface PhaseRange {
  phase: "menstrual" | "follicular" | "ovulation" | "luteal";
  start: Date;
  end: Date;
}

export interface CycleDetail extends Cycle {
  phases: PhaseRange[];
  isLengthNormal: boolean;
}
