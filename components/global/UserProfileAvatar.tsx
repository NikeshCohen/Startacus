"use client";

import React from "react";

// Adjusted import path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Simplified type for the user object passed as a prop
interface UserProp {
  name?: string | null;
  image?: string | null;
}

/**
 * Extracts initials from a name string.
 * @param name The full name.
 * @returns The initials (e.g., "JD" for "John Doe").
 */
const getInitials = (name: string | null | undefined): string => {
  if (!name) return "?";
  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0][0]?.toUpperCase() || "?";
  }
  return (
    (names[0][0]?.toUpperCase() || "") +
    (names[names.length - 1][0]?.toUpperCase() || "")
  );
};

interface UserProfileAvatarProps {
  user?: UserProp | null;
  isPending?: boolean;
  className?: string;
}

export default function UserProfileAvatar({
  user,
  isPending,
  className,
}: UserProfileAvatarProps) {
  if (isPending) {
    return <Skeleton className={`h-10 w-10 rounded-full ${className}`} />;
  }

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);

  console.log(user.image);

  return (
    <Avatar className={className}>
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name || "User Avatar"} />
      ) : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
