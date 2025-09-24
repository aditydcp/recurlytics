interface DataNumberDisplayProps {
  number: string;
  unit?: string;
  description?: string;
}

export default function DataNumberDisplay({
  number,
  unit,
  description,
}: DataNumberDisplayProps) {
  return (
    <div className="flex flex-col">
      <div className="text-5xl py-4 font-semibold">
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