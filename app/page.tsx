import Image from "next/image";
import Link from "next/link";
import { externalLinks } from "@/lib/nav";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { MotionLink } from "@/components/motion/MotionLink";
import { HeroImage } from "@/components/motion/HeroImage";
import { WordFadeIn } from "@/components/motion/WordFadeIn";
import { ScrollHighlightText } from "@/components/motion/ScrollHighlightText";

const quickLinks = [
  {
    title: "Anmeldung",
    text: "Informationen zur Anmeldung für die Jahrgänge 5 sowie 6–10 und zu unseren Aufnahmeterminen.",
    href: "/organisatorisches",
    cta: "Zur Anmeldung",
  },
  {
    title: "Stundenplan & Vertretung",
    text: "Aktuelle Stunden- und Vertretungspläne finden Sie in WebUntis.",
    href: externalLinks.stundenplan,
    cta: "WebUntis öffnen",
    external: true,
  },
  {
    title: "IServ",
    text: "Kommunikation, Krankmeldungen und Unterrichtsmaterial für Eltern, Schüler:innen und Kollegium.",
    href: externalLinks.iserv,
    cta: "Zu IServ",
    external: true,
  },
];

const news = [
  {
    tag: "Schulleben",
    title: "Ehemaliger Schüler und Fußballprofi Jannes Horn zu Besuch",
    text: "Jannes Horn nahm sich viel Zeit für Fragen der Schülerinnen und Schüler und ein Wiedersehen mit seinen früheren Lehrkräften.",
    image: "/jannes-horn.jpg",
  },
  {
    tag: "Kreativität",
    title: "Kunstprojekt „Buchzimmer“ – Kreativität auf hohem Niveau",
    text: "Die Klassen 5a, 6b und 7c gestalteten Miniaturräume, inspiriert von der Welt der Bücher – prämiert im schulinternen Wettbewerb.",
    image: "/buchzimmer.jpg",
  },
  {
    tag: "Engagement",
    title: "Spende an den Verein Weggefährten e. V.",
    text: "Die Schülervertretung organisierte ein Frühlingsfest mit Tombola und spendete den gesamten Erlös von 293,31 € an einen Verein für krebskranke Kinder.",
    image: "/spende-weggefaehrten.jpg",
  },
  {
    tag: "Erinnerungskultur",
    title: "Stadtweite Putzaktion der Stolpersteine",
    text: "Zum 80. Jahrestag der Befreiung vom Nazi-Regime putzten unsere Schülerinnen und Schüler Stolpersteine und trugen die Geschichten der Opfer vor.",
    image: "/stolpersteine-putzaktion.jpg",
  },
  {
    tag: "Schulgarten",
    title: "Der Schulgarten wächst weiter",
    text: "Unter Leitung des WPK Schulgarten entsteht Schritt für Schritt eine grüne Lernumgebung direkt am Schulgebäude.",
    image: "/fruehling.jpg",
  },
  {
    tag: "Sport",
    title: "Lauftag: Kilometer sammeln für einen guten Zweck",
    text: "Beim jährlichen Lauftag sammelten unsere Schülerinnen und Schüler fleißig Kilometer und Spenden für Schulgarten und Sportbereich.",
    image: "/lauftag.png",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-white">
        <HeroImage
          src="/impressum.jpg"
          alt="Lichtdurchflutetes Treppenhaus der Realschule John-F.-Kennedy-Platz"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/85 to-[var(--ink)]/60" />
        <Stagger
          staggerDelay={0.12}
          className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
        >
          <StaggerItem hover="none">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Realschule · Braunschweig
            </p>
          </StaggerItem>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.15] sm:text-6xl">
            <WordFadeIn text={"Eigenverantwortlich lernen.\nGemeinsam wachsen."} />
          </h1>
          <StaggerItem hover="none">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Eigenverantwortliches und kooperatives Lernen und Arbeiten in
              einer gewaltfreien Schule, in der kein Platz für diskriminierende
              Äußerungen und Handlungen ist.
            </p>
          </StaggerItem>
          <StaggerItem hover="none">
            <div className="mt-10 flex flex-wrap gap-4">
              <MotionLink
                href="/schulprofil"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
              >
                Unsere Schule kennenlernen
              </MotionLink>
              <MotionLink
                href="/kontakt"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Kontakt & Anfahrt
              </MotionLink>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Stagger className="grid gap-6 sm:auto-rows-fr sm:grid-cols-2">
          {quickLinks.map((item, i) => {
            const featured = i === 0;
            const linkClass = featured
              ? "text-[var(--accent)] hover:text-white"
              : "text-[var(--accent)] hover:text-[var(--accent-dark)]";
            const cta = (
              <>
                {item.cta}
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </>
            );
            return (
              <StaggerItem
                key={item.title}
                className={`group flex flex-col justify-between rounded-2xl p-7 transition-shadow duration-300 ${
                  featured
                    ? "bg-[var(--ink)] text-white hover:shadow-xl hover:shadow-black/20 sm:row-span-2 sm:p-10"
                    : "border border-[var(--border)] bg-[var(--surface)] hover:shadow-xl hover:shadow-black/5"
                }`}
              >
                <div>
                  <h3
                    className={`font-[family-name:var(--font-display)] font-semibold ${
                      featured
                        ? "text-2xl sm:text-3xl"
                        : "text-xl text-[var(--foreground)]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      featured ? "text-white/70" : "text-[var(--muted)]"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${linkClass}`}
                  >
                    {cta}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${linkClass}`}
                  >
                    {cta}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Leitbild */}
      <section className="border-y border-[var(--border)] bg-white">
        <Stagger
          staggerDelay={0.15}
          className="relative mx-auto max-w-4xl px-6 py-20 text-center"
        >
          <StaggerItem hover="none">
            <span
              aria-hidden
              className="pointer-events-none block select-none font-[family-name:var(--font-display)] text-7xl leading-none text-[var(--accent)]/15 sm:text-8xl"
            >
              „
            </span>
          </StaggerItem>
          <StaggerItem hover="none" className="-mt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
              Unser Leitbild
            </p>
          </StaggerItem>
          <StaggerItem hover="none">
            <ScrollHighlightText
              text="Wir achten die Vielfalt unserer Schülerinnen und Schüler, fördern und fordern individuell und schaffen eine vertrauensvolle Arbeitsatmosphäre – getragen von Respekt, Verantwortung und demokratischen Werten."
              className="mt-6 font-[family-name:var(--font-display)] text-2xl font-medium italic leading-relaxed sm:text-3xl"
            />
          </StaggerItem>
          <StaggerItem hover="none">
            <Link
              href="/schulprofil"
              className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)]"
            >
              Alle Leitziele lesen
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Aktuelles */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
              Aktuelles
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              Aus dem Schulleben
            </h2>
          </div>
          <Link
            href="/schulleben"
            className="hidden shrink-0 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] sm:inline-flex"
          >
            Alle Beiträge →
          </Link>
        </FadeIn>
        <Stagger>
          <StaggerItem
            hover="none"
            className="group grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 sm:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto">
              <Image
                src={news[0].image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                {news[0].tag}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[var(--foreground)]">
                {news[0].title}
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                {news[0].text}
              </p>
            </div>
          </StaggerItem>
        </Stagger>
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(1).map((item) => (
            <StaggerItem
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  {item.tag}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Link
          href="/schulleben"
          className="mt-8 inline-flex text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] sm:hidden"
        >
          Alle Beiträge →
        </Link>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Stagger>
          <StaggerItem
            hover="scale"
            className="flex flex-col items-start gap-6 rounded-2xl bg-[var(--accent)] p-10 text-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                Fragen zur Anmeldung oder zum Schulalltag?
              </h2>
              <p className="mt-2 text-white/85">
                Unser Sekretariat hilft Ihnen gerne persönlich weiter.
              </p>
            </div>
            <MotionLink
              href="/kontakt"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent-dark)] transition-colors hover:bg-white/90"
            >
              Kontakt aufnehmen
            </MotionLink>
          </StaggerItem>
        </Stagger>
      </section>
    </div>
  );
}
