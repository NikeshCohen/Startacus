"use client";

import { useEffect } from "react";

import Link from "next/link";

import { NavMain } from "@/app/(dashboard)/_components/NavMain";
import { NavSecondary } from "@/app/(dashboard)/_components/NavSecondary";
import { NavUser } from "@/app/(dashboard)/_components/NavUser";
import { NavWorkspace } from "@/app/(dashboard)/_components/NavWorkspace";
import { sidebarMenus } from "@/constants/sidebar";
import { Zap } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

/**
 * Main application sidebar with navigation sections for the dashboard.
 * Includes app logo/header, main navigation, workspace selection,
 * secondary links, and user profile.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  useEffect(() => {
    localStorage.setItem("sidebar-open", open.toString());
  }, [open]);

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      aria-label="Main navigation"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/dashboard"
                className="hover:bg-transparent"
                aria-label="Go to dashboard home"
              >
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                  aria-hidden="true"
                >
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Piper</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenus.navMain} />
        <NavWorkspace workspaces={sidebarMenus.workspaces} />
        <NavSecondary items={sidebarMenus.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarMenus.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
