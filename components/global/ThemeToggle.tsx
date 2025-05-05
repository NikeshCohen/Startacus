"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { useEnhancedTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useEnhancedTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    let x: number | undefined;
    let y: number | undefined;

    if ("clientX" in event && "clientY" in event) {
      x = event.clientX;
      y = event.clientY;
    }

    toggleTheme({
      x: x ?? window.innerWidth / 2,
      y: y ?? window.innerHeight / 2,
    });
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("animate-pulse rounded-full", className)}
        disabled
      />
    );
  }

  return (
    <div className={className} {...props}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="cursor-pointer rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="size-[18px]" />
        ) : (
          <Moon className="size-[18px]" />
        )}
      </Button>
    </div>
  );
}
