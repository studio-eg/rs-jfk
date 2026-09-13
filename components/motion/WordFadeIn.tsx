"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const EASE = [0.33, 1, 0.68, 1] as const;

/**
 * Reveals text word by word. Relies on variant propagation, so it must be
 * rendered somewhere inside an ancestor that sets initial="hidden" /
 * animate="show" (or whileInView="show") — e.g. <Stagger>. It re-roots its
 * own staggerChildren once that "show" state reaches it.
 */
export function WordFadeIn({
  text,
  wordDelay = 0.06,
  className,
}: {
  text: string;
  wordDelay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (!text) return null;
  const lines = text.split("\n");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : wordDelay },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.5, ease: EASE },
    },
  };

  return (
    <motion.span variants={container} className={className} suppressHydrationWarning>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((w, wi) => (
              <Fragment key={wi}>
                <motion.span
                  variants={word}
                  className="inline-block"
                  suppressHydrationWarning
                >
                  {w}
                </motion.span>
                {wi !== words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
