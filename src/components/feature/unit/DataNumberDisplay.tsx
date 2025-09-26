import { TextSizeMap, type TextSizes } from "@/types/CommonType";

interface DataNumberDisplayProps {
  number: string;
  unit?: string;
  description?: string;
  numberTextSize?: typeof TextSizes[number];
}

export default function DataNumberDisplay({
  number,
  unit,
  description,
  numberTextSize = "5xl",
}: DataNumberDisplayProps) {
  return (
    <div className="flex flex-col">
      <div className={`${TextSizeMap[numberTextSize]} py-4 font-semibold`}>
        {number}
        {unit && (
          <span className="text-sm font-normal ml-1.5">{unit}</span>
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
}