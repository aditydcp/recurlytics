import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePreferences } from "@/contexts/preferences/PreferencesContext";
import type { ThemeMode } from "@/types/PreferenceType";

export function PreferencesMenu({ }) {
  const { preferences, setPreferences } = usePreferences();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <Label className="text-sm font-medium leading-none">Light/Dark Mode</Label>
          <Select
            value={preferences.themeMode}
            onValueChange={(value: ThemeMode) => setPreferences({ themeMode: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Light/Dark Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">Use system's default</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}