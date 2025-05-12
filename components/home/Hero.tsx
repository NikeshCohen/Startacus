"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { LogoIcon } from "@/components/global/Logo";
import { GradientBackground } from "@/components/global/backgrounds";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-4 py-16 md:gap-8 md:py-24">
      <GradientBackground />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoIcon />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-4xl font-bold md:text-6xl"
      >
        The
        <span className="text-primary relative mx-1 inline-block stroke-current text-4xl font-extrabold uppercase md:text-6xl">
          fastest
          <svg
            className="absolute -bottom-0.5 max-h-1.5 w-full"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
              strokeWidth="2"
            ></path>
          </svg>
        </span>
        way to <br className="hidden md:block" /> get your startup battle ready
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 flex items-center justify-center gap-4"
      >
        <Button effect="shineHover" className="flex items-center" asChild>
          <Link href="https://vercel.com/new/clone?repository-url=https://github.com/NikeshCohen/Startacus/tree/main">
            <span>Deploy to Vercel</span>
            <div className="mx-2 h-6 border-l-2 border-white"></div>
            <svg
              viewBox="0 0 256 222"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path fill="currentColor" d="m128 0 128 221.705H0z" />
            </svg>
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="https://github.com/NikeshCohen/Startacus">
            <span>Star on GitHub</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="currentColor"
              />
            </svg>
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}

export default Hero;
