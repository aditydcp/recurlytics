import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  loadingPosition: "start" | "end";
};

export const LoadingButton = ({
  loading = false,
  loadingPosition = "end",
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <div className="flex items-center space-x-2">
      {(loading && loadingPosition === "start") && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}

      <Button
        disabled={loading || disabled}
        {...props}
      >
        {children}
      </Button>

      {(loading && loadingPosition === "end") && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};