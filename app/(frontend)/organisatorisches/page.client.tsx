"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mediaUrl } from "@/lib/media";
import { getLivePreviewServerURL } from "@/lib/livePreview";
import type { Organisatorisch } from "@/payload-types";

// Structural — the sticky quick-nav below links to these fixed anchors, so
// ids/labels stay hardcoded rather than CMS-driven (see payload/globals/Organisatorisches.ts).
const quickNav = [
  { id: "anmeldung", label: "Anmeldung" },
  { id: "schulbuecher", label: "Schulbuchausleihe" },
  { id: "abschluss", label: "Abschlussverfahren" },
  { id: "formulare", label: "Formulare" },
];

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

export default function OrganisatorischesPageClient({ initialOrg }: { initialOrg: Organisatorisch }) {
  const { data: org } = useLivePreview<Organisatorisch>({
    initialData: initialOrg,
    serverURL: getLivePreviewServerURL(),
    depth: 1,
  });

  const mitbringen = org.mitbringen ?? [];
  const abschluesse = org.abschluesse ?? [];
  const infoblaetter = org.infoblaetter ?? [];
  const schulbuecherDokumente = org.schulbuecherDokumente ?? [];

  const infoHalf = Math.ceil(infoblaetter.length / 2);
  const infoCol1 = infoblaetter.slice(0, infoHalf);
  const infoCol2 = infoblaetter.slice(infoHalf);

  return (
    <div>
      <PageHeader
        eyebrow="Organisatorisches"
        title="Anmeldung, Formulare & Termine"
        lead={org.heroLead}
        image={mediaUrl(org.heroImage)}
        imageAlt={org.heroImageAlt}
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
              {org.anmeldungKl5Text}
            </p>
            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              Bitte mitbringen
            </p>
            <ul className="mt-3 space-y-2.5">
              {mitbringen.map((item, i) => (
                <li key={item.id ?? i} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                  <CheckIcon />
                  <span>{item.item}</span>
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
              {org.anmeldungKl6bis10Text}
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
                {org.schulbuchausleiheText}
              </p>
              <a
                href="#formulare"
                className="mt-5 inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
              >
                Formulare zur Schulbuchausleihe
              </a>
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
            {org.abschluesseIntro}
          </p>
        </FadeIn>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3 sm:items-end">
          {abschluesse.map((item, i) => {
            const featured = i === abschluesse.length - 1;
            const pt = ["sm:pt-6", "sm:pt-10", "sm:pt-14"][i] ?? "";
            return (
              <StaggerItem
                key={item.id ?? i}
                hover="none"
                className={`rounded-2xl p-6 pb-8 ${pt} ${
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
              {org.formulareText}
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:grid sm:grid-cols-2 sm:divide-x sm:divide-[var(--border)]">
            <Stagger staggerDelay={0.03} className="divide-y divide-[var(--border)]">
              {infoCol1.map((item, i) => (
                <StaggerItem
                  key={item.id ?? i}
                  hover="none"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--foreground)]"
                >
                  <DocumentIcon />
                  <a
                    href={mediaUrl(item.datei)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--accent)] hover:underline"
                  >
                    {item.label}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <Stagger staggerDelay={0.03} className="divide-y divide-[var(--border)]">
              {infoCol2.map((item, i) => (
                <StaggerItem
                  key={item.id ?? i}
                  hover="none"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--foreground)]"
                >
                  <DocumentIcon />
                  <a
                    href={mediaUrl(item.datei)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--accent)] hover:underline"
                  >
                    {item.label}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-14">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Schulbuchausleihe 2026/2027
            </h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-[var(--muted)]">
              Anschreiben und Materiallisten je Jahrgang, inklusive Fassungen für Schülerinnen und
              Schüler mit sonderpädagogischem Förderbedarf.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <Stagger staggerDelay={0.03} className="divide-y divide-[var(--border)]">
              {schulbuecherDokumente.map((item, i) => {
                const dateiUrl = mediaUrl(item.datei);
                const sopaedUrl = mediaUrl(item.dateiSopaed);
                return (
                  <StaggerItem
                    key={item.id ?? i}
                    hover="none"
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-[var(--foreground)]"
                  >
                    <span className="flex items-center gap-3">
                      <DocumentIcon />
                      {item.klasse}
                    </span>
                    <span className="flex items-center gap-4">
                      {dateiUrl && (
                        <a
                          href={dateiUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                        >
                          PDF herunterladen
                        </a>
                      )}
                      {sopaedUrl && (
                        <a
                          href={sopaedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                        >
                          Sonderpädagogischer Förderbedarf
                        </a>
                      )}
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
}
