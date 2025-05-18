"use client";

import Image from "next/image";

import { featureSvgs } from "@/constants/features-info";
import { Shield, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

import AnimatedBadge from "@/components/global/animated-badge";
import { SideGradientBackground } from "@/components/global/backgrounds";
import { Card, CardContent } from "@/components/ui/card";

function FeaturesBento() {
  return (
    <section className="layout relative pb-32" id="features">
      <SideGradientBackground />
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl pb-12 text-center"
        >
          <AnimatedBadge
            icon={<Sparkles className="h-4 w-4" />}
            text="Features"
          />
          <h2 className="pb-2 text-3xl font-bold md:text-4xl">
            Faster Than Light
          </h2>
          <p className="text-muted-foreground text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
            iure perferendis dolorum. Ut et recusandae aliquam ea sequi quod
            quae iusto totam ipsa.
          </p>
        </motion.div>
      </div>

      <BentoContent />
    </section>
  );
}

function BentoContent() {
  return (
    <div className="relative">
      <div className="relative z-10 grid grid-cols-6 gap-3">
        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
          <CardContent className="relative m-auto size-fit pt-6">
            <div className="relative flex h-24 w-56 items-center">
              <featureSvgs.circle />
              <span className="mx-auto block w-fit text-5xl font-semibold">
                100%
              </span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-semibold">
              Customizable
            </h2>
          </CardContent>
        </Card>
        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
          <CardContent className="pt-6">
            <CentricCircles size={32}>
              <featureSvgs.fingerprint />
            </CentricCircles>
            <div className="relative z-10 mt-6 space-y-2 text-center">
              <h2 className="text-lg font-medium transition">
                Secure By Default
              </h2>
              <p className="text-foreground">
                Provident fugit and vero voluptate. magnam magni doloribus
                dolores voluptates a sapiente nisi.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
          <CardContent className="pt-6">
            <div className="pt-6">
              <featureSvgs.skewGraph />
            </div>
            <div className="relative z-10 mt-14 space-y-2 text-center">
              <h2 className="text-lg font-medium transition">
                Faster Than Light
              </h2>
              <p className="text-foreground">
                Provident fugit vero voluptate. magnam magni doloribus dolores
                voluptates inventore nisi.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="variant-outlined card relative col-span-full overflow-hidden lg:col-span-3">
          <CardContent className="grid pt-6 sm:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
              <div className="relative flex aspect-square size-12 rounded-full before:absolute before:-inset-2 before:rounded-full">
                <CentricCircles size={12}>
                  <Shield className="m-auto size-5" strokeWidth={1} />
                </CentricCircles>
              </div>
              <div className="space-y-2">
                <h2 className="group-hover:text-secondary-950 text-lg font-medium text-zinc-800 transition dark:text-white">
                  Built In Analytics
                </h2>
                <p className="text-foreground">
                  Provident fugit vero voluptate. Voluptates a sapiente
                  inventore nisi.
                </p>
              </div>
            </div>
            <div className="relative mt-6 -mr-6 -mb-6 h-fit rounded-tl-(--radius) border-t border-l p-6 py-6 sm:ml-6">
              <div className="absolute top-2 left-3 flex gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <span
                    key={index}
                    className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"
                  ></span>
                ))}
              </div>
              <featureSvgs.graph />
            </div>
          </CardContent>
        </Card>
        <Card className="variant-outlined card relative col-span-full overflow-hidden lg:col-span-3">
          <CardContent className="grid h-full pt-6 sm:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
              <div className="relative flex aspect-square size-12 rounded-full">
                <CentricCircles size={12}>
                  <Users className="m-auto size-6" strokeWidth={1} />
                </CentricCircles>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-medium transition">
                  Full User Management
                </h2>
                <p className="text-foreground">
                  Voluptate. magnam magni doloribus dolores voluptates a
                  sapiente inventore nisi.
                </p>
              </div>
            </div>
            <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-(--color-border) sm:-my-6 sm:-mr-6">
              <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                  <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                    Calvin Mitchell
                  </span>
                  <div className="ring-background size-7 ring-4">
                    <Image
                      className="size-full rounded-full"
                      src="https://xsgames.co/randomusers/assets/avatars/pixel/5.jpg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                  <div className="ring-background size-8 ring-4">
                    <Image
                      className="size-full rounded-full"
                      src="https://xsgames.co/randomusers/assets/avatars/pixel/33.jpg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                    Hallie Reed
                  </span>
                </div>
                <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                  <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                    Gordon Marsh
                  </span>
                  <div className="ring-background size-7 ring-4">
                    <Image
                      className="size-full rounded-full"
                      src="https://xsgames.co/randomusers/assets/avatars/pixel/10.jpg"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CentricCircles({
  children,
  size = 24,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      className={`relative mx-auto flex aspect-square size-${size} rounded-full border border-black/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-black/5 dark:border-white/10 dark:before:border-white/5`}
    >
      {children}
    </div>
  );
}

export default FeaturesBento;
