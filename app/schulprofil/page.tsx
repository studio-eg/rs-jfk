import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TimelineLine } from "@/components/motion/TimelineLine";
import { IconPop } from "@/components/motion/IconPop";

export const metadata: Metadata = {
  title: "Schulprofil",
  description:
    "Leitbild, Leitziele, Lage, Ausstattung und Geschichte der Realschule John-F.-Kennedy-Platz.",
};

const leitziele = [
  "Wir achten die Vielfalt, die unsere Schülerinnen und Schüler durch ihre verschiedene Herkunft, Kultur, Religion und Begabung in unsere Schule einbringen. Wir respektieren die Individualität jedes Einzelnen und fördern und fordern individuell.",
  "Wir wollen eine Schule sein, in der durch respektvollen, wertschätzenden Umgang miteinander sowie engagierte Zusammenarbeit aller die Voraussetzung für eine vertrauensvolle Arbeitsatmosphäre geschaffen wird.",
  "Wir wollen, dass jeder Verantwortung für sich und andere übernimmt und verbindliche Regeln und Pflichten beachtet, die für ein gutes Miteinander in unserer Schulgemeinschaft notwendig sind.",
  "Wir wollen unsere Schülerinnen und Schüler in ihrer Gesamtpersönlichkeit wahrnehmen, ihre Lernfreude erhalten und sie motivieren, Kreativität, Leistungsbereitschaft und Selbstständigkeit auszubauen.",
  "Wir erziehen unsere Schülerinnen und Schüler dazu, die demokratischen Werte unserer Gesellschaft zu achten und zu bewahren sowie sich couragiert, tolerant und verantwortungsbewusst zu verhalten.",
  "Wir sichern und verbessern die Qualität des Unterrichts durch Fortbildungen der Lehrkräfte sowie durch die Einbeziehung außerschulischer Lernorte und externer Fachleute.",
  "Wir bereiten die Schülerinnen und Schüler in allen Fächern auf die Anforderungen ihres späteren beruflichen und gesellschaftlichen Lebens vor – mit intensiver Berufsorientierung, Methodenvielfalt, Medienkompetenz und musisch-kultureller Bildung.",
];

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M5 9.5a11 11 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13a6.5 6.5 0 0 1 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.2" fill="currentColor" />
    </svg>
  );
}

function RoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M5 4h11v9a5.5 5.5 0 0 1-11 0V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 7h1.5a2.5 2.5 0 0 1 0 5H16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M4 10v4M7 8v8M17 8v8M20 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 18c2-3 5-6 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ausstattung = [
  {
    title: "Digitale Ausstattung",
    text: "Flächendeckendes WLAN, IServ-Zugang für alle Schülerinnen, Schüler und Lehrkräfte, Microsoft-Office-Paket, mehrere Notebook-Wagen und iPad-Klassensätze.",
    icon: WifiIcon,
  },
  {
    title: "Fachräume",
    text: "Modernisierte Fachräume für Naturwissenschaften, Informatik, Musik, Hauswirtschaft, Textiles Gestalten und Werken.",
    icon: RoomIcon,
  },
  {
    title: "Cafeteria",
    text: "Pausensnacks unter dem Motto „Gesundes Frühstück“, bewirtschaftet in Kooperation mit der VHS-Gruppe „Arbeit und Beruf“.",
    icon: CupIcon,
  },
  {
    title: "Sport",
    text: "Eigene Turnhalle, Fitnesskeller, Skikeller mit Langlauf- und Alpinski-Ausrüstung sowie neun Paddelboote mit eigenem Liegeplatz an der Oker.",
    icon: SportIcon,
  },
  {
    title: "Schulhof & Schulgarten",
    text: "Tischtennisplatten, Kickertische, Niedrigseilgarten, Basketballfeld sowie ein eigener Schulgarten direkt am Gebäude.",
    icon: LeafIcon,
  },
  {
    title: "Beratung",
    text: "Ein eigenes Beratungszimmer für vertrauliche Gespräche mit Schülerinnen, Schülern und Eltern.",
    icon: ChatIcon,
  },
];

