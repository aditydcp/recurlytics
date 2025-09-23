import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DataNumberCardProps {
  title: string;
  number: string;
  unit?: string;
  description?: string;
  tooltip?: string;
  insufficientDataText?: string;
}

export default function DataNumberCard({
  title,
  number,
  unit,
  description,
  tooltip,
  insufficientDataText = "Not enough data to analyze.",
}: DataNumberCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-3">
          <Label className="text-md font-normal">{title}</Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Info className="opacity-50 w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!number ? (
          <p className="text-muted-foreground">{insufficientDataText}</p>
        ) : (
          <>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-5xl py-4 font-semibold">
                  {number}
                  {unit && (
                    <span className="text-sm font-normal ml-1.5">{unit}</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {description}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}