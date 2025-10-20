import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { useTemplate } from "@/contexts/preferences/TemplateContext";
import { runAnalytics } from "@/lib/analytics/analyticsRunner";

export default function EventAnalyticsComponent() {
  const {
    selectedCalendar,
    events,
    loading,
  } = useGoogleCalendar();

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