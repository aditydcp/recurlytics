import type {
  Gap as Cycle,
  GapStat as CycleLengthStat,
  PredictionDate,
} from "@/types/analytics/modules/gap/GapType";

export interface PeriodAnalyticsResult {
  cycleLengthStats: CycleLengthStat[];
  avgCycleLength: number | null;
  lastCycles: CycleDetail[];
  nextPrediction: Date | null;
  predictionRange: PredictionDate[];
  currentCycle: CycleDetail | null;
  currentPhase: PhaseRange | null;
  currentDayNumber: number;
  latePeriodDetails: LatePeriodDetail | null;
}

export interface PhaseRange {
  phase: "menstrual" | "follicular" | "ovulation" | "luteal" | "extended";
  start: Date;
  end: Date;
}

export interface CycleDetail extends Cycle {
  phases: PhaseRange[];
  isLengthNormal: boolean;
}

export interface LatePeriodDetail {
  isLate: boolean;
  daysLate: number;
}