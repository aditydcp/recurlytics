import type { TemplateDefinition } from "@/types/TemplateType";

export class TemplateEntity {
  definition: TemplateDefinition;

  constructor(definition: TemplateDefinition) {
    this.definition = definition;
  }

  get id() { return this.definition.id; }
  get modules() { return this.definition.analyticsModules; }
  get config() { return this.definition.config; }
  get view() { return this.definition.view; }
}