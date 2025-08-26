import React from "react";

import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import UsersTable from "@/app/(main)/admin/users/_components/UsersTable";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Users / Admin",
  description:
    "Admin dashboard for managing user accounts, roles, and permissions",
};

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?redirectUrl=/admin/users");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <section className="layout flex h-screen items-center justify-center">
      <UsersTable />
    </section>
  );
}

export default page;
