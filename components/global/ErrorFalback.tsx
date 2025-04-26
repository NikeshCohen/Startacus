"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";

export function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error");
  }

  // Only render the button in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Button
      onClick={() => setShouldThrow(true)}
      className="bg-red-500 text-white hover:bg-red-600"
    >
      Throw Test Error
    </Button>
  );
}

function FallBack({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="mb-2 flex justify-center text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Whoops! We ran into an error :&#40;
      </motion.h1>
      <motion.div
        className="bg-muted text-muted-foreground mb-6 flex max-w-2xl flex-col items-center overflow-auto rounded-md p-2 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="max-h-36 text-center whitespace-pre-wrap">
          {error.message}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={resetErrorBoundary} effect="shineHover">
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default FallBack;
