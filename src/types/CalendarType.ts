export interface Calendar {
  id: string;
  summary: string;
  timeZone: string;
  description?: string;
  backgroundColor?: string;
}

export type Gap = { from: Date; to: Date; gap: number };