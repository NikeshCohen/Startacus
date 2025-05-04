import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import SSOAuthBtns from "@/app/(auth)/_components/SSOAuthBtns";
import SignInForm from "@/app/(auth)/_components/SignInForm";

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
  searchParams: Promise<{ redirectUrl?: string }>;
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
    <>
      <section className="flex justify-center items-center p-4 pt-24 w-full min-h-screen">
        <div className="relative w-full max-w-md">
          <Card className="relative bg-card/40 backdrop-blur-sm border-t-4 border-t-primary overflow-hidden transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
            <CardHeader className="space-y-1 pt-4">
              <CardTitle className="flex justify-center items-center text-center">
                <Logo />
              </CardTitle>
              <CardDescription className="text-base text-center">
                Welcome back! Sign into your account
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

              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm text-center">
                  By signing in, you agree to our{" "}
                  <Link
                    href="/tos#terms-of-service"
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/tos#privacy-policy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center gap-1 py-1 border-t text-sm pointer-events-auto">
              <p className="text-muted-foreground">
                Don&apos;t have an account?
              </p>
              <Link href="/sign-up" className="text-primary underline">
                Sign Up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
