"use client";

import { useRef, useState } from "react";

import { User } from "better-auth";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

import { LoaderIcon } from "@/components/global/LoaderButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth/auth-client";
import { uploadAvatar } from "@/lib/supabase";
import { cn, getInitials } from "@/lib/utils";

interface AvatarUploadProps {
  user: User;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function AvatarUpload({ user }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(user.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 3MB");
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPEG, and WebP formats are allowed");
      return;
    }

    setIsUploading(true);

    try {
      const publicUrl = await uploadAvatar(file, user.id, user.image);

      setImage(publicUrl);

      await authClient.updateUser(
        {
          image: publicUrl,
        },
        {
          onSuccess: () => {
            toast.success("Avatar uploaded successfully");
          },
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
      console.error("Avatar upload failed:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-card/60 shadow-sm p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <div
          onClick={handleClick}
          className={cn(
            "group relative cursor-pointer",
            isUploading && "cursor-wait",
          )}
        >
          <Avatar className="w-16 h-16">
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
              isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {isUploading ? (
              <LoaderIcon className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-medium text-lg">Avatar</h3>

          <p className="text-muted-foreground text-sm">
            {isUploading
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
      <p className="mt-3 pt-2 border-t text-muted-foreground text-xs">
        An avatar is optional but strongly recommended. Max size: 3MB. Formats:
        PNG, JPEG, WebP.
      </p>
    </div>
  );
}
