"use client";

import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return isClient;
}
