"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { clsx } from "clsx";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

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

export function Logo({
  className,
  size = "lg",
  width = 20,
  height = 20,
}: LogoProps) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={clsx("flex items-center", className)}>
        <div
          className="bg-muted mr-2 animate-pulse rounded-md"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
        <div
          className={cn(
            "bg-muted h-6 w-24 animate-pulse rounded-md",
            `h-${size === "lg" ? "6" : size === "sm" ? "4" : "5"}`,
          )}
        />
      </div>
    );
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
      <h1 className={cn("relative font-bold tracking-wide", `text-${size}`)}>
        Startacus
      </h1>
    </Link>
  );
}

export function LogoIcon({ className, width = 20, height = 20 }: LogoProps) {
  const { theme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={cn(
          "bg-accent/30 mb-2 flex animate-pulse items-center justify-center rounded-full p-2",
          className,
        )}
        style={{ width: `${width + 16}px`, height: `${height + 16}px` }}
      />
    );
  }

  return (
    <Link
      href="https://github.com/NikeshCohen/Startacus"
      className={cn(
        "bg-accent mb-2 flex items-center justify-center rounded-full p-2",
        className,
      )}
    >
      <Image
        src={`${theme === "light" ? "/icon(black).png" : "/icon(white).png"}`}
        alt="Logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
