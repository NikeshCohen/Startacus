"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";
import { LayoutDashboard, LogOutIcon, UserIcon } from "lucide-react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);
  };

  return (
    <>
      <ProfileMenu
        user={session.user}
        session={session.session}
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
      />
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <UserProfileAvatar user={session.user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"}>
          <div className="mb-1 flex items-center gap-2 px-2 py-1.5">
            <UserProfileAvatar
              user={session.user}
              className="h-9 w-9 rounded-md"
            />
            <div className="flex flex-col">
              <div className="text-left text-xs font-medium">
                {session.user.name}
              </div>
              <div className="text-muted-foreground text-xs">
                {session.user.email}
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="y-1.5 cursor-pointer text-xs" asChild>
            <Link href="/dashboard" className="flex w-full items-center gap-2">
              <LayoutDashboard className="mr-1.5 h-3 w-3" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="y-1.5 cursor-pointer text-xs"
            onClick={handleOpenProfile}
          >
            <UserIcon className="mr-1.5 h-3 w-3" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer py-1.5 text-xs"
            onClick={handleSignOut}
          >
            <LogOutIcon className="mr-1.5 h-3 w-3" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
