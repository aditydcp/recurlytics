export interface DataPointSingleValue {
  type: "value";
  value: string;
}

export interface DataPointDate {
  showCalendar?: boolean;
}

export interface DataPointSingleDateValue extends DataPointDate {
  type: "date";
  date: Date;
}

export interface DataPointDateGapValue extends DataPointDate {
  type: "dateGap";
  from: Date;
  to: Date;
  gap: number;
}

export type DataPoint = (DataPointSingleValue | DataPointSingleDateValue | DataPointDateGapValue) & {
  unit?: string;
  description?: string;
};