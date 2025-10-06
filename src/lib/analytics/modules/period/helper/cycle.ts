import type { Gap as Cycle } from "@/types/analytics/modules/gap/GapType";

/**
 * Extracts up to N most recent cycles from event data.
 */
export function getLastCycles(
  allCycles: Cycle[],
  maxCount = 6
): Cycle[] {
  return allCycles
    .sort((a, b) => b.to.getTime() - a.to.getTime())
    .slice(0, maxCount);
}

/**
 * Determines whether a cycle length is "normal"
 * using both the configured min/max and deviation from moving average.
 */
export function isCycleLengthNormal(
  cycleLength: number,
  normalMin: number,
  normalMax: number,
  movingAvg: number,
  toleranceRatio = 0.15 // 15% deviation tolerance
): boolean {
  const withinRange =
    cycleLength >= normalMin && cycleLength <= normalMax;

  const withinDeviation =
    Math.abs(cycleLength - movingAvg) / movingAvg <= toleranceRatio;

  return withinRange && withinDeviation;
}