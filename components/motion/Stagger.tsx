"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.33, 1, 0.68, 1] as const;

export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : staggerDelay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={container}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  hover = "lift",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: "lift" | "scale" | "none";
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.5, ease: EASE },
    },
  };

  const whileHover =
    reduceMotion || hover === "none"
      ? undefined
      : hover === "scale"
        ? { scale: 1.03, transition: { duration: 0.2, ease: EASE } }
        : { y: -6, transition: { duration: 0.25, ease: EASE } };

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      variants={item}
      whileHover={whileHover}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </MotionTag>
  );
}
