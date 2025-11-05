import type { DataMultiPointDisplayProps, DataPoint } from "@/types/DataDisplayType";
import DataMultiPointDisplay from "@/components/feature/unit/DataMultiPointDisplay";
import type { GapStat } from "@/types/analytics/modules/gap/GapType";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const scopeLabelMap: Record<GapStat["scope"], { label: string; description: string }> = {
  "3m": { label: "3 months", description: "3-month period" },
  "6m": { label: "6 months", description: "6-month period" },
  "12m": { label: "12 months", description: "12-month period" },
  all: { label: "All time", description: "all records" },
};

export const DataMultiPointSwitchDisplay = ({
  data,
  ...props
}: Omit<DataMultiPointDisplayProps, "dataPoints"> & { data: GapStat[] }) => {
  const [scope, setScope] = useState<GapStat["scope"]>(data[0]?.scope ?? "3m");

  const selected = data.find((d) => d.scope === scope);
  if (!selected) return null;

  const dataPoints: DataPoint[] = [
    { type: "value", value: selected.avg, unit: "days" },
    { type: "value", value: selected.min, unit: "days" },
    { type: "value", value: selected.max, unit: "days" },
    { type: "value", value: selected.count, unit: "samples" },
  ];

  const availableScopes = data.map((d) => d.scope);

  return (
    <div className="flex flex-col items-end">
      <Select value={scope} onValueChange={(v: GapStat["scope"]) => setScope(v)}>
        <SelectTrigger className="w-fit gap-1 my-1">
          <SelectValue placeholder="Select scope" />
        </SelectTrigger>
        <SelectContent>
          {availableScopes.map((key) => (
            <SelectItem key={key} value={key}>
              {scopeLabelMap[key].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DataMultiPointDisplay
        dataPoints={dataPoints}
        description={`Cycle length statistics for ${scopeLabelMap[scope].description}`}
        {...props}
      />
    </div>
  );
};