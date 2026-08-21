"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { ImageProps } from "next/image";

export function HeroImage(props: ImageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: reduceMotion ? 1 : 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps, just spread */}
      <Image {...props} />
    </motion.div>
  );
}
