"use client";

import { useState } from "react";

import { faqItems } from "@/constants/site.config";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="layout relative pb-32" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl pb-12 text-center"
      >
        <h2 className="pb-2 text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about Startacus
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Disclosure
              className="rounded-lg border px-4 shadow-sm"
              open={activeIndex === index}
              onOpenChange={() => toggleItem(index)}
            >
              <DisclosureTrigger>
                <div className="flex w-full items-center justify-between py-4 text-left">
                  <h3 className="font-medium">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-5 w-5 items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                </div>
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="text-muted-foreground pt-0 pb-4">
                  <p>{item.answer}</p>
                </div>
              </DisclosureContent>
            </Disclosure>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
