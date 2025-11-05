import DataDisplayCard from "@/components/common/DataDisplayCard";
import { EventTable } from "@/components/feature/unit/table/EventTableDefinitions";
import type { Event } from "@/types/EventType";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";
import { CalendarMultiRangeReadOnly, CalendarRangeReadOnly } from "@/components/common/CalendarReadOnly";
import type { CycleDetail, PeriodAnalyticsResult, PhaseRange } from "@/types/analytics/modules/period/PeriodType";
import { capitalizeWords } from "@/lib/ui/string";
import { getPhaseIcon } from "@/lib/analytics/helpers/icons";
import { Calendar } from "lucide-react";
import { DataDetailContent, DataDetailDecorator, DataDetailDisplay, DataDetailHeader, DataDetailTitle, intersperseWithSeparator } from "@/components/common/DataDetailDisplay";
import { DateRangeLabel } from "@/components/common/DateRangeLabel";
import { cn } from "@/lib/ui/utils";
import { CardTooltip, CardTooltipContent, CardTooltipTrigger } from "@/components/common/CardTooltip";
import { DataMultiPointSwitchDisplay } from "@/components/feature/unit/DataMultiPointSwitchDisplay";

export const PeriodTrackingView = ({
  events,
  analyticsResults
}: {
  events: Event[],
  analyticsResults: Record<string, any>
}) => {
  const {
    cycleLengthStats,
    avgCycleLength,
    lastCycles,
    nextPrediction,
    // predictionRange,
    currentCycle,
    currentPhase,
  }: PeriodAnalyticsResult = analyticsResults.period;

  const lastCyclesSlice = lastCycles.slice(0, 3)

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
                showCalendar: true,
                meta: {
                  lengthAnalysis: {
                    isNormal: cycle.isLengthNormal,
                    alteration: {
                      condition: !cycle.isLengthNormal,
                      className: "text-destructive",
                    }
                  }
                }
              } as DataPoint;
              return {
                type: "value",
                value: "N/A"
              };
            })}
            decorator={(point, _v, _i, indexLabel, showIndex) => {
              if (point.type !== "dateGap") return null;
              const isLengthNormal = point.meta?.lengthAnalysis.isNormal as boolean | undefined;

              const items = [
                showIndex && <span key="index">{indexLabel}</span>,
                <span key="gap">{point.gap} days</span>,
                <span className={cn(!isLengthNormal && "text-destructive")}>
                  {isLengthNormal ? "Regular Length" : "Irregular Length"}
                </span>,
              ];

              return (
                <>
                  <CardTooltip popupTitle={"Cycle Details"}>
                    <CardTooltipTrigger>
                      <Calendar
                        className={"opacity-50 w-4 h-4 hover:text-primary hover:bg-accent cursor-pointer"}
                      />
                    </CardTooltipTrigger>
                    <CardTooltipContent>
                      <DataDetailDisplay>
                        <DataDetailHeader>
                          <DataDetailDecorator className="text-sm font-normal text-muted-foreground">
                            {intersperseWithSeparator(items)}
                          </DataDetailDecorator>
                          <DataDetailTitle>
                            <DateRangeLabel from={point.from} to={point.to} />
                          </DataDetailTitle>
                        </DataDetailHeader>
                        <DataDetailContent asChild>
                          <CalendarRangeReadOnly
                            defaultValue={{ from: point.from, to: point.to }}
                            defaultMonth={point.from}
                            className="w-full md:min-w-[24rem] rounded-md border border-border bg-card"
                            disableNavigation
                            hideNavigation
                            weekStartsOn={1}
                            numberOfMonths={2}
                          />
                        </DataDetailContent>
                      </DataDetailDisplay>
                    </CardTooltipContent>
                  </CardTooltip>
                </>
              )
            }}
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
        <DataDisplayCard
          title="Cycle Statistics"
          tooltip="Statistics about your cycle lengths over different periods."
        >
          <DataMultiPointSwitchDisplay
            data={cycleLengthStats}
            showIndex={true}
            className="border-spacing-y-0 lg:border-spacing-y-1 mb-2 mt-0 w-full"
            customIndices={["Average", "Minimum", "Maximum", "Count"]}
          />
        </DataDisplayCard>
      </div>
    </div>
  )
}