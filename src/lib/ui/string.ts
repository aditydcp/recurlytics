export const getNameInitials = (name: string, max: number = 2) => {
  if (!name) return "";
  const parts = name.split(" ").filter(Boolean);
  const initials = parts.slice(0, max).map(part => part[0].toUpperCase()).join("");
  return initials;
}

export const capitalizeWords = (str?: string) => {
  return str ? str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()) : "";
}

export const getOrdinalNumber = (number: number) => {
  const string = ["th", "st", "nd", "rd"];
  const value = number % 100;
  return number + (string[(value - 20) % 10] || string[value] || string[0]);
}