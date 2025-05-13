"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { SingleCircleBackground } from "@/components/global/backgrounds";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="layout relative pb-32">
      <SingleCircleBackground position="center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-primary mx-auto rounded-3xl border px-6 py-12 md:py-20 lg:py-32"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-background text-4xl font-semibold text-balance lg:text-5xl"
          >
            Ship Your Project in Minutes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-background mx-auto mt-2 max-w-2xl text-lg"
          >
            Stop building the same boilerplate over and over. Startacus gives
            you a production-ready foundation so you can focus on what matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              className="flex items-center"
              variant="secondary"
              size="lg"
              asChild
            >
              <Link href="https://vercel.com/new/clone?repository-url=https://github.com/NikeshCohen/Startacus/tree/main">
                <span>Deploy Now</span>
                <div className="mx-2 h-6 border-l-2 border-black"></div>
                <svg
                  viewBox="0 0 256 222"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path fill="black" d="m128 0 128 221.705H0z" />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
