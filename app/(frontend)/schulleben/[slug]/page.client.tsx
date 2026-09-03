"use client";

import Link from "next/link";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Post } from "@/payload-types";

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <p className="leading-relaxed text-[var(--foreground)]">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
});

export default function SchullebenPostPageClient({ initialPost }: { initialPost: Post }) {
  const { data: post } = useLivePreview<Post>({
    initialData: initialPost,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  return (
    <div>
      <PageHeader
        eyebrow={post.tag}
        title={post.title}
        lead={post.dateLabel ?? undefined}
        image={mediaUrl(post.image)}
        imageAlt={post.imageAlt}
      />

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <FadeIn>
          <Link
            href="/schulleben"
            className="group mb-10 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1">
              ←
            </span>
            Zurück zu Schulleben
          </Link>
        </FadeIn>
        <FadeIn className="space-y-5">
          <RichText data={post.body} converters={converters} />
        </FadeIn>
      </section>
    </div>
  );
}
