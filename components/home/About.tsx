"use client";

import { features } from "@/constants/site.config";
import { Icons } from "@/constants/tech-stack";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

function About() {
  return (
    <section className="layout overflow-hidden pb-32" id="about">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="bg-primary/10 border-primary/20 mb-6 inline-flex w-fit scroll-mt-32 rounded-full border px-4 py-1">
            <div className="text-primary dark:text-primary/90 flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Why Startacus?</span>
            </div>
          </div>
          <h2 className="pb-2 text-3xl font-bold md:text-4xl">
            Less Boilerplate, More Awesome.
          </h2>
          <p className="text-muted-foreground text-lg">
            Kick tedious setup processes into the pit. Focus your energy on
            building legendary features with our battle-tested Next.js starter.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center justify-center gap-x-10 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <dl className="text-muted-foreground mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
              {features.map((feature, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  key={feature.name}
                  className="group hover:bg-primary/10 relative rounded-xl p-4 pl-12 transition-colors"
                >
                  <dt className="text-foreground inline font-semibold">
                    <feature.icon
                      className="text-primary absolute top-5 left-3 h-6 w-6 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="text-muted-foreground inline">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-xl">
              <div className="from-background/20 via-background/5 to-background/0 absolute inset-0 z-10 bg-gradient-to-t"></div>
              <OrbitingCirclesComponent />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function OrbitingCirclesComponent() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        Ship Fast
      </span>

      <OrbitingCircles iconSize={40}>
        <Icons.typescript />
        <Icons.resend />
        <Icons.supabase />
        <Icons.react />
        <Icons.tailwind />
        <Icons.drizzle />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse>
        <Icons.betterAuth />
        <Icons.tanstackquery />
        <Icons.nextjs />
        <Icons.shadcn />
      </OrbitingCircles>
    </div>
  );
}

export default About;
