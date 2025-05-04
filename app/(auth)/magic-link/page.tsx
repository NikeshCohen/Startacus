import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MagicLinkForm from "@/app/(auth)/_components/MagicLinkForm";

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
  searchParams: Promise<{ redirectUrl?: string }>;
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
    <section className="flex justify-center items-center p-4 pt-24 w-full min-h-screen">
      <div className="relative w-full max-w-md">
        <Card className="relative bg-card/40 backdrop-blur-sm border-t-4 border-t-primary overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />

          <CardHeader className="space-y-1 pt-4">
            <CardTitle className="flex justify-center items-center text-center">
              <Logo />
            </CardTitle>
            <CardDescription className="text-base text-center">
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
