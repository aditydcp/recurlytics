import { CalendarRangeReadOnly, CalendarSingleReadOnly } from "@/components/common/CalendarReadOnly";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { generateIndices } from "@/lib/ui/orderedListPrefixes";
import type { DataPoint } from "@/types/DataDisplayType";
import { format } from "date-fns";
import { Info } from "lucide-react";

interface DataMultiPointDisplayProps {
  dataPoints: DataPoint[];
  description?: string;
  showIndex?: boolean;
  indexType?: "number" | "text" | "ordinal";
  indexUnit?: string;
}

export default function DataMultiPointDisplay({
  dataPoints,
  description,
  showIndex = true,
  indexType = "text",
  indexUnit = "Gap",
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
                    <span className={`${textSize} font-semibold`}>
                      {value || "N/A"}
                    </span>
                    {point.unit && value && (
                      <span className="text-sm font-normal">{point.unit}</span>
                    )}
                  </div>
                </td>
                {(point.type === "dateGap" || point.type === "date") && point.showCalendar && (
                  <td className="align-middle hidden md:table-cell">
                    <HoverCard>
                      <HoverCardTrigger className="lg:ml-4 my-auto flex">
                        <Info
                          className={"opacity-50 w-4 h-4 hover:text-primary hover:bg-accent rounded-full cursor-pointer"}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent
                        sideOffset={10}
                        side="bottom"
                        align="center"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col mx-1.5">
                            {showIndex && <span className="text-sm font-normal text-muted-foreground">{indices[index]}</span>}
                            {point.type === "dateGap" && (
                              <span className={`text-xl font-semibold`}>
                                {point.from ? format(point.from, "PPP") : "N/A"} - <br />
                                {point.to ? format(point.to, "PPP") : "N/A"}
                              </span>
                            )}
                            {point.type === "date" && (
                              <span className={`text-xl font-semibold`}>
                                {value || "N/A"}
                              </span>
                            )}
                          </div>
                          {point.type === "dateGap" && (
                            <CalendarRangeReadOnly
                              defaultValue={{ from: point.from, to: point.to }}
                              defaultMonth={point.from}
                              className="w-full min-w-[24rem] rounded-md border border-border bg-card"
                              disableNavigation={true}
                              hideNavigation={true}
                              weekStartsOn={1}
                              numberOfMonths={2}
                            />
                          )}
                          {point.type === "date" && (
                            <CalendarSingleReadOnly
                              defaultValue={point.date!}
                              defaultMonth={point.date!}
                              className="w-full rounded-md border border-border"
                              disableNavigation={true}
                              hideNavigation={true}
                              weekStartsOn={1}
                            />
                          )}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
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