import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface DataDisplayCardProps {
  children: React.ReactNode;
  title: string;
  tooltip?: string;
  insufficientDataText?: string;
}

export default function DataDisplayCard({
  children,
  title,
  tooltip,
  insufficientDataText = "Not enough data to analyze.",
}: DataDisplayCardProps) {
  return (
    <Card className="min-w-full w-fit">
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
        {children ? (
          children
        ) : (
          <Label className="text-sm text-muted-foreground">{insufficientDataText}</Label>
        )}
      </CardContent>
    </Card>
  );
}