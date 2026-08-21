import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "Adresse, Telefon, Fax und E-Mail der Realschule John-F.-Kennedy-Platz in Braunschweig.",
};

export default function KontaktPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontakt & Anfahrt"
        lead="Wir sind zentral in der Braunschweiger Innenstadt gelegen und gut erreichbar."
        image="/kontakt_anfahrt.jpg"
        imageAlt="Schulhof und Fassade der Realschule John-F.-Kennedy-Platz"
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
        <FadeIn direction="left">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
            Realschule John-F.-Kennedy-Platz
          </h2>
          <address className="mt-4 space-y-1 not-italic leading-relaxed text-[var(--muted)]">
            <p>John-F.-Kennedy-Platz 1</p>
            <p>38100 Braunschweig</p>
          </address>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                Telefon
              </dt>
              <dd>
                <a href="tel:+495314705030" className="text-[var(--accent)]">
                  (0531) 470 5030
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                Telefax
              </dt>
              <dd className="text-[var(--muted)]">(0531) 470 5031</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 font-semibold text-[var(--foreground)]">
                E-Mail
              </dt>
              <dd>
                <a
                  href="mailto:rskennedyplatz@braunschweig.de"
                  className="text-[var(--accent)]"
                >
                  rskennedyplatz@braunschweig.de
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
                Sprechzeiten Beratungslehrkraft
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Montags von 9:40 bis 10:25 Uhr sowie nach Vereinbarung. Termine
                über das Sekretariat unter (0531) 470 5030.
              </p>
            </StaggerItem>
          </Stagger>
        </FadeIn>

        <FadeIn direction="right" delay={0.1} className="overflow-hidden rounded-2xl border border-[var(--border)]">
          <iframe
            title="Lage der Realschule John-F.-Kennedy-Platz"
            src="https://www.google.com/maps?q=John-F.-Kennedy-Platz+1,+38100+Braunschweig&output=embed"
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeIn>
      </section>
    </div>
  );
}
