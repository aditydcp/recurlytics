import type { Gap, GapStat } from "@/types/analytics/modules/gap/GapType";
import { differenceInDays, isAfter, subMonths } from "date-fns";
import type { Event } from "@/types/EventType";

/**
 * Extract basic metadata from list events,
 * returning the gaps,
 * sorted events (from latest to oldest),
 * and the last event date
 * @param events
 * @returns the gaps between each event, the event list itself sorted from latest to oldest, and the last event date
 */
export const extractEventMetadata = (events: Event[]) => {
  // Sort events by start date
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(a.start.dateTime || a.start.date || "");
    const dateB = new Date(b.start.dateTime || b.start.date || "");
    return dateA.getTime() - dateB.getTime();
  });

  // Compute gaps between events
  const gaps: Gap[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(
      sorted[i - 1].start.dateTime || sorted[i - 1].start.date || ""
    );
    const curr = new Date(
      sorted[i].start.dateTime || sorted[i].start.date || ""
    );
    gaps.push({
      from: prev,
      to: curr,
      gap: differenceInDays(curr, prev),
    });
  }

  const lastEventDate = new Date(
    sorted[sorted.length - 1].start.dateTime ||
      sorted[sorted.length - 1].start.date ||
      ""
  );

  return {
    gaps,
    sorted,
    lastEventDate,
  };
};

/**
 * Compute average, min, and max gap for given time scopes (3m, 6m, 12m, all).
 * Automatically excludes scopes where data duration is insufficient.
 */
export function computeGapStats(gaps: Gap[]): GapStat[] {
  if (!gaps.length) return [];

  const now = new Date();
  const stats: GapStat[] = [];

  // Normalize and sort
  const sortedGaps = [...gaps].sort(
    (a, b) => a.from.getTime() - b.from.getTime()
  );

  const earliest = sortedGaps[0].from;
  const totalMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 +
    (now.getMonth() - earliest.getMonth());

  // Helper to compute stats within time frame
  const compute = (months: number, label: GapStat["scope"]) => {
    const cutoff = subMonths(now, months);
    const filtered = sortedGaps.filter((c) => isAfter(c.to, cutoff));

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
  const allLengths = sortedGaps.map((c) => differenceInDays(c.to, c.from));
  stats.push({
    scope: "all",
    avg: allLengths.reduce((a, b) => a + b, 0) / allLengths.length,
    min: Math.min(...allLengths),
    max: Math.max(...allLengths),
    count: allLengths.length
  });

  return stats;
}

/**
 * Get the current day number in respect to the gap
 */
export function getCurrentDayNumber(startDate: Date) {
  const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const today = normalize(new Date());
  const start = normalize(startDate);

  const diffInDays = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffInDays + 1;
}
