import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-500 transition-colors"
    >
      {theme === "dark" ? "Switch to Light 🌞" : "Switch to Dark 🌙"}
    </Button>
  );
}