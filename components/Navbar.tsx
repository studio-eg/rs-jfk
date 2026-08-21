"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { primaryNav, externalLinks } from "@/lib/nav";
import { MotionLink } from "@/components/motion/MotionLink";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <motion.span
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--accent)]"
          >
            JFK
          </motion.span>
          <span className="font-[family-name:var(--font-display)] leading-tight text-[var(--foreground)]">
            <span className="block whitespace-nowrap text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Realschule
            </span>
            <span className="block whitespace-nowrap text-base font-semibold sm:text-lg">
              John-F.-Kennedy-Platz
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 xl:flex">
          <nav className="flex items-center gap-5">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative whitespace-nowrap text-sm font-medium text-[var(--foreground)]/80 transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <motion.a
              href={externalLinks.stundenplan}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Stundenplan
            </motion.a>
            <MotionLink
              href={externalLinks.iserv}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              IServ-Login
            </MotionLink>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] xl:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <span className="sr-only">Menü</span>
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-5 bg-[var(--foreground)]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-0.5 w-5 bg-[var(--foreground)]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-5 bg-[var(--foreground)]"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] xl:hidden"
          >
            <div className="px-6 py-4">
              <nav className="flex flex-col gap-1">
                {primaryNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background)]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
                <a
                  href={externalLinks.stundenplan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] px-4 py-2.5 text-center text-sm font-medium text-[var(--foreground)]"
                >
                  Stundenplan
                </a>
                <a
                  href={externalLinks.iserv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  IServ-Login
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
