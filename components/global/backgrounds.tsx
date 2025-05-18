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

export function SideGradientBackground({
  leftCircleTranslateX = "10%",
  leftCircleTranslateY = "40%",
  rightCircleTranslateX = "-10%",
  rightCircleTranslateY = "20%",
}: {
  leftCircleTranslateX?: string;
  leftCircleTranslateY?: string;
  rightCircleTranslateX?: string;
  rightCircleTranslateY?: string;
}) {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div
        className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.5)] opacity-50 blur-[80px] md:h-[500px] md:w-[500px]"
        style={{
          transform: `translateX(${leftCircleTranslateX}) translateY(${leftCircleTranslateY})`,
        }}
      />
      <div
        className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.5)] opacity-50 blur-[80px] md:h-[500px] md:w-[500px]"
        style={{
          transform: `translateX(${rightCircleTranslateX}) translateY(${rightCircleTranslateY})`,
        }}
      />
    </div>
  );
}

export function SingleCircleBackground({
  position = "center",
}: {
  position?: "left" | "right" | "center";
}) {
  let positionClasses =
    "absolute top-0 left-1/2 -translate-x-1/2 translate-y-[30%]";

  if (position === "left") {
    positionClasses =
      "absolute top-0 left-0 translate-x-[10%] translate-y-[40%]";
  } else if (position === "right") {
    positionClasses =
      "absolute top-0 right-0 -translate-x-[10%] translate-y-[20%]";
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div
        className={`${positionClasses} h-[200px] w-[200px] rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.5)] opacity-50 blur-[80px] md:h-[250px] md:w-[250px]`}
      />
    </div>
  );
}
