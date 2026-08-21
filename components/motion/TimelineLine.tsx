"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function TimelineLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`absolute left-0 w-px origin-top bg-[var(--accent)] ${className}`}
      initial={{ scaleY: reduceMotion ? 1 : 0 }}
      animate={isInView ? { scaleY: 1 } : {}}
      transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: [0.33, 1, 0.68, 1] }}
      suppressHydrationWarning
    />
  );
}
