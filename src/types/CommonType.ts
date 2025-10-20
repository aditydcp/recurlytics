export interface GeneralKeyValue {
  label: string;
  value: string;
}

export const TextSizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"] as const;

export const TextSizeMap: Record<typeof TextSizes[number], string> = {
  "2xs": "text-2xs",
  "xs": "text-xs",
  "sm": "text-sm",
  "md": "text-md",
  "lg": "text-lg",
  "xl": "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};