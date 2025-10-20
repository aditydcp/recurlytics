export type ThemeMode = "light" | "dark" | "system";

export interface Preferences {
  themeMode: ThemeMode;
  defaultTemplate: string;
}