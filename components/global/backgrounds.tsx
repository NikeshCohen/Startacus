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

export function SideGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div className="absolute top-0 left-0 h-[300px] w-[300px] translate-x-[10%] translate-y-[40%] rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.5)] opacity-50 blur-[80px] md:h-[500px] md:w-[500px]" />
      <div className="absolute top-0 right-0 h-[300px] w-[300px] -translate-x-[10%] translate-y-[20%] rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.5)] opacity-50 blur-[80px] md:h-[500px] md:w-[500px]" />
    </div>
  );
}
