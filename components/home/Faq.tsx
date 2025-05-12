"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { motion } from "motion/react";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const faqItems = [
  {
    question: "How do I get started with Startacus?",
    answer:
      "Clone the repository, run npm install, and then npm run dev. You'll have a fully functioning Next.js application with authentication, database connectivity, and beautiful UI components ready to customize.",
  },
  {
    question: "Is Startacus updated regularly?",
    answer:
      "Yes! Startacus is built with the latest Next.js version and is regularly updated to ensure compatibility with new releases and features of all the major tech used in the project.",
  },
  {
    question: "Can I use Startacus for commercial projects?",
    answer:
      "Absolutely! Startacus is available under the MIT license, which means you can use it for personal, open-source, or commercial projects without restrictions.",
  },
  {
    question: "Can I customize the UI components?",
    answer:
      "Definitely! All UI components are built with Tailwind CSS and shadcn/ui, making them highly customizable to match your brand's design system.",
  },
];

function FAQ() {
  // Track which item is currently open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative pb-32 layout">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto pb-12 max-w-2xl text-center"
      >
        <h2 className="pb-2 font-bold text-3xl md:text-4xl">
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
              className="shadow-sm px-4 border rounded-lg"
              open={activeIndex === index}
              onOpenChange={() => toggleItem(index)}
            >
              <DisclosureTrigger>
                <div className="flex justify-between items-center py-4 w-full text-left">
                  <h3 className="font-medium">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center items-center w-5 h-5"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </div>
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="pt-0 pb-4 text-muted-foreground">
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
