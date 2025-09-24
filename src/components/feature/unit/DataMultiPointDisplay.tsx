interface DataPoint {
  value: string;
  unit?: string;
  description?: string;
}

interface DataMultiPointDisplayProps {
  dataPoints: DataPoint[];
  description?: string;
  showIndex?: boolean;
  indexType?: "number" | "text" | "ordinal";
}

export default function DataMultiPointDisplay({
  dataPoints,
  description,
  showIndex = true,
  indexType = "text",
}: DataMultiPointDisplayProps) {
  const indices = {
    number: [1, 2, 3],
    text: ["Previous Gap", "2nd Last Gap", "3rd Last Gap"],
    ordinal: ["1st", "2nd", "3rd"],
  }[indexType];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[fit-content(33%)_minmax(66%,1fr)] gap-y-2 items-center py-2">
        {dataPoints.map((point, index) => (
          <>
            {showIndex && (
              <span
                key={`idx-${index}`}
                className="text-xs font-normal text-muted-foreground mr-3"
              >
                {indices[index]}
              </span>
            )}
            <div
              key={`val-${index}`}
              className="flex items-baseline min-w-0"
            >
              <span className="text-3xl font-semibold">
                {point.value || "N/A"}
              </span>
              {point.unit && point.value && (
                <span className="text-sm font-normal ml-1.5">{point.unit}</span>
              )}
            </div>
          </>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
}