import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { schullebenPosts } from "@/lib/schulleben";

export function generateStaticParams() {
  return schullebenPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = schullebenPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function SchullebenPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = schullebenPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      <PageHeader
        eyebrow={post.tag}
        title={post.title}
        lead={post.date}
        image={post.image}
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
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className="leading-relaxed text-[var(--foreground)]"
            >
              {paragraph}
            </p>
          ))}
        </FadeIn>
      </section>
    </div>
  );
}
