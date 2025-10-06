import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { differenceInDays, addDays, format } from "date-fns";
import { useMemo } from "react";
import DataDisplayCard from "@/components/common/DataDisplayCard";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import { Label } from "@/components/ui/label";
import { EventColumns } from "@/types/EventType";
import { DataTable } from "@/components/common/DataTable";
import { CalendarSingleReadOnly } from "@/components/common/CalendarReadOnly";
import type { DataPoint } from "@/types/DataDisplayType";
import type { Gap } from "@/types/CalendarType";

export default function EventAnalyticsComponent() {
  const {
    selectedCalendar,
    events,
    loading,
  } = useGoogleCalendar();

  const { avgGap, lastGaps, nextPrediction } = useMemo(() => {
    if (!events || events.length < 2) {
      return { avgGap: null, lastGaps: [], nextPrediction: null };
    }

    // Normalize & sort events by start date
    const sorted = [...events].sort((a, b) => {
      const dateA = new Date(a.start.dateTime || a.start.date || "");
      const dateB = new Date(b.start.dateTime || b.start.date || "");
      return dateA.getTime() - dateB.getTime();
    });

    const gaps: Gap[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].start.dateTime || sorted[i - 1].start.date || "");
      const curr = new Date(sorted[i].start.dateTime || sorted[i].start.date || "");
      gaps.push({
        from: prev,
        to: curr,
        gap: differenceInDays(curr, prev),
      });
    }

    const avgGap =
      gaps.reduce((a, b) => a + b.gap, 0) / (gaps.length || 1);

    // Take last 3 gap objects, reversed so most recent is first
    const lastGaps = gaps.slice(-3).reverse();

    const lastEventDate = new Date(
      sorted[sorted.length - 1].start.dateTime ||
      sorted[sorted.length - 1].start.date ||
      ""
    );
    const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

    return { avgGap, lastGaps, nextPrediction };
  }, [events]);

  return (
    <div className="w-full flex flex-col py-2">
      <Label className="text-xl font-semibold mb-4 ml-4">Event Analytics</Label>
      {loading ? (
        <p className="mx-6 my-4 text-sm text-muted-foreground">Loading events...</p>
      ) : !selectedCalendar ? (
        <p className="mx-6 my-4 text-sm text-muted-foreground">Please select a calendar</p>
      ) : avgGap ? (
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <div className="grid gap-4 w-full order-3 md:order-1">
            <DataTable
              className="h-fit"
              columns={EventColumns}
              data={events}
              defaultSortingState={[{ id: 'start', desc: true }]}
            />
          </div>
          <div className="grid gap-4 w-full order-2 md:order-2">
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
                dataPoints={lastGaps.map((gap) => {
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
          <div className="grid gap-4 w-full order-1 md:order-3">
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
      ) : (
        <p className="mx-6 my-4 text-sm text-muted-foreground">Not enough events to analyze yet.</p>
      )}
    </div>
  )
}