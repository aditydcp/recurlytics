import { templateDefinitions } from "./definitions";

export const templateRegistry = Object.fromEntries(
  templateDefinitions.map((t) => [t.id, t])
);
