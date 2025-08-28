import React from "react";

import { Metadata } from "next";

import DashboardLayoutWrapper from "@/app/(dashboard)/_components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Dashboard",
};

function layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}

export default layout;
