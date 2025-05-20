import { useEffect, useState } from "react";

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
    const mql = window.matchMedia(mediaQuery);

    const updateState = () => {
      setIsMobile(mql.matches);
    };

    updateState();

    mql.addEventListener("change", updateState);

    return () => {
      mql.removeEventListener("change", updateState);
    };
  }, [MOBILE_BREAKPOINT]);

  return isMobile;
}
