export type Gap = { from: Date; to: Date; gap: number };

export interface GapStat {
  scope: "3m" | "6m" | "12m" | "all";
  avg: number;
  min: number;
  max: number;
  count: number;
}

export interface GapAnalyticsResult {
  avgGap: number | null;
  lastGaps: Gap[];
  nextPrediction: Date | null;
}
