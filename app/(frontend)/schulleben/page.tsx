import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getPosts } from "@/lib/payload";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Schulleben",
  description:
    "Projekte, Aktionen und Ereignisse aus dem Schulleben der Realschule John-F.-Kennedy-Platz.",
};

export default async function SchullebenPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <div>
        <PageHeader
          eyebrow="Schulleben"
          title="Projekte, Aktionen, Begegnungen"
          lead="Ein Einblick in das, was unsere Schulgemeinschaft das Jahr über bewegt."
          image="/pic06.jpg"
        />
        <section className="mx-auto max-w-6xl px-6 py-16 text-center text-[var(--muted)] sm:py-20">
          Es sind noch keine Beiträge veröffentlicht.
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Schulleben"
        title="Projekte, Aktionen, Begegnungen"
        lead="Ein Einblick in das, was unsere Schulgemeinschaft das Jahr über bewegt."
        image="/pic06.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Stagger>
          <StaggerItem
            hover="none"
            className="group grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 sm:grid-cols-2"
          >
            <Link
              href={`/schulleben/${featured.slug}`}
              className="grid sm:col-span-2 sm:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto bg-[var(--background)]">
                {mediaUrl(featured.image) && (
                  <Image
                    src={mediaUrl(featured.image)!}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  {featured.tag}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[var(--foreground)]">
                  {featured.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <StaggerItem
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10"
            >
              <Link href={`/schulleben/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--background)]">
                  {mediaUrl(post.image) && (
                    <Image
                      src={mediaUrl(post.image)!}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                    {post.tag}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--foreground)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
