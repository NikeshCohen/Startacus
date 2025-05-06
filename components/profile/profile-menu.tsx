"use client";

import { useState } from "react";

import { Session, User } from "better-auth";
import { ShieldIcon, UserIcon } from "lucide-react";

import { AvatarUpload } from "@/components/profile/avatar-upload";
import ChangeEmail from "@/components/profile/change-email";
import { NameEditor } from "@/components/profile/name-editor";
import UserAccounts from "@/components/profile/user-accounts";
import UserSessions from "@/components/profile/user-sessions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileMenuProps {
  user: User;
  session: Session;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileMenu({
  user,
  session,
  open,
  onOpenChange,
}: ProfileMenuProps) {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-h-[30vh] flex-col justify-start overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Profile Management</DialogTitle>
          <DialogDescription className="text-center">
            Manage your profile settings and account security
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="account"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">
              <UserIcon className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldIcon className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4 space-y-4">
            <AvatarUpload user={user} />
            <NameEditor user={user} />
            <ChangeEmail user={user} />
          </TabsContent>
          <TabsContent value="security" className="mt-4 space-y-4">
            <UserSessions currentSession={session} />
            <UserAccounts />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
