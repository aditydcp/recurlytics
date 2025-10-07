export const getNameInitials = (name: string, max: number = 2) => {
  if (!name) return "";
  const parts = name.split(" ").filter(Boolean);
  const initials = parts.slice(0, max).map(part => part[0].toUpperCase()).join("");
  return initials;
}

export const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}