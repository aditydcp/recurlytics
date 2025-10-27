import { getAlterationClass } from "@/lib/ui/multiDisplay";
import { generateIndices } from "@/lib/ui/orderedListPrefixes";
import { cn } from "@/lib/ui/utils";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";

interface DataMultiPointDisplayProps {
  dataPoints: DataPoint[];
  description?: string;
  showIndex?: boolean;
  indexType?: "number" | "text" | "ordinal";
  indexUnit?: string;
  decorator?: (
    dataPoint: DataPoint,
    value: string | number | undefined,
    index: number,
    indexLabel: string,
    showIndex: boolean
  ) => React.ReactNode;
}

export default function DataMultiPointDisplay({
  dataPoints,
  description,
  showIndex = true,
  indexType = "text",
  indexUnit = "Gap",
  decorator,
}: DataMultiPointDisplayProps) {
  const indices = generateIndices(dataPoints.length, indexType, indexUnit)

  return (
    <div className="flex flex-col">
      <table className="w-fit md:w-full border-separate border-spacing-y-3 border-spacing-x-1 lg:border-spacing-x-2 my-1">
        <colgroup>
          {/* First column: fit content but capped at 1/3 */}
          <col className="md:w-[1%] md:max-w-[33%]" />
          {/* Second column: takes the remaining space (at least 1/3) */}
          <col className="md:w-[99%] md:min-w-[33%]" />
          {/* Third column: takes the remaining space*/}
          <col className="md:w-[99%]" />
        </colgroup>
        <tbody>
          {dataPoints.map((point, index) => {
            let value: string | number | undefined;
            let textSize = "text-3xl";
            const alterationClass = getAlterationClass(point.meta);

            switch (point.type) {
              case "value":
                value = point.value;
                break;
              case "dateGap":
                value = point.gap;
                break;
              case "date":
                value = format(point.date!, "PPP");
                textSize = "text-2xl";
                break;
              default:
                value = undefined;
            }

            return (
              <tr key={index}>
                {showIndex && (
                  <td className="align-middle pr-3 text-xs font-normal text-muted-foreground">
                    {indices[index]}
                  </td>
                )}
                <td className="align-middle">
                  <div className="flex items-baseline min-w-0 lg:ml-1 gap-x-2">
                    <span className={cn(textSize, "font-semibold", alterationClass)}>
                      {value || "N/A"}
                    </span>
                    {point.unit && value && (
                      <span className={cn("text-sm font-normal", alterationClass)}>{point.unit}</span>
                    )}
                  </div>
                </td>
                {decorator && (
                  <td className="align-middle hidden md:table-cell">
                    {decorator(point, value, index, indices[index], showIndex)}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
}