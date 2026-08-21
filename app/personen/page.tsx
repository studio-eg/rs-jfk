import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Personen & Gremien",
  description:
    "Schulleitung, Verwaltung, Gremien und Mitwirkung an der Realschule John-F.-Kennedy-Platz.",
};

const gremien = [
  {
    title: "Verwaltung",
    text: "Schulsekretärinnen erledigen den Verwaltungs- und Schreibdienst in allen Schulangelegenheiten. Schulassistent:innen entlasten die Lehrkräfte bei der Vor- und Nachbereitung des Unterrichts. Unser Hausmeister sorgt für die haustechnischen Anlagen und Außenanlagen.",
    image: "/schulsekretariat.jpg",
  },
  {
    title: "Schulvorstand",
    text: "Im Schulvorstand wirken Schulleitung, Lehrkräfte, Erziehungsberechtigte sowie Schülerinnen und Schüler zusammen, um die Qualitätsentwicklung der Schule zu gestalten.",
    image: "/schuvo.jpg",
  },
  {
    title: "Lehrerkollegium",
    text: "Unsere Lehrkräfte erziehen und unterrichten in eigener pädagogischer Verantwortung und stehen in einem unmittelbaren Dienstverhältnis zum Land Niedersachsen.",
    image: "/kollegiumsfoto.jpg",
  },
  {
    title: "Kommunale Schulsozialarbeit & Beratung",
    text: "Die Schulsozialarbeit unterstützt einzelfallbezogen dabei, Chancengleichheit herzustellen. Unsere Beratungslehrkraft moderiert die Beratungskonferenz und pflegt den Austausch mit externen Beratungsstellen der Stadt Braunschweig.",
    image: "/soziales.jpg",
  },
  {
    title: "Schülervertretung",
    text: "Schülerinnen und Schüler wirken über Klassensprecher:innen, den Schülerrat und Vertreter:innen in Konferenzen und im Schulvorstand aktiv an der Schulgemeinschaft mit.",
  },
  {
    title: "Schulelternrat",
    text: "Die Vorsitzenden der Klassenelternschaften bilden den Schulelternrat, der mindestens zweimal jährlich tagt und Vertreter:innen in die Gesamtkonferenz entsendet.",
  },
  {
    title: "Schulelternverein",
    text: "Der Schulelternverein unterstützt die Ausstattung der Schule mit Lehrmitteln, hilft bedürftigen Schülerinnen und Schülern bei Klassenfahrten und finanziert Schulveranstaltungen.",
  },
];

export default function PersonenPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Wer wir sind"
        title="Personen & Gremien"
        lead="Schulleitung, Kollegium und die Gremien, die unsere Schulgemeinschaft mitgestalten."
      />

      {/* Schulleitung */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <FadeIn className="grid gap-8 sm:grid-cols-[160px_1fr] sm:items-start">
          <div className="group relative mx-auto aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] sm:w-full">
            <Image
              src="/schulleitung.jpg"
              alt="Felix Müller und Johannes Nadjib, kommissarische Schulleitung"
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
              Schulleitung
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              In allen aktuellen Anliegen wenden Sie sich bitte an die
              kommissarische Schulleitung:
            </p>
          </div>
        </FadeIn>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          <StaggerItem className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
              Felix Müller
            </p>
            <p className="text-sm text-[var(--muted)]">
              Realschulrektor (komm.)
            </p>
            <a
              href="mailto:felix.mueller@braunschweig.de"
              className="mt-2 inline-block text-sm text-[var(--accent)]"
            >
              felix.mueller@braunschweig.de
            </a>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
              Johannes Nadjib
            </p>
            <p className="text-sm text-[var(--muted)]">
              Realschulkonrektor (komm.)
            </p>
            <a
              href="mailto:johannes.nadjib@braunschweig.de"
              className="mt-2 inline-block text-sm text-[var(--accent)]"
            >
              johannes.nadjib@braunschweig.de
            </a>
          </StaggerItem>
        </Stagger>
        <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
          Jede Schule hat eine Schulleiterin oder einen Schulleiter, die/der
          die Gesamtverantwortung für die Schule und deren
          Qualitätsentwicklung trägt, Lehrkräfte im Unterricht berät und für
          die Einhaltung der Rechts- und Verwaltungsvorschriften sorgt.
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
            {gremien.map((item, i) => (
              <StaggerItem
                key={item.title}
                hover="none"
                className="grid items-center gap-8 py-10 sm:grid-cols-2 sm:gap-12 first:pt-0 last:pb-0"
              >
                <div
                  className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--background)] ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
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
            ))}
          </Stagger>
          <p className="mt-10 text-sm text-[var(--muted)]">
            Eine namentliche Übersicht unseres Lehrerkollegiums sowie der
            Klassenlehrkräfte finden Kolleginnen, Kollegen, Schülerinnen und
            Schüler über IServ.
          </p>
        </div>
      </section>
    </div>
  );
}
