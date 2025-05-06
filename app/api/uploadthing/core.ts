import { headers } from "next/headers";

import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

import { auth } from "@/lib/auth/auth";

const f = createUploadthing();
const utapi = new UTApi();

function getFileKeyFromUrl(url: string): string | null {
  try {
    if (!url) return null;

    const parts = url.split("/");
    const fileKey = parts[parts.length - 1];

    return fileKey || null;
  } catch (error) {
    console.error("Error extracting file key:", error);
    return null;
  }
}

export const ourFileRouter = {
  avatarUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        query: {
          disableCookieCache: true,
        },
        headers: await headers(),
      });

      if (!session) throw new Error("Unauthorized");

      return { userId: session.user.id, userImage: session.user.image };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      // Delete the old image if it exists
      if (metadata.userImage) {
        try {
          const fileKey = getFileKeyFromUrl(metadata.userImage);

          if (fileKey) {
            console.log("Attempting to delete file key:", fileKey);
            // Non-blocking delete
            utapi.deleteFiles(fileKey).catch((err) => {
              console.error("Error deleting old avatar:", err);
            });
          }
        } catch (error) {
          console.error("Failed to delete old avatar:", error);
        }
      }

      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
