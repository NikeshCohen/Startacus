"use client";

import { useState } from "react";

import { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  MessageSquare,
  Sparkles,
  UserIcon,
} from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import toast from "react-hot-toast";

import ProfileMenu from "@/components/profile/profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth/auth-client";

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: session } = authClient.useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useQueryState(
    "profile",
    parseAsBoolean.withDefault(false),
  );

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

  if (!session?.user) return null;

  const user = session.user;

  return (
    <>
      <ProfileMenu
        user={user}
        session={session.session}
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                aria-label="User profile and options"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={`${user.name}'s profile`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
              role="menu"
              aria-label="User options"
            >
              <div className="mb-1 flex items-center gap-2 px-2 py-1.5">
                <Avatar className="h-9 w-9 rounded-md">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={`${user.name}'s profile`}
                  />
                  <AvatarFallback className="rounded-md">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-left text-xs font-medium">
                    {user.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {user.email}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  role="menuitem"
                >
                  <Sparkles className="mr-1.5 h-3 w-3" aria-hidden="true" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={handleOpenProfile}
                  role="menuitem"
                >
                  <UserIcon className="mr-1.5 h-3 w-3" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  role="menuitem"
                >
                  <BadgeCheck className="mr-1.5 h-3 w-3" aria-hidden="true" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  role="menuitem"
                >
                  <CreditCard className="mr-1.5 h-3 w-3" aria-hidden="true" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  role="menuitem"
                  asChild
                >
                  <Link href={"/feedback" as Route}>
                    <MessageSquare
                      className="mr-1.5 h-3 w-3"
                      aria-hidden="true"
                    />
                    Feedback
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer py-1.5 text-xs"
                onClick={handleSignOut}
                role="menuitem"
              >
                <LogOut className="mr-1.5 h-3 w-3" aria-hidden="true" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
