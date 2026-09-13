/**
 * One-time script: imports the 15 existing Schulleben posts from
 * lib/schulleben.ts into Payload (Media + Posts collections), so the site
 * has real content before the pages are cut over to the CMS in Phase 4.
 *
 * Run with: npm run seed
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload, type Payload } from "payload";

import config from "../payload.config";
import { schullebenPosts } from "../lib/schulleben";
import type { Post } from "../payload-types";

const externalLinks = {
  iserv: "https://www.rs-kennedy.de/idesk",
  stundenplan:
    "https://borys.webuntis.com/WebUntis/?school=rs%20jfk%20braunschweig#/basic/login",
} as const;

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "..", "public");

type LexicalRichText = Post["body"];

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

const mediaCache = new Map<string, number>();

/** Uploads public/<relativePath> as a Media doc, reusing one already
 * uploaded under the same filename (idempotent across script re-runs). */
async function ensureMedia(
  payload: Payload,
  relativePath: string,
  alt: string
): Promise<number> {
  const cached = mediaCache.get(relativePath);
  if (cached) return cached;

  const filename = path.basename(relativePath);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs[0]) {
    mediaCache.set(relativePath, existing.docs[0].id);
    return existing.docs[0].id;
  }

  const imagePath = path.join(publicDir, relativePath);
  const ext = path.extname(imagePath).toLowerCase();
  const mimetype = MIME_TYPES[ext];
  if (!mimetype) {
    throw new Error(`Unknown image extension "${ext}" for "${relativePath}"`);
  }
  const data = fs.readFileSync(imagePath);

  const mediaDoc = await payload.create({
    collection: "media",
    data: { alt },
    file: { data, mimetype, name: filename, size: data.length },
  });
  mediaCache.set(relativePath, mediaDoc.id);
  return mediaDoc.id;
}

function paragraphsToLexical(paragraphs: string[]): LexicalRichText {
  return {
    root: {
      type: "root",
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            text,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            version: 1,
          },
        ],
      })),
    },
  } as LexicalRichText;
}

