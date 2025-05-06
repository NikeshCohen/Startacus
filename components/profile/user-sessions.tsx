"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Session as SessionType } from "better-auth";
import { LaptopIcon, SmartphoneIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { UAParser } from "ua-parser-js";

import { LoaderButton } from "@/components/global/LoaderButton";
import { useSessions } from "@/components/profile/queries";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { authClient } from "@/lib/auth/auth-client";
import { getQueryClient } from "@/lib/getQueryClient";

interface SessionProps {
  session: SessionType;
  isCurrentSession: boolean;
}

function UserSessions({ currentSession }: { currentSession: SessionType }) {
  const router = useRouter();
  const queryClient = getQueryClient();

  const { data: sessions, isLoading, error } = useSessions();

  const [isRevokingOther, setIsRevokingOther] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  const orderedSessions = sessions
    ? [
        ...sessions.filter((session) => session.id === currentSession.id),
        ...sessions.filter((session) => session.id !== currentSession.id),
      ]
    : [];

  const handleRevokeOtherSessions = async () => {
    setIsRevokingOther(true);

    await authClient.revokeOtherSessions(
      {},
      {
        onResponse: () => {
          setIsRevokingOther(false);
        },
        onSuccess: () => {
          toast.success("Other sessions revoked successfully");
          queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to revoke other sessions");
          console.error("Failed to revoke other sessions:", ctx.error);
        },
      },
    );
  };

  const handleRevokeAllSessions = async () => {
    setIsRevokingAll(true);
    await authClient.revokeSessions(
      {},
      {
        onResponse: () => {
          setIsRevokingAll(false);
        },
        onSuccess: () => {
          toast.success("All sessions revoked successfully");
          queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to revoke all sessions");
          console.error("Failed to revoke all sessions:", ctx.error);
        },
      },
    );

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="bg-card/60 rounded-lg border p-4">
      <h2 className="text-lg font-medium">Sessions</h2>
      <p className="text-muted-foreground pb-1 text-sm">
        Manage your active sessions and revoke access.
      </p>

      {isLoading && (
        <div className="space-y-2 pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              className="mb-2 flex flex-row items-center gap-3 px-4 py-3"
            >
              <Skeleton className="h-4 w-4" />
              <div className="flex flex-grow flex-col">
                <Skeleton className="mb-1 h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-20" />
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-destructive py-2">
          Failed to load sessions. Please try again.
        </div>
      )}

      {!isLoading && (
        <div className="space-y-2 pt-4">
          {orderedSessions.map((session) => (
            <Session
              key={session.id}
              session={session}
              isCurrentSession={session.id === currentSession.id}
            />
          ))}
        </div>
      )}

      {!isLoading && sessions && sessions.length > 1 && (
        <div className="mt-4 mb-2 flex flex-col gap-2 md:flex-row">
          <LoaderButton
            variant="secondary"
            size="xs"
            isLoading={isRevokingOther}
            disabled={isRevokingOther || isRevokingAll}
            onClick={handleRevokeOtherSessions}
            className="flex-1 p-1"
          >
            Revoke Other Sessions
          </LoaderButton>
          <LoaderButton
            variant="destructive"
            size="xs"
            isLoading={isRevokingAll}
            disabled={isRevokingAll || isRevokingOther}
            onClick={handleRevokeAllSessions}
            className="flex-1 p-1"
          >
            Revoke All Sessions
          </LoaderButton>
        </div>
      )}
    </div>
  );
}

function Session({ session, isCurrentSession }: SessionProps) {
  const router = useRouter();
  const queryClient = getQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleRevoke = async () => {
    setIsLoading(true);

    if (isCurrentSession) {
      const toastId = toast.loading("Signing out...");

      await authClient.signOut({
        fetchOptions: {
          onResponse: () => {
            setIsLoading(false);
          },
          onSuccess: () => {
            router.push("/");
            toast.success("Signed out successfully", { id: toastId });
          },
          onError: (ctx) => {
            toast.error("Failed to sign out", { id: toastId });
            console.error("Sign out error:", ctx.error);
          },
        },
      });
    } else {
      await authClient.revokeSession(
        {
          token: session.token,
        },
        {
          onResponse: () => {
            setIsLoading(false);
          },
          onSuccess: () => {
            toast.success(isCurrentSession ? "Signed out" : "Session revoked");
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message ||
                (isCurrentSession
                  ? "Failed to sign out"
                  : "Failed to revoke session"),
            );
            console.error("Failed to revoke session:", ctx.error);
            setIsLoading(false);
          },
        },
      );
    }
    queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
  };

  const parser = new UAParser(session.userAgent as string);
  const isMobile = parser.getDevice().type === "mobile";

  return (
    <Card className="mb-2 flex flex-row items-center gap-3 px-4 py-3">
      {isMobile ? (
        <SmartphoneIcon className="size-4" />
      ) : (
        <LaptopIcon className="size-4" />
      )}

      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {isCurrentSession ? "Current Session" : session?.ipAddress}
        </span>

        <span className="text-muted-foreground text-xs">
          {parser.getOS().name}, {parser.getBrowser().name}
        </span>
      </div>

      <LoaderButton
        className="ml-auto"
        isLoading={isLoading}
        disabled={isLoading}
        size="xs"
        variant="secondary"
        onClick={handleRevoke}
      >
        {isCurrentSession ? "Sign Out" : "Revoke"}
      </LoaderButton>
    </Card>
  );
}

export default UserSessions;
