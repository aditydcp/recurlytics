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

    // prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleClose);
      document.body.style.overflow = prevOverflow;
    };
  }, [popup.id, close]);

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
        // className="relative bg-background rounded-lg shadow-lg w-full max-w-lg my-auto border border-border max-h-[85vh] md:max-h-[75vh] grid grid-rows-[auto,minmax(0,1fr),auto] py-6"
        className="relative flex flex-col h-fit max-h-[min(80vh,600px)] bg-background rounded-lg shadow-lg w-full max-w-lg my-auto border border-border py-6 px-2"
        onClick={(e) => e.stopPropagation()} // prevent close inside
      >
        {/* close button */}
        <button
          className="absolute top-4 right-4 hover:cursor-pointer hover:rounded-full hover:bg-accent hover:text-accent-foreground p-1"
          onClick={() => close(popup.id)}
        >
          <X className="h-5 w-5" />
        </button>

        {/* header */}
        <header className="flex flex-col px-4 pb-2 shrink-0">
          <h5 id={`popup-${popup.id}-title`} className="text-lg font-semibold">
            {popup.title}
          </h5>
          <Label className="text-sm text-muted-foreground">
            {popup.description}
          </Label>
        </header>

        {/* scrollable content */}
        {popup.content && (
          <main className="overflow-y-auto flex-1 px-4 py-2">
            {popup.content}
          </main>
        )}

        {/* footer */}
        {popup.footer && (
          <footer className="flex justify-end gap-2 px-4 pt-2 shrink-0">
            {popup.footer}
          </footer>
        )}
      </div>
    </div>
  );
}