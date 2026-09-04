"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Page } from "@/payload-types";

export default function PageClient({ initialPage }: { initialPage: Page }) {
  const { data: page } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  return (
    <div>
      <PageHeader
        eyebrow={page.heroEyebrow ?? undefined}
        title={page.title}
        lead={page.heroLead ?? undefined}
        image={mediaUrl(page.heroImage)}
        imageAlt={page.heroImageAlt ?? undefined}
      />

      <BlockRenderer blocks={page.pageSections} />
    </div>
  );
}
