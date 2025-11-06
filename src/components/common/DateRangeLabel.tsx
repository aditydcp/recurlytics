import { format } from "date-fns";

interface DateRangeLabelProps {
  from: Date | null;
  to: Date | null;
}

export const DateRangeLabel = ({
  from,
  to
}: DateRangeLabelProps) => {
  return (
    <>
      {from ? format(from, "PPP") : "N/A"} - <br />
      {to ? format(to, "PPP") : "N/A"}
    </>
  )
}