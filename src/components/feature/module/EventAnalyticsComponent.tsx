import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { differenceInDays, addDays, format } from "date-fns";
import { useMemo } from "react";
import DataDisplayCard from "@/components/common/DataDisplayCard";
import DataNumberDisplay from "@/components/feature/unit/DataNumberDisplay";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import { Label } from "@/components/ui/label";
import { CalendarSingleReadOnly } from "@/components/common/CalendarReadOnly";
import type { DataPoint } from "@/types/DataDisplayType";
import { EventTable } from "@/components/feature/unit/table/EventTableDefinitions";
import { useTemplate } from "@/contexts/TemplateContext";
import { runAnalytics } from "@/lib/analytics/analyticsRunner";

export default function EventAnalyticsComponent() {
  const {
    selectedCalendar,
    events,
    loading,
  } = useGoogleCalendar();

  // const { avgGap, lastGaps, nextPrediction } = useMemo(() => {
  //   if (!events || events.length < 2) {
  //     return { avgGap: null, lastGaps: [], nextPrediction: null };
  //   }

  //   // Normalize & sort events by start date
  //   const sorted = [...events].sort((a, b) => {
  //     const dateA = new Date(a.start.dateTime || a.start.date || "");
  //     const dateB = new Date(b.start.dateTime || b.start.date || "");
  //     return dateA.getTime() - dateB.getTime();
  //   });

  //   const gaps: Gap[] = [];
  //   for (let i = 1; i < sorted.length; i++) {
  //     const prev = new Date(sorted[i - 1].start.dateTime || sorted[i - 1].start.date || "");
  //     const curr = new Date(sorted[i].start.dateTime || sorted[i].start.date || "");
  //     gaps.push({
  //       from: prev,
  //       to: curr,
  //       gap: differenceInDays(curr, prev),
  //     });
  //   }

  //   const avgGap =
  //     gaps.reduce((a, b) => a + b.gap, 0) / (gaps.length || 1);

  //   // Take last 3 gap objects, reversed so most recent is first
  //   const lastGaps = gaps.slice(-3).reverse();

  //   const lastEventDate = new Date(
  //     sorted[sorted.length - 1].start.dateTime ||
  //     sorted[sorted.length - 1].start.date ||
  //     ""
  //   );
  //   const nextPrediction = addDays(lastEventDate, Math.round(avgGap));

  //   return { avgGap, lastGaps, nextPrediction };
  // }, [events]);

  const { currentTemplate } = useTemplate();

  const analyticsResults = useMemo(() => {
    if (!events || events.length < 2) return null;
    const results = runAnalytics(currentTemplate.id, events)
    console.log(results)
    return results;
  }, [currentTemplate.id, events]);

  const TemplateView = currentTemplate.view;

  return (
    <div className="w-full flex flex-col py-2">
      <Label className="text-xl font-semibold mb-4 ml-4">Event Analytics</Label>
      {loading ? (
        <p className="mx-6 my-4 text-sm text-muted-foreground">
          Loading events...
        </p>
      ) : !selectedCalendar ? (
        <p className="mx-6 my-4 text-sm text-muted-foreground">
          Please select a calendar
        </p>
      ) : !analyticsResults ? (
        <p className="mx-6 my-4 text-sm text-muted-foreground">
          Not enough events to analyze yet.
        </p>
      ) : TemplateView ? (
        <TemplateView events={events} analyticsResults={analyticsResults} />
      ) : (
        <p className="mx-6 my-4 text-sm text-muted-foreground">
          No template view available.
        </p>
      )}
    </div>
  )
}