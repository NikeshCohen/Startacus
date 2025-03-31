"use client";

// NEEDS TO BE IMPORTED FIRST, it will auto move to top on save based on .prettierrc
import { scan } from "react-scan";

import { useEffect } from "react";

function DevelopmentScan() {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
}

export function ReactScan({ prodEnabled = false }: { prodEnabled?: boolean }) {
  // Don't show ReactScan if prodEnabled is FALSE and if NOT development mode
  if (!prodEnabled && process.env.NODE_ENV !== "development") {
    return null;
  }

  return <DevelopmentScan />;
}
