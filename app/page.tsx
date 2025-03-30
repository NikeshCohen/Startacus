import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

function page() {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <Link
        href="https://github.com/NikeshCohen/Startacus"
        className="bg-accent mb-2 px-2 rounded-full text-white"
      >
        Startacus
      </Link>

      <h1 className="font-bold text-3xl text-center">
        The
        <span className="inline-block relative stroke-current mx-1 font-extrabold text-primary text-4xl uppercase">
          fastest
          <svg
            className="-bottom-0.5 absolute w-full max-h-1.5"
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
      </h1>

      <Button
        effect="shineHover"
        className="flex items-center mt-6 text-white"
        asChild
      >
        <Link href="https://vercel.com/new/clone?repository-url=https://github.com/NikeshCohen/Startacus/tree/main">
          <span>Deploy to Vercel</span>
          <div className="mx-2 border-white border-l-2 h-6"></div>
          <svg className="w-4 h-4" viewBox="0 0 20 20">
            <path d="M10 0L0 20h20L10 0z" fill="currentColor" />
          </svg>
        </Link>
      </Button>
    </section>
  );
}

export default page;
