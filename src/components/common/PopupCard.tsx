import { X } from "lucide-react";
import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import type { PopupEntry } from "@/types/PopupType";

export function PopupCard({
  popup,
  close,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  popup: PopupEntry;
  close: (id?: string) => void;
}) {
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(popup.id);
      }
    }
    window.addEventListener("keydown", handleClose);
    return () => { window.removeEventListener("keydown", handleClose); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 text-foreground"
      {...props}
    >
      {/* semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => close(popup.id)}
      />

      {/* popup card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`popup-${popup.id}-title`}
        className="relative bg-background rounded-lg shadow-lg w-full max-w-lg my-auto border border-border"
        onClick={(e) => e.stopPropagation()} // prevent close inside
      >
        {/* close button */}
        <button
          className="absolute top-4 right-4 hover:cursor-pointer hover:rounded-full hover:bg-accent hover:text-accent-foreground p-1"
          onClick={() => close(popup.id)}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col p-6 gap-4">
          {/* header */}
          <div className="flex flex-col">
            <h5
              id={`popup-${popup.id}-title`}
              className="text-lg font-semibold"
            >
              {popup.title}
            </h5>
            <Label className="text-sm text-muted-foreground">{popup.description}</Label>
          </div>

          {/* content */}
          {popup.content && <div>{popup.content}</div>}

          {/* footer */}
          {popup.footer && (
            <div className="flex justify-end gap-2">
              {popup.footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}