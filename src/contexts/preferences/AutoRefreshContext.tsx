import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePreferences } from "./PreferencesContext";
import type { AutoRefreshMode } from "@/types/PreferenceType";

interface AutoRefreshContextType {
  autoRefreshMode: AutoRefreshMode;
  setAutoRefreshMode: Dispatch<SetStateAction<AutoRefreshMode>>;
}

const AutoRefreshContext = createContext<AutoRefreshContextType | null>(null);

export const AutoRefreshProvider = ({ children }: { children: ReactNode }) => {
  const { preferences } = usePreferences();
  const [autoRefreshMode, setAutoRefreshMode] = useState(preferences.autoRefresh);

  return (
    <AutoRefreshContext.Provider value={{ autoRefreshMode, setAutoRefreshMode }}>
      {children}
    </AutoRefreshContext.Provider>
  );
};

export const useAutoRefresh = (): AutoRefreshContextType => {
  const context = useContext(AutoRefreshContext);
  if (!context) {
    throw new Error("useAutoRefresh must be used within an AutoRefreshProvider");
  }
  return context;
};