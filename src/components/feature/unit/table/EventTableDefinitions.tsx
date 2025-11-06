import type { ColumnDef } from "@tanstack/react-table";
import type { Event } from "@/types/EventType";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { DataTable } from "@/components/common/DataTable";

export const EventColumns: ColumnDef<Event>[] = [
  {
    accessorFn: (row) => {
      const dateStr = row.start.date || row.start.dateTime || "";
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date.getTime(); // numeric value for sorting
    },
    id: "start", // give it a stable id since we’re not using accessorKey
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}
          className="text-foreground hover:bg-input hover:border-primary"
          size="sm"
        >
          Records Date
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const timestamp = row.getValue("start") as number | null;
      const displayData = !timestamp
        ? "N/A"
        : format(new Date(timestamp), "dd MMM yyyy");
      return <Label className="px-3">{displayData}</Label>;
    },
    enableSorting: true,
    sortDescFirst: false,
  }
]

export const EventTable = ({ events }: { events: Event[] }) => {
  return (
    <DataTable
      className="h-fit"
      columns={EventColumns}
      data={events}
      defaultSortingState={[{ id: 'start', desc: true }]}
    />
  )
}