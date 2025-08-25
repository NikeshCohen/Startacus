import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false, // Remove console.logs in production except for errors and warnings
  },
  images: {
    remotePatterns: [
      {
        hostname: "xsgames.co",
      },
    ],
  },
  experimental: {
    devtoolSegmentExplorer: true,
    viewTransition: true,
  },
};

export default nextConfig;
