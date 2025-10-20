import { DefaultView } from "@/components/feature/template/DefaultView";
import type { TemplateDefinition } from "@/types/TemplateType";

export const DefaultTemplate: TemplateDefinition = {
  id: "default",
  name: "Default",
  description: "Basic event gap analytics.",
  analyticsModules: ["gap"],
  view: DefaultView,
};