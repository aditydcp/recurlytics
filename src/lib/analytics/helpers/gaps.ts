import type { Gap } from "@/types/analytics/modules/gap/GapType";
import { differenceInDays } from "date-fns";

export const getGaps = (events: any[]) => {
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

  return {
    gaps,
    sorted,
  };
};
