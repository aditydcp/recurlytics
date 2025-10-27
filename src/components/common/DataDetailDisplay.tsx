import * as React from "react";
import { cn } from "@/lib/ui/utils"; // typical shadcn utility for merging classNames

// Custom Data Detail Display Components
// Not imported from shadcn.
// This is a set of components to structure detailed data displays with header and content sections.
// Author: aditydcp (https://github.com/aditydcp)

// Root component
const DataDetailDisplay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
DataDetailDisplay.displayName = "DataDetailDisplay";

// Header
const DataDetailHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col mx-1.5", className)} {...props} />
));
DataDetailHeader.displayName = "DataDetailHeader";

// Title
const DataDetailTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-xl font-semibold", className)} {...props} />
));
DataDetailTitle.displayName = "DataDetailTitle";

// Decorator
const DataDetailDecorator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
DataDetailDecorator.displayName = "DataDetailDecorator";

// Content
const DataDetailContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
    children?: React.ReactNode;
  }
>(({ className, asChild = false, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return children;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full min-w-[24rem] rounded-md border border-border bg-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export {
  DataDetailDisplay,
  DataDetailHeader,
  DataDetailTitle,
  DataDetailDecorator,
  DataDetailContent
};