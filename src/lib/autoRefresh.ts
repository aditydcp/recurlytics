import type { AutoRefreshMode } from "@/types/PreferenceType";

export function isExpired(iat: number, mode: AutoRefreshMode): boolean {
  if (mode === "never") return false;

  if (mode === "always") return true;

  const now = new Date(iat);
  const current = new Date();

  if (mode === "weekly-monday") {
    // expire if we crossed into a new week (Monday boundary)
    const lastMonday = new Date(current);
    lastMonday.setDate(current.getDate() - ((current.getDay() + 6) % 7));
    lastMonday.setHours(0, 0, 0, 0);

    return iat < lastMonday.getTime();
  }

  if (mode === "weekly-sunday") {
    // expire if we crossed into a new week (Sunday boundary)
    const lastSunday = new Date(current);
    lastSunday.setDate(current.getDate() - (current.getDay() % 7));
    lastSunday.setHours(0, 0, 0, 0);

    return iat < lastSunday.getTime();
  }

  if (mode === "monthly") {
    return (
      now.getMonth() !== current.getMonth() ||
      now.getFullYear() !== current.getFullYear()
    );
  }

  return false;
}