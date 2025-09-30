import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { type ReactNode } from "react"

interface InfoTooltipProps {
  children: ReactNode
}

export function InfoTooltip({ children }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="opacity-50 w-4 h-4 hover:text-primary hover:bg-accent rounded-full cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  )
}