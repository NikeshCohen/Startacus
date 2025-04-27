"use client";

import { useEffect, useRef, useState } from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "switch" | "button";
  className?: string;
}

export default function ThemeToggle({
  variant = "switch",
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const toggle = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      toggle();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    document.startViewTransition(() => {
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);
      toggle();
    });
  };

  if (!mounted) {
    if (variant === "switch") {
      return (
        <div
          className={cn(
            "bg-muted relative inline-grid h-9 w-16 animate-pulse grid-cols-[1fr_1fr] items-center rounded-full",
            className,
          )}
        />
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn("h-9 w-9 animate-pulse rounded-full p-0", className)}
        disabled
      />
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleClick}
        className={cn(
          "h-9 w-9 rounded-full p-0 transition-transform hover:scale-105",
          className,
        )}
      >
        {theme === "light" ? (
          <SunIcon className="h-4 w-4" />
        ) : (
          <MoonIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className={className} onClick={handleToggleClick}>
      <div className="pointer-events-none relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Label htmlFor="theme-toggle-switch" className="sr-only">
          Toggle Theme
        </Label>
        <Switch
          id="theme-toggle-switch"
          checked={theme === "dark"}
          aria-readonly="true"
          className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />

        <Label
          htmlFor="theme-toggle-switch"
          className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-auto relative ms-0.5 flex min-w-8 cursor-pointer items-center justify-center text-center"
        >
          <SunIcon size={16} aria-hidden="true" />
        </Label>
        <Label
          htmlFor="theme-toggle-switch"
          className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-auto relative me-0.5 flex min-w-8 cursor-pointer items-center justify-center text-center"
        >
          <MoonIcon size={16} aria-hidden="true" />
        </Label>
      </div>
    </div>
  );
}
