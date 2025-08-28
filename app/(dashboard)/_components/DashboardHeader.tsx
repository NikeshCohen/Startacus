"use client";

import { DashboardBreadCrumbs } from "@/app/(dashboard)/_components/DashboardBreadCrumbs";
import {
  BellIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SearchIcon,
} from "lucide-react";

import ThemeToggle from "@/components/global/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

//  Contains sidebar toggle, DashboardBreadCrumbs navigation, search, notifications, and theme toggle.
export const DashboardHeader = () => {
  const { open } = useSidebar();

  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between px-4 transition-all duration-200"
      role="banner"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <SidebarTrigger
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          aria-expanded={open}
        >
          {open ? (
            <PanelLeftCloseIcon aria-hidden="true" />
          ) : (
            <PanelLeftOpenIcon aria-hidden="true" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>
        <Separator orientation="vertical" className="h-4" aria-hidden="true" />
        <DashboardBreadCrumbs
          homeLabel="Dashboard"
          homeHref="/dashboard"
          className="overflow-hidden"
          showHome={false}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          aria-label="Search"
        >
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Search</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full"
          aria-label="Notifications"
        >
          <BellIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Notifications</span>
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
};
