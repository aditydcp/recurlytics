import type {
  CycleDetail,
  PeriodAnalyticsResult,
} from "@/types/analytics/modules/period/PeriodType";
import { differenceInDays } from "date-fns";
import type { Gap as Cycle } from "@/types/analytics/modules/gap/GapType";
import { getLastCycles } from "./helper/cycle";
import { extractPhasesFromCycle } from "./helper/phaseExtract";
import { predictCycleLength, predictPeriodRange } from "./helper/predict";
import type { AnalyticsModule } from "@/types/analytics/AnalyticsType";
import { getGaps } from "@/lib/analytics/helpers/gaps";

export const periodModule: AnalyticsModule<PeriodAnalyticsResult> = {
  id: "period",

  compute(events, config) {
    if (!events || events.length < 2) {
      return {
        avgCycleLength: null,
        lastCycles: [],
        nextPrediction: null,
        predictionRange: [],
        currentCyclePhases: null,
      };
    }

    const { gaps: cycles } = getGaps(events);

    // fetch last cycles
    const lastCycles = getLastCycles(cycles);
    const cycleLengths = lastCycles.map((c) => differenceInDays(c.to, c.from));

    // calculate average cycle length and treat it as current cycle length
    const avgCycleLength = predictCycleLength(
      cycleLengths,
      config.avgCycleLength
    );

    // Generate the period date probability range
    const lastCycle = lastCycles[0];
    const predictionRange = predictPeriodRange(
      lastCycle.from,
      cycleLengths,
      config.avgCycleLength
    );

    // Populate each cycles with phases
    const lastCyclesDetailed: CycleDetail[] = lastCycles.map((cycle) => {
      const phase = extractPhasesFromCycle(cycle);
      return {
        ...cycle,
        phases: phase,
      };
    });

    // Get the date with the highest probability
    const nextPrediction = predictionRange.reduce((a, b) =>
      a.probability > b.probability ? a : b
    ).date;

    // Extract phases from the current cycle
    const currentCyclePhases = extractPhasesFromCycle({
      from: lastCycle.from,
      to: nextPrediction,
      gap: Math.round(avgCycleLength),
    });

    return {
      avgCycleLength,
      lastCycles: lastCyclesDetailed,
      nextPrediction,
      predictionRange,
      currentCyclePhases,
    };
  },
};
