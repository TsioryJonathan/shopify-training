"use client";

import { useThemeStore } from "@/stores/useThemeStore";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" 
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-[#FF6347] transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-[#FF6347] transition-colors" />
      )}
    </button>
  );
}

