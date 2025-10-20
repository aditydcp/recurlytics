import type { Gap } from "@/types/analytics/modules/gap/GapType";
import { differenceInDays } from "date-fns";
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
