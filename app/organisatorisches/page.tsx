import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Organisatorisches",
  description:
    "Anmeldung, Schulbuchausleihe, Abschlussverfahren und Formulare der Realschule John-F.-Kennedy-Platz.",
};

const quickNav = [
  { id: "anmeldung", label: "Anmeldung" },
  { id: "schulbuecher", label: "Schulbuchausleihe" },
  { id: "abschluss", label: "Abschlussverfahren" },
  { id: "formulare", label: "Formulare" },
];

const mitbringen = [
  "Originalzeugnis der 4. Klasse (1. Halbjahr)",
  "Impfnachweis über den Masernschutz",
  "Schwimmnachweis Bronze",
];

const abschluesse = [
  {
    level: "I",
    title: "Hauptschulabschluss",
    pt: "sm:pt-6",
  },
  {
    level: "II",
    title: "Realschulabschluss",
    pt: "sm:pt-10",
  },
  {
    level: "III",
    title: "Erweiterter Sekundarabschluss I",
    pt: "sm:pt-14",
  },
];

const infoblaetter = [
  "Unterrichtszeiten und Raumpläne",
  "Leitbild und Leitziele unserer Schule",
  "Schulordnung",
  "Schule ohne Rassismus – Schule mit Courage",
  "Social Media Guideline",
  "Hinweise zur Benutzung der Schulrechner",
  "Informationen zum Infektionsschutz",
  "Verhalten bei Kopflausbefall",
  "Sportunterricht",
  "Kriterien der Beurteilung: Arbeits- und Sozialverhalten",
  "Unsere Schule von A–Z",
];

const infoHalf = Math.ceil(infoblaetter.length / 2);
const infoCol1 = infoblaetter.slice(0, infoHalf);
const infoCol2 = infoblaetter.slice(infoHalf);

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.5 10.3l2.1 2.1L13.5 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-[var(--accent)]">
      <path
        d="M5 2.5h6l4 4v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M11 2.5V6a1 1 0 0 0 1 1h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export default function OrganisatorischesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Organisatorisches"
        title="Anmeldung, Formulare & Termine"
        lead="Alles Wichtige rund um Anmeldung, Schulbuchausleihe und den Übergang nach Klasse 10."
        image="/organisatorisches.jpg"
        imageAlt="Regal mit Ordnern und Unterrichtsmaterial"
      />

      {/* Quick nav */}
      <div className="sticky top-[73px] z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-[var(--border)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)]/80 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Anmeldung */}
      <section id="anmeldung" className="mx-auto max-w-6xl scroll-mt-36 px-6 py-16 sm:py-20">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            Anmeldung
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Zwei Wege an unsere Schule
          </h2>
        </FadeIn>
        <Stagger className="mt-10 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-2">
          <StaggerItem
            hover="none"
            className="border-b border-[var(--border)] p-8 lg:border-r lg:border-b-0"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Klasse 5
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Anmeldung für Klasse 5
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Grundschuleltern sind im Frühjahr zu unserem Infoabend
              eingeladen, bei dem wir mit Führungen und Mitmach-Stationen
              einen Einblick in unseren Schulalltag geben. Die konkreten
              Anmelde- und Infoabend-Termine für das kommende Schuljahr geben
              wir rechtzeitig über diese Website und die Grundschulen bekannt.
            </p>
            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              Bitte mitbringen
            </p>
            <ul className="mt-3 space-y-2.5">
              {mitbringen.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem hover="none" className="p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Klasse 6–10
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Anmeldung Klasse 6–10
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Wir können in den oberen Jahrgängen nur sehr begrenzt freie
              Schulplätze anbieten und arbeiten mit einer Vormerkliste. Bitte
              melden Sie Ihr Kind nur an einer Realschule als Erstwunsch an;
              Zweit- und Drittwunsch können auf dem Anmeldeformular vermerkt
              werden.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Erforderlich sind das Anmeldeformular, eine Kopie des letzten
              Zeugnisses sowie ein Überweisungsbeschluss der abgebenden
              Schule (kann nachgereicht werden). Bei einem Wechsel von der
              IGS wird zusätzlich ein Notenzeugnis benötigt.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Schulbuchausleihe */}
      <section id="schulbuecher" className="scroll-mt-36 border-y border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <FadeIn className="flex flex-col gap-6 rounded-2xl bg-[var(--background)] p-8 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)]">
              <BookIcon />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
                Schulbuchausleihe
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">
                Für jeden Jahrgang stellen wir ein Anschreiben mit
                Materialliste zur Schulbuchausleihe zur Verfügung – inklusive
                gesonderter Fassungen für Schülerinnen und Schüler mit
                sonderpädagogischem Förderbedarf. Die aktuellen Unterlagen
                erhalten Sie über das Sekretariat oder IServ.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Abschlussverfahren */}
      <section id="abschluss" className="mx-auto max-w-6xl scroll-mt-36 px-6 py-16 sm:py-20">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            Abschlussverfahren
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Abschlüsse nach Jahrgang 10
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
            Nach dem 10. Schuljahrgang können in Verbindung mit einer
            erfolgreich absolvierten Abschlussprüfung folgende Abschlüsse
            erworben werden:
          </p>
        </FadeIn>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3 sm:items-end">
          {abschluesse.map((item, i) => {
            const featured = i === abschluesse.length - 1;
            return (
              <StaggerItem
                key={item.title}
                hover="none"
                className={`rounded-2xl p-6 pb-8 ${item.pt} ${
                  featured
                    ? "bg-[var(--accent)] text-white"
                    : "border border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-display)] text-3xl font-semibold ${
                    featured ? "text-white/40" : "text-[var(--accent)]/30"
                  }`}
                >
                  {item.level}
                </span>
                <p
                  className={`mt-3 font-semibold ${
                    featured ? "text-white" : "text-[var(--foreground)]"
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`mt-1 text-xs uppercase tracking-wide ${
                    featured ? "text-white/70" : "text-[var(--muted)]"
                  }`}
                >
                  Sekundarabschluss I
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Infoblätter & Formulare */}
      <section id="formulare" className="scroll-mt-36 border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
              Formulare
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              Infoblätter & Formulare
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
              Diese Dokumente stehen als PDF im Sekretariat und über IServ zur
              Verfügung, darunter auch das Blankoformular für Entschuldigungen
              und der Antrag auf Unterrichtsbefreiung zur Teilnahme an
              religiösen Feiern.
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:grid sm:grid-cols-2 sm:divide-x sm:divide-[var(--border)]">
            <Stagger staggerDelay={0.03} className="divide-y divide-[var(--border)]">
              {infoCol1.map((item) => (
                <StaggerItem
                  key={item}
                  hover="none"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--foreground)]"
                >
                  <DocumentIcon />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Stagger staggerDelay={0.03} className="divide-y divide-[var(--border)]">
              {infoCol2.map((item) => (
                <StaggerItem
                  key={item}
                  hover="none"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--foreground)]"
                >
                  <DocumentIcon />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
}
