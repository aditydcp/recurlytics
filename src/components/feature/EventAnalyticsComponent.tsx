import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays, addDays, format } from "date-fns";
import { useMemo } from "react";

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
    const lastGaps = gaps.slice(-3);
    const lastEventDate = new Date(sorted[sorted.length - 1].start.dateTime || sorted[sorted.length - 1].start.date || "");
    const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

    return { avgGap, lastGaps, nextPrediction };
  }, [events]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className="flex">
        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : !selectedCalendar ? (
          <p className="text-muted-foreground">Please select a calendar</p>
        ) : avgGap ? (
          <>
            <p>
              <strong>Average Gap:</strong> {avgGap.toFixed(1)} days
            </p>
            <p>
              <strong>Last 3 Gaps:</strong>{" "}
              {lastGaps.length > 0 ? lastGaps.join(", ") + " days" : "N/A"}
            </p>
            <p>
              <strong>Next Event Prediction:</strong>{" "}
              {format(nextPrediction!, "PPP")}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">Not enough events to analyze yet.</p>
        )}
      </CardContent>
    </Card>
  )
}