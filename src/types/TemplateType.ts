import type { Event } from "@/types/EventType";

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  analyticsModules: string[];
  config?: any;
  view?: React.FC<{ events: Event[]; analyticsResults: Record<string, any> }>;
};