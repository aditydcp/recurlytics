import DataDisplayCard from "@/components/common/DataDisplayCard";
import { EventTable } from "@/components/feature/unit/table/EventTableDefinitions";
import type { Event } from "@/types/EventType";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";
import { CalendarMultiRangeReadOnly } from "@/components/common/CalendarReadOnly";
import type { CycleDetail, PeriodAnalyticsResult, PhaseRange } from "@/types/analytics/modules/period/PeriodType";
import { capitalizeWords } from "@/lib/ui/string";
import { getPhaseIcon } from "@/lib/analytics/helpers/icons";

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
    // predictionRange,
    currentCycle,
    currentPhase,
  }: PeriodAnalyticsResult = analyticsResults.period;

  const lastCyclesSlice = lastCycles.slice(3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {/* 🗓️ Calendar Section */}
      <div className="order-1 md:col-span-2 md:order-2 xl:col-span-2 xl:order-3 flex flex-col gap-4 w-full">
        <DataDisplayCard
          title="Current Cycle"
          tooltip="Predictions are based on your recent cycles and average cycle length."
        >
          <div className="flex flex-col gap-3 w-full mt-2">
            {/* Header */}
            <div className="flex flex-wrap md:flex-nowrap gap-y-2">
              <div className="flex flex-col gap-1 items-start w-full">
                <div className="text-sm text-muted-foreground">Predicted Next Period</div>
                <div className="text-3xl font-semibold">
                  {format(nextPrediction!, "EEE, MMM d")}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-start w-full">
                <div className="text-sm text-muted-foreground">Predicted Cycle Length</div>
                <div className="text-3xl font-semibold">
                  {currentCycle?.gap} days
                </div>
              </div>
            </div>

            <div className="text-base">
              <span className="text-muted-foreground">You’re currently in:</span>{" "}
              <span className="font-semibold text-primary-foreground">{getPhaseIcon(currentPhase?.phase)} {capitalizeWords(currentPhase?.phase)} phase</span>
            </div>
            {/* Calendar below */}
            <CalendarMultiRangeReadOnly
              defaultValue={currentCycle?.phases.map((phase: PhaseRange) => ({
                from: phase.start,
                to: phase.end,
              }))}
              defaultMonth={currentCycle?.phases[0].start}
              numberOfMonths={2}
              className="w-full rounded-md border border-border mt-2"
              disableNavigation
              hideNavigation
              weekStartsOn={1}
              showOutsideDays={false}
            />
          </div>
        </DataDisplayCard>
      </div>

      {/* 📊 Average & Previous Cycles Section */}
      <div className="order-2 md:order-1 md:col-span-1 xl:order-2 xl:col-span-1 grid gap-4 w-full">
        <DataDisplayCard
          title="Average Cycle Length"
          tooltip="This is calculated based on the past cycles."
        >
          <DataNumberDisplay
            number={avgCycleLength?.toFixed(1) || "0"}
            unit="days"
            description="Average number of days for a cycle."
          />
        </DataDisplayCard>
        <DataDisplayCard
          title="Recent Cycles"
          tooltip="Your last few cycles."
        >
          <DataMultiPointDisplay
            dataPoints={lastCyclesSlice.map((cycle: CycleDetail) => {
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

      {/* 📅 Event Table Section */}
      <div className="order-3 md:order-3 md:col-span-1 xl:order-1 xl:col-span-1 flex flex-col gap-4 w-full">
        <EventTable events={events} />
      </div>
    </div>
  )
}