"use client";

import Image from "next/image";

import { featureSvgs } from "@/constants/features-info";
import { Shield, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

import AnimatedBadge from "@/components/global/animated-badge";
import { SideGradientBackground } from "@/components/global/backgrounds";
import { Card, CardContent } from "@/components/ui/card";

const circleVariants = {
  default: { rotate: 0 },
  hover: { rotate: 5 },
};

const fingerprintVariants = {
  default: { scale: 1 },
  hover: { scale: 1.1 },
};

const skewGraphVariants = {
  default: { y: 0 },
  hover: { y: -5 },
};

const graphVariants = {
  default: { scale: 1 },
  hover: { scale: 1.05, originX: 0, originY: 0 },
};

const userContainerVariants = {
  default: { x: 0 },
  hover: {
    x: 5,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const userItem1Variants = {
  default: { x: 0 },
  hover: { x: 5 },
};

const userItem2Variants = {
  default: { x: 0 },
  hover: { x: -5 },
};

function FeaturesBento() {
  return (
    <section className="layout relative pb-32" id="features">
      <SideGradientBackground
        leftCircleTranslateX="20%"
        leftCircleTranslateY="80%"
        rightCircleTranslateX="10%"
        rightCircleTranslateY="40%"
      />
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
            Engineered for Excellence
          </h2>
          <p className="text-muted-foreground text-lg">
            We&apos;ve built a platform that combines power and simplicity,
            giving you everything you need to launch your next big idea with
            confidence.
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-full lg:col-span-2"
        >
          <motion.div
            className="relative flex h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="w-full">
              <CardContent className="relative m-auto size-fit pt-6">
                <motion.div
                  className="relative flex h-24 w-56 items-center"
                  variants={circleVariants}
                  transition={{ duration: 0.5 }}
                >
                  <featureSvgs.circle />
                  <span className="mx-auto block w-fit text-5xl font-semibold">
                    100%
                  </span>
                </motion.div>
                <h2 className="mt-6 text-center text-3xl font-semibold">
                  Customizable
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-full sm:col-span-3 lg:col-span-2"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <motion.div
                  variants={fingerprintVariants}
                  transition={{ duration: 0.3 }}
                >
                  <CentricCircles size={32}>
                    <featureSvgs.fingerprint />
                  </CentricCircles>
                </motion.div>
                <div className="relative z-10 mt-6 space-y-2 text-center">
                  <h2 className="text-lg font-medium transition">
                    Secure By Default
                  </h2>
                  <p className="text-foreground">
                    Built with security as a foundation, not an afterthought.
                    Advanced protection features work silently in the background
                    to keep your data safe.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-full sm:col-span-3 lg:col-span-2"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <motion.div
                  className="pt-6"
                  variants={skewGraphVariants}
                  transition={{ duration: 0.3 }}
                >
                  <featureSvgs.skewGraph />
                </motion.div>
                <div className="relative z-10 mt-14 space-y-2 text-center">
                  <h2 className="text-lg font-medium transition">
                    Faster Than Light
                  </h2>
                  <p className="text-foreground">
                    Lightning-fast performance with optimized code and efficient
                    architecture.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="variant-outlined card col-span-full lg:col-span-3"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <motion.div className="relative flex aspect-square size-12 rounded-full before:absolute before:-inset-2 before:rounded-full before:border before:border-black/5 dark:before:border-white/5">
                    <CentricCircles size={12}>
                      <Shield className="m-auto size-5" strokeWidth={1} />
                    </CentricCircles>
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium text-zinc-800 transition dark:text-white">
                      Built In Analytics
                    </h2>
                    <p className="text-foreground">
                      Gain powerful insights into user behavior and application
                      performance.
                    </p>
                  </div>
                </div>
                <motion.div
                  className="relative mt-6 -mr-6 -mb-6 h-fit rounded-tl-(--radius) border-t border-l p-6 py-6 sm:ml-6"
                  variants={graphVariants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-2 left-3 flex gap-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <span
                        key={index}
                        className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"
                      ></span>
                    ))}
                  </div>
                  <featureSvgs.graph />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="variant-outlined card col-span-full lg:col-span-3"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <motion.div className="relative flex aspect-square size-12 rounded-full">
                    <CentricCircles size={12}>
                      <Users className="m-auto size-6" strokeWidth={1} />
                    </CentricCircles>
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-lg font-medium transition">
                      Full User Management
                    </h2>
                    <p className="text-foreground">
                      Effortlessly handle authentication, roles, and permissions
                      with a comprehensive better auth config.
                    </p>
                  </div>
                </div>
                <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-(--color-border) sm:-my-6 sm:-mr-6">
                  <motion.div
                    className="relative flex h-full flex-col justify-center space-y-6 py-6"
                    variants={userContainerVariants}
                  >
                    <motion.div
                      className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2"
                      variants={userItem1Variants}
                    >
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
                    </motion.div>
                    <motion.div
                      className="relative ml-[calc(50%-1rem)] flex items-center gap-2"
                      variants={userItem2Variants}
                    >
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
                    </motion.div>
                    <motion.div
                      className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2"
                      variants={userItem1Variants}
                    >
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
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function CentricCircles({
  children,
  size = 32,
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
