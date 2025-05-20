"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";
import { LogOutIcon, UserIcon, UsersIcon } from "lucide-react";
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

export default function UserContextMenu({ className }: { className?: string }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session } = authClient.useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
            <UserProfileAvatar user={session.user} className={className} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"}>
          <div className="mb-1 px-2 py-1.5">
            <div className="text-xs font-medium">{session.user.name}</div>
            <div className="text-muted-foreground text-xs">
              {session.user.email}
            </div>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer py-1.5 text-xs"
            onClick={handleOpenProfile}
          >
            <UserIcon className="mr-1.5 h-3 w-3" />
            Profile
          </DropdownMenuItem>

          {session.user.role === "admin" && (
            <>
              <DropdownMenuItem
                className="cursor-pointer py-1.5 text-xs"
                asChild
              >
                <Link href="/admin/users">
                  <UsersIcon className="mr-1.5 h-3 w-3" />
                  User Management
                </Link>
              </DropdownMenuItem>
            </>
          )}

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
