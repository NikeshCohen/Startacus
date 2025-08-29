"use client";

import React from "react";

import { AppSidebar } from "@/app/(dashboard)/_components/AppSidebar";
import { DashboardHeader } from "@/app/(dashboard)/_components/DashboardHeader";
import { DashboardSkeleton } from "@/app/(dashboard)/_components/DashboardSkeleton";
import { useIsClient } from "@/hooks/useIsClient";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

function DashboardLayoutWrapper({ children }: Props) {
  const isClient = useIsClient();

  const isOpen = isClient
    ? localStorage.getItem("sidebar-open")
      ? localStorage.getItem("sidebar-open") === "true"
      : true
    : true;

  if (!isClient) {
    return <DashboardSkeleton />;
  }

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <AppSidebar id="main-sidebar" />
      <SidebarInset
        className="flex flex-col md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0"
        role="main"
      >
        <DashboardHeader />
        <Separator aria-hidden="true" />
        <div
          className="flex-1 overflow-auto p-4"
          aria-label="Dashboard content"
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayoutWrapper;
