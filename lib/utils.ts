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
 * Creates a cropped image based on the provided source image and crop area.
 * @param imageSrc The source image as a data URL or URL string.
 * @param pixelCrop The crop dimensions with x, y coordinates and width, height values.
 * @returns Promise resolving to a data URL of the cropped image.
 */
export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size to the desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // Return the cropped image as a data URL
  return canvas.toDataURL("image/png");
};

/**
 * Creates an image element from a source URL.
 * @param url The source URL of the image.
 * @returns Promise resolving to an HTMLImageElement once loaded.
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.crossOrigin = "anonymous"; // Avoid CORS issues when processing images
    image.src = url;
  });
