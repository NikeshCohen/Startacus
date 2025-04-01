import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function page() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Link
        href="https://github.com/NikeshCohen/Startacus"
        className="bg-accent mb-2 flex items-center justify-center rounded-full p-2 text-white"
      >
        <Image src="/icon(white).png" alt="Logo" width={25} height={25} />
      </Link>

      <h1 className="text-center text-3xl font-bold">
        The
        <span className="text-primary relative mx-1 inline-block stroke-current text-4xl font-extrabold uppercase">
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
      </h1>

      <Button
        effect="shineHover"
        className="mt-6 flex items-center text-white"
        asChild
      >
        <Link href="https://vercel.com/new/clone?repository-url=https://github.com/NikeshCohen/Startacus/tree/main">
          <span>Deploy to Vercel</span>
          <div className="mx-2 h-6 border-l-2 border-white"></div>
          <svg className="h-4 w-4" viewBox="0 0 20 20">
            <path d="M10 0L0 20h20L10 0z" fill="currentColor" />
          </svg>
        </Link>
      </Button>
    </section>
  );
}

export default page;
