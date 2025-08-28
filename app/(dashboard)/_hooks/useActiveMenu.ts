import { useMemo } from "react";

import { usePathname } from "next/navigation";

import { type LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
}

export function useActiveMenu(items: MenuItem[]) {
  const pathname = usePathname() || "";

  const activeItems = useMemo(() => {
    return items.map((item) => {
      const isMainActive = pathname === item.url;
      const hasActiveChild =
        item.items?.some((subItem) => pathname === subItem.url) || false;

      return {
        ...item,
        isActive: isMainActive || hasActiveChild,
        items: item.items?.map((subItem) => ({
          ...subItem,
          isActive: pathname === subItem.url,
        })),
      };
    });
  }, [pathname, items]);

  return {
    activeItems,
  };
}