async function seedPosts(payload: Payload) {
  // Preserve the current site's editorial order: the first post in the
  // array is featured/most-recent, and the rest follow in the same order.
  // Real historical dates for most posts are missing or partial, so we
  // assign descending synthetic dates matching array order — sorting by
  // publishedDate desc later reproduces today's static ordering exactly.
  const baseDate = new Date();
  const total = schullebenPosts.length;

  for (let i = 0; i < total; i++) {
    const post = schullebenPosts[i];

    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping post "${post.slug}" — already seeded.`);
      continue;
    }

    const mediaId = await ensureMedia(payload, post.image, post.imageAlt);
    const publishedDate = new Date(baseDate);
    publishedDate.setDate(publishedDate.getDate() - i);

    await payload.create({
      collection: "posts",
      data: {
        title: post.title,
        slug: post.slug,
        tag: post.tag,
        publishedDate: publishedDate.toISOString(),
        dateLabel: post.date,
        excerpt: post.excerpt,
        body: paragraphsToLexical(post.body),
        image: mediaId,
        imageAlt: post.imageAlt,
      },
    });

    console.log(`Seeded post "${post.slug}" (${i + 1}/${total}).`);
  }
}

async function seedHeader(payload: Payload) {
  const current = await payload.findGlobal({ slug: "header" });
  const logoImageId = await ensureMedia(payload, "/jfk-logo.png", "JFK-Logo");

  if (current.navItems && current.navItems.length > 0) {
    if (!current.logoImage) {
      await payload.updateGlobal({ slug: "header", data: { logoImage: logoImageId } });
      console.log("Backfilled Header logoImage.");
    } else {
      console.log("Skipping Header global — already seeded.");
    }
    return;
  }

  await payload.updateGlobal({
    slug: "header",
    data: {
      logoEyebrow: "Realschule",
      logoText: "John-F.-Kennedy-Platz",
      logoImage: logoImageId,
      navItems: [
        { label: "Startseite", href: "/", external: false },
        { label: "Schulprofil", href: "/schulprofil", external: false },
        { label: "Angebot", href: "/angebot", external: false },
        { label: "Schulleben", href: "/schulleben", external: false },
        { label: "Organisatorisches", href: "/organisatorisches", external: false },
        { label: "Personen", href: "/personen", external: false },
        { label: "Kontakt", href: "/kontakt", external: false },
      ],
      secondaryButton: {
        label: "Stundenplan",
        href: externalLinks.stundenplan,
        external: true,
      },
      primaryButton: {
        label: "IServ-Login",
        href: externalLinks.iserv,
        external: true,
      },
    },
  });

  console.log("Seeded Header global.");
}

async function seedHome(payload: Payload) {
  const current = await payload.findGlobal({ slug: "home" });
  if (current.heroEyebrow) {
    console.log("Skipping Home global — already seeded.");
    return;
  }

  const heroImageId = await ensureMedia(
    payload,
    "/impressum.jpg",
    "Lichtdurchflutetes Treppenhaus der Realschule John-F.-Kennedy-Platz"
  );

  const homepageNewsSlugs = [
    "jannes-horn-zu-besuch",
    "zeitzeugen-stolpersteine",
    "lauftag-2024",
    "lars-lisa",
    "friedenskonzert-2022",
    "out-gefangen-im-netz",
  ];
  const selectedPosts = await Promise.all(
    homepageNewsSlugs.map(async (slug) => {
      const result = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug } },
        limit: 1,
      });
      if (!result.docs[0]) {
        throw new Error(`Could not find seeded post "${slug}" for Home.selectedPosts`);
      }
      return result.docs[0].id;
    })
  );

  await payload.updateGlobal({
    slug: "home",
    data: {
      heroEyebrow: "Realschule · Braunschweig",
      heroTitle: "Eigenverantwortlich lernen.\nGemeinsam wachsen.",
      heroSubtitle:
        "Eigenverantwortliches und kooperatives Lernen und Arbeiten in einer gewaltfreien Schule, in der kein Platz für diskriminierende Äußerungen und Handlungen ist.",
      heroImage: heroImageId,
      heroImageAlt: "Lichtdurchflutetes Treppenhaus der Realschule John-F.-Kennedy-Platz",
      quickLinks: [
        {
          title: "Anmeldung",
          text: "Informationen zur Anmeldung für die Jahrgänge 5 sowie 6–10 und zu unseren Aufnahmeterminen.",
          ctaLabel: "Zur Anmeldung",
          href: "/organisatorisches",
          external: false,
        },
        {
          title: "Stundenplan & Vertretung",
          text: "Aktuelle Stunden- und Vertretungspläne finden Sie in WebUntis.",
          ctaLabel: "WebUntis öffnen",
          href: externalLinks.stundenplan,
          external: true,
        },
        {
          title: "IServ",
          text: "Kommunikation, Krankmeldungen und Unterrichtsmaterial für Eltern, Schüler:innen und Kollegium.",
          ctaLabel: "Zu IServ",
          href: externalLinks.iserv,
          external: true,
        },
      ],
      leitbildQuote:
        "Wir achten die Vielfalt unserer Schülerinnen und Schüler, fördern und fordern individuell und schaffen eine vertrauensvolle Arbeitsatmosphäre – getragen von Respekt, Verantwortung und demokratischen Werten.",
      selectedPosts,
      ctaTitle: "Fragen zur Anmeldung oder zum Schulalltag?",
      ctaText: "Unser Sekretariat hilft Ihnen gerne persönlich weiter.",
      ctaButtonLabel: "Kontakt aufnehmen",
    },
  });

  console.log("Seeded Home global.");
}

async function seedSchulprofil(payload: Payload) {
  const current = await payload.findGlobal({ slug: "schulprofil" });
  if (current.heroEyebrow) {
    console.log("Skipping Schulprofil global — already seeded.");
    return;
  }

  const heroImageId = await ensureMedia(
    payload,
    "/jfk.jpg",
    "Schülerinnen und Schüler versammeln sich auf dem Schulhof"
  );

  await payload.updateGlobal({
    slug: "schulprofil",
    data: {
      heroEyebrow: "Über uns",
      heroLead:
        "Wer wir sind, wofür wir stehen und wie sich unsere Schule seit 1911 entwickelt hat.",
      heroImage: heroImageId,
      heroImageAlt: "Schülerinnen und Schüler versammeln sich auf dem Schulhof",

      leitbildText:
        "Eigenverantwortliches und kooperatives Lernen und Arbeiten in einer gewaltfreien Schule, in der kein Platz für diskriminierende Äußerungen und Handlungen ist.",

      leitzieleIntro: "Von der Gesamtkonferenz nach Diskussion in schulinternen Gremien beschlossen.",
      leitziele: [
        { text: "Wir achten die Vielfalt, die unsere Schülerinnen und Schüler durch ihre verschiedene Herkunft, Kultur, Religion und Begabung in unsere Schule einbringen. Wir respektieren die Individualität jedes Einzelnen und fördern und fordern individuell." },
        { text: "Wir wollen eine Schule sein, in der durch respektvollen, wertschätzenden Umgang miteinander sowie engagierte Zusammenarbeit aller die Voraussetzung für eine vertrauensvolle Arbeitsatmosphäre geschaffen wird." },
        { text: "Wir wollen, dass jeder Verantwortung für sich und andere übernimmt und verbindliche Regeln und Pflichten beachtet, die für ein gutes Miteinander in unserer Schulgemeinschaft notwendig sind." },
        { text: "Wir wollen unsere Schülerinnen und Schüler in ihrer Gesamtpersönlichkeit wahrnehmen, ihre Lernfreude erhalten und sie motivieren, Kreativität, Leistungsbereitschaft und Selbstständigkeit auszubauen." },
        { text: "Wir erziehen unsere Schülerinnen und Schüler dazu, die demokratischen Werte unserer Gesellschaft zu achten und zu bewahren sowie sich couragiert, tolerant und verantwortungsbewusst zu verhalten." },
        { text: "Wir sichern und verbessern die Qualität des Unterrichts durch Fortbildungen der Lehrkräfte sowie durch die Einbeziehung außerschulischer Lernorte und externer Fachleute." },
        { text: "Wir bereiten die Schülerinnen und Schüler in allen Fächern auf die Anforderungen ihres späteren beruflichen und gesellschaftlichen Lebens vor – mit intensiver Berufsorientierung, Methodenvielfalt, Medienkompetenz und musisch-kultureller Bildung." },
      ],

      lageIntro:
        "Die Realschule John-F.-Kennedy-Platz ist eine von sieben Realschulen in Braunschweig. Der Standort liegt zentral in der Innenstadt und ist verkehrsgünstig zu erreichen. Da es kein Einzugsgebiet gibt, kommen unsere Schülerinnen und Schüler aus dem gesamten Stadtgebiet – eine gute Mischung aus ländlich geprägten Randbereichen, Innenstadt und der Weststadt.",
      ausstattung: [
        { title: "Digitale Ausstattung", text: "Flächendeckendes WLAN, IServ-Zugang für alle Schülerinnen, Schüler und Lehrkräfte, Microsoft-Office-Paket, mehrere Notebook-Wagen und iPad-Klassensätze.", icon: "wifi" },
        { title: "Fachräume", text: "Modernisierte Fachräume für Naturwissenschaften, Informatik, Musik, Hauswirtschaft, Textiles Gestalten und Werken.", icon: "room" },
        { title: "Cafeteria", text: "Pausensnacks unter dem Motto „Gesundes Frühstück“, bewirtschaftet in Kooperation mit der VHS-Gruppe „Arbeit und Beruf“.", icon: "cup" },
        { title: "Sport", text: "Eigene Turnhalle, Fitnesskeller, Skikeller mit Langlauf- und Alpinski-Ausrüstung sowie neun Paddelboote mit eigenem Liegeplatz an der Oker.", icon: "sport" },
        { title: "Schulhof & Schulgarten", text: "Tischtennisplatten, Kickertische, Niedrigseilgarten, Basketballfeld sowie ein eigener Schulgarten direkt am Gebäude.", icon: "leaf" },
        { title: "Beratung", text: "Ein eigenes Beratungszimmer für vertrauliche Gespräche mit Schülerinnen, Schülern und Eltern.", icon: "chat" },
      ],

      chronikTitle: "Über 110 Jahre Schulgeschichte",
      chronikIntro:
        "1911 als Knaben-Mittelschule gegründet, 1963 nach dem amerikanischen Präsidenten John F. Kennedy benannt – ein kurzer Blick auf unsere Geschichte.",
      chronik: [
        { year: "1911", text: "Gründung als Knaben-Mittelschule – die zweite Mittelschule der Stadt Braunschweig." },
        { year: "1914", text: "Umzug in das neu erbaute Schulgebäude am Augustplatz." },
        { year: "1963", text: "Nach der Ermordung Präsident Kennedys wird der Augustplatz in John-F.-Kennedy-Platz umbenannt – die Schule erhält ihren heutigen Namen." },
        { year: "1966/67", text: "Einführung der Koedukation – dauerhaft gemischte Jungen- und Mädchenklassen." },
        { year: "2008", text: "Zertifizierung als „Sportfreundliche Schule“." },
        { year: "2011", text: "Die Schule feiert mit einer Festwoche ihr 100-jähriges Bestehen." },
        { year: "Heute", text: "Zentral gelegene Realschule mit Zertifizierung „Schule ohne Rassismus – Schule mit Courage“ und Zivilcouragepreis der Polizeidirektion Braunschweig." },
      ],
    },
  });

  console.log("Seeded Schulprofil global.");
}

async function seedAngebot(payload: Payload) {
  const current = await payload.findGlobal({ slug: "angebot" });
  if (current.heroEyebrow) {
    console.log("Skipping Angebot global — already seeded.");
    return;
  }

  const heroImageId = await ensureMedia(
    payload,
    "/angebot.jpg",
    "Schülerinnen und Schüler im Klassenraum bei der Arbeit"
  );

  const fachbereicheSource = [
    { title: "Sprachen", fields: "Deutsch, Englisch, Französisch (ab Klasse 6, Wahlpflicht)", image: "/englisch.png" },
    { title: "Mathematik-Naturwissenschaften", fields: "Mathematik, Physik, Chemie, Biologie", image: "/mathe.png" },
    { title: "Geschichtlich-soziale Weltkunde", fields: "Geschichte, Erdkunde (ab Kl. 5), Politik (ab Kl. 7)", image: "/geschichte.png" },
    { title: "Arbeit/Wirtschaft – Technik", fields: "Wirtschaft (ab Kl. 8), Technik und Hauswirtschaft (Kl. 8)", image: "/werken.png" },
    { title: "Musisch-kulturelle Bildung", fields: "Musik, Kunst, Gestaltendes Werken, Textiles Gestalten", image: "/mukubi.png" },
    { title: "Religion / Werte und Normen", fields: "Konfessionell und konfessionell-kooperativ organisiert", image: "/religion.png" },
    { title: "Sport", fields: "U. a. Kanutouren auf der Oker, Disc-Golf, Sponsorenlauf", image: "/sport.png" },
  ];
  const fachbereiche = await Promise.all(
    fachbereicheSource.map(async (item) => ({
      title: item.title,
      fields: item.fields,
      image: await ensureMedia(payload, item.image, item.title),
    }))
  );

  await payload.updateGlobal({
    slug: "angebot",
    data: {
      heroEyebrow: "Unser Angebot",
      heroTitle: "Fachlich stark, persönlich gefördert",
      heroLead: "Von den Kernfächern über Wahlpflichtkurse und Arbeitsgemeinschaften bis zur Berufsorientierung.",
      heroImage: heroImageId,
      heroImageAlt: "Schülerinnen und Schüler im Klassenraum bei der Arbeit",

      fachbereicheIntro: "Zum Pflichtunterricht einer Realschule gehören folgende Fächer, gegliedert in sieben Fachbereiche.",
      fachbereiche,

      wahlpflichtTitle: "Wahlpflichtkurse",
      wahlpflichtText:
        "Eine zweite Fremdsprache (in der Regel Französisch) wird ab dem 6. Schuljahrgang als vierstündiger Wahlpflichtkurs angeboten. Wer sich nicht für die zweite Fremdsprache entscheidet, erhält Unterricht in zwei jeweils zweistündigen anderen Wahlpflichtkursen. Das Erlernen der zweiten Fremdsprache ist keine Voraussetzung für den Übergang in die gymnasiale Oberstufe.",
      profileTitle: "Profile in Jahrgang 9 & 10",
      profileIntro: "Ab dem 8. Schuljahrgang wählen alle Schülerinnen und Schüler ein berufsvorbereitendes Profil.",
      profile: [
        { title: "Profil 1 · Sprachen", text: "Französisch – 4 Wochenstunden" },
        { title: "Profil 2 · Technik", text: "2 Wochenstunden" },
        { title: "Profil 3 · Gesundheit und Soziales", text: "2 Wochenstunden" },
        { title: "Profil 4 · Wirtschaft", text: "2 Wochenstunden" },
      ],

      agIntro: "In Arbeitsgemeinschaften können Schülerinnen und Schüler Dinge lernen, die sie persönlich besonders interessieren.",
      ags: [
        { name: "Schulsanitätsdienst" },
        { name: "Schulbücherei" },
        { name: "Freies Musizieren" },
        { name: "Basketball (in Kooperation mit der SG Braunschweig)" },
        { name: "Selbstbehauptung" },
        { name: "Fußball" },
      ],

      berufsorientierungText:
        "Berufsorientierende Maßnahmen werden als Praxistage an mindestens 30 Schultagen vorrangig in den Jahrgängen 8 bis 10 durchgeführt. Die Zusammenarbeit mit der Berufsberatung der Agentur für Arbeit, den Kammern, berufsbildenden Schulen und Praxiserfahrungen in Betrieben ist Teil unseres fächerübergreifenden Konzepts – inklusive eigener Berufsmesse im Haus.",

      gewaltpraeventionIntro: "In Anlehnung an das „Braunschweiger Modell“ durchlaufen unsere Schülerinnen und Schüler ein mehrstufiges Präventionsprogramm.",
      gewaltpraevention: [
        { stage: "Klasse 5–7", text: "„Lions Quest“" },
        { stage: "Klasse 7", text: "„Schritte gegen Tritte“ in allen 7. Klassen" },
        { stage: "Klasse 8", text: "Antigewalttraining in allen 8. Klassen" },
        { stage: "Ab Klasse 8", text: "Konfliktlotsen-Intensivschulung für interessierte Schüler:innen" },
      ],
    },
  });

  console.log("Seeded Angebot global.");
}

async function seedOrganisatorisches(payload: Payload) {
  const current = await payload.findGlobal({ slug: "organisatorisches" });
  if (current.heroLead) {
    console.log("Skipping Organisatorisches global — already seeded.");
    return;
  }

  const heroImageId = await ensureMedia(
    payload,
    "/organisatorisches.jpg",
    "Regal mit Ordnern und Unterrichtsmaterial"
  );

  const schulbuecherDokumente = await Promise.all(
    [5, 6, 7, 8, 9, 10].map(async (n) => ({
      klasse: `Klasse ${n}`,
      datei: await ensureMedia(
        payload,
        `/schulbuecher/klasse-${n}.pdf`,
        `Anschreiben zur Schulbuchausleihe Klasse ${n}`
      ),
      dateiSopaed: await ensureMedia(
        payload,
        `/schulbuecher/klasse-${n}-sopaed.pdf`,
        `Anschreiben zur Schulbuchausleihe Klasse ${n} (sonderpädagogischer Förderbedarf)`
      ),
    }))
  );

  const infoblaetterSource = [
    { label: "Wohin gehe ich, wenn ...", file: "wohingeheich.pdf" },
    { label: "Unterrichtszeiten und Raumpläne", file: "zeiten-raeume.pdf" },
    { label: "Leitbild und Leitziele unserer Schule", file: "leitbild-leitziele.pdf" },
    { label: "Schulordnung", file: "schulordnung.pdf" },
    { label: "Schule ohne Rassismus – Schule mit Courage", file: "sor.pdf" },
    { label: "Social Media Guideline", file: "socialmedia.pdf" },
    { label: "Hinweise zur Benutzung der Schulrechner", file: "pc-nutzung.pdf" },
    { label: "Informationen zum Infektionsschutz", file: "infektionsschutz.pdf" },
    { label: "Verhalten bei Kopflausbefall", file: "laeuse.pdf" },
    { label: "Waffenerlass", file: "waffenerlass.pdf" },
    { label: "Sportunterricht", file: "sportunterricht.pdf" },
    { label: "Kriterien der Beurteilung: Arbeitsverhalten", file: "av.pdf" },
    { label: "Kriterien der Beurteilung: Sozialverhalten", file: "sv.pdf" },
    { label: "Unsere Schule von A–Z", file: "a-z.pdf" },
    { label: "Blankoformular für Entschuldigungen", file: "entschuldigung.pdf" },
  ];
  const infoblaetter = await Promise.all(
    infoblaetterSource.map(async (item) => ({
      label: item.label,
      datei: await ensureMedia(payload, `/infoblaetter/${item.file}`, item.label),
    }))
  );

  await payload.updateGlobal({
    slug: "organisatorisches",
    data: {
      heroLead: "Alles Wichtige rund um Anmeldung, Schulbuchausleihe und den Übergang nach Klasse 10.",
      heroImage: heroImageId,
      heroImageAlt: "Regal mit Ordnern und Unterrichtsmaterial",

      anmeldungKl5Text:
        "Grundschuleltern sind im Frühjahr zu unserem Infoabend eingeladen, bei dem wir mit Führungen und Mitmach-Stationen einen Einblick in unseren Schulalltag geben. Die konkreten Anmelde- und Infoabend-Termine für das kommende Schuljahr geben wir rechtzeitig über diese Website und die Grundschulen bekannt.",
      mitbringen: [
        { item: "Originalzeugnis der 4. Klasse (1. Halbjahr)" },
        { item: "Impfnachweis über den Masernschutz" },
        { item: "Schwimmnachweis Bronze" },
      ],
      anmeldungKl6bis10Text:
        "Wir können in den oberen Jahrgängen nur sehr begrenzt freie Schulplätze anbieten und arbeiten mit einer Vormerkliste. Bitte melden Sie Ihr Kind nur an einer Realschule als Erstwunsch an; Zweit- und Drittwunsch können auf dem Anmeldeformular vermerkt werden. Erforderlich sind das Anmeldeformular, eine Kopie des letzten Zeugnisses sowie ein Überweisungsbeschluss der abgebenden Schule (kann nachgereicht werden). Bei einem Wechsel von der IGS wird zusätzlich ein Notenzeugnis benötigt.",

      schulbuchausleiheText:
        "Für jeden Jahrgang stellen wir ein Anschreiben mit Materialliste zur Schulbuchausleihe zur Verfügung – inklusive gesonderter Fassungen für Schülerinnen und Schüler mit sonderpädagogischem Förderbedarf. Die aktuellen Unterlagen erhalten Sie über das Sekretariat oder IServ.",

      abschluesseIntro: "Nach dem 10. Schuljahrgang können in Verbindung mit einer erfolgreich absolvierten Abschlussprüfung folgende Abschlüsse erworben werden:",
      abschluesse: [
        { level: "I", title: "Hauptschulabschluss" },
        { level: "II", title: "Realschulabschluss" },
        { level: "III", title: "Erweiterter Sekundarabschluss I" },
      ],

      formulareText:
        "Diese Dokumente stehen als PDF im Sekretariat und über IServ zur Verfügung, darunter auch das Blankoformular für Entschuldigungen und der Antrag auf Unterrichtsbefreiung zur Teilnahme an religiösen Feiern.",
      infoblaetter,
      schulbuecherDokumente,
    },
  });

  console.log("Seeded Organisatorisches global.");
}

async function seedPersonen(payload: Payload) {
  const current = await payload.findGlobal({ slug: "personen" });
  if (current.heroEyebrow) {
    console.log("Skipping Personen global — already seeded.");
    return;
  }

  const schulleitungPhotoId = await ensureMedia(
    payload,
    "/schulleitung.jpg",
    "Felix Müller und Johannes Nadjib, kommissarische Schulleitung"
  );

  const gremienSource = [
    { title: "Verwaltung", text: "Schulsekretärinnen erledigen den Verwaltungs- und Schreibdienst in allen Schulangelegenheiten. Schulassistent:innen entlasten die Lehrkräfte bei der Vor- und Nachbereitung des Unterrichts. Unser Hausmeister sorgt für die haustechnischen Anlagen und Außenanlagen.", image: "/schulsekretariat.jpg", alt: "Schulsekretariat der Realschule John-F.-Kennedy-Platz" },
    { title: "Schulvorstand", text: "Im Schulvorstand wirken Schulleitung, Lehrkräfte, Erziehungsberechtigte sowie Schülerinnen und Schüler zusammen, um die Qualitätsentwicklung der Schule zu gestalten.", image: "/schuvo.jpg", alt: "Sitzung des Schulvorstands" },
    { title: "Lehrerkollegium", text: "Unsere Lehrkräfte erziehen und unterrichten in eigener pädagogischer Verantwortung und stehen in einem unmittelbaren Dienstverhältnis zum Land Niedersachsen.", image: "/kollegiumsfoto.jpg", alt: "Kollegiumsfoto der Realschule John-F.-Kennedy-Platz" },
    { title: "Kommunale Schulsozialarbeit & Beratung", text: "Die Schulsozialarbeit unterstützt einzelfallbezogen dabei, Chancengleichheit herzustellen. Unsere Beratungslehrkraft moderiert die Beratungskonferenz und pflegt den Austausch mit externen Beratungsstellen der Stadt Braunschweig.", image: "/soziales.jpg", alt: "Kommunale Schulsozialarbeit und Beratung" },
    { title: "Schülervertretung", text: "Schülerinnen und Schüler wirken über Klassensprecher:innen, den Schülerrat und Vertreter:innen in Konferenzen und im Schulvorstand aktiv an der Schulgemeinschaft mit.", image: null },
    { title: "Schulelternrat", text: "Die Vorsitzenden der Klassenelternschaften bilden den Schulelternrat, der mindestens zweimal jährlich tagt und Vertreter:innen in die Gesamtkonferenz entsendet.", image: null },
    { title: "Schulelternverein", text: "Der Schulelternverein unterstützt die Ausstattung der Schule mit Lehrmitteln, hilft bedürftigen Schülerinnen und Schülern bei Klassenfahrten und finanziert Schulveranstaltungen.", image: null },
  ];
  const gremien = await Promise.all(
    gremienSource.map(async (item) => ({
      title: item.title,
      text: item.text,
      image: item.image ? await ensureMedia(payload, item.image, item.alt!) : null,
    }))
  );

  await payload.updateGlobal({
    slug: "personen",
    data: {
      heroEyebrow: "Wer wir sind",
      heroLead: "Schulleitung, Kollegium und die Gremien, die unsere Schulgemeinschaft mitgestalten.",

      schulleitungPhoto: schulleitungPhotoId,
      schulleitungPhotoAlt: "Felix Müller und Johannes Nadjib, kommissarische Schulleitung",
      schulleitungIntro: "In allen aktuellen Anliegen wenden Sie sich bitte an die kommissarische Schulleitung:",
      schulleitungMembers: [
        { name: "Felix Müller", role: "Realschulrektor (komm.)", email: "felix.mueller@braunschweig.de" },
        { name: "Johannes Nadjib", role: "Realschulkonrektor (komm.)", email: "johannes.nadjib@braunschweig.de" },
      ],
      schulleitungNote:
        "Jede Schule hat eine Schulleiterin oder einen Schulleiter, die/der die Gesamtverantwortung für die Schule und deren Qualitätsentwicklung trägt, Lehrkräfte im Unterricht berät und für die Einhaltung der Rechts- und Verwaltungsvorschriften sorgt.",

      gremien,
      closingNote:
        "Eine namentliche Übersicht unseres Lehrerkollegiums sowie der Klassenlehrkräfte finden Kolleginnen, Kollegen, Schülerinnen und Schüler über IServ.",
    },
  });

  console.log("Seeded Personen global.");
}

async function seedKontakt(payload: Payload) {
  const current = await payload.findGlobal({ slug: "kontakt" });
  if (current.schoolName) {
    console.log("Skipping Kontakt global — already seeded.");
    return;
  }

  const heroImageId = await ensureMedia(
    payload,
    "/kontakt_anfahrt.jpg",
    "Schulhof und Fassade der Realschule John-F.-Kennedy-Platz"
  );

  await payload.updateGlobal({
    slug: "kontakt",
    data: {
      schoolName: "Realschule John-F.-Kennedy-Platz",
      addressLine1: "John-F.-Kennedy-Platz 1",
      addressLine2: "38100 Braunschweig",
      phone: "(0531) 470 5030",
      phoneHref: "+495314705030",
      fax: "(0531) 470 5031",
      email: "rskennedyplatz@braunschweig.de",
      mapQuery: "John-F.-Kennedy-Platz 1, 38100 Braunschweig",

      sprechzeitenTitle: "Sprechzeiten Beratungslehrkraft",
      sprechzeitenText: "Montags von 9:40 bis 10:25 Uhr sowie nach Vereinbarung. Termine über das Sekretariat unter (0531) 470 5030.",

      heroEyebrow: "Kontakt",
      heroLead: "Wir sind zentral in der Braunschweiger Innenstadt gelegen und gut erreichbar.",
      heroImage: heroImageId,
      heroImageAlt: "Schulhof und Fassade der Realschule John-F.-Kennedy-Platz",
    },
  });

  console.log("Seeded Kontakt global.");
}

async function seedImpressum(payload: Payload) {
  const current = await payload.findGlobal({ slug: "impressum" });
  if (current.sections && current.sections.length > 0) {
    console.log("Skipping Impressum global — already seeded.");
    return;
  }

  await payload.updateGlobal({
    slug: "impressum",
    data: {
      sections: [
        {
          heading: "Diensteanbieter im Sinne des Telemediengesetzes",
          paragraphs: [
            { text: "Land Niedersachsen, vertreten durch:\nFelix Müller, Realschulrektor (komm.)\nJohannes Nadjib, Realschulkonrektor (komm.)" },
            { text: "Realschule John-F.-Kennedy-Platz\nJohn-F.-Kennedy-Platz 1\n38100 Braunschweig\nTelefon: (0531) 470 5030\nTelefax: (0531) 470 5031\nE-Mail: rskennedyplatz@braunschweig.de" },
          ],
        },
        {
          heading: "Schulträger (Diensteanbieter im Sinne des TDG/MDStV)",
          paragraphs: [
            { text: "Stadtverwaltung Braunschweig\nPlatz der Deutschen Einheit 1\n38100 Braunschweig\nTelefon: (0531) 470-1\nTelefax: (0531) 151 12\nE-Mail: stadt@braunschweig.de" },
          ],
        },
        {
          heading: "Verantwortlich für die Schulhomepage i. S. d. § 18 Abs. 2 MStV",
          paragraphs: [
            { text: "Felix Müller, Realschulrektor (komm.)\nRealschule John-F.-Kennedy-Platz\nJohn-F.-Kennedy-Platz 1\n38100 Braunschweig\nE-Mail: rskennedyplatz@braunschweig.de" },
          ],
        },
        {
          heading: "Haftungsausschluss",
          paragraphs: [
            { text: "Die Informationen auf diesem Internetauftritt wurden nach bestem Wissen und Gewissen sorgfältig zusammengestellt und geprüft. Es wird jedoch keine Gewähr – weder ausdrücklich noch stillschweigend – für die Vollständigkeit, Richtigkeit, Aktualität oder Qualität und jederzeitige Verfügbarkeit der bereitgestellten Informationen übernommen. In keinem Fall wird für Schäden, die sich aus der Verwendung der abgerufenen Informationen ergeben, eine Haftung übernommen." },
          ],
        },
        {
          heading: "Internetseiten Dritter / Links",
          paragraphs: [
            { text: "Diese Website enthält Links auf Internetauftritte Dritter. Diese Links stellen keine Zustimmung zu deren Inhalten durch den Herausgeber dar. Für illegale, fehlerhafte oder unvollständige Inhalte und für Schäden, die aus der Nutzung entstehen, haftet allein der Anbieter der verlinkten Seite." },
          ],
        },
      ],
    },
  });

  console.log("Seeded Impressum global.");
}

async function seedDatenschutz(payload: Payload) {
  const current = await payload.findGlobal({ slug: "datenschutz" });
  if (current.sections && current.sections.length > 0) {
    console.log("Skipping Datenschutz global — already seeded.");
    return;
  }

  await payload.updateGlobal({
    slug: "datenschutz",
    data: {
      sections: [
        {
          heading: "Name und Anschrift des Verantwortlichen",
          paragraphs: [
            { text: "Realschule John-F.-Kennedy-Platz\nJohn-F.-Kennedy-Platz 1\n38100 Braunschweig\nTelefon: (0531) 470 5030\nTelefax: (0531) 470 5031\nE-Mail: rskennedyplatz@braunschweig.de" },
          ],
        },
        {
          heading: "Datenschutzbeauftragte",
          paragraphs: [
            { text: "Natalie Rahman-K. / Christian Petermann\nRealschule John-F.-Kennedy-Platz\nJohn-F.-Kennedy-Platz 1\n38100 Braunschweig\nE-Mail: datenschutz@rs-kennedy.de" },
          ],
        },
        {
          heading: "Bereitstellung der Website und Erstellung von Logfiles",
          paragraphs: [
            { text: "Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom aufrufenden Rechner: Datum und Uhrzeit des Zugriffs, IP-Adresse, Betriebssystem- und Browsertyp sowie die aufgerufene Seite. Eine Zusammenführung mit anderen personenbezogenen Daten findet nicht statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; die Daten werden nach zwei Monaten gelöscht und nur statistisch ausgewertet." },
          ],
        },
        {
          heading: "Speicherung bei Kontaktaufnahme",
          paragraphs: [
            { text: "Nehmen Sie per E-Mail Kontakt mit uns auf, werden die übermittelten personenbezogenen Daten zur Bearbeitung Ihres Anliegens gespeichert und gelöscht, sobald die Speicherung nicht mehr erforderlich ist." },
          ],
        },
        {
          heading: "Datenschutz in Videokonferenzen",
          paragraphs: [
            { text: "An Videokonferenzen der Schule dürfen ausschließlich die eingeladenen Schülerinnen und Schüler teilnehmen – nicht Eltern, Geschwister oder Freunde. Video-, Bild- oder Tonaufnahmen der Konferenz sind nicht gestattet. Verstöße werden gemeldet." },
          ],
        },
      ],
      rechte: [
        { title: "Auskunft / Akteneinsicht", text: "Gem. Art. 15 DSGVO haben Sie das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu erhalten." },
        { title: "Berichtigung", text: "Sind gespeicherte Daten unrichtig oder unvollständig, haben Sie gem. Art. 16 DSGVO das Recht auf Berichtigung." },
        { title: "Löschung", text: "Art. 17 DSGVO normiert das Recht auf Löschung personenbezogener Daten, sofern deren Speicherung nicht mehr erforderlich ist." },
        { title: "Einschränkung der Verarbeitung", text: "Gem. Art. 18 DSGVO können Sie unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen." },
        { title: "Widerspruch", text: "Bei Gründen, die sich aus Ihrer besonderen Situation ergeben, können Sie gem. Art. 21 DSGVO widersprechen." },
        { title: "Datenübertragbarkeit", text: "Gem. Art. 20 DSGVO haben Sie das Recht, Ihre Daten in einem gängigen, maschinenlesbaren Format zu erhalten." },
        { title: "Widerruf der Einwilligung", text: "Sie haben gem. Art. 7 Abs. 3 DSGVO das Recht, erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft zu widerrufen." },
        { title: "Beschwerde", text: "Art. 77 DSGVO normiert ein Beschwerderecht bei der zuständigen Aufsichtsbehörde." },
      ],
      aufsichtsbehoerdeText: "Zuständige Aufsichtsbehörde: Die Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover",
      aufsichtsbehoerdeEmail: "poststelle@lfd.niedersachsen.de",
    },
  });

  console.log("Seeded Datenschutz global.");
}

async function run() {
  const payload = await getPayload({ config });

  await seedPosts(payload);
  await seedHeader(payload);
  await seedHome(payload);
  await seedSchulprofil(payload);
  await seedAngebot(payload);
  await seedOrganisatorisches(payload);
  await seedPersonen(payload);
  await seedKontakt(payload);
  await seedImpressum(payload);
  await seedDatenschutz(payload);

  console.log("Done.");
  process.exit(0);
}

try {
  await run();
} catch (err) {
  console.error(err);
  process.exit(1);
}
