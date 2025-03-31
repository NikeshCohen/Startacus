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
  if (!prodEnabled) {
    return null;
  }

  return <DevelopmentScan />;
}
