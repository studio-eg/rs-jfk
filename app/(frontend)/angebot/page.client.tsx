"use client";

import Image from "next/image";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Angebot } from "@/payload-types";

export default function AngebotPageClient({ initialAngebot }: { initialAngebot: Angebot }) {
  const { data: angebot } = useLivePreview<Angebot>({
    initialData: initialAngebot,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  const fachbereiche = angebot.fachbereiche ?? [];
  const profile = angebot.profile ?? [];
  const ags = angebot.ags ?? [];
  const gewaltpraevention = angebot.gewaltpraevention ?? [];

  return (
    <div>
      <PageHeader
        eyebrow={angebot.heroEyebrow}
        title={angebot.heroTitle}
        lead={angebot.heroLead}
        image={mediaUrl(angebot.heroImage)}
        imageAlt={angebot.heroImageAlt}
      />

      {/* Fachbereiche */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Fachbereiche
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">{angebot.fachbereicheIntro}</p>
        </FadeIn>
        <Stagger className="mt-10 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {fachbereiche.map((item, i) => (
            <StaggerItem
              key={item.id ?? i}
              hover="lift"
              className="group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 sm:w-80"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--background)]">
                {mediaUrl(item.image) && (
                  <Image
                    src={mediaUrl(item.image)!}
                    alt=""
                    fill
                    loading="eager"
                    sizes="320px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.fields}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-3 text-xs text-[var(--muted)] sm:hidden">
          Zum Blättern nach links wischen →
        </p>
      </section>

      {/* Wahlpflicht & Profile */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                {angebot.wahlpflichtTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">{angebot.wahlpflichtText}</p>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                {angebot.profileTitle}
              </h2>
              <p className="mt-4 text-sm text-[var(--muted)]">{angebot.profileIntro}</p>
              <Stagger className="mt-4 space-y-3" staggerDelay={0.06}>
                {profile.map((p, i) => (
                  <StaggerItem
                    key={p.id ?? i}
                    hover="none"
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {p.title}
                    </span>
                    <span className="text-sm text-[var(--muted)]">
                      {p.text}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* AGs */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Arbeitsgemeinschaften
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">{angebot.agIntro}</p>
        </FadeIn>
        <Stagger staggerDelay={0.06}>
          <ul className="mt-8 flex flex-wrap gap-3">
            {ags.map((ag, i) => (
              <StaggerItem
                key={ag.id ?? i}
                as="li"
                hover="scale"
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
              >
                {ag.name}
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </section>

      {/* Berufsorientierung */}
      <section className="border-t border-[var(--border)] bg-white">
        <FadeIn className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Berufsorientierung
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
            {angebot.berufsorientierungText}
          </p>
        </FadeIn>
      </section>

      {/* Gewaltprävention */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Gewaltprävention
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">{angebot.gewaltpraeventionIntro}</p>
        </FadeIn>
        <Stagger className="relative mt-12 grid gap-8 sm:grid-cols-4 sm:gap-6">
          <div className="absolute top-4 right-0 left-0 hidden h-px bg-[var(--border)] sm:block" />
          {gewaltpraevention.map((item, i) => (
            <StaggerItem
              key={item.id ?? i}
              hover="none"
              className="relative flex gap-4 sm:flex-col sm:gap-3"
            >
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {item.stage}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
