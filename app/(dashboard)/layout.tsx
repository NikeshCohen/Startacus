import React from "react";

import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardLayoutWrapper from "@/app/(dashboard)/_components/DashboardWrapper";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?redirectUrl=/dashboard");
  }

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}

export default layout;
