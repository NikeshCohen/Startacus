"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { clsx } from "clsx";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  width?: number;
  height?: number;
}

function Logo({ className, size = "lg", width = 20, height = 20 }: LogoProps) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href="/" className={clsx("flex items-center", className)}>
      {theme === "light" && (
        <Image
          src="/icon(black).png"
          alt="Logo"
          width={width}
          height={height}
          className="mr-2"
        />
      )}
      {theme === "dark" && (
        <Image
          src="/icon(white).png"
          alt="Logo"
          width={width}
          height={height}
          className="mr-2"
        />
      )}
      <h1 className={clsx("relative font-bold tracking-wide", `text-${size}`)}>
        Startacus
      </h1>
    </Link>
  );
}

export default Logo;
