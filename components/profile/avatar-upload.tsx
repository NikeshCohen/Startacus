"use client";

import { useRef, useState } from "react";

import { User } from "better-auth";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

import { LoaderIcon } from "@/components/global/LoaderButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth/auth-client";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, getInitials } from "@/lib/utils";

interface AvatarUploadProps {
  user: User;
}

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function AvatarUpload({ user }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(user.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading: isUploadThingUploading } = useUploadThing(
    "avatarUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          const url = res[0].ufsUrl;
          setImage(url);
          updateUserProfile(url);
          toast.success("Avatar uploaded successfully");
        }
        setIsUploading(false);
      },
      onUploadError: (error) => {
        toast.error(error.message || "Failed to upload avatar");
        setIsUploading(false);
        console.error("Upload error:", error);
      },
    },
  );

  const updateUserProfile = async (imageUrl: string) => {
    try {
      await authClient.updateUser(
        {
          image: imageUrl,
        },
        {
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Failed to update avatar in your profile",
            );
            console.error(
              "Failed to update user profile with avatar:",
              ctx.error,
            );
          },
        },
      );
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleClick = () => {
    if (isUploading || isUploadThingUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPEG, and WebP formats are allowed");
      return;
    }

    setIsUploading(true);
    await startUpload([file]);
  };

  return (
    <div className="bg-card/60 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <div
          onClick={handleClick}
          className={cn(
            "group relative cursor-pointer",
            (isUploading || isUploadThingUploading) && "cursor-wait",
          )}
        >
          <Avatar className="h-16 w-16">
            {image ? (
              <AvatarImage src={image} alt={user.name || "User avatar"} />
            ) : null}
            <AvatarFallback className="text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity",
              isUploading || isUploadThingUploading
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
            )}
          >
            {isUploading || isUploadThingUploading ? (
              <LoaderIcon className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Upload className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-medium">Avatar</h3>

          <p className="text-muted-foreground text-sm">
            {isUploading || isUploadThingUploading
              ? "Uploading your new avatar..."
              : "Click on the avatar to upload a custom one from your files."}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </div>
      </div>
      <p className="text-muted-foreground mt-3 border-t pt-2 text-xs">
        An avatar is optional but strongly recommended. Max size: 3MB. Formats:
        PNG, JPEG, WebP.
      </p>
    </div>
  );
}
