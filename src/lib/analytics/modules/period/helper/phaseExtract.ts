import type { Gap as Cycle } from "@/types/analytics/modules/gap/GapType";
import type { PhaseRange } from "@/types/analytics/modules/period/PeriodType";
import { addDays, differenceInDays } from "date-fns";

/**
 * Extracts menstrual phases within a given cycle (start–end).
 * Simplified model:
 *  - Menstrual: days 1–5
 *  - Follicular: until 5 days before ovulation
 *  - Ovulation: 1 day, ~14 days before next period
 *  - Luteal: remainder
 */
export function extractPhasesFromCycle(cycle: Cycle): PhaseRange[] {
  const cycleLength = differenceInDays(cycle.to, cycle.from);
  const menstrualLength = 5;
  const lutealLength = 14;
  const ovulationDay = cycleLength - lutealLength;

  const phases: PhaseRange[] = [];

  // Menstrual phase
  phases.push({
    phase: "menstrual",
    start: cycle.from,
    end: addDays(cycle.from, menstrualLength - 1),
  });

  // Follicular phase
  phases.push({
    phase: "follicular",
    start: addDays(cycle.from, menstrualLength),
    end: addDays(cycle.from, ovulationDay - 1),
  });

  // Ovulation phase
  phases.push({
    phase: "ovulation",
    start: addDays(cycle.from, ovulationDay),
    end: addDays(cycle.from, ovulationDay),
  });

  // Luteal phase
  phases.push({
    phase: "luteal",
    start: addDays(cycle.from, ovulationDay + 1),
    end: cycle.to,
  });

  return phases;
}