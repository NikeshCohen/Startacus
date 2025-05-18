import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false, // Remove console.logs in production except for errors
  },
  images: {
    remotePatterns: [
      {
        hostname: "xsgames.co",
      },
    ],
  },
};

export default nextConfig;
