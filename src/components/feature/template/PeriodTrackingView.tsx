import DataDisplayCard from "@/components/common/DataDisplayCard";
import { EventTable } from "@/components/feature/unit/table/EventTableDefinitions";
import type { Event } from "@/types/EventType";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";
import { CalendarSingleReadOnly } from "@/components/common/CalendarReadOnly";
import type { Gap } from "@/types/analytics/modules/gap/GapType";
import type { CycleDetail } from "@/types/analytics/modules/period/PeriodType";

export const PeriodTrackingView = ({
  events,
  analyticsResults
}: {
  events: Event[],
  analyticsResults: Record<string, any>
}) => {
  const {
    avgCycleLength,
    lastCycles,
    nextPrediction,
    predictionRange,
    currentCyclePhases
  } = analyticsResults.period;

  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      <div className="grid gap-4 w-full order-3 md:order-1">
        <EventTable events={events} />
      </div>
      <div className="grid gap-4 w-full order-2 md:order-2">
        <DataDisplayCard
          title="Average Cycle Length"
          tooltip="This is calculated based on the past cycles."
        >
          <DataNumberDisplay
            number={avgCycleLength.toFixed(1)}
            unit="days"
            description="Average number of days for a cycle."
          />
        </DataDisplayCard>
        <DataDisplayCard
          title="Recent Cycles"
          tooltip="Your last few cycles."
        >
          <DataMultiPointDisplay
            dataPoints={lastCycles.map((cycle: CycleDetail) => {
              if (cycle) return {
                type: "dateGap",
                from: cycle.from,
                to: cycle.to,
                gap: cycle.gap,
                unit: "days",
                showCalendar: true
              } as DataPoint;
              return {
                type: "value",
                value: "N/A"
              };
            })}
            description="Cycle length on the last few cycles."
            showIndex={true}
            indexType="text"
            indexUnit="Cycle"
          />
        </DataDisplayCard>
      </div>
      <div className="grid gap-4 w-full order-1 md:order-3">
        <DataDisplayCard
          title="Next Period"
          tooltip="Predictions are based on your recent cycles and average cycle length."
        >
          <div className="flex flex-col gap-1">
            <DataNumberDisplay
              number={format(nextPrediction!, "PPP")}
              numberTextSize="4xl"
            />
            <CalendarSingleReadOnly
              defaultValue={nextPrediction!}
              defaultMonth={nextPrediction!}
              className="w-full rounded-md border border-border"
              disableNavigation={true}
              hideNavigation={true}
              weekStartsOn={1}
            />
          </div>
        </DataDisplayCard>
      </div>
    </div>
  )
}