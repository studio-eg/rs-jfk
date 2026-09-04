"use client";

import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { FadeIn } from "@/components/motion/FadeIn";
import type { RichTextBlock } from "@/payload-types";

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <p className="leading-relaxed text-[var(--foreground)]">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
});

export function RichTextSection({ block }: { block: RichTextBlock }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <FadeIn className="space-y-5">
        <RichText data={block.content} converters={converters} />
      </FadeIn>
    </section>
  );
}
