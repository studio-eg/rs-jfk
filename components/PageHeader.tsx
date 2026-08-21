"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const EASE = [0.33, 1, 0.68, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[var(--ink)] text-white">
      {image && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0"
            suppressHydrationWarning
          >
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/80 to-[var(--ink)]/40" />
        </>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20"
        suppressHydrationWarning
      >
        {eyebrow && (
          <motion.p
            variants={item}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50"
            suppressHydrationWarning
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={item}
          className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-5xl"
          suppressHydrationWarning
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
            suppressHydrationWarning
          >
            {lead}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
