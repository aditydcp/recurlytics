export type AnalyticsModule<T> = {
  id: string;
  compute: (events: any[], config: any) => T;
};
