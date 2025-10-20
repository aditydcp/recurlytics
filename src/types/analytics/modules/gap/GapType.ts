export type Gap = { from: Date; to: Date; gap: number };

export interface GapAnalyticsResult {
  avgGap: number | null;
  lastGaps: Gap[];
  nextPrediction: Date | null;
}
