import type { PeriodPrediction } from "@/types/analytics/modules/period/PeriodType";
import { addDays } from "date-fns";

/**
 * Predicts the length of the next menstrual cycle
 * using exponential moving average blended with a Bayesian-like prior.
 */
export function predictCycleLength(
  cycleLengths: number[],
  normalAvgCycleLength: number,
  options = { decay: 0.8, priorWeight: 2 }
): number {
  const { decay, priorWeight } = options;
  if (cycleLengths.length === 0) return normalAvgCycleLength;

  // Exponential moving average (EMA)
  let weightedSum = 0,
    totalWeight = 0;
  cycleLengths.forEach((x, i) => {
    const w = Math.pow(decay, cycleLengths.length - 1 - i);
    weightedSum += x * w;
    totalWeight += w;
  });
  const recentWeightedAvg = weightedSum / totalWeight;

  // Bayesian-like blend with prior (normal average)
  const n = cycleLengths.length;
  const predictedCycle =
    (recentWeightedAvg * n + normalAvgCycleLength * priorWeight) /
    (n + priorWeight);

  return predictedCycle;
}

/**
 * Predicts the next period date range with probability distribution.
 */
export function predictPeriodRange(
  lastPeriodStart: Date,
  cycleLengths: number[],
  normalAvgCycleLength: number,
  options = { decay: 0.8, priorWeight: 2, defaultStdDev: 2.5, rangeDays: 5 }
): PeriodPrediction[] {
  const { decay, priorWeight, defaultStdDev, rangeDays } = options;

  const meanCycleLength = predictCycleLength(cycleLengths, normalAvgCycleLength, {
    decay,
    priorWeight,
  });

  // Estimate cycle variability (σ)
  const stdDev =
    cycleLengths.length > 1
      ? Math.sqrt(
          cycleLengths
            .map((x) => Math.pow(x - meanCycleLength, 2))
            .reduce((a, b) => a + b, 0) / cycleLengths.length
        )
      : defaultStdDev;

  // Gaussian-like probability distribution around mean
  const denom = stdDev * Math.sqrt(2 * Math.PI);
  const results: PeriodPrediction[] = [];

  for (let offset = -rangeDays; offset <= rangeDays; offset++) {
    const date = addDays(lastPeriodStart, Math.round(meanCycleLength + offset));
    const exponent = -Math.pow(offset, 2) / (2 * Math.pow(stdDev, 2));
    const probability = Math.exp(exponent) / denom;
    results.push({ date, probability });
  }

  // Normalize probabilities to sum to 1
  const totalProb = results.reduce((sum, r) => sum + r.probability, 0);
  results.forEach((r) => (r.probability /= totalProb));

  return results;
}