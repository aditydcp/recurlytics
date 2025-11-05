export interface DataPointSingleValue {
  type: "value";
  value: string | number;
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

export type MetaTopic = Record<
  string,
  {
    alteration?: {
      condition: boolean;
      className?: string;
    };
    [key: string]: any;
  }
>;

export type DataPoint = (DataPointSingleValue | DataPointSingleDateValue | DataPointDateGapValue) & {
  unit?: string;
  description?: string;
  meta?: MetaTopic;
};

export interface DataMultiPointDisplayProps {
  dataPoints: DataPoint[];
  description?: string;
  showIndex?: boolean;
  indexType?: "number" | "text" | "ordinal";
  indexUnit?: string;
  customIndices?: string[];
  decorator?: (
    dataPoint: DataPoint,
    value: string | number | undefined,
    index: number,
    indexLabel: string,
    showIndex: boolean
  ) => React.ReactNode;
  className?: string;
}