"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="p-sm hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant w-10 h-10 flex items-center justify-center">
        <span className="material-symbols-outlined">dark_mode</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-sm hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant w-10 h-10 flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      <span className="material-symbols-outlined">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
