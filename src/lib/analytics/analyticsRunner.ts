import { templateRegistry } from "@/lib/templates/templateRegistry";
import { analyticsModulesRegistry } from "@/lib/analytics/modules";
import type { Event } from "@/types/EventType";

export function runAnalytics(templateId: string, events: Event[]) {
  const template = templateRegistry[templateId];
  const results: Record<string, any> = {};

  template.analyticsModules.forEach(moduleId => {
    const module = analyticsModulesRegistry[moduleId];
    if (module) {
      results[moduleId] = module.compute(events, template.config);
    }
  });

  return results;
}