import Combobox from "@/components/common/Combobox";
import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ControlPanelComponent() {
  const {
    calendars,
    selectedCalendar,
    selectCalendarAndFetch,
    loading,
  } = useGoogleCalendar();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Control Panel</CardTitle>
      </CardHeader>
      <CardContent className="flex">
        <Combobox
          options={calendars.map((calendar) => ({
            label: calendar.summary,
            value: calendar.id,
          }))}
          placeholderText={"Select calendar..."}
          loading={loading}
          defaultValue={selectedCalendar || ""}
          onValueSet={(value) => selectCalendarAndFetch(value)}
        />
      </CardContent>
    </Card>
  );
}