import { addDays } from "date-fns";
import type { AnalyticsModule } from "@/types/analytics/AnalyticsType";
import type { GapAnalyticsResult } from "@/types/analytics/modules/gap/GapType";
import { extractEventMetadata } from "@/lib/analytics/helpers/gaps";

export const gapModule: AnalyticsModule<GapAnalyticsResult> = {
  id: "gap",

  compute(events, _) {
    if (!events || events.length < 2) {
      return { avgGap: null, lastGaps: [], nextPrediction: null };
    }

    const { gaps, lastEventDate } = extractEventMetadata(events);

    const avgGap = gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const lastGaps = gaps.slice(-3).reverse();

    const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

    return {
      avgGap,
      lastGaps,
      nextPrediction,
    };
  },
};
