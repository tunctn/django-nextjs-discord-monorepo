"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToggleThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      {mounted && (
        <>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</>
      )}
    </Button>
  );
};
