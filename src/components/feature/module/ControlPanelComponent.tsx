import Combobox from "@/components/common/Combobox";
import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTemplate } from "@/contexts/preferences/TemplateContext";
import { templateDefinitions } from "@/lib/templates/definitions";
import { Field, FieldLabel } from "@/components/ui/field";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

export default function ControlPanelComponent() {
  const {
    calendars,
    selectedCalendar,
    selectCalendarAndFetch,
    fetchEvents,
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
          <div className="flex items-center gap-1">
            <Combobox
              options={calendars.map((calendar) => ({
                label: calendar.summary,
                value: calendar.id,
              }))}
              placeholderText={"Select calendar..."}
              loading={loading}
              showLoading={false}
              defaultValue={selectedCalendar || ""}
              onValueSet={(value) => selectCalendarAndFetch(value)}
            />
            <Button
              size="icon"
              variant="outline"
              disabled={loading}
              onClick={fetchEvents}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            {(loading) && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
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