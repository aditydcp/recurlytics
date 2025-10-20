import Combobox from "@/components/common/Combobox";
import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTemplate } from "@/contexts/preferences/TemplateContext";
import { templateDefinitions } from "@/lib/templates/definitions";
import { Field, FieldLabel } from "@/components/ui/field";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { Label } from "@/components/ui/label";

export default function ControlPanelComponent() {
  const {
    calendars,
    selectedCalendar,
    selectCalendarAndFetch,
    loading,
  } = useGoogleCalendar();

  const { templateId, setTemplateId } = useTemplate();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Control Panel</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4">
        <Field className="w-fit">
          <FieldLabel className="flex items-center">
            <Label className="font-semibold">Calendar</Label>
            <InfoTooltip>Google Calendar which events will be analyzed</InfoTooltip>
          </FieldLabel>
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
        </Field>
        <Field className="w-fit">
          <FieldLabel className="flex items-center">
            <Label className="font-semibold">Template</Label>
            <InfoTooltip>Assumption and calculation method for analysis</InfoTooltip>
          </FieldLabel>
          <Combobox
            options={templateDefinitions.map((template) => ({
              label: template.name,
              value: template.id,
            }))}
            placeholderText={"Select a template"}
            loading={loading}
            defaultValue={templateId || ""}
            onValueSet={(value) => setTemplateId(value)}
          />
        </Field>
      </CardContent>
    </Card>
  );
}