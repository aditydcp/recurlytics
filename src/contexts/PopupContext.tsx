import { createContext, useContext, useState, type ReactNode } from "react";
import { PopupCard } from "@/components/common/PopupCard";
import type { Popup, PopupEntry } from "@/types/PopupType";

type PopupContextType = {
  open: (popup: Popup) => string; // returns id
  close: (id?: string) => void; // close specific or latest
  closeAll: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<PopupEntry[]>([]);

  const open = (popup: Popup) => {
    const id = crypto.randomUUID();
    setStack((prev) => [...prev, { id, ...popup }]);
    return id;
  };

  const close = (id?: string) => {
    setStack((prev) => {
      if (!id) return prev.slice(0, -1); // pop latest
      return prev.filter((popup) => popup.id !== id);
    });
  };

  const closeAll = () => setStack([]);

  return (
    <PopupContext.Provider value={{ open, close, closeAll }}>
      {children}

      {/* Render all popups */}
      {stack.map((popup, index) => (
        <PopupCard
          key={popup.id}
          popup={popup}
          close={close}
          style={{ zIndex: 50 + index }} // stack z-index
        />
      ))}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx;
}