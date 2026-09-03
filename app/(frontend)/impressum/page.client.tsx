"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Impressum } from "@/payload-types";

export default function ImpressumPageClient({ initialImpressum }: { initialImpressum: Impressum }) {
  const { data: impressum } = useLivePreview<Impressum>({
    initialData: initialImpressum,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  const sections = impressum.sections ?? [];

  return (
    <div>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />

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
      </Stagger>
    </div>
  );
}
