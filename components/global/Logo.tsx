"use client";

import { useEffect, useState } from "react";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { clsx } from "clsx";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/* eslint-disable react-hooks/set-state-in-effect */

interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
  width?: number;
  height?: number;
  href?: Route;
  showTextLogo?: boolean;
}

export function Logo({
  className,
  size = "lg",
  width = 20,
  height = 20,
  href = "/",
  showTextLogo = true,
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
    <Link
      href={href}
      className={clsx(
        "inline-flex w-max items-center justify-self-start",
        showTextLogo ? "gap-2" : "gap-0",
        className,
      )}
    >
      <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
        {theme === "light" && (
          <Image
            src="/icon(black).png"
            alt="Logo"
            width={width}
            height={height}
            className="transition-transform duration-200"
          />
        )}
        {theme === "dark" && (
          <Image
            src="/icon(white).png"
            alt="Logo"
            width={width}
            height={height}
            className="transition-transform duration-200"
          />
        )}
      </div>
      <div
        className={cn(
          "overflow-hidden transition-[width] duration-200",
          showTextLogo ? "w-auto" : "w-0",
        )}
      >
        <h1
          className={cn(
            "relative font-bold tracking-wide whitespace-nowrap transition-[transform,opacity] duration-200",
            `text-${size}`,
            showTextLogo
              ? "translate-x-0 opacity-100"
              : "-translate-x-4 opacity-0",
          )}
        >
          Startacus
        </h1>
      </div>
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
          "bg-muted mb-2 flex animate-pulse items-center justify-center rounded-full p-2",
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
        "bg-muted mb-2 flex items-center justify-center rounded-full p-2",
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
