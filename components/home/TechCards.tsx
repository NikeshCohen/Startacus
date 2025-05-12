"use client";

import Link from "next/link";

import { techStackInfo } from "@/constants/tech-stack";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { SideGradientBackground } from "@/components/global/backgrounds";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TechCards() {
  return (
    <div className="relative">
      <SideGradientBackground />
      <section className="layout relative z-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl pb-12 text-center"
        >
          <h2 className="pb-2 text-3xl font-bold md:text-4xl">
            Built with Modern Tech Stack
          </h2>
          <p className="text-muted-foreground text-lg">
            The digital equivalent of a Swiss Army knife – all the shiny tools
            you need, none of the bloat you don&apos;t.
          </p>
        </motion.div>

        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStackInfo.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href={item.link} target="_blank" className="block h-full">
                <Card className="group h-full">
                  <CardHeader>
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <item.icon className="h-full w-full" />
                    </div>
                    <CardAction>
                      <ArrowUpRight className="text-muted-foreground h-5 w-5" />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TechCards;
