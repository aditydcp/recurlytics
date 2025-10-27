import type {
  Gap as Cycle,
  GapStat as CycleLengthStat,
} from "@/types/analytics/modules/gap/GapType";
import { differenceInDays, isAfter, subMonths } from "date-fns";

/**
 * Extracts up to N most recent cycles from event data.
 */
export function getLastCycles(allCycles: Cycle[], maxCount = 6): Cycle[] {
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
  const withinRange = cycleLength >= normalMin && cycleLength <= normalMax;

  const withinDeviation =
    Math.abs(cycleLength - movingAvg) / movingAvg <= toleranceRatio;

  return withinRange && withinDeviation;
}

/**
 * Compute average, min, and max cycle length for given time scopes (3m, 6m, 12m, all).
 * Automatically excludes scopes where data duration is insufficient.
 */
export function computeCycleLengthStats(cycles: Cycle[]): CycleLengthStat[] {
  if (!cycles.length) return [];

  const now = new Date();
  const stats: CycleLengthStat[] = [];

  // Normalize and sort
  const sortedCycles = [...cycles].sort(
    (a, b) => a.from.getTime() - b.from.getTime()
  );

  const earliest = sortedCycles[0].from;
  const totalMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 +
    (now.getMonth() - earliest.getMonth());

  // Helper to compute stats within time frame
  const compute = (months: number, label: CycleLengthStat["scope"]) => {
    const cutoff = subMonths(now, months);
    const filtered = sortedCycles.filter((c) => isAfter(c.to, cutoff));

    if (!filtered.length) return null;

    const lengths = filtered.map((c) => differenceInDays(c.to, c.from));
    const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);

    return { scope: label, avg, min, max, count: lengths.length};
  };

  // Dynamically include only valid scopes
  if (totalMonths >= 3) {
    const res = compute(3, "3m");
    if (res) stats.push(res);
  }
  if (totalMonths >= 6) {
    const res = compute(6, "6m");
    if (res) stats.push(res);
  }
  if (totalMonths >= 12) {
    const res = compute(12, "12m");
    if (res) stats.push(res);
  }

  // Always include "all"
  const allLengths = sortedCycles.map((c) => differenceInDays(c.to, c.from));
  stats.push({
    scope: "all",
    avg: allLengths.reduce((a, b) => a + b, 0) / allLengths.length,
    min: Math.min(...allLengths),
    max: Math.max(...allLengths),
    count: allLengths.length
  });

  return stats;
}
