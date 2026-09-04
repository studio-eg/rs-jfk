"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { StatsBlock } from "@/payload-types";

export function StatsSection({ block }: { block: StatsBlock }) {
  const items = block.items ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      {block.intro && (
        <FadeIn className="mb-10 max-w-2xl">
          <p className="leading-relaxed text-[var(--muted)]">{block.intro}</p>
        </FadeIn>
      )}
      <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <StaggerItem key={item.id ?? i} hover="none" className="text-center">
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent)] sm:text-5xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
