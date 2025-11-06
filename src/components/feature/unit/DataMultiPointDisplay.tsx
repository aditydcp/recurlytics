import { getAlterationClass } from "@/lib/ui/multiDisplay";
import { generateIndices } from "@/lib/ui/orderedListPrefixes";
import { cn } from "@/lib/ui/utils";
import type { DataMultiPointDisplayProps } from "@/types/DataDisplayType";
import { format } from "date-fns";

export default function DataMultiPointDisplay({
  dataPoints,
  description,
  showIndex = true,
  indexType = "text",
  indexUnit = "Gap",
  customIndices,
  decorator,
  className,
}: DataMultiPointDisplayProps) {
  const indices = customIndices || generateIndices(dataPoints.length, indexType, indexUnit)

  return (
    <div className="flex flex-col w-full">
      <table
        className={cn(
          "w-fit md:w-full border-separate border-spacing-y-3 border-spacing-x-1 lg:border-spacing-x-2 my-1",
          className,
        )}
      >
        <colgroup>
          {/* First column: fit content but capped at 1/3 */}
          <col className="w-[33%] md:w-[1%] md:max-w-[33%]" />
          {/* Second column: takes the remaining space (at least 1/3) */}
          <col className="w-[99%] md:min-w-[33%]" />
          {/* Third column: takes the remaining space */}
          <col className="w-[1%] md:w-[99%]" />
        </colgroup>
        <tbody>
          {dataPoints.map((point, index) => {
            let value: string | number | undefined;
            let textSize = "text-3xl";
            const alterationClass = getAlterationClass(point.meta);

            switch (point.type) {
              case "value":
                if (typeof point.value === "number") {
                  value = Number(point.value.toFixed(2));
                } else {
                  value = point.value;
                }
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
                      <span className={cn("text-sm font-normal", alterationClass)}>
                        {point.unit}
                      </span>
                    )}
                  </div>
                </td>
                {decorator && (
                  <td className="align-middle">
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