import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/common/InfoTooltip";

interface LabelWithTooltipComponentProps {
  label: string;
  tooltip?: string;
  showOnMedium?: boolean;
  showOnSmall?: boolean;
}

export default function LabelWithTooltipComponent({
  label,
  tooltip = "",
  showOnMedium = true,
  showOnSmall = true,
}: LabelWithTooltipComponentProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 space-x-2 ml-2 md:ml-0">
      <Label className="text-sm font-medium leading-none">{label}</Label>
      {(tooltip && showOnMedium) && <InfoTooltip>{tooltip}</InfoTooltip>}
      {(tooltip && showOnSmall) && <Label className="text-xs text-muted-foreground md:hidden">{tooltip}</Label>}
    </div>
  );
}