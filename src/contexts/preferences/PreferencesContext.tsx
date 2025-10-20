import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Preferences } from "@/types/PreferenceType";
import { ThemeModeProvider } from "@/contexts/preferences/ThemeModeContext";
import { TemplateProvider } from "@/contexts/preferences/TemplateContext";

const defaultPreferences: Preferences = {
  themeMode: "system",
  defaultTemplate: "default",
};

type PreferencesContextType = {
  preferences: Preferences;
  setPreferences: (update: Partial<Preferences>) => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferencesState] = useState<Preferences>(() => {
    const stored = localStorage.getItem("preferences");
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  const setPreferences = (update: Partial<Preferences>) => {
    setPreferencesState(prev => ({ ...prev, ...update }));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      <TemplateProvider>
        <ThemeModeProvider>
          {children}
        </ThemeModeProvider>
      </TemplateProvider>
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
};