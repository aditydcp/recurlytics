import * as React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/ui/utils";
import { usePopup } from "@/contexts/PopupContext";

/**
 * CardTooltip root — finds Trigger and Content children and composes them.
 */
export function CardTooltip({
  popupTitle = undefined,
  children,
  className
}: {
  popupTitle?: string;
  children: React.ReactNode;
  className?: string
}) {
  const { open } = usePopup();
  const arr = React.Children.toArray(children) as React.ReactElement[];

  const triggerEl = arr.find(
    el => !!el && (el.type as any)?.displayName === "CardTooltipTrigger"
  ) as React.ReactElement | undefined;

  const contentEl = arr.find(
    el => !!el && (el.type as any)?.displayName === "CardTooltipContent"
  ) as React.ReactElement | undefined;

  const triggerProps = (triggerEl?.props ?? {}) as Record<string, any>;
  const triggerChild = triggerProps.children ?? null;

  const contentProps = (contentEl?.props ?? {}) as Record<string, any>;
  const contentChild = contentProps.children ?? null;

  return (
    <div className={cn("inline-flex", className)}>
      {/* Desktop & tablet: full HoverCard */}
      <div className="hidden md:block">
        <HoverCard>
          {/* HoverCardTrigger expects one child. We use asChild so consumer element is used directly. */}
          <HoverCardTrigger>
            {/* If consumer passed asChild on CardTooltipTrigger we will pass exactly the child.
                If they didn't, we still pass the child — it's fine: HoverCardTrigger asChild
                will wrap the child with the trigger props. */}
            {triggerChild ?? <span />}
          </HoverCardTrigger>

          {/* Pass any props the consumer put on CardTooltipContent down to HoverCardContent */}
          <HoverCardContent {...filterPropsForContent(contentProps)}>
            {contentChild}
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile: only render a button (or the trigger element itself if asChild) */}
      <div className="block md:hidden">
        {/* Wrap it with our Button so it's tappable on mobile */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open details"
          onClick={() => open({
            title: popupTitle,
            content: contentChild,
          })}
        >
          {triggerChild ?? <span />}
        </Button>
      </div>
    </div>
  );
}

/**
 * The Trigger marker component. Consumers should place their trigger inside this.
 * We don't render anything here — the root will read the props/children.
 */
export function CardTooltipTrigger(props: React.PropsWithChildren<{ asChild?: boolean }>) {
  // This component only serves as a semantic marker for the root to find.
  // Return a React fragment with the children so the element is present in children array.
  return <>{props.children}</>;
}
CardTooltipTrigger.displayName = "CardTooltipTrigger";

/**
 * The Content marker component. Consumers put the content here.
 */
export function CardTooltipContent(props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return <>{props.children}</>;
}
CardTooltipContent.displayName = "CardTooltipContent";

/**
 * Helper: pick props we want to forward to HoverCardContent.
 * We avoid forwarding children and some internal props.
 */
function filterPropsForContent(props: Record<string, any>) {
  const { children, ...rest } = props;
  return rest;
}