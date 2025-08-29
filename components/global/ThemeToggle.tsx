"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { useEnhancedTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export default function ThemeToggle({
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: ThemeToggleProps) {
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
        variant={variant}
        size={size}
        className={cn("animate-pulse rounded-full", className)}
        disabled
      />
    );
  }

  return (
    <div className={className} {...props}>
      <Button
        variant={variant}
        size={size}
        onClick={handleToggle}
        className="cursor-pointer rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
