"use client";

import { SidebarSubmenuWrapper } from "@/app/(dashboard)/_components/SidebarSubMenuWrapper";
import { ChevronRight, LucideIcon } from "lucide-react";

import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
};

export function SidebarMenuWrapper({ item }: Props) {
  const { state, isMobile } = useSidebar();

  const isSubmenuActive = item.items?.some((item) => item.isActive);

  const isPopover = state === "collapsed" && !isMobile;

  if (isPopover) {
    return (
      <SidebarMenuItem>
        <HoverCard openDelay={50} closeDelay={100}>
          <HoverCardTrigger asChild>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "cursor-pointer hover:bg-transparent hover:font-bold hover:underline hover:underline-offset-4 active:bg-transparent data-[state=open]:hover:bg-transparent",
                  isSubmenuActive && "font-bold",
                )}
                aria-label={item.title}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <item.icon
                  strokeWidth={isSubmenuActive ? 2.5 : 1.8}
                  aria-hidden="true"
                />
                <span className="text-sm text-balance">{item.title}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="start"
            className="w-fit min-w-52 px-0"
            role="menu"
            aria-label={`${item.title} submenu`}
          >
            <div className="flex flex-col gap-2">
              <div
                className={cn(
                  "flex items-center gap-2 border-b px-4 pb-2",
                  isSubmenuActive && "font-bold",
                )}
              >
                <item.icon
                  className="size-4"
                  strokeWidth={isSubmenuActive ? 2.5 : 1.8}
                  aria-hidden="true"
                />
                <span className="text-sm text-balance">{item.title}</span>
              </div>
              <SidebarSubmenuWrapper isPopover={isPopover} item={item} />
            </div>
          </HoverCardContent>
        </HoverCard>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          tooltip={item.title}
          className={cn(
            "cursor-pointer hover:bg-transparent hover:font-bold hover:underline hover:underline-offset-4 active:bg-transparent data-[state=open]:hover:bg-transparent",
            isSubmenuActive && "font-bold",
          )}
          aria-label={item.title}
          aria-expanded="false"
          aria-haspopup={item.items?.length ? "true" : undefined}
        >
          <item.icon
            strokeWidth={isSubmenuActive ? 2.5 : 1.8}
            aria-hidden="true"
          />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      {item.items?.length ? (
        <>
          <CollapsibleTrigger asChild>
            <SidebarMenuAction
              className="cursor-pointer hover:bg-transparent data-[state=open]:rotate-90"
              aria-label={`Toggle ${item.title} submenu`}
            >
              <ChevronRight aria-hidden="true" />
              <span className="sr-only">Toggle</span>
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarSubmenuWrapper isPopover={isPopover} item={item} />
          </CollapsibleContent>
        </>
      ) : null}
    </SidebarMenuItem>
  );
}
