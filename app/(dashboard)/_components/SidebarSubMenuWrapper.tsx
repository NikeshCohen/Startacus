"use client";

import { LucideIcon } from "lucide-react";

import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

/**
 * @interface Props
 * @property {Object} item - Navigation item data
 * @property {string} item.title - Title of the navigation item
 * @property {string} item.url - URL for the navigation item
 * @property {LucideIcon} item.icon - Icon component for the navigation item
 * @property {Object[]} [item.items] - Optional sub-items for the navigation item
 * @property {string} item.items[].title - Title of the sub-item
 * @property {string} item.items[].url - URL for the sub-item
 * @property {boolean} item.items[].isActive - Whether the sub-item is active
 * @property {boolean} isPopover - Whether the submenu is displayed as a popover
 */
type Props = {
  item: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
      isActive: boolean;
    }[];
  };
  isPopover: boolean;
};

export function SidebarSubmenuWrapper({ item, isPopover }: Props) {
  return (
    <SidebarMenuSub
      className={cn(
        isPopover && "mx-0 border-none px-0",
        !isPopover && "border-gray-700",
      )}
      role="menu"
      aria-label={`${item.title} submenu items`}
    >
      {item.items?.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title} role="menuitem">
          <SidebarMenuSubButton
            asChild
            className={cn(
              "hover:bg-transparent hover:font-bold hover:underline hover:underline-offset-4 active:bg-transparent",
              subItem.isActive && "font-bold underline underline-offset-4",
              isPopover && "px-4",
            )}
          >
            <a
              href={subItem.url}
              aria-label={subItem.title}
              aria-current={subItem.isActive ? "page" : undefined}
            >
              <span>{subItem.title}</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
