import type { ReactNode } from "react";

export type Popup = {
  title?: string;
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
}

export type PopupEntry = Popup & {
  id: string;
};