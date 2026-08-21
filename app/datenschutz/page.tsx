import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Datenschutz",
};

const rights = [
  {
    title: "Auskunft / Akteneinsicht",
    text: "Gem. Art. 15 DSGVO haben Sie das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu erhalten.",
  },
  {
    title: "Berichtigung",
    text: "Sind gespeicherte Daten unrichtig oder unvollständig, haben Sie gem. Art. 16 DSGVO das Recht auf Berichtigung.",
  },
  {
    title: "Löschung",
    text: "Art. 17 DSGVO normiert das Recht auf Löschung personenbezogener Daten, sofern deren Speicherung nicht mehr erforderlich ist.",
  },
  {
    title: "Einschränkung der Verarbeitung",
    text: "Gem. Art. 18 DSGVO können Sie unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.",
  },
  {
    title: "Widerspruch",
    text: "Bei Gründen, die sich aus Ihrer besonderen Situation ergeben, können Sie gem. Art. 21 DSGVO widersprechen.",
  },
  {
    title: "Datenübertragbarkeit",
    text: "Gem. Art. 20 DSGVO haben Sie das Recht, Ihre Daten in einem gängigen, maschinenlesbaren Format zu erhalten.",
  },
  {
    title: "Widerruf der Einwilligung",
    text: "Sie haben gem. Art. 7 Abs. 3 DSGVO das Recht, erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft zu widerrufen.",
  },
  {
    title: "Beschwerde",
    text: "Art. 77 DSGVO normiert ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.",
  },
];

export default function DatenschutzPage() {
  return (
    <div>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />

      <Stagger
        staggerDelay={0.08}
        className="mx-auto max-w-3xl space-y-12 px-6 py-16 sm:py-20"
      >
        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Name und Anschrift des Verantwortlichen
          </h2>
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
            Datenschutzbeauftragte
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Natalie Rahman-K. / Christian Petermann
            <br /> Realschule John-F.-Kennedy-Platz
            <br /> John-F.-Kennedy-Platz 1
            <br /> 38100 Braunschweig
            <br /> E-Mail: datenschutz@rs-kennedy.de
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Bereitstellung der Website und Erstellung von Logfiles
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Bei jedem Aufruf unserer Internetseite erfasst unser System
            automatisiert Daten und Informationen vom aufrufenden Rechner:
            Datum und Uhrzeit des Zugriffs, IP-Adresse, Betriebssystem- und
            Browsertyp sowie die aufgerufene Seite. Eine Zusammenführung mit
            anderen personenbezogenen Daten findet nicht statt. Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. f DSGVO; die Daten werden nach zwei Monaten
            gelöscht und nur statistisch ausgewertet.
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Speicherung bei Kontaktaufnahme
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Nehmen Sie per E-Mail Kontakt mit uns auf, werden die übermittelten
            personenbezogenen Daten zur Bearbeitung Ihres Anliegens
            gespeichert und gelöscht, sobald die Speicherung nicht mehr
            erforderlich ist.
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Datenschutz in Videokonferenzen
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            An Videokonferenzen der Schule dürfen ausschließlich die
            eingeladenen Schülerinnen und Schüler teilnehmen – nicht Eltern,
            Geschwister oder Freunde. Video-, Bild- oder Tonaufnahmen der
            Konferenz sind nicht gestattet. Verstöße werden gemeldet.
          </p>
        </StaggerItem>

        <StaggerItem hover="none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
            Ihre Rechte
          </h2>
          <Stagger staggerDelay={0.05}>
            <dl className="mt-4 space-y-5">
              {rights.map((right) => (
                <StaggerItem key={right.title} hover="none">
                  <dt className="font-semibold text-[var(--foreground)]">
                    {right.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {right.text}
                  </dd>
                </StaggerItem>
              ))}
            </dl>
          </Stagger>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
            Zuständige Aufsichtsbehörde: Die Landesbeauftragte für den
            Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover ·{" "}
            <a
              href="mailto:poststelle@lfd.niedersachsen.de"
              className="text-[var(--accent)]"
            >
              poststelle@lfd.niedersachsen.de
            </a>
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
