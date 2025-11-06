import { useEffect, useState } from "react";

export const useIsDesktop = (minWidth: number = 768) => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Ensure this only runs on the client
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

    const handleChange = () => setIsDesktop(mediaQuery.matches);

    // Set initial value
    handleChange();

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [minWidth]);

  // If null, component not hydrated yet → return false by default
  return isDesktop ?? false;
}