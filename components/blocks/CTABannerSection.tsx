"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { MotionLink } from "@/components/motion/MotionLink";
import type { CTABannerBlock } from "@/payload-types";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function CTABannerSection({ block }: { block: CTABannerBlock }) {
  const external = isExternal(block.buttonHref);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Stagger>
        <StaggerItem
          hover="scale"
          className="flex flex-col items-start gap-6 rounded-2xl bg-[var(--accent)] p-10 text-white sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              {block.heading}
            </h2>
            <p className="mt-2 text-white/85">{block.text}</p>
          </div>
          {external ? (
            <a
              href={block.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent-dark)] transition-colors hover:bg-white/90"
            >
              {block.buttonLabel}
            </a>
          ) : (
            <MotionLink
              href={block.buttonHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent-dark)] transition-colors hover:bg-white/90"
            >
              {block.buttonLabel}
            </MotionLink>
          )}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
