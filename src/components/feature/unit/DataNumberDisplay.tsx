interface DataNumberDisplayProps {
  number: string;
  unit?: string;
  description?: string;
  numberTextSize?: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

export default function DataNumberDisplay({
  number,
  unit,
  description,
  numberTextSize = "5xl",
}: DataNumberDisplayProps) {
  return (
    <div className="flex flex-col">
      <div className={`text-${numberTextSize} py-4 font-semibold`}>
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