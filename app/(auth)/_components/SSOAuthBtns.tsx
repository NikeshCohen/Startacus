"use client";

import { startTransition, useActionState } from "react";

import Link from "next/link";

import { Mail } from "lucide-react";

import { LoaderButton } from "@/components/global/LoaderButton";
import { Button } from "@/components/ui/button";

import { signInGithub, signInGoogle } from "@/lib/auth/auth-client";

function SSOAuthBtns({
  redirectUrl,
  hideMagicLink = false,
}: {
  redirectUrl: string;
  hideMagicLink?: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsgGithub, dispatchGithub, isLoadingGithub] = useActionState(
    () => signInGithub(redirectUrl),
    undefined,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsgGoogle, dispatchGoogle, isLoadingGoogle] = useActionState(
    () => signInGoogle(redirectUrl),
    undefined,
  );

  const handleGithubSignIn = () => {
    startTransition(() => {
      dispatchGithub();
    });
  };

  const handleGoogleSignIn = () => {
    startTransition(() => {
      dispatchGoogle();
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <LoaderButton
          variant="secondary"
          className="w-full gap-2"
          disabled={isLoadingGoogle || isLoadingGithub}
          isLoading={isLoadingGoogle}
          onClick={handleGoogleSignIn}
        >
          {!isLoadingGoogle && (
            <svg
              className="h-4 w-4"
              viewBox="0 0 256 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
          )}
          <span className="hidden md:block">Continue with Google</span>{" "}
          <span className="block md:hidden">Google</span>
        </LoaderButton>
        <LoaderButton
          variant="secondary"
          className="w-full gap-2"
          disabled={isLoadingGoogle || isLoadingGithub}
          isLoading={isLoadingGithub}
          onClick={handleGithubSignIn}
        >
          {!isLoadingGithub && (
            <svg
              className="h-4 w-4"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="currentColor"
              />
            </svg>
          )}
          <span className="hidden md:block">Continue with Github</span>{" "}
          <span className="block md:hidden">Github</span>
        </LoaderButton>
      </div>

      {!hideMagicLink && (
        <Button
          asChild
          variant="outline"
          className="mt-2 w-full border md:mt-4"
        >
          <Link href="/magic-link">
            <Mail />
            <span>Continue with Magic Link</span>
          </Link>
        </Button>
      )}
    </div>
  );
}

export default SSOAuthBtns;
