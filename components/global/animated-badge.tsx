import React from "react";

import { cn } from "@/lib/utils";

function AnimatedBadge({
  text,
  icon,
  className,
}: {
  text: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-primary/10 border-primary/20 relative mb-6 inline-flex w-fit scroll-mt-32 overflow-hidden rounded-full border px-4 py-1 before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0]",
        className,
      )}
    >
      <div className="text-primary dark:text-primaryO/90 flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );
}

export default AnimatedBadge;
