import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CheckCircle, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Email Confirmed",
  description: "Your email has been confirmed",
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const type = params.type;

  const isVerification = type === "verification";
  const isChange = type === "change";

  if (!isVerification && !isChange) {
    redirect("/");
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4 pt-24">
      <div className="relative w-full max-w-md">
        <Card className="bg-card/40 border-t-primary relative overflow-hidden border-t-4 backdrop-blur-sm transition-all duration-300">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent opacity-50" />

          <CardContent className="relative space-y-6 pt-2 pb-2">
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="bg-primary/10 rounded-full p-3">
                {isVerification ? (
                  <MailCheck className="text-primary h-10 w-10" />
                ) : (
                  <CheckCircle className="text-primary h-10 w-10" />
                )}
              </div>
              <h2 className="text-center text-xl font-semibold">
                {isVerification
                  ? "Email Verified Successfully"
                  : "Email Changed Successfully"}
              </h2>
              <p className="text-muted-foreground max-w-sm text-center">
                {isVerification
                  ? "Your email address has been verified. You can now use all features of the application."
                  : "Your email address has been changed successfully. You may need to verify your new email address."}
              </p>
            </div>

            <div className="flex justify-center pb-4">
              <Button asChild>
                <Link href="/">Return to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
