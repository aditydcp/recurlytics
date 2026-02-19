export type ThemeMode = "light" | "dark" | "system";
export type AutoRefreshMode = "never" | "weekly-monday" | "weekly-sunday" | "monthly" | "always";

export interface Preferences {
  themeMode: ThemeMode;
  defaultTemplate: string;
  autoRefresh: AutoRefreshMode;
}

export interface LimitedTimeData<T> {
  iat: number;
  data: T;
}