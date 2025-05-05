"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Session as SessionType } from "better-auth";
import { LaptopIcon, SmartphoneIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { UAParser } from "ua-parser-js";

import { LoaderButton } from "@/components/global/LoaderButton";
import { useSessions } from "@/components/profile/queries";
import { Button } from "@/components/ui/button";
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
    <div className="bg-card/60 p-4 border rounded-lg">
      <div className="font-medium text-lg">Sessions</div>
      <div className="pb-1 text-muted-foreground text-sm">
        Manage your active sessions and revoke access.
      </div>

      {isLoading && (
        <div className="space-y-2 pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              className="flex flex-row items-center gap-3 mb-2 px-4 py-3"
            >
              <Skeleton className="w-4 h-4" />
              <div className="flex flex-col flex-grow">
                <Skeleton className="mb-1 w-32 h-4" />
                <Skeleton className="w-24 h-3" />
              </div>
              <Skeleton className="w-20 h-8" />
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="py-2 text-destructive">
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
        <div className="flex gap-2 mt-4 mb-2">
          <Button
            variant="outline"
            size="xs"
            disabled={isRevokingOther || isRevokingAll}
            onClick={handleRevokeOtherSessions}
            className="flex-1"
          >
            {isRevokingOther ? "Revoking..." : "Revoke Other Sessions"}
          </Button>
          <Button
            variant="outline"
            size="xs"
            disabled={isRevokingAll || isRevokingOther}
            onClick={handleRevokeAllSessions}
            className="flex-1"
          >
            {isRevokingAll ? "Revoking..." : "Revoke All Sessions"}
          </Button>
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
    <Card className="flex flex-row items-center gap-3 mb-2 px-4 py-3">
      {isMobile ? (
        <SmartphoneIcon className="size-4" />
      ) : (
        <LaptopIcon className="size-4" />
      )}

      <div className="flex flex-col">
        <span className="font-semibold text-sm">
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
