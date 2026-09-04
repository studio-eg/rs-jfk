"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { FAQBlock } from "@/payload-types";

export function FAQSection({ block }: { block: FAQBlock }) {
  const items = block.items ?? [];

  return (
    <section className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        {block.heading && (
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              {block.heading}
            </h2>
          </FadeIn>
        )}
        <Stagger className="mt-8 divide-y divide-[var(--border)]" staggerDelay={0.05}>
          {items.map((item, i) => (
            <StaggerItem key={item.id ?? i} hover="none" className="py-5 first:pt-0 last:pb-0">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--foreground)]">
                  {item.question}
                  <span className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{item.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
