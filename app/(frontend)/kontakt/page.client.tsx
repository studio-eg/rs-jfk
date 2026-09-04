"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Kontakt } from "@/payload-types";

export default function KontaktPageClient({ initialKontakt }: { initialKontakt: Kontakt }) {
  const { data: kontakt } = useLivePreview<Kontakt>({
    initialData: initialKontakt,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  return (
    <div>
      <PageHeader
        eyebrow={kontakt.heroEyebrow}
        title="Kontakt & Anfahrt"
        lead={kontakt.heroLead}
        image={mediaUrl(kontakt.heroImage)}
        imageAlt={kontakt.heroImageAlt}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
        <FadeIn direction="left">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
            {kontakt.schoolName}
          </h2>
          <address className="mt-4 space-y-1 not-italic leading-relaxed text-[var(--muted)]">
            <p>{kontakt.addressLine1}</p>
            <p>{kontakt.addressLine2}</p>
          </address>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                Telefon
              </dt>
              <dd>
                <a href={`tel:${kontakt.phoneHref}`} className="text-[var(--accent)]">
                  {kontakt.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                Telefax
              </dt>
              <dd className="text-[var(--muted)]">{kontakt.fax}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                E-Mail
              </dt>
              <dd>
                <a
                  href={`mailto:${kontakt.email}`}
                  className="text-[var(--accent)]"
                >
                  {kontakt.email}
                </a>
              </dd>
            </div>
          </dl>

          <Stagger className="mt-10">
            <StaggerItem
              hover="lift"
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                {kontakt.sprechzeitenTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {kontakt.sprechzeitenText}
              </p>
            </StaggerItem>
          </Stagger>
        </FadeIn>

        <FadeIn direction="right" delay={0.1} className="overflow-hidden rounded-2xl border border-[var(--border)]">
          <iframe
            title={`Lage der ${kontakt.schoolName}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(kontakt.mapQuery)}&output=embed`}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeIn>
      </section>

      <BlockRenderer blocks={kontakt.pageSections} />
    </div>
  );
}
