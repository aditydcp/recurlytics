import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useIsDesktop } from "@/hooks/useIsDesktop"
import { cn } from "@/lib/ui/utils"
import { Info } from "lucide-react"
import { type ReactNode } from "react"

interface InfoTooltipProps {
  /**
   * Optional className for the tooltip container (used on desktop screens) 
   */
  tooltipClassName?: string
  /**
   * Optional className for the popover container (used on mobile screens)
   */
  popoverClassName?: string
  /**
   * Optional className for the icon 
   */
  iconClassName?: string
  children: ReactNode
}

export function InfoTooltip({
  iconClassName,
  tooltipClassName,
  popoverClassName,
  children
}: InfoTooltipProps) {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info
          className={cn(
            "opacity-50 w-4 h-4 hover:text-primary hover:bg-accent rounded-full cursor-pointer hidden md:block",
            iconClassName
          )}
        />
      </TooltipTrigger>
      <TooltipContent className={tooltipClassName}>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Info
          className={cn(
            "opacity-50 w-4 h-4 hover:text-primary hover:bg-accent rounded-full cursor-pointer md:hidden",
            iconClassName
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "max-w-xs bg-primary text-primary-foreground text-sm px-4 py-3",
          popoverClassName
        )}
      >
        <p>{children}</p>
      </PopoverContent>
    </Popover>
  )
}