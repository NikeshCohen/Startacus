"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";

import { LoaderButton } from "@/components/global/LoaderButton";
import { useAccounts } from "@/components/profile/queries";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { authClient } from "@/lib/auth/auth-client";
import { getQueryClient } from "@/lib/getQueryClient";

export function UserAccounts() {
  const queryClient = getQueryClient();
  const { data: accounts, isLoading, error } = useAccounts();
  const [processingGoogle, setProcessingGoogle] = useState(false);
  const [processingGithub, setProcessingGithub] = useState(false);

  const hasGoogleAccount = accounts?.some((acc) => acc.provider === "google");
  const hasGithubAccount = accounts?.some((acc) => acc.provider === "github");

  const handleLinkGoogle = async () => {
    setProcessingGoogle(true);
    await authClient.linkSocial(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onResponse: () => {
          setProcessingGoogle(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to link Google account");
          console.error("Failed to link Google account:", ctx.error);
        },
      },
    );
  };

  const handleLinkGithub = async () => {
    setProcessingGithub(true);
    await authClient.linkSocial(
      {
        provider: "github",
        callbackURL: "/",
      },
      {
        onResponse: () => {
          setProcessingGithub(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to link GitHub account");
          console.error("Failed to link GitHub account:", ctx.error);
        },
      },
    );
  };

  const handleUnlinkGoogle = async () => {
    setProcessingGoogle(true);
    await authClient.unlinkAccount(
      {
        providerId: "google",
      },
      {
        onResponse: () => {
          setProcessingGoogle(false);
        },
        onSuccess: () => {
          toast.success("Google account unlinked successfully");
          queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
        },
        onError: (ctx) => {
          if (ctx.error.code === "YOU_CANT_UNLINK_YOUR_LAST_ACCOUNT") {
            toast.error("Your primary account can not be unlinked");
            return;
          }
          toast.error(ctx.error.message || "Failed to unlink Google account");
          console.error("Failed to unlink Google account:", ctx.error);
        },
      },
    );
  };

  const handleUnlinkGithub = async () => {
    setProcessingGithub(true);
    await authClient.unlinkAccount(
      {
        providerId: "github",
      },
      {
        onResponse: () => {
          setProcessingGithub(false);
        },
        onSuccess: () => {
          toast.success("GitHub account unlinked successfully");
          queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
        },
        onError: (ctx) => {
          if (ctx.error.code === "YOU_CANT_UNLINK_YOUR_LAST_ACCOUNT") {
            toast.error("Your primary account can not be unlinked");
            return;
          }

          toast.error(ctx.error.message || "Failed to unlink GitHub account");
          console.error("Failed to unlink GitHub account:", ctx.error);
        },
      },
    );
  };

  return (
    <div className="bg-card/60 rounded-lg border p-4">
      <h2 className="text-lg font-medium">Providers</h2>
      <p className="text-muted-foreground pb-1 text-sm">
        Connect your account with a third-party service. You can link accounts
        with different email addresses.
      </p>

      {isLoading && (
        <div className="space-y-2 pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              className="mb-2 flex flex-row items-center gap-3 px-4 py-3"
            >
              <Skeleton className="h-6 w-6" />
              <div className="flex flex-grow flex-col">
                <Skeleton className="mb-1 h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-20" />
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-destructive py-2">
          Failed to load accounts. Please try again.
        </div>
      )}

      {!isLoading && accounts && (
        <div className="space-y-2 pt-4">
          {/* Google Account */}
          <Card className="mb-2 flex flex-row items-center gap-3 px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1.25em"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            <div className="flex flex-grow flex-col">
              <span className="text-sm font-semibold">Google</span>
            </div>
            <LoaderButton
              size="xs"
              variant={hasGoogleAccount ? "destructive" : "secondary"}
              isLoading={hasGoogleAccount ? processingGoogle : processingGoogle}
              disabled={
                (hasGoogleAccount && processingGoogle) ||
                (!hasGoogleAccount && processingGoogle)
              }
              onClick={hasGoogleAccount ? handleUnlinkGoogle : handleLinkGoogle}
            >
              {hasGoogleAccount ? "Unlink" : "Link"}
            </LoaderButton>
          </Card>

          {/* GitHub Account */}
          <Card className="mb-2 flex flex-row items-center gap-3 px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1.25em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              ></path>
            </svg>
            <div className="flex flex-grow flex-col">
              <span className="text-sm font-semibold">GitHub</span>
            </div>
            <LoaderButton
              size="xs"
              variant={hasGithubAccount ? "destructive" : "secondary"}
              isLoading={hasGithubAccount ? processingGithub : processingGithub}
              disabled={
                (hasGithubAccount && processingGithub) ||
                (!hasGithubAccount && processingGithub)
              }
              onClick={hasGithubAccount ? handleUnlinkGithub : handleLinkGithub}
            >
              {hasGithubAccount ? "Unlink" : "Link"}
            </LoaderButton>
          </Card>
        </div>
      )}
    </div>
  );
}

export default UserAccounts;
