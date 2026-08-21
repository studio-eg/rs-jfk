import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Schulleben",
  description:
    "Projekte, Aktionen und Ereignisse aus dem Schulleben der Realschule John-F.-Kennedy-Platz.",
};

const stories = [
  {
    tag: "Schulleben",
    title: "Ehemaliger Schüler und Fußballprofi Jannes Horn zu Besuch",
    text: "Nach einem Austausch mit einer Lehrkraft besuchte der ehemalige Schüler und heutige Fußballprofi Jannes Horn seine alte Schule, beantwortete Fragen der Schülerinnen und Schüler und traf sich mit früheren Klassenkameraden und Lehrkräften.",
    image: "/jannes-horn.jpg",
  },
  {
    tag: "Kreativität",
    title: "Kunstprojekt „Buchzimmer“ – Kreativität auf hohem Niveau",
    text: "Die Klassen 5a, 6b und 7c gestalteten im Kunstunterricht Miniatur-Buchzimmer, inspiriert von der Welt der Bücher. Ein schulinterner Wettbewerb kürte die drei besten Objekte – eines davon wurde beim Niedersächsischen Schulbibliothekswettbewerb eingereicht.",
    image: "/buchzimmer.jpg",
  },
  {
    tag: "Engagement",
    title: "Spende an den Verein Weggefährten e. V.",
    text: "Die Schülervertretung organisierte ein Frühlingsfest mit Tombola, um die kulturelle Vielfalt der Schule zu feiern. Der gesamte Erlös von 293,31 € ging an einen Verein, der sich um krebskranke Kinder und ihre Familien kümmert.",
    image: "/spende-weggefaehrten.jpg",
  },
  {
    tag: "Erinnerungskultur",
    title: "Stadtweite Putzaktion der Stolpersteine",
    text: "Zum 80. Jahrestag der Befreiung vom Nazi-Regime putzten unsere Schülerinnen und Schüler gemeinsam mit dem Verein „Stolpersteine für Braunschweig“ Gedenksteine und trugen die Lebensgeschichten der Opfer vor.",
    image: "/stolpersteine-putzaktion.jpg",
  },
  {
    tag: "Prävention",
    title: "LARS & LISA an der Realschule John-F.-Kennedy-Platz",
    text: "Das von der Stadt Braunschweig geförderte Präventionsprojekt stärkt in zehn Doppelstunden die psychosoziale Kompetenz und Resilienz der Schülerinnen und Schüler.",
    image: "/lars-lisa.jpg",
  },
  {
    tag: "Schulgarten",
    title: "Der Schulgarten wächst weiter",
    text: "Unter Leitung des WPK Schulgarten und mit Unterstützung des Fachbereichs Werken entsteht Schritt für Schritt eine grüne Lernumgebung direkt am Schulgebäude – zuletzt mit einer Tulpenaktion zugunsten dreier Hilfsorganisationen.",
    image: "/fruehling.jpg",
  },
  {
    tag: "Sport",
    title: "Lauftag & sportfreundliche Schule",
    text: "Beim jährlichen Lauftag sammeln Schülerinnen und Schüler Kilometer und Spenden für Schulgarten und Sportbereich – ein Baustein unserer mehrfachen Zertifizierung als „Sportfreundliche Schule“.",
    image: "/lauftag.png",
  },
  {
    tag: "Schulleben",
    title: "SV und Schulleitung weihen neuen Kicker ein",
    text: "Mit viel Spaß weihten Schülervertretung und Schulleitung den neuen Kickertisch in der Pausenhalle ein. Damit sind spannende Turniere – und auch Billard – möglich.",
    image: "/kicker-einweihung.jpg",
  },
  {
    tag: "Umwelt",
    title: "Bootsanleger der Schule saniert",
    text: "Wir freuen uns über unseren sanierten Bootsanleger an der Oker – vielen Dank an die Stadt Braunschweig und unseren Hausmeister.",
    image: "/bootsanleger.jpg",
  },
  {
    tag: "Engagement",
    title: "Teilnahme am Stadtputztag",
    text: "Auch in diesem Jahr beteiligten sich unsere Schülerinnen und Schüler am Braunschweiger Stadtputztag und setzten sich für eine saubere Innenstadt ein.",
    image: "/stadtputztag.jpg",
  },
  {
    tag: "Engagement",
    title: "SV sammelt für AIDS-Hilfe",
    text: "Unsere Schülervertretung sammelte auch in diesem Jahr für die AIDS-Hilfe und konnte einen ansehnlichen Betrag spenden. Vielen Dank für dieses Engagement!",
    image: "/sv-aids-hilfe.jpg",
  },
];

export default function SchullebenPage() {
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
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto">
              <Image
                src={stories[0].image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                {stories[0].tag}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[var(--foreground)]">
                {stories[0].title}
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                {stories[0].text}
              </p>
            </div>
          </StaggerItem>
        </Stagger>
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.slice(1).map((story) => (
            <StaggerItem
              key={story.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  {story.tag}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--foreground)]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {story.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
