export type SchullebenPost = {
  slug: string;
  tag: string;
  title: string;
  date?: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export const schullebenPosts: SchullebenPost[] = [
  {
    slug: "jannes-horn-zu-besuch",
    tag: "Schulleben",
    title: "Ehemaliger Schüler und Fußballprofi Jannes Horn zu Besuch",
    excerpt:
      "Nach einem Austausch mit einer Lehrkraft besuchte der ehemalige Schüler und heutige Fußballprofi Jannes Horn seine alte Schule und beantwortete Fragen der Schülerinnen und Schüler.",
    body: [
      "Über den Kontakt zu einer Lehrkraft kam es zu einem besonderen Wiedersehen: Der ehemalige Schüler und heutige Fußballprofi Jannes Horn besuchte seine alte Schule und nahm sich viel Zeit für die Fragen der Schülerinnen und Schüler.",
      "Per Videoanruf war außerdem Ismail Jakobs zugeschaltet, der aktuell für Galatasaray Istanbul spielt. Jannes Horn traf sich zudem mit früheren Klassenkameradinnen und Klassenkameraden sowie mit Lehrkräften, die ihn noch aus seiner Schulzeit kannten.",
      "Zur Erinnerung an den Besuch überreichte Jannes Horn der Schule ein Trikot des VfL Wolfsburg, das seitdem in der Schule ausgestellt wird.",
    ],
    image: "/jannes-horn.jpg",
    imageAlt: "Jannes Horn beim Besuch an der Realschule John-F.-Kennedy-Platz",
  },
  {
    slug: "kicker-einweihung",
    tag: "Schulleben",
    title: "SV und Schulleitung weihen neuen Kicker ein",
    excerpt:
      "Mit viel Spaß weihten Schülervertretung und Schulleitung den neuen Kickertisch in der Pausenhalle ein.",
    body: [
      "Mit viel Spaß weihten die Schülervertretung und die Schulleitung gemeinsam den neuen Kickertisch in der Pausenhalle ein.",
      "Der Tisch steht den Schülerinnen und Schülern künftig für Turniere zur Verfügung – und da die Platte gewendet werden kann, ist auf derselben Fläche auch Billard möglich.",
    ],
    image: "/kicker-einweihung.jpg",
    imageAlt: "Einweihung des neuen Kickertisches in der Pausenhalle",
  },
  {
    slug: "lauftag-2024",
    tag: "Sport",
    title: "Lauftag 2024: Kilometer und Spenden für Schulgarten und Sport",
    date: "18. September 2024",
    excerpt:
      "Beim jährlichen Lauftag sammelten unsere Schülerinnen und Schüler Kilometer und Spenden für Schulgarten und Sportbereich.",
    body: [
      "Am 18. September 2024 fand der jährliche Lauftag statt. An Stationen, die von Lehrkräften betreut wurden, sammelten die Schülerinnen und Schüler für jede gelaufene Runde einen Stempel auf ihrer Laufkarte.",
      "Eltern unterstützten den Tag mit selbstgebackenem Kuchen, Sponsorinnen und Sponsoren beteiligten sich mit Spenden, und der Schulelternverein sorgte mit Mineralwasser für die nötige Erfrischung. Der Erlös kommt dem Schulgarten und dem Sportbereich zugute.",
      "Der Lauftag ist zugleich ein Baustein unserer mehrfachen Auszeichnung als „Sportfreundliche Schule“.",
    ],
    image: "/lauftag.png",
    imageAlt: "Schülerinnen und Schüler beim Lauftag 2024",
  },
  {
    slug: "tag-der-schiene",
    tag: "Berufsorientierung",
    title: "Tag der Schiene bei Siemens",
    date: "20. September",
    excerpt:
      "Die Klassen 8a und 8c besuchten Siemens zum „Tag der Schiene“ und lernten Ausbildungsberufe rund um die Bahntechnik kennen.",
    body: [
      "Bericht von Emir Ö., Ariana und Mia aus der Klasse 8a:",
      "Wir, die Klassen 8a und 8c, waren mit Herrn Meyn und Frau Amelsberg am 20. September bei Siemens zum „Tag der Schiene“ eingeladen.",
      "Als Erstes wurden wir an der Anmeldung mit Ausweisen für jeden ausgestattet. Anschließend wurden wir in Gruppen in einen Raum geführt, wo wir reichlich mit Getränken und Süßem versorgt wurden. Als alle versammelt waren, wurden wir begrüßt und über Signale und verschiedene Fachbereiche informiert. Eine Ausbilderin erklärte uns die Ausbildung und das Praktikum. Danach wurden wir in drei Gruppen aufgeteilt und besuchten verschiedene Stationen.",
      "Gruppe 1 ging zuerst zu den Auszubildenden, um blinkende Herzen zu bauen. Wir lernten, LED-Lichter und Schalter anzulöten, und durften anschließend Spiele testen, die die Auszubildenden selbst entworfen hatten.",
      "Gruppe 2 war im Raum „Zugsimulator“, wo uns der Beruf des Fahrdienstleiters erklärt wurde – anschließend durften wir selbst „Zug fahren“.",
      "Gruppe 3 war bei den Schienen, wo uns Signale, Weichen, Schranken und vieles mehr genau erklärt wurden.",
      "Nach der Verabschiedung mussten wir die Ausweise leider wieder abgeben. Das war ein toller Tag.",
    ],
    image: "/tag-der-schiene.jpg",
    imageAlt: "Die Klassen 8a und 8c vor dem Siemens-Gebäude beim Tag der Schiene",
  },
  {
    slug: "berufsfelderkundung-jg8",
    tag: "Berufsorientierung",
    title: "Berufsfelderkundung für den Jahrgang 8",
    date: "11. September",
    excerpt:
      "Der Jahrgang 8 erkundete gemeinsam mit der Ausbildungswerkstatt Braunschweig e. V. verschiedene Ausbildungsberufe und Unternehmen der Region.",
    body: [
      "Am 11. September nutzte der Jahrgang 8 gemeinsam mit der Ausbildungswerkstatt Braunschweig e. V. die Gelegenheit zur Berufsfelderkundung: In der Turnhalle stellten sich Ausbildungsbetriebe und Institutionen aus der Region mit eigenen Ständen vor.",
      "Die Schülerinnen und Schüler konnten sich in kleinen Gruppen von Stand zu Stand bewegen, direkt mit Auszubildenden und Ausbilderinnen und Ausbildern ins Gespräch kommen und sich über verschiedene Ausbildungswege informieren – von Handwerksberufen bis zur Bundeswehr.",
    ],
    image: "/berufsmesse.png",
    imageAlt: "Berufsfelderkundung des Jahrgangs 8 in der Turnhalle",
  },
  {
    slug: "waldtage-6b",
    tag: "Umwelt",
    title: "Waldtage der Klasse 6b in Riddagshausen",
    excerpt:
      "Die Klasse 6b verbrachte drei Tage in der Buchhorst – mit Tierspuren, Baumbestimmung, Schnitzen und einem eigenen Waldlager.",
    body: [
      "Die Klasse 6b verbrachte drei aufregende und lehrreiche Tage in der Buchhorst in Riddagshausen. Im Mittelpunkt standen Naturerfahrung und praktisches Lernen.",
      "Gleich zu Beginn machten sich die Schülerinnen und Schüler auf die Suche nach Tierspuren und entdeckten Rehbetten, Mauslöcher und aufgewühlte Erde, die auf Wildschweine hinwies. Anschließend bauten sie aus Ästen und Baumstämmen ein „Nest“, das der Gruppe als Lager diente, und jede und jeder suchte sich einen persönlichen Lieblingsplatz im Wald als Rückzugsort für die folgenden Tage.",
      "Ein weiteres Thema war die Photosynthese: Anhand eines selbst erstellten Baummodells wurde erklärt, wie Bäume Sonnenlicht in Energie umwandeln. Mit Anleitung lernten die Kinder außerdem, Eiche, Buche und Ahorn zu bestimmen, probierten essbare Blätter – besonders beliebt war der Klee – und versuchten sich im Schnitzen kleiner Kunstwerke aus Holz. Eine Gruppe baute aus Ästen und Laub ein kleines Waldhaus.",
      "Auch der Umgang mit Müll im Wald war Thema: Die Kinder lernten, wie gefährlich Abfall für Tiere sein kann und wie wichtig es ist, die Natur sauber zu halten.",
      "Am ersten Tag hatten viele noch Scheu vor der Natur, die schon am zweiten Tag Freude und Spaß gewichen war – einige fragten sogar, ob die Gruppe nicht länger im Wald bleiben könnte. Vielen Dank an die Bürgerstiftung Braunschweig / Herbert Balke-Stiftung, die die Hälfte der Kosten übernommen hat, und an unsere Waldpädagogin Simone Dargatz, die die Klasse mit ihrer offenen und mitreißenden Art durch die Tage begleitet hat.",
    ],
    image: "/waldtage-6b.jpg",
    imageAlt: "Das selbst gebaute Waldlager der Klasse 6b in der Buchhorst",
  },
  {
    slug: "zeitzeugen-stolpersteine",
    tag: "Erinnerungskultur",
    title:
      "Zeitzeugenprojekt: Schülerinnen und Schüler recherchieren Lebensgeschichten von NS-Opfern",
    date: "Interview 17. Januar 2024, Präsentation 12. März 2024",
    excerpt:
      "Zehntklässlerinnen und Zehntklässler recherchierten die Lebensgeschichten von Familien, für die neue Stolpersteine verlegt wurden, und stellten ihre Ergebnisse öffentlich vor.",
    body: [
      "Schülerinnen und Schüler des zehnten Jahrgangs recherchierten die Lebensgeschichten von Familien, die Opfer des NS-Regimes wurden und für die in Braunschweig neue Stolpersteine verlegt wurden. Dafür nahmen sie auch Kontakt zu Nachfahren der Familien auf.",
      "Am 17. Januar 2024 führten sie ein Interview mit Klaus Scheelhaase aus Hannover, der von den Erfahrungen seiner Familie berichtete. Die Ergebnisse der Recherche präsentierten die Schülerinnen und Schüler am 12. März 2024 in der Roten Halle.",
      "Der Radiosender Okerwelle berichtete über das Projekt und die Recherche der Braunschweiger Schülerinnen und Schüler.",
    ],
    image: "/zeitzeugen_2024.jpg",
    imageAlt: "Präsentation des Zeitzeugenprojekts in der Roten Halle",
  },
  {
    slug: "ausbildungsmesse",
    tag: "Berufsorientierung",
    title: "Besuch der Ausbildungsmesse im Eintracht-Stadion",
    excerpt:
      "Interessierte Schülerinnen und Schüler besuchten mit Lehrkräften die Ausbildungsmesse im Eintracht-Stadion, um sich über Ausbildungswege in der Region zu informieren.",
    body: [
      "Interessierte Schülerinnen und Schüler besuchten gemeinsam mit Lehrkräften die Ausbildungsmesse im Eintracht-Stadion, um sich direkt bei regionalen Unternehmen über Ausbildungsmöglichkeiten zu informieren.",
      "Unsere Schule ist zudem Partnerschule der vocatium – der Fachmesse für Ausbildung und Studium, die Schülerinnen und Schüler bei der Berufs- und Studienwahl unterstützt.",
    ],
    image: "/vocatium0509.jpg",
    imageAlt: "vocatium-Partnerschule-Plakette",
  },
  {
    slug: "lars-lisa",
    tag: "Prävention",
    title: "LARS & LISA: Präventionsprogramm stärkt die Klasse 8b",
    date: "Start am 16. Februar 2024",
    excerpt:
      "Mit dem von der Stadt Braunschweig geförderten Programm LARS & LISA stärkt die Klasse 8b in zehn Doppelstunden die eigene psychosoziale Kompetenz und Resilienz.",
    body: [
      "Als eine der ersten Schulen in Braunschweig reagierte die Realschule John-F.-Kennedy-Platz auf die Ergebnisse der CTC-Jugendbefragung (Communities That Care) aus dem Jahr 2022 und holte das von der Stadt Braunschweig geförderte Präventionsprogramm „LARS & LISA – Lust an realistischer Sicht und Leichtigkeit im sozialen Alltag“ in die Klasse 8b.",
      "Seit dem 16. Februar 2024 finden dafür freitags in der ersten und zweiten Stunde zehn Doppelstunden statt. Im Training geht es unter anderem um die Fragen: Wozu ist es gut, sich Ziele zu setzen – und wie macht man das gut? Wie hängen Gedanken, Gefühle und Verhalten zusammen? Wie erkenne ich runterziehende Gedanken und wandle sie in aufbauende um? Was ist selbstsicheres Verhalten, und wie komme ich gut mit anderen in Kontakt?",
      "Durchgeführt wird das Programm von zwei intensiv geschulten Trainerinnen; die Umsetzung an der Schule leitet Schulsozialarbeiterin Marlena Meyer gemeinsam mit Nadia Neumann. Ziel ist es, die Jugendlichen in ihren eigenen Fähigkeiten zu stärken und sie widerstandsfähiger gegen psychische Belastungen zu machen.",
    ],
    image: "/lars-lisa.jpg",
    imageAlt: "LARS & LISA Präventionsprogramm an der Schule",
  },
  {
    slug: "out-gefangen-im-netz",
    tag: "Prävention",
    title: "„Out – Gefangen im Netz“: Theaterstück gegen Cybermobbing",
    date: "14. November",
    excerpt:
      "Das Lessing Theater Wolfenbüttel zeigte an unserer Schule ein Theaterstück über Cybermobbing und die Gefahren des Internets.",
    body: [
      "Am 14. November führte das Lessing Theater Wolfenbüttel bei uns das Stück „Out – Gefangen im Netz“ auf, das die Geschichte der Figur Viktoria und die Gefahren von Cybermobbing erzählt.",
      "Begleitet wurde die Aufführung durch den Präventionsrat sowie Polizeikommissar Fricke, die im Anschluss mit den Schülerinnen und Schülern über die Gefahren des Internets, Mobbing im Netz und die Bedeutung von Zivilcourage ins Gespräch kamen.",
    ],
    image: "/out.jpg",
    imageAlt: "Theaterstück „Out – Gefangen im Netz“ an der Schule",
  },
  {
    slug: "friedenskonzert-2022",
    tag: "Musik",
    title: "3. Friedenskonzert in der Magnikirche",
    date: "20. Juni 2022",
    excerpt:
      "Der Fachbereich Musik lud gemeinsam mit Peter Stoppok und mehreren Braunschweiger Chören zum 3. Friedenskonzert für Vielfalt, Toleranz und Frieden ein.",
    body: [
      "Der Fachbereich Musik der Realschule John-F.-Kennedy-Platz („Schule ohne Rassismus – Schule mit Courage“) lud unter der Leitung von Britta Kanngießer gemeinsam mit Peter Stoppok und seinen Chören am 20. Juni 2022 um 18 Uhr in die Braunschweiger Magnikirche ein – zu einem Konzert für Vielfalt, Toleranz und Frieden.",
      "Gemeinsam mit dem Publikum wurden generationenübergreifend Lieder über das Leben und die Sehnsucht nach Vielfalt, Toleranz und Frieden gesungen; Liederhefte zum Mitsingen wurden kostenlos verteilt. Mitgewirkt haben neben den Schülerinnen und Schülern der Schule der Braunschweiger Senioren-Rockchor, die Braunschweiger Stadtmusikanten, der Mühlenchor Veltenhof, der Hötzumer Gesangverein und die Gelbbauchunken.",
      "Der Eintritt war frei, um Spenden für die „Ukraine Nothilfe“ von UNICEF wurde gebeten.",
    ],
    image: "/pic06.jpg",
    imageAlt: "Realschule John-F.-Kennedy-Platz",
  },
  {
    slug: "weihnachtskonzert-2019",
    tag: "Musik",
    title: "Weihnachtskonzert 2019",
    excerpt:
      "Mit weihnachtlichen und winterlichen Stücken sorgten unsere Schülerinnen und Schüler für stimmungsvolle Momente beim Weihnachtskonzert 2019.",
    body: [
      "Beim Weihnachtskonzert 2019 präsentierten Schülerinnen und Schüler der Realschule John-F.-Kennedy-Platz weihnachtliche und winterliche Musikstücke und sorgten damit für eine stimmungsvolle Einstimmung auf die Feiertage.",
    ],
    image: "/pic06.jpg",
    imageAlt: "Realschule John-F.-Kennedy-Platz",
  },
  {
    slug: "beat-it-jfk-chor",
    tag: "Musik",
    title: "Großes Kino mit dem JFK-Chor bei „Beat it!“",
    date: "26. Februar 2020 (Zeitungsbericht)",
    excerpt:
      "Der Chor der Realschule John-F.-Kennedy-Platz stand gemeinsam mit Profidarstellern bei der Michael-Jackson-Show „Beat it!“ in der Stadthalle auf der Bühne.",
    body: [
      "„So Leute, was haltet ihr davon, wenn wir uns bewerben?“, hatte Musiklehrerin Britta Kanngießer ihre Schülerinnen und Schüler gefragt, nachdem sie den Aufruf der Neuen Braunschweiger gelesen hatte. Die Antwort war ein klares Ja – und so stand der Chor der Realschule John-F.-Kennedy-Platz bei der Michael-Jackson-Show „Beat it!“ in der Stadthalle mit auf der Bühne.",
      "Für den Schlussmoment gegen 22.30 Uhr mussten die 18 Schülerinnen und Schüler bereits um 17 Uhr antreten – lange geübt hatten sie schon vorher. Für den Song „Heal the World“ hatten sie bereits die passende Begleitung parat: „Wir hatten das Lied sowieso gerade für unser Friedenskonzert am 18. März in der Magnikirche einstudiert“, erzählte Britta Kanngießer.",
      "Gemeinsam mit den Profidarstellern legte der Chor einen großartigen Auftritt auf die Bühne. Auf YouTube gibt es unter „JFK-Realschule“ mehr vom Chor zu sehen und zu hören.",
    ],
    image: "/heal_the_world.jpg",
    imageAlt: "Der JFK-Chor auf der Bühne bei „Beat it!“ in der Stadthalle",
  },
  {
    slug: "friedenskonzert-2018",
    tag: "Musik",
    title: "Friedenskonzert 2018",
    date: "1. März 2018",
    excerpt:
      "Ein großes Konzert unterstrich am 1. März 2018 das Engagement unserer Schule als „Schule ohne Rassismus – Schule mit Courage“.",
    body: [
      "Am 1. März 2018 fand ein großes Friedenskonzert statt, das das Engagement der Realschule John-F.-Kennedy-Platz als „Schule ohne Rassismus – Schule mit Courage“ unterstrich.",
      "Schülerinnen und Schüler des Fachbereichs Musik gestalteten den Abend mit einem vielfältigen Programm rund um die Themen Vielfalt, Toleranz und Miteinander.",
    ],
    image: "/pic06.jpg",
    imageAlt: "Realschule John-F.-Kennedy-Platz",
  },
  {
    slug: "schueler-machen-musik",
    tag: "Musik",
    title: "„Hör zu“ – ein Song für den Dialog der Generationen",
    excerpt:
      "Im Projekt „Schüler machen Musik“ schrieb Vanessa aus der Klasse 10b den Song „Hör zu“ für den Dialog zwischen den Generationen.",
    body: [
      "Im Rahmen des Projekts „Schüler machen Musik“ schrieb Vanessa aus der Klasse 10b den Song „Hör zu“, der im Rahmen eines Projekts zum Dialog der Generationen entstand.",
      "Das Video zum Song ist auf YouTube veröffentlicht.",
    ],
    image: "/pic06.jpg",
    imageAlt: "Realschule John-F.-Kennedy-Platz",
  },
];
