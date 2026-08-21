import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Unser Angebot",
  description:
    "Fachbereiche, Wahlpflichtkurse, Arbeitsgemeinschaften, Berufsorientierung und Gewaltprävention.",
};

const fachbereiche = [
  {
    title: "Sprachen",
    fields: "Deutsch, Englisch, Französisch (ab Klasse 6, Wahlpflicht)",
    image: "/englisch.png",
  },
  {
    title: "Mathematik-Naturwissenschaften",
    fields: "Mathematik, Physik, Chemie, Biologie",
    image: "/mathe.png",
  },
  {
    title: "Geschichtlich-soziale Weltkunde",
    fields: "Geschichte, Erdkunde (ab Kl. 5), Politik (ab Kl. 7)",
    image: "/geschichte.png",
  },
  {
    title: "Arbeit/Wirtschaft – Technik",
    fields: "Wirtschaft (ab Kl. 8), Technik und Hauswirtschaft (Kl. 8)",
    image: "/werken.png",
  },
  {
    title: "Musisch-kulturelle Bildung",
    fields: "Musik, Kunst, Gestaltendes Werken, Textiles Gestalten",
    image: "/mukubi.png",
  },
  {
    title: "Religion / Werte und Normen",
    fields: "Konfessionell und konfessionell-kooperativ organisiert",
    image: "/religion.png",
  },
  {
    title: "Sport",
    fields: "U. a. Kanutouren auf der Oker, Disc-Golf, Sponsorenlauf",
    image: "/sport.png",
  },
];

const profile = [
  { title: "Profil 1 · Sprachen", text: "Französisch – 4 Wochenstunden" },
  { title: "Profil 2 · Technik", text: "2 Wochenstunden" },
  {
    title: "Profil 3 · Gesundheit und Soziales",
    text: "2 Wochenstunden",
  },
  { title: "Profil 4 · Wirtschaft", text: "2 Wochenstunden" },
];

const ags = [
  "Schulsanitätsdienst",
  "Schulbücherei",
  "Freies Musizieren",
  "Basketball (in Kooperation mit der SG Braunschweig)",
  "Sicher und stark",
];

const gewaltpraevention = [
  { stage: "Klasse 5–7", text: "„Lions Quest“" },
  { stage: "Klasse 7", text: "„Schritte gegen Tritte“ in allen 7. Klassen" },
  { stage: "Klasse 8", text: "Antigewalttraining in allen 8. Klassen" },
  {
    stage: "Ab Klasse 8",
    text: "Konfliktlotsen-Intensivschulung für interessierte Schüler:innen",
  },
];

export default function AngebotPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Unser Angebot"
        title="Fachlich stark, persönlich gefördert"
        lead="Von den Kernfächern über Wahlpflichtkurse und Arbeitsgemeinschaften bis zur Berufsorientierung."
        image="/angebot.jpg"
        imageAlt="Schülerinnen und Schüler im Klassenraum bei der Arbeit"
      />

      {/* Fachbereiche */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Fachbereiche
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Zum Pflichtunterricht einer Realschule gehören folgende Fächer,
            gegliedert in sieben Fachbereiche.
          </p>
        </FadeIn>
        <Stagger className="mt-10 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {fachbereiche.map((item) => (
            <StaggerItem
              key={item.title}
              hover="lift"
              className="group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 sm:w-80"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--background)]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  loading="eager"
                  sizes="320px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
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
                Wahlpflichtkurse
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Eine zweite Fremdsprache (in der Regel Französisch) wird ab
                dem 6. Schuljahrgang als vierstündiger Wahlpflichtkurs
                angeboten. Wer sich nicht für die zweite Fremdsprache
                entscheidet, erhält Unterricht in zwei jeweils zweistündigen
                anderen Wahlpflichtkursen. Das Erlernen der zweiten
                Fremdsprache ist keine Voraussetzung für den Übergang in die
                gymnasiale Oberstufe.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                Profile in Jahrgang 9 & 10
              </h2>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Ab dem 8. Schuljahrgang wählen alle Schülerinnen und Schüler
                ein berufsvorbereitendes Profil.
              </p>
              <Stagger className="mt-4 space-y-3" staggerDelay={0.06}>
                {profile.map((p) => (
                  <StaggerItem
                    key={p.title}
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
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            In Arbeitsgemeinschaften können Schülerinnen und Schüler Dinge
            lernen, die sie persönlich besonders interessieren.
          </p>
        </FadeIn>
        <Stagger staggerDelay={0.06}>
          <ul className="mt-8 flex flex-wrap gap-3">
            {ags.map((ag) => (
              <StaggerItem
                key={ag}
                as="li"
                hover="scale"
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
              >
                {ag}
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
            Berufsorientierende Maßnahmen werden als Praxistage an mindestens
            30 Schultagen vorrangig in den Jahrgängen 8 bis 10 durchgeführt.
            Die Zusammenarbeit mit der Berufsberatung der Agentur für Arbeit,
            den Kammern, berufsbildenden Schulen und Praxiserfahrungen in
            Betrieben ist Teil unseres fächerübergreifenden Konzepts – inklusive
            eigener Berufsmesse im Haus.
          </p>
        </FadeIn>
      </section>

      {/* Gewaltprävention */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Gewaltprävention
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            In Anlehnung an das „Braunschweiger Modell“ durchlaufen unsere
            Schülerinnen und Schüler ein mehrstufiges Präventionsprogramm.
          </p>
        </FadeIn>
        <Stagger className="relative mt-12 grid gap-8 sm:grid-cols-4 sm:gap-6">
          <div className="absolute top-4 right-0 left-0 hidden h-px bg-[var(--border)] sm:block" />
          {gewaltpraevention.map((item, i) => (
            <StaggerItem
              key={item.stage}
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
