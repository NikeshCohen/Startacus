import React from "react";

function Background() {
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

export default Background;
