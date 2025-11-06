import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { useTemplate } from "@/contexts/preferences/TemplateContext";
import { runAnalytics } from "@/lib/analytics/analyticsRunner";
import { Separator } from "@/components/ui/separator";
import { formatCompleteDate } from "@/lib/ui/date";

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
    return results;
  }, [currentTemplate.id, events]);

  const TemplateView = currentTemplate.view;

  return (
    <div className="w-full flex flex-col py-2">
      <div className="flex flex-col mb-3 mx-3 md:mx-4">
        <div className="flex flex-row items-center justify-between">
          <Label className="text-xl font-semibold">Event Analytics</Label>
          <Separator orientation="horizontal" className="flex-1 hidden md:block mx-6" />
          <Label className="text-xl font-normal text-muted-foreground text-right">{currentTemplate.name}</Label>
        </div>
        <Label className="text-md font-normal text-muted-foreground">{formatCompleteDate(new Date())}</Label>
      </div>
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