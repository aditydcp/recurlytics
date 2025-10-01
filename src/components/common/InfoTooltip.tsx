import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { type ReactNode } from "react"

interface InfoTooltipProps {
  className?: string
  children: ReactNode
}

export function InfoTooltip({
  className,
  children
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info
          className={cn(
            "opacity-50 w-4 h-4 hover:text-primary hover:bg-accent rounded-full cursor-pointer",
            className
          )}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  )
}