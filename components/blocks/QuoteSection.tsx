"use client";

import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import type { QuoteBlock } from "@/payload-types";

export function QuoteSection({ block }: { block: QuoteBlock }) {
  const photoUrl = mediaUrl(block.photo);

  return (
    <section className="border-y border-[var(--border)] bg-white">
      <Stagger staggerDelay={0.15} className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <StaggerItem hover="none">
          <span
            aria-hidden
            className="pointer-events-none block select-none font-[family-name:var(--font-display)] text-7xl leading-none text-[var(--accent)]/15 sm:text-8xl"
          >
            „
          </span>
        </StaggerItem>
        <StaggerItem hover="none" className="-mt-6">
          <p className="font-[family-name:var(--font-display)] text-2xl font-medium italic leading-relaxed text-[var(--foreground)] sm:text-3xl">
            {block.quote}
          </p>
        </StaggerItem>
        {(block.author || photoUrl) && (
          <StaggerItem hover="none" className="mt-6 flex items-center justify-center gap-3">
            {photoUrl && (
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--background)]">
                <Image src={photoUrl} alt="" fill sizes="40px" className="object-cover" />
              </span>
            )}
            <span className="text-sm">
              {block.author && (
                <span className="font-semibold text-[var(--foreground)]">{block.author}</span>
              )}
              {block.role && <span className="text-[var(--muted)]"> · {block.role}</span>}
            </span>
          </StaggerItem>
        )}
      </Stagger>
    </section>
  );
}
