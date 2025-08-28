"use client";

import { useMemo } from "react";

import { usePathname } from "next/navigation";

import { sidebarMenus } from "@/constants/sidebar";
import { LucideIcon } from "lucide-react";

// UUID pattern for filtering out UUIDs from paths
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Define interfaces for menu items to fix TypeScript errors
interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: SubMenuItem[];
  isActive?: boolean;
}

interface SubMenuItem {
  title: string;
  url: string;
}

interface SubMenuItemWithParent extends SubMenuItem {
  parent: MenuItem;
}

// Normalize URL to remove hash and ensure format consistency
const normalizeUrl = (url: string): string => {
  if (!url || url === "#") return "";

  // Replace hash only urls with empty string
  if (url === "#") return "";

  // For urls like "/#", remove the hash part
  const cleanUrl = url.replace(/#.*$/, "");

  // Normalize slashes
  return cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`;
};

// Function to find a menu item by path
const findMenuItemByPath = (
  path: string,
): MenuItem | SubMenuItemWithParent | null => {
  for (const item of sidebarMenus.navMain as MenuItem[]) {
    const itemUrl = normalizeUrl(item.url);
    if (itemUrl === path) {
      return item;
    }

    // Check subitems
    if (item.items) {
      for (const subItem of item.items) {
        const subItemUrl = normalizeUrl(subItem.url);
        if (subItemUrl === path) {
          return { ...subItem, parent: item } as SubMenuItemWithParent;
        }
      }
    }
  }
  return null;
};

// Function to generate path mappings from sidebar menus
const generatePathMappings = () => {
  const segmentMappings: Record<string, string> = {};
  const fullPathMappings: Record<string, string> = {};
  const pathToMenuItemMap: Record<string, MenuItem | SubMenuItemWithParent> =
    {};

  // Process main navigation items
  (sidebarMenus.navMain as MenuItem[]).forEach((navItem) => {
    const normalizedUrl = normalizeUrl(navItem.url);

    if (normalizedUrl) {
      // Add the full path mapping
      fullPathMappings[normalizedUrl] = navItem.title;
      pathToMenuItemMap[normalizedUrl] = navItem;

      // Also map each segment for single-segment lookups
      const segments = normalizedUrl.split("/").filter(Boolean);
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        segmentMappings[lastSegment] = navItem.title;
      }
    }

    // Process subitems
    if (navItem.items) {
      navItem.items.forEach((subItem) => {
        const normalizedSubUrl = normalizeUrl(subItem.url);

        if (normalizedSubUrl) {
          // Add the full path mapping
          fullPathMappings[normalizedSubUrl] = subItem.title;
          pathToMenuItemMap[normalizedSubUrl] = {
            ...subItem,
            parent: navItem,
          } as SubMenuItemWithParent;

          // Also map each segment for single-segment lookups
          const segments = normalizedSubUrl.split("/").filter(Boolean);
          if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            segmentMappings[lastSegment] = subItem.title;
          }
        }
      });
    }
  });

  return { segmentMappings, fullPathMappings, pathToMenuItemMap };
};

// Generate path mappings from sidebar menu
const { segmentMappings, fullPathMappings } = generatePathMappings();

export interface Breadcrumb {
  label: string;
  href: string;
  isCurrent: boolean;
}

export function useBreadcrumbs(excludePatterns: RegExp[] = [UUID_PATTERN]) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Skip generating breadcrumbs if on the home page or empty path
    if (pathname === "/" || !pathname) return [];

    // Check if we're in a dashboard route
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Try to find a direct match in the menu structure
    const menuItem = findMenuItemByPath(pathname);
    if (menuItem) {
      const result: Breadcrumb[] = [];

      // Always add Dashboard as first breadcrumb for dashboard routes
      if (isDashboardRoute) {
        // Don't add Dashboard if we're on a dashboard overview page or if the current page is already Dashboard
        if (
          pathname !== "/dashboard/overview" &&
          !pathname.endsWith("/dashboard")
        ) {
          result.push({
            label: "Dashboard",
            href: "/dashboard",
            isCurrent: false,
          });
        }
      }

      // Add parent if it exists (for submenu items) and it's not Dashboard (which we've already added)
      if ("parent" in menuItem && menuItem.parent) {
        const parentUrl = normalizeUrl(menuItem.parent.url);
        // Don't add parent if it would create a duplicate "Dashboard" entry
        if (
          parentUrl &&
          !(isDashboardRoute && menuItem.parent.title === "Dashboard") &&
          !(
            isDashboardRoute &&
            menuItem.title === "Overview" &&
            menuItem.parent.title === "Dashboard"
          )
        ) {
          result.push({
            label: menuItem.parent.title,
            href: parentUrl,
            isCurrent: false,
          });
        }
      }

      // Add the current item
      result.push({
        label: menuItem.title,
        href: pathname,
        isCurrent: true,
      });

      return result;
    }

    // Fall back to path-based breadcrumb generation
    const segments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    // For dashboard routes, add Dashboard as the first breadcrumb
    const result: Breadcrumb[] = [];
    if (isDashboardRoute) {
      result.push({
        label: "Dashboard",
        href: "/dashboard",
        isCurrent: segments.length === 1 && segments[0] === "dashboard",
      });
    }

    return [
      ...result,
      ...segments
        // Filter out "dashboard" segment if we've already added it
        .filter((segment) => !(isDashboardRoute && segment === "dashboard"))
        // Filter out segments that match any of the exclusion patterns
        .filter(
          (segment) =>
            !excludePatterns.some((pattern) => pattern.test(segment)),
        )
        .map((segment, index, filteredSegments) => {
          // Build up the path as we go, but account for dashboard prefix
          if (isDashboardRoute && currentPath === "") {
            currentPath = "/dashboard";
          }

          if (segment !== "dashboard") {
            currentPath += `/${segment}`;
          }

          // Try to get label from the path mappings
          let label: string;

          // First check if we have a full path mapping
          if (fullPathMappings[currentPath]) {
            label = fullPathMappings[currentPath];
          }
          // Then check if we have a segment mapping
          else if (segmentMappings[segment]) {
            label = segmentMappings[segment];
          }
          // Finally, format the segment if no mapping exists
          else {
            label =
              segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, " ");
          }

          const isCurrent = index === filteredSegments.length - 1;

          return {
            label,
            href: currentPath,
            isCurrent,
          };
        }),
    ];
  }, [pathname, excludePatterns]);

  return breadcrumbs;
}
