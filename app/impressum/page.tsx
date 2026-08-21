import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />

      <Stagger
        staggerDelay={0.08}
        className="mx-auto max-w-3xl space-y-12 px-6 py-16 sm:py-20"
      >
        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Diensteanbieter im Sinne des Telemediengesetzes
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Land Niedersachsen, vertreten durch:
            <br /> Felix Müller, Realschulrektor (komm.)
            <br /> Johannes Nadjib, Realschulkonrektor (komm.)
          </p>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Realschule John-F.-Kennedy-Platz
            <br /> John-F.-Kennedy-Platz 1
            <br /> 38100 Braunschweig
            <br /> Telefon: (0531) 470 5030
            <br /> Telefax: (0531) 470 5031
            <br /> E-Mail: rskennedyplatz@braunschweig.de
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Schulträger (Diensteanbieter im Sinne des TDG/MDStV)
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Stadtverwaltung Braunschweig
            <br /> Platz der Deutschen Einheit 1
            <br /> 38100 Braunschweig
            <br /> Telefon: (0531) 470-1
            <br /> Telefax: (0531) 151 12
            <br /> E-Mail: stadt@braunschweig.de
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Verantwortlich für die Schulhomepage i. S. d. § 18 Abs. 2 MStV
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Felix Müller, Realschulrektor (komm.)
            <br /> Realschule John-F.-Kennedy-Platz
            <br /> John-F.-Kennedy-Platz 1
            <br /> 38100 Braunschweig
            <br /> E-Mail: rskennedyplatz@braunschweig.de
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Haftungsausschluss
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Die Informationen auf diesem Internetauftritt wurden nach bestem
            Wissen und Gewissen sorgfältig zusammengestellt und geprüft. Es
            wird jedoch keine Gewähr – weder ausdrücklich noch stillschweigend
            – für die Vollständigkeit, Richtigkeit, Aktualität oder Qualität
            und jederzeitige Verfügbarkeit der bereitgestellten Informationen
            übernommen. In keinem Fall wird für Schäden, die sich aus der
            Verwendung der abgerufenen Informationen ergeben, eine Haftung
            übernommen.
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Internetseiten Dritter / Links
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Diese Website enthält Links auf Internetauftritte Dritter. Diese
            Links stellen keine Zustimmung zu deren Inhalten durch den
            Herausgeber dar. Für illegale, fehlerhafte oder unvollständige
            Inhalte und für Schäden, die aus der Nutzung entstehen, haftet
            allein der Anbieter der verlinkten Seite.
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
