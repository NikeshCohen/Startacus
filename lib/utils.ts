import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a name string.
 * @param name The full name.
 * @returns The initials (e.g., "JD" for "John Doe").
 */
export const getInitials = (name: string | null | undefined): string => {
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

/**
 * Converts an image file to a base64 string.
 * @param file The image file to convert.
 * @returns The base64 string.
 */
export const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
