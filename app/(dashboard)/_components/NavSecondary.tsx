"use client";

import * as React from "react";

import { Route } from "next";
import Link from "next/link";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * @param {Object} props - Component props
 * @param {Object[]} props.items - Array of navigation items
 * @param {string} props.items[].title - Title of the navigation item
 * @param {string} props.items[].url - URL for the navigation item
 * @param {LucideIcon} props.items[].icon - Icon component for the navigation item
 */
export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: Route;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props} aria-label="Secondary navigation">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <Link
                  href={item.url}
                  className="cursor-pointer active:bg-transparent"
                  aria-label={item.title}
                >
                  <item.icon aria-hidden="true" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
