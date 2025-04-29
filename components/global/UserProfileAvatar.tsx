"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { getInitials } from "@/lib/utils";

interface UserProp {
  name?: string | null;
  image?: string | null;
}

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

  return (
    <Avatar className={className}>
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name || "User Avatar"} />
      ) : null}
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}
