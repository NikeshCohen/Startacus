"use client";

import { useCallback, useRef, useState } from "react";

import { User } from "better-auth";
import { Upload } from "lucide-react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { toast } from "react-hot-toast";

import { LoaderButton, LoaderIcon } from "@/components/global/LoaderButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

import { authClient } from "@/lib/auth/auth-client";
import { useUploadThing } from "@/lib/uploadthing";
import { getCroppedImg } from "@/lib/utils";
import { cn, getInitials } from "@/lib/utils";

interface AvatarUploadProps {
  user: User;
}

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function AvatarUpload({ user }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(user.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropping state
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPEG, and WebP formats are allowed");
      return;
    }

    // Read the file and display crop UI
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setTempImage(reader.result as string);
      setIsCropDialogOpen(true);
    });
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropCancel = () => {
    setTempImage(null);
    setIsCropDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Reset crop and zoom values for next time
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleCropConfirm = async () => {
    try {
      setIsUploading(true);
      if (tempImage && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);

        // Convert the cropped image to a file
        const file = await fetch(croppedImage)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], "avatar.png", { type: "image/png" }),
          );

        await startUpload([file]);
        setIsCropDialogOpen(false);
        setTempImage(null);
      }
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to process image");
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="bg-card/60 p-4 border rounded-lg">
        <div className="flex items-center gap-4">
          <div
            onClick={handleClick}
            className={cn(
              "group relative cursor-pointer",
              (isUploading || isUploadThingUploading) && "cursor-wait",
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
                isUploading || isUploadThingUploading
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100",
              )}
            >
              {isUploading || isUploadThingUploading ? (
                <LoaderIcon className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-medium text-lg">Avatar</h3>
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
        <p className="mt-3 pt-2 border-t text-muted-foreground text-xs">
          An avatar is optional but strongly recommended. Max size: 4MB.
          Formats: PNG, JPEG, WebP.
        </p>
      </div>

      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Avatar</DialogTitle>
          </DialogHeader>

          <div className="relative bg-transparent my-4 rounded-md w-full h-[280px] overflow-hidden">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
                style={{
                  containerStyle: {
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                  },
                  cropAreaStyle: {
                    background: "transparent",
                    boxShadow: "0 0 0 9999em rgba(0, 0, 0, 0.5)",
                  },
                  mediaStyle: {
                    background: "transparent",
                  },
                }}
              />
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <label htmlFor="zoom" className="font-medium text-sm">
                Zoom
              </label>
              <span className="text-muted-foreground text-xs">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <Slider
              id="zoom"
              min={1}
              max={3}
              step={0.05}
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              className="w-full"
            />
          </div>

          <DialogFooter className="flex justify-between sm:justify-between gap-2">
            <LoaderButton
              type="button"
              variant="outline"
              onClick={handleCropCancel}
              disabled={isUploading}
              className="flex-1"
            >
              Cancel
            </LoaderButton>
            <LoaderButton
              type="button"
              onClick={handleCropConfirm}
              isLoading={isUploading}
              className="flex-1"
            >
              Apply
            </LoaderButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
