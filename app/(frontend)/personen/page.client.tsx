"use client";

import Image from "next/image";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Personen } from "@/payload-types";

export default function PersonenPageClient({ initialPersonen }: { initialPersonen: Personen }) {
  const { data: personen } = useLivePreview<Personen>({
    initialData: initialPersonen,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  const members = personen.schulleitungMembers ?? [];
  const gremien = personen.gremien ?? [];

  return (
    <div>
      <PageHeader
        eyebrow={personen.heroEyebrow}
        title="Personen & Gremien"
        lead={personen.heroLead}
      />

      {/* Schulleitung */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <FadeIn className="grid gap-8 sm:grid-cols-[160px_1fr] sm:items-start">
          <div className="group relative mx-auto aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] sm:w-full">
            {mediaUrl(personen.schulleitungPhoto) && (
              <Image
                src={mediaUrl(personen.schulleitungPhoto)!}
                alt={personen.schulleitungPhotoAlt}
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            )}
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
              Schulleitung
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{personen.schulleitungIntro}</p>
          </div>
        </FadeIn>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          {members.map((member, i) => (
            <StaggerItem
              key={member.id ?? i}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                {member.name}
              </p>
              <p className="text-sm text-[var(--muted)]">{member.role}</p>
              <a
                href={`mailto:${member.email}`}
                className="mt-2 inline-block text-sm text-[var(--accent)]"
              >
                {member.email}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
          {personen.schulleitungNote}
        </p>
      </section>

      {/* Gremien */}
      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              Mitwirkung & Gremien
            </h2>
          </FadeIn>
          <Stagger className="mt-6 divide-y divide-[var(--border)]">
            {gremien.map((item, i) => {
              const imageUrl = mediaUrl(item.image);
              return (
                <StaggerItem
                  key={item.id ?? i}
                  hover="none"
                  className="grid items-center gap-8 py-10 sm:grid-cols-2 sm:gap-12 first:pt-0 last:pb-0"
                >
                  <div
                    className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--background)] ${
                      i % 2 === 1 ? "sm:order-2" : ""
                    }`}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-display)] text-8xl font-semibold text-[var(--accent)]/15">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className="mt-10 text-sm text-[var(--muted)]">{personen.closingNote}</p>
        </div>
      </section>
    </div>
  );
}
