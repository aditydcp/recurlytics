import LabelWithTooltipComponent from "@/components/common/LabelWithTooltipComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePreferences } from "@/contexts/preferences/PreferencesContext";
import { templateDefinitions } from "@/lib/templates/definitions";
import type { ThemeMode } from "@/types/PreferenceType";

export function PreferencesMenu({ }) {
  const { preferences, setPreferences } = usePreferences();

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
      </CardContent>
    </Card>
  );
}