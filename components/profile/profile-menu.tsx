"use client";

import { useState } from "react";

import { Session, User } from "better-auth";
import { ShieldIcon, UserIcon } from "lucide-react";

import { AvatarUpload } from "@/components/profile/avatar-upload";
import ChangeEmail from "@/components/profile/change-email";
import { NameEditor } from "@/components/profile/name-editor";
import {
  Dialog,
  DialogContent,
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
  open,
  onOpenChange,
}: ProfileMenuProps) {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-h-[30vh] flex-col justify-start overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Profile Management</DialogTitle>
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
          <TabsContent value="security" className="mt-4">
            <p className="text-muted-foreground text-sm">
              Update your security settings and preferences.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
