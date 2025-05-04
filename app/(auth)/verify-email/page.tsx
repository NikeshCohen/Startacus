import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MailCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue",
};

export default async function Page() {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  } else if (session.user.emailVerified) {
    redirect("/");
  }

  return (
    <section className="flex justify-center items-center p-4 pt-24 w-full min-h-screen">
      <div className="relative w-full max-w-md">
        <Card className="relative bg-card/40 backdrop-blur-sm border-t-4 border-t-primary overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />

          <CardContent className="relative space-y-6 pt-2 pb-2">
            <div className="flex flex-col justify-center items-center space-y-4 py-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <MailCheck className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-semibold text-xl text-center">
                Check your email
              </h2>
              <p className="max-w-sm text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email address.
                Please check your inbox and click on the link to verify your
                account.
              </p>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm text-center">
                If you don&apos;t receive an email within a few minutes, check
                your spam folder
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
