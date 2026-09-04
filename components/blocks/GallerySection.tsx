"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import type { GalleryBlock } from "@/payload-types";

export function GallerySection({ block }: { block: GalleryBlock }) {
  const images = block.images ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      {block.intro && (
        <FadeIn className="mb-10 max-w-2xl">
          <p className="leading-relaxed text-[var(--muted)]">{block.intro}</p>
        </FadeIn>
      )}
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, i) => {
          const url = mediaUrl(item.image);
          return (
            <StaggerItem
              key={item.id ?? i}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--background)]">
                {url && (
                  <Image
                    src={url}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
              </div>
              {item.caption && (
                <p className="px-4 py-3 text-sm text-[var(--muted)]">{item.caption}</p>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
