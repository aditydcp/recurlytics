import type { MetaTopic } from "@/types/DataDisplayType";

export function getAlterationClass(meta?: MetaTopic): string | undefined {
  if (!meta) return;
  for (const key of Object.keys(meta)) {
    const topic = meta[key];
    if (topic.alteration?.condition) {
      return topic.alteration.className;
    }
  }
}