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
        "bg-primary/10 border-primary/20 mb-6 inline-flex w-fit scroll-mt-32 rounded-full border px-4 py-1",
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
