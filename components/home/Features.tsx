"use client";

import Image from "next/image";

import { featureSvgs } from "@/constants/features-info";
import { Shield, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

import AnimatedBadge from "@/components/global/animated-badge";
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

function FeaturesBento() {
  return (
    <section className="relative pb-32 layout" id="features">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto pb-12 max-w-2xl text-center"
        >
          <AnimatedBadge
            icon={<Sparkles className="w-4 h-4" />}
            text="Features"
          />
          <h2 className="pb-2 font-bold text-3xl md:text-4xl">
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
      <div className="z-10 relative gap-3 grid grid-cols-6">
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
              <CardContent className="relative m-auto pt-6 size-fit">
                <motion.div
                  className="relative flex items-center w-56 h-24"
                  variants={circleVariants}
                  transition={{ duration: 0.5 }}
                >
                  <featureSvgs.circle />
                  <span className="block mx-auto w-fit font-semibold text-5xl">
                    100%
                  </span>
                </motion.div>
                <h2 className="mt-6 font-semibold text-3xl text-center">
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
                  <div className="relative flex mx-auto size-32 aspect-square">
                    <CentricCircles>
                      <featureSvgs.fingerprint />
                    </CentricCircles>
                  </div>
                </motion.div>
                <div className="z-10 relative space-y-2 mt-6 text-center">
                  <h2 className="font-medium text-xl transition">
                    Secure By Default
                  </h2>
                  <p className="text-muted-foreground text-sm">
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
                <div className="z-10 relative space-y-2 mt-14 text-center">
                  <h2 className="font-medium text-xl transition">
                    Faster Than Light
                  </h2>
                  <p className="text-muted-foreground text-sm">
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
          className="col-span-full lg:col-span-3 variant-outlined card"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="grid sm:grid-cols-2 pt-6">
                <div className="z-10 relative flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="before:absolute relative before:-inset-2 flex rounded-full size-12 aspect-square">
                    <CentricCircles size={12}>
                      <Shield className="m-auto size-5" strokeWidth={1} />
                    </CentricCircles>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-medium text-xl transition">
                      Built In Analytics
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Gain powerful insights into user behavior and application
                      performance.
                    </p>
                  </div>
                </div>
                <motion.div
                  className="relative mt-6 -mr-6 -mb-6 sm:ml-6 p-6 py-6 border-t border-l rounded-tl-(--radius) h-fit"
                  variants={graphVariants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="top-2 left-3 absolute flex gap-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <span
                        key={index}
                        className="block dark:bg-white/10 border dark:border-white/10 rounded-full size-2"
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
          className="col-span-full lg:col-span-3 variant-outlined card"
        >
          <motion.div
            className="relative h-full overflow-hidden"
            initial="default"
            whileHover="hover"
          >
            <Card className="h-full">
              <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
                <div className="z-10 relative flex flex-col justify-between space-y-12 lg:space-y-6">
                  <motion.div className="relative flex rounded-full size-12 aspect-square">
                    <CentricCircles size={12}>
                      <Users className="m-auto size-6" strokeWidth={1} />
                    </CentricCircles>
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="font-medium text-xl transition">
                      Full User Management
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Effortlessly handle authentication, roles, and permissions
                      with a comprehensive better auth config.
                    </p>
                  </div>
                </div>
                <div className="before:absolute relative before:inset-0 before:mx-auto sm:-my-6 mt-6 sm:-mr-6 before:bg-(--color-border) before:w-px">
                  <motion.div
                    className="relative flex flex-col justify-center space-y-6 py-6 h-full"
                    variants={userContainerVariants}
                  >
                    <motion.div
                      className="relative flex justify-end items-center gap-2 w-[calc(50%+0.875rem)]"
                      variants={userItem1Variants}
                    >
                      <span className="block shadow-sm px-2 py-1 border rounded h-fit text-xs">
                        Calvin Mitchell
                      </span>
                      <div className="ring-4 ring-background size-7">
                        <Image
                          className="rounded-full size-full"
                          src="https://xsgames.co/randomusers/assets/avatars/pixel/5.jpg"
                          alt=""
                          width={32}
                          height={32}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="relative flex items-center gap-2 ml-[calc(50%-1rem)]"
                      variants={userItem1Variants}
                    >
                      <div className="ring-4 ring-background size-8">
                        <Image
                          className="rounded-full size-full"
                          src="https://xsgames.co/randomusers/assets/avatars/pixel/33.jpg"
                          alt=""
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="block shadow-sm px-2 py-1 border rounded h-fit text-xs">
                        Hallie Reed
                      </span>
                    </motion.div>
                    <motion.div
                      className="relative flex justify-end items-center gap-2 w-[calc(50%+0.875rem)]"
                      variants={userItem1Variants}
                    >
                      <span className="block shadow-sm px-2 py-1 border rounded h-fit text-xs">
                        Gordon Marsh
                      </span>
                      <div className="ring-4 ring-background size-7">
                        <Image
                          className="rounded-full size-full"
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
