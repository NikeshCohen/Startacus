import type { Metadata, Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MagicLinkForm from "@/app/(main)/(auth)/_components/MagicLinkForm";

import Logo from "@/components/global/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Magic Link",
  description: "Sign in with a magic link",
};

interface PageProps {
  searchParams: Promise<{ redirectUrl?: Route }>;
}

export default async function Page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  const params = await searchParams;
  const redirectUrl = params.redirectUrl ?? "/";

  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4 pt-24">
      <div className="relative w-full max-w-md">
        <Card className="bg-card/40 border-t-primary relative overflow-hidden border-t-4 backdrop-blur-sm transition-all duration-300">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent opacity-50" />

          <CardHeader className="pt-4">
            <CardTitle className="flex items-center justify-center text-center">
              <Logo />
            </CardTitle>
            <CardDescription className="text-center text-base">
              Enter your email address to receive a magic link
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6 pt-2 pb-2">
            <MagicLinkForm redirectUrl={redirectUrl} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
