import React from "react";

export function GrainBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <svg
        className="h-full w-full opacity-50 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

export function GradientBackground() {
  return (
    <div className="bg-background absolute top-0 z-[-2] h-screen w-full bg-[radial-gradient(120%_60%_at_50%_0%,oklch(from_var(--primary)_l_c_h_/_0.15)_0,oklch(from_var(--primary)_l_c_h_/_0.05)_50%,oklch(from_var(--primary)_l_c_h_/_0)_100%)]"></div>
  );
}
