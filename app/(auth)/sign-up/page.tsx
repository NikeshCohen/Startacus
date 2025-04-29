import type { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/app/(auth)/_components/SignUpForm";

import Logo from "@/components/global/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for a Startacus account",
};

interface PageProps {
  searchParams: Promise<{ redirectUrl?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const redirectUrl = params.redirectUrl ?? "/";

  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4 pt-24">
      <div className="relative w-full max-w-md">
        <Card className="bg-card/40 border-t-primary relative overflow-hidden border-t-4 backdrop-blur-sm transition-all duration-300">
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent opacity-50" />
          <CardHeader className="space-y-1 pt-4">
            <CardTitle className="flex items-center justify-center text-center">
              <Logo />
            </CardTitle>
            <CardDescription className="text-center text-base">
              Create an account to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6 pt-2 pb-2">
            <SignUpForm redirectUrl={redirectUrl} />

            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-muted-foreground text-center text-sm">
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

          <CardFooter className="pointer-events-auto flex justify-center gap-1 border-t py-1 text-sm">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link href="/sign-in" className="text-primary underline">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
