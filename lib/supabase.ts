import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const NEXT_PUBLIC_SUPABASE_URL = z
  .string({
    description: "The URL of the Supabase project",
    required_error:
      "The environment variable NEXT_PUBLIC_SUPABASE_URL is required",
  })
  .url()
  .parse(process.env.NEXT_PUBLIC_SUPABASE_URL);

const NEXT_PUBLIC_SUPABASE_ANON_KEY = z
  .string({
    description: "The anonymous key for the Supabase project",
    required_error:
      "The environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY is required",
  })
  .parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

function isProviderImage(imageUrl: string | null): boolean {
  if (!imageUrl) return false;

  const providerDomains = [
    "avatars.githubusercontent.com",
    "github.com",
    "githubusercontent.com",
    "googleusercontent.com",
    "gravatar.com",
  ];

  try {
    const url = new URL(imageUrl);
    return providerDomains.some((domain) => url.hostname.includes(domain));
  } catch (e) {
    console.error("Error parsing image URL:", e);
    return false;
  }
}

function deleteImageFromStorage(imageUrl: string | null) {
  if (!imageUrl || isProviderImage(imageUrl)) return;

  try {
    const url = new URL(imageUrl);
    const path = url.pathname;
    const filePath = path.split("/avatars/")[1];

    if (filePath) {
      supabase.storage
        .from("avatars")
        .remove([filePath])
        .then(({ error }) => {
          if (error) {
            console.log("Error deleting previous avatar:", error);
          }
        })
        .catch((err) => {
          console.log("Error deleting previous avatar:", err);
        });
    }
  } catch (e) {
    console.log("Error parsing image URL:", e);
  }
}

export async function uploadAvatar(
  file: File,
  userId: string,
  currentUserImage?: string | null,
) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    if (currentUserImage) {
      deleteImageFromStorage(currentUserImage);
    }

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
}