const chronik = [
  {
    year: "1911",
    text: "Gründung als Knaben-Mittelschule – die zweite Mittelschule der Stadt Braunschweig.",
  },
  {
    year: "1914",
    text: "Umzug in das neu erbaute Schulgebäude am Augustplatz.",
  },
  {
    year: "1963",
    text: "Nach der Ermordung Präsident Kennedys wird der Augustplatz in John-F.-Kennedy-Platz umbenannt – die Schule erhält ihren heutigen Namen.",
  },
  {
    year: "1966/67",
    text: "Einführung der Koedukation – dauerhaft gemischte Jungen- und Mädchenklassen.",
  },
  {
    year: "2008",
    text: "Zertifizierung als „Sportfreundliche Schule“.",
  },
  {
    year: "2011",
    text: "Die Schule feiert mit einer Festwoche ihr 100-jähriges Bestehen.",
  },
  {
    year: "Heute",
    text: "Zentral gelegene Realschule mit Zertifizierung „Schule ohne Rassismus – Schule mit Courage“ und Zivilcouragepreis der Polizeidirektion Braunschweig.",
  },
];

export default function SchulprofilPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Über uns"
        title="Schulprofil"
        lead="Wer wir sind, wofür wir stehen und wie sich unsere Schule seit 1911 entwickelt hat."
        image="/jfk.jpg"
        imageAlt="Schülerinnen und Schüler versammeln sich auf dem Schulhof"
      />

      {/* Leitbild */}
      <Stagger
        staggerDelay={0.15}
        className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20"
      >
        <StaggerItem hover="none">
          <span
            aria-hidden
            className="pointer-events-none block select-none font-[family-name:var(--font-display)] text-7xl leading-none text-[var(--accent)]/15"
          >
            „
          </span>
        </StaggerItem>
        <StaggerItem hover="none" className="-mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            Leitbild
          </p>
        </StaggerItem>
        <StaggerItem hover="none">
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium leading-relaxed text-[var(--foreground)] sm:text-3xl">
            Eigenverantwortliches und kooperatives Lernen und Arbeiten in einer
            gewaltfreien Schule, in der kein Platz für diskriminierende
            Äußerungen und Handlungen ist.
          </p>
        </StaggerItem>
      </Stagger>

      {/* Leitziele */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
              Unsere Leitziele
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Von der Gesamtkonferenz nach Diskussion in schulinternen Gremien
              beschlossen.
            </p>
          </FadeIn>
          <Stagger className="mt-10 divide-y divide-[var(--border)]">
            {leitziele.map((text, i) => (
              <StaggerItem
                key={i}
                hover="none"
                className="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr] sm:items-baseline sm:gap-8"
              >
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent)]/25 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-[var(--muted)]">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lage & Ausstattung */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)]">
            Lage & Ausstattung
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
            Die Realschule John-F.-Kennedy-Platz ist eine von sieben
            Realschulen in Braunschweig. Der Standort liegt zentral in der
            Innenstadt und ist verkehrsgünstig zu erreichen. Da es kein
            Einzugsgebiet gibt, kommen unsere Schülerinnen und Schüler aus dem
            gesamten Stadtgebiet – eine gute Mischung aus ländlich geprägten
            Randbereichen, Innenstadt und der Weststadt.
          </p>
        </FadeIn>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ausstattung.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.title}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                <IconPop className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  <Icon />
                </IconPop>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Chronik */}
      <section className="border-t border-[var(--border)] bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
              Über 110 Jahre Schulgeschichte
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              1911 als Knaben-Mittelschule gegründet, 1963 nach dem
              amerikanischen Präsidenten John F. Kennedy benannt – ein kurzer
              Blick auf unsere Geschichte.
            </p>
          </FadeIn>
          <Stagger staggerDelay={0.1}>
            <div className="relative mt-10">
              <div className="absolute inset-y-1 left-0 w-px bg-white/15" />
              <TimelineLine className="inset-y-1" />
              <ol className="space-y-8 pl-8">
                {chronik.map((item) => (
                  <StaggerItem key={item.year} as="li" hover="none" className="relative">
                    <span className="absolute -left-[2.15rem] top-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--accent)]">
                      {item.year}
                    </p>
                    <p className="mt-1 text-white/75">{item.text}</p>
                  </StaggerItem>
                ))}
              </ol>
            </div>
          </Stagger>
        </div>
      </section>
    </div>
  );
}
