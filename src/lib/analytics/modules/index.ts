import { gapModule } from "./gap";
import type { AnalyticsModule } from "@/types/analytics/AnalyticsType";
import { periodModule } from "./period/period";

export const analyticsModulesRegistry: Record<string, AnalyticsModule<any>> = {
  gap: gapModule,
  period: periodModule,
};