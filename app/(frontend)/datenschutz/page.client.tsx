"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Datenschutz } from "@/payload-types";

export default function DatenschutzPageClient({ initialDatenschutz }: { initialDatenschutz: Datenschutz }) {
  const { data: datenschutz } = useLivePreview<Datenschutz>({
    initialData: initialDatenschutz,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  const sections = datenschutz.sections ?? [];
  const rechte = datenschutz.rechte ?? [];

  return (
    <div>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />

      <Stagger
        staggerDelay={0.08}
        className="mx-auto max-w-3xl space-y-12 px-6 py-16 sm:py-20"
      >
        {sections.map((section, i) => (
          <StaggerItem key={section.id ?? i} hover="none">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              {section.heading}
            </h2>
            {(section.paragraphs ?? []).map((paragraph, j) => (
              <p
                key={paragraph.id ?? j}
                className="mt-4 leading-relaxed text-[var(--muted)]"
              >
                <TextWithLineBreaks text={paragraph.text} />
              </p>
            ))}
          </StaggerItem>
        ))}

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Ihre Rechte
          </h2>
          <Stagger staggerDelay={0.05}>
            <dl className="mt-4 space-y-5">
              {rechte.map((right, i) => (
                <StaggerItem key={right.id ?? i} hover="none">
                  <dt className="font-semibold text-[var(--foreground)]">
                    {right.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {right.text}
                  </dd>
                </StaggerItem>
              ))}
            </dl>
          </Stagger>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
            {datenschutz.aufsichtsbehoerdeText} ·{" "}
            <a
              href={`mailto:${datenschutz.aufsichtsbehoerdeEmail}`}
              className="text-[var(--accent)]"
            >
              {datenschutz.aufsichtsbehoerdeEmail}
            </a>
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
