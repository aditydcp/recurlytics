import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { differenceInDays, addDays, format } from "date-fns";
import { useMemo } from "react";
import DataDisplayCard from "@/components/common/DataDisplayCard";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "../unit/DataMultiPointDisplay";
import { Label } from "@/components/ui/label";

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

    const gaps: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].start.dateTime || sorted[i - 1].start.date || "");
      const curr = new Date(sorted[i].start.dateTime || sorted[i].start.date || "");
      gaps.push(differenceInDays(curr, prev));
    }

    const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const lastGaps = gaps.slice(-3).reverse();
    const lastEventDate = new Date(sorted[sorted.length - 1].start.dateTime || sorted[sorted.length - 1].start.date || "");
    const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

    return { avgGap, lastGaps, nextPrediction };
  }, [events]);

  return (
    <div className="w-full flex flex-col py-2">
      <Label className="text-xl font-semibold mb-4 ml-4">Event Analytics</Label>
      <div className="w-full flex flex-col gap-4">
        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : !selectedCalendar ? (
          <p className="text-muted-foreground">Please select a calendar</p>
        ) : avgGap ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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
                  if (gap) return { value: gap.toString(), unit: "days" };
                  return { value: "N/A" };
                })}
                description="Gaps (in days) between your last few events."
                showIndex={true}
                indexType="text"
              />
            </DataDisplayCard>
            <DataDisplayCard
              title="Next Event"
              tooltip="Based on your average event gap, this is when your next event is likely to occur."
            >
              <DataNumberDisplay
                number={format(nextPrediction!, "PPP")}
              />
            </DataDisplayCard>
          </div>
        ) : (
          <p className="text-muted-foreground">Not enough events to analyze yet.</p>
        )}
      </div>
    </div>
  )
}