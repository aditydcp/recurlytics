import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePreferences } from "./PreferencesContext";

type ThemeMode = "light" | "dark";
type ThemeModeContextType = { themeMode: ThemeMode };

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

function getSystemThemeMode(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const { preferences } = usePreferences();
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getSystemThemeMode());

  // Determine actual thememode to apply based on preferences
  useEffect(() => {
    let activeThemeMode: ThemeMode;

    if (preferences.themeMode === "system") {
      activeThemeMode = getSystemThemeMode();
    } else {
      activeThemeMode = preferences.themeMode;
    }

    setThemeMode(activeThemeMode);
  }, [preferences.themeMode]);

  // Apply thememode to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  // Watch system thememode only if user chose "system"
  useEffect(() => {
    if (preferences.themeMode !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setThemeMode(getSystemThemeMode());
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [preferences.themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
};