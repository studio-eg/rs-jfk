"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const OFFSETS = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
} as const;

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: keyof typeof OFFSETS;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? {} : OFFSETS[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduceMotion ? 0.01 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.33, 1, 0.68, 1],
      }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}
