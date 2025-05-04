"use client";

import { useState } from "react";

import { User } from "better-auth";
import { ShieldIcon, UserIcon } from "lucide-react";

import { AvatarUpload } from "@/components/profile/avatar-upload";
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
      <DialogContent className="flex flex-col justify-start sm:max-w-2xl min-h-[30vh] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Profile Management</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="account"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="account">
              <UserIcon className="mr-2 w-4 h-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldIcon className="mr-2 w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4 mt-4">
            <AvatarUpload user={user} />
            <NameEditor user={user} />
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
