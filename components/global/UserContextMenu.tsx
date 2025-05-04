"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { LogOutIcon, UserIcon } from "lucide-react";
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
  const { data: session } = authClient.useSession();

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
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <UserProfileAvatar user={session.user} className={className} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-1 w-36">
          <DropdownMenuItem
            className="py-1.5 text-xs cursor-pointer"
            onClick={handleOpenProfile}
          >
            <UserIcon className="mr-1.5 w-3 h-3" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isLoggingOut ? (
            <DropdownMenuItem className="opacity-70 py-1.5 text-xs cursor-not-allowed">
              <LogOutIcon className="mr-1.5 w-3 h-3 animate-spin" />
              Signing out...
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="py-1.5 text-xs cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOutIcon className="mr-1.5 w-3 h-3" />
              Sign out
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
