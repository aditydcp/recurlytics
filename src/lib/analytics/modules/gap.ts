import { differenceInDays, addDays } from "date-fns";
import type { AnalyticsModule } from "@/types/analytics/AnalyticsType";
import type {
  Gap,
  GapAnalyticsResult,
} from "@/types/analytics/modules/gap/GapType";
import { getGaps } from "../helpers/gaps";

export const gapModule: AnalyticsModule<GapAnalyticsResult> = {
  id: "gap",

  compute(events, _) {
    if (!events || events.length < 2) {
      return { avgGap: null, lastGaps: [], nextPrediction: null };
    }

    const { gaps, sorted } = getGaps(events);

    const avgGap = gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const lastGaps = gaps.slice(-3).reverse();

    const lastEventDate = new Date(
      sorted[sorted.length - 1].start.dateTime ||
        sorted[sorted.length - 1].start.date ||
        ""
    );

    const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

    return {
      avgGap,
      lastGaps,
      nextPrediction,
    };
  },
};
