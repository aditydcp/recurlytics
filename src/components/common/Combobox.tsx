import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useState } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import type { GeneralKeyValue } from "@/types/CommonType"

interface ComboboxProps {
  options: GeneralKeyValue[];
  placeholderText?: string;
  searchText?: string;
  emptyText?: string;
  loading?: boolean;
  defaultValue?: string;
  onValueSet?: (value: string) => void;
}

export default function Combobox({
  options,
  placeholderText = "Select option...",
  searchText = "Type to search...",
  emptyText = "No option found.",
  loading = false,
  defaultValue = "",
  onValueSet,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={loading}
            className={`min-w-[200px] justify-between` + (loading ? " cursor-default text-muted-foreground" : "")}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : (<span className="text-muted-foreground">{placeholderText}</span>)}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[100%] p-0">
          <Command className="max-h-60 overflow-auto">
            <CommandInput placeholder={searchText} className="h-9" />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      onValueSet && onValueSet(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}