import { Metadata, Route } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import AuthCardFooter from "@/app/(main)/(auth)/_components/AuthCardFooter";
import SSOAuthBtns from "@/app/(main)/(auth)/_components/SSOAuthBtns";
import SignInForm from "@/app/(main)/(auth)/_components/SignInForm";

import Logo from "@/components/global/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Startacus account",
};

interface PageProps {
  searchParams: Promise<{ redirectUrl?: Route }>;
}

export default async function SignIn({ searchParams }: PageProps) {
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
              Welcome back! Sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6 pt-2 pb-2">
            <div className="space-y-4"></div>

            <SignInForm redirectUrl={redirectUrl} />

            <div className="flex items-center gap-3 px-2">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-xs">OR</span>
              <Separator className="flex-1" />
            </div>

            <SSOAuthBtns redirectUrl={redirectUrl} />

            <AuthCardFooter />
          </CardContent>

          <CardFooter className="pointer-events-auto flex justify-center gap-1 border-t py-1 text-sm">
            <p className="text-muted-foreground">Don&apos;t have an account?</p>
            <Link href="/sign-up" className="text-primary underline">
              Sign Up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
