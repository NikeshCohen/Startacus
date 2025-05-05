"use client";

import { useCallback } from "react";

import { useTheme } from "next-themes";

type Coords = { x: number; y: number };

export function useEnhancedTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (coords?: Coords) => {
      const newTheme = resolvedTheme === "light" ? "dark" : "light";

      if (!document.startViewTransition) {
        setTheme(newTheme);
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        setTheme(newTheme);
        return;
      }

      const transition = document.startViewTransition(() => {
        setTheme(newTheme);
      });

      if (coords) {
        transition.ready.then(() => {
          const endRadius = Math.hypot(
            Math.max(coords.x, window.innerWidth - coords.x),
            Math.max(coords.y, window.innerHeight - coords.y),
          );
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${coords.x}px ${coords.y}px)`,
                `circle(${endRadius}px at ${coords.x}px ${coords.y}px)`,
              ],
            },
            {
              duration: 500, // Animation duration in milliseconds
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        });
      }
    },
    [resolvedTheme, setTheme],
  );

  return { theme: resolvedTheme, toggleTheme, setTheme };
}
