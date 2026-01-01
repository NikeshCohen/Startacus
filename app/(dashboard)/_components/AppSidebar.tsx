"use client";

import { useEffect } from "react";

import { NavMain } from "@/app/(dashboard)/_components/NavMain";
import { NavSecondary } from "@/app/(dashboard)/_components/NavSecondary";
import { NavUser } from "@/app/(dashboard)/_components/NavUser";
import { NavWorkspace } from "@/app/(dashboard)/_components/NavWorkspace";
import { sidebarMenus } from "@/constants/sidebar";

import Logo from "@/components/global/Logo";
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
              <div
                className="hover:bg-transparent"
                aria-label="Go to dashboard home"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Logo href="/dashboard" showTextLogo={open} />
                </div>
              </div>
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
