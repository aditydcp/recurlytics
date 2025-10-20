import type {
  CycleDetail,
  PeriodAnalyticsResult,
} from "@/types/analytics/modules/period/PeriodType";
import type { Gap as Cycle } from "@/types/analytics/modules/gap/GapType";
import { differenceInDays, isWithinInterval } from "date-fns";
import { getLastCycles } from "./helper/cycle";
import { extractPhasesFromCycle } from "./helper/phaseExtract";
import { predictCycleLength, predictPeriodRange } from "./helper/predict";
import type { AnalyticsModule } from "@/types/analytics/AnalyticsType";
import { extractEventMetadata } from "@/lib/analytics/helpers/gaps";

export const periodModule: AnalyticsModule<PeriodAnalyticsResult> = {
  id: "period",

  compute(events, config) {
    if (!events || events.length < 2) {
      return {
        avgCycleLength: null,
        lastCycles: [],
        nextPrediction: null,
        predictionRange: [],
        currentCycle: null,
        currentPhase: null,
      };
    }

    const { gaps: cycles, lastEventDate: lastPeriodDate } =
      extractEventMetadata(events);

    // fetch last cycles
    const lastCycles = getLastCycles(cycles);
    const cycleLengths = lastCycles.map((c) => differenceInDays(c.to, c.from));

    // calculate average cycle length and treat it as current cycle length
    const avgCycleLength = predictCycleLength(
      cycleLengths,
      config.avgCycleLength
    );

    // Generate the period date probability range
    const predictionRange = predictPeriodRange(
      lastPeriodDate,
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

    // Form current cycle item
    const currentCycle: Cycle = {
      from: lastPeriodDate,
      to: nextPrediction,
      gap: differenceInDays(nextPrediction, lastPeriodDate),
    }

    // Extract phases from the current cycle
    const currentCyclePhases = extractPhasesFromCycle(currentCycle);

    // Get current phase
    const currentPhase = currentCyclePhases.find((phase) =>
      isWithinInterval(new Date(), { start: phase.start, end: phase.end })
    ) || null

    // Get current cycle detail
    const currentCycleDetail: CycleDetail = {
      phases: currentCyclePhases,
      ...currentCycle
    }

    return {
      avgCycleLength,
      lastCycles: lastCyclesDetailed,
      nextPrediction,
      predictionRange,
      currentCycle: currentCycleDetail,
      currentPhase,
    };
  },
};
