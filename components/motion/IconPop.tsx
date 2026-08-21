"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const iconVariants: Variants = {
  hidden: { scale: 0.4, rotate: -20, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

/**
 * Springs an icon into place. Relies on variant propagation, so it must be
 * rendered inside an ancestor that sets initial="hidden" / whileInView="show"
 * — e.g. <Stagger>/<StaggerItem>.
 */
export function IconPop({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span variants={iconVariants} className={className} suppressHydrationWarning>
      {children}
    </motion.span>
  );
}
