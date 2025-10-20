import DataDisplayCard from "@/components/common/DataDisplayCard";
import { EventTable } from "@/components/feature/unit/table/EventTableDefinitions";
import type { Event } from "@/types/EventType";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";
import { CalendarSingleReadOnly } from "@/components/common/CalendarReadOnly";
import type { Gap } from "@/types/analytics/modules/gap/GapType";

export const DefaultView = ({
  events,
  analyticsResults
}: {
  events: Event[],
  analyticsResults: Record<string, any>
}) => {
  const { avgGap, lastGaps, nextPrediction } = analyticsResults.gap;

  return (
    <div className="grid md:grid-cols-3 gap-4 w-full">
      <div className="flex flex-col gap-4 w-full order-3 md:order-1">
        <EventTable events={events} />
      </div>
      <div className="flex flex-col gap-4 w-full order-2 md:order-2">
        <DataDisplayCard
          title="Average Gap"
          tooltip="This is calculated based on the gaps between your past events."
        >
          <DataNumberDisplay
            number={avgGap.toFixed(1)}
            unit="days"
            description="Average number of days between recurring events."
          />
        </DataDisplayCard>
        <DataDisplayCard
          title="Recent Gaps"
          tooltip="The gaps (in days) between your last few events."
        >
          <DataMultiPointDisplay
            dataPoints={lastGaps.map((gap: Gap) => {
              if (gap) return {
                type: "dateGap",
                from: gap.from,
                to: gap.to,
                gap: gap.gap,
                unit: "days",
                showCalendar: true
              } as DataPoint;
              return {
                type: "value",
                value: "N/A"
              };
            })}
            description="Gaps (in days) between your last few events."
            showIndex={true}
            indexType="text"
          />
        </DataDisplayCard>
      </div>
      <div className="flex flex-col gap-4 w-full order-1 md:order-3">
        <DataDisplayCard
          title="Next Event"
          tooltip="Based on your average event gap, this is when your next event is likely to occur."
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
  );
};