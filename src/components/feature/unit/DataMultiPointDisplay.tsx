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
      <table className="w-full border-separate border-spacing-y-3 border-spacing-x-1 my-1">
        <colgroup>
          {/* First column: fit content but capped at 1/3 */}
          <col className="w-[1%] max-w-[33%]" />
          {/* Second column: takes the remaining space (at least 2/3) */}
          <col className="w-[99%]" />
        </colgroup>
        <tbody>
          {dataPoints.map((point, index) => (
            <tr key={index} className="gap-2">
              {showIndex && (
                <td className="align-middle pr-3 text-xs font-normal text-muted-foreground">
                  {indices[index]}
                </td>
              )}
              <td className="align-middle">
                <div className="flex items-baseline min-w-0">
                  <span className="text-3xl font-semibold">
                    {point.value || "N/A"}
                  </span>
                  {point.unit && point.value && (
                    <span className="text-sm font-normal ml-1.5">{point.unit}</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
}