"use client";

import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const DIM = "rgba(38, 34, 32, 0.25)";
const LIT = "#262220";

function Word({
  children,
  progress,
  range,
  reduceMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
}) {
  const color = useTransform(progress, range, [DIM, LIT]);
  return (
    <motion.span
      style={{ color: reduceMotion ? LIT : color }}
      suppressHydrationWarning
    >
      {children}{" "}
    </motion.span>
  );
}

/**
 * Highlights text word by word as the reader scrolls past it — each word
 * brightens from dim to full color tied directly to scroll position, rather
 * than a fixed-timing entrance animation.
 */
export function ScrollHighlightText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <blockquote ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduceMotion={!!reduceMotion}
        >
          {word}
        </Word>
      ))}
    </blockquote>
  );
}
