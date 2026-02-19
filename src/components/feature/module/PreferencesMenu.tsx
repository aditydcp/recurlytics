import LabelWithTooltipComponent from "@/components/common/LabelWithTooltipComponent";
import { LoadingButton } from "@/components/common/LoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGoogleCalendar } from "@/contexts/GoogleCalendarContext";
import { usePreferences } from "@/contexts/preferences/PreferencesContext";
import { templateDefinitions } from "@/lib/templates/definitions";
import type { AutoRefreshMode, ThemeMode } from "@/types/PreferenceType";

export function PreferencesMenu({ }) {
  const { preferences, setPreferences } = usePreferences();
  const {
    loading,
    fetchCalendars,
    fetchEvents,
  } = useGoogleCalendar();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-2">
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between space-x-4">
          <LabelWithTooltipComponent
            label={"Light/Dark Mode"}
          />
          <Select
            value={preferences.themeMode}
            onValueChange={(value: ThemeMode) => setPreferences({ themeMode: value })}
          >
            <SelectTrigger className="w-full md:w-[10rem] gap-2">
              <SelectValue placeholder="Light/Dark Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between space-x-4">
          <LabelWithTooltipComponent
            label={"Default Template"}
            tooltip={"The template to be used upon opening the app."}
          />
          <Select
            value={preferences.defaultTemplate}
            onValueChange={(value: string) => setPreferences({ defaultTemplate: value })}
          >
            <SelectTrigger className="w-full md:w-[10rem] gap-2">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              {templateDefinitions.map((template) => {
                return (
                  <SelectItem
                    key={template.id}
                    value={template.id}
                  >
                    {template.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between space-x-4">
          <LabelWithTooltipComponent
            label={"Refresh Calendars"}
            tooltip={"Refresh the list of calendars."}
          />
          <LoadingButton
            variant={"outline"}
            loading={loading}
            loadingPosition="start"
            onClick={() => { fetchCalendars() }}
          >
            Refresh
          </LoadingButton>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between space-x-4">
          <LabelWithTooltipComponent
            label={"Refresh Events"}
            tooltip={"Refresh the list of events on this calendar."}
          />
          <LoadingButton
            variant={"outline"}
            loading={loading}
            loadingPosition="start"
            onClick={() => { fetchEvents() }}
          >
            Refresh
          </LoadingButton>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between space-x-4">
          <LabelWithTooltipComponent
            label={"Automatic Refresh"}
            tooltip={"Allow the app to refresh the list of events automatically."}
          />
          <Select
            value={preferences.autoRefresh}
            onValueChange={(value: AutoRefreshMode) => setPreferences({ autoRefresh: value })}
          >
            <SelectTrigger className="w-full md:w-[10rem] gap-2">
              <SelectValue placeholder="Auto Refresh" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="weekly-monday">At the start of the week</SelectItem>
              <SelectItem value="monthly">At the start of the month</SelectItem>
              {/* <SelectItem value="always">Always</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}