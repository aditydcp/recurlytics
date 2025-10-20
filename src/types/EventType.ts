export interface EventDateTime {
  dateTime?: string;
  date?: string
}

export interface Event {
  id: string;
  summary: string;
  start: EventDateTime;
}