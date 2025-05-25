"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";
import { LogOutIcon, UserIcon, Users } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import toast from "react-hot-toast";

import UserProfileAvatar from "@/components/global/UserProfileAvatar";
import ProfileMenu from "@/components/profile/profile-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth/auth-client";

export default function UserContextMenu() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session } = authClient.useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useQueryState(
    "profile",
    parseAsBoolean.withDefault(false),
  );

  if (!session?.user) return null;

  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");

    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
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

    setIsLoggingOut(false);
  };

  const handleOpenProfile = () => {
    setIsProfileMenuOpen(true);
  };

  return (
    <>
      <ProfileMenu
        user={session.user}
        session={session.session}
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <UserProfileAvatar user={session.user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"}>
          <div className="flex items-center gap-2 mb-1 px-2 py-1.5">
            <UserProfileAvatar
              user={session.user}
              className="rounded-sm w-9 h-9"
            />
            <div className="flex flex-col">
              <div className="font-medium text-xs text-left">
                {session.user.name}
              </div>
              <div className="text-muted-foreground text-xs">
                {session.user.email}
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-xs cursor-pointer y-1.5"
            onClick={handleOpenProfile}
          >
            <UserIcon className="mr-1.5 w-3 h-3" />
            Profile
          </DropdownMenuItem>

          {session.user.role === "admin" && (
            <DropdownMenuItem className="py-1.5 text-xs cursor-pointer" asChild>
              <Link href="/admin/users" className="flex items-center gap-3.5">
                <Users />
                <span>User Management</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="py-1.5 text-xs cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOutIcon className="mr-1.5 w-3 h-3" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
