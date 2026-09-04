"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import type { TeamGridBlock } from "@/payload-types";

export function TeamGridSection({ block }: { block: TeamGridBlock }) {
  const members = block.members ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      {(block.heading || block.intro) && (
        <FadeIn className="mb-10 max-w-2xl">
          {block.heading && (
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              {block.heading}
            </h2>
          )}
          {block.intro && <p className="mt-3 text-[var(--muted)]">{block.intro}</p>}
        </FadeIn>
      )}
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, i) => {
          const photoUrl = mediaUrl(member.photo);
          return (
            <StaggerItem
              key={member.id ?? i}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              {photoUrl && (
                <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full bg-[var(--background)]">
                  <Image src={photoUrl} alt="" fill sizes="64px" className="object-cover" />
                </div>
              )}
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                {member.name}
              </p>
              {member.role && <p className="text-sm text-[var(--muted)]">{member.role}</p>}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="mt-2 inline-block text-sm text-[var(--accent)]"
                >
                  {member.email}
                </a>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
