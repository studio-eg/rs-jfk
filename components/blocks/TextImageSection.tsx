"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { mediaUrl } from "@/lib/media";
import type { TextImageBlock } from "@/payload-types";

export function TextImageSection({ block }: { block: TextImageBlock }) {
  const imageUrl = mediaUrl(block.image);
  const imageLeft = block.imagePosition === "left";

  return (
    <section className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <FadeIn
          direction={imageLeft ? "right" : "left"}
          className={imageLeft ? "lg:order-2" : undefined}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            {block.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{block.body}</p>
        </FadeIn>
        <FadeIn
          direction={imageLeft ? "left" : "right"}
          delay={0.1}
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--background)] ${
            imageLeft ? "lg:order-1" : ""
          }`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={block.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </FadeIn>
      </div>
    </section>
  );
}
