import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TemplateDefinition } from "@/types/TemplateType";
import { templateRegistry } from "@/lib/templates/templateRegistry";
import { usePreferences } from "./PreferencesContext";

interface TemplateContextType {
  templateId: string;
  currentTemplate: TemplateDefinition;
  setTemplateId: Dispatch<SetStateAction<string>>;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const { preferences } = usePreferences();
  const [templateId, setTemplateId] = useState(preferences.defaultTemplate);
  const currentTemplate = templateRegistry[templateId];

  return (
    <TemplateContext.Provider value={{ templateId, currentTemplate, setTemplateId }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};