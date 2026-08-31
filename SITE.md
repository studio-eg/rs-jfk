# Realschule John-F.-Kennedy-Platz

> Eigenverantwortliches und kooperatives Lernen in einer gewaltfreien Schule.

## About this project

This is a from-scratch rebuild of [rs-kennedy.de](https://rs-kennedy.de/index.html), the real website of the Realschule John-F.-Kennedy-Platz in Braunschweig, Germany. All school facts (address, contact, leadership, programs, history) were researched directly from the live site. The visual design was rebuilt to feel modern, classic, and professional — not a copy of the original template — while deliberately keeping the identity elements that make the school recognizable.

## Brand Identity

- **Personality:** Trustworthy, structured, academic, welcoming. A public German Realschule — not a startup or SaaS product.
- **Preserved from the original site:** the coral-red accent color, the plain-text wordmark (the school has no graphic logo/crest), and the photography-and-storytelling driven "Schulleben" news content.
- **Modernized:** cleaner grid layouts, more whitespace, a serif display typeface for gravitas, and a restrained neutral palette instead of the original's dated free-template look.

### Colors
- Background: `#faf8f5` (warm off-white)
- Surface (cards): `#ffffff`
- Foreground/text: `#262220` (warm off-black)
- Muted text: `#6b6259`
- Border: `#e7e1d9`
- Accent (from the original site's link/button color `#e0555a`, deepened for a more institutional feel): `#ac3b32`, hover `#8c2f28`
- Ink (dark sections — header banner, footer): `#262220`

### Fonts
- Display/headings: **Fraunces** (serif — gives the academic, classic gravitas the brief asked for)
- Body: **Lato** (the same typeface the original site used — keeps continuity)

### Logo
The original school has no graphic logo, only a text wordmark. The rebuild adds a simple circular "JFK" monogram in the accent color next to the wordmark "Realschule John-F.-Kennedy-Platz" — a light identity mark, not a redesigned crest.

### Imagery
The school provided its own real photos (downloaded from rs-kennedy.de) in `public/`, which are now used throughout:
- **Homepage hero:** the school's stairwell/atrium photo (`impressum.jpg`), dark-overlaid.
- **Page headers:** each inner page uses a matching real photo via `PageHeader`'s `image` prop — the schoolyard/building for Kontakt (`kontakt_anfahrt.jpg`) and Schulprofil (`jfk.jpg`), a classroom for Angebot (`angebot.jpg`), a bookshelf for Organisatorisches (`organisatorisches.jpg`), a classroom banner for Schulleben (`pic06.jpg`).
- **Fachbereiche cards** (Angebot page) each carry a real subject-specific photo collage (`mathe.png`, `geschichte.png`, `sport.png`, `religion.png`, `werken.png`, `mukubi.png`, `englisch.png`).
- **Schulleben & homepage news cards** each carry the real event photo (Jannes Horn visit, Buchzimmer project, Weggefährten donation, Stolpersteine, LARS & LISA, school garden, Lauftag, kicker, Bootsanleger, Stadtputztag, AIDS-Hilfe).
- **Personen page:** the real leadership photo (`schulleitung.jpg`) plus photos on the Verwaltung, Schulvorstand, Lehrerkollegium, and Schulsozialarbeit cards.
- Files with spaces/umlauts were renamed to safe kebab-case names on import (e.g. `Jannes Horn zu Besuch.jpg` → `jannes-horn.jpg`) — see `public/` for the full asset list. Many uploaded photos are still unused (e.g. `pic05/08–12.jpg`, `Vorstellung Phase BE.jpg`, several staff portraits) and available if more pages/sections get built out.
- Photos showing identifiable students/staff are reused only in the same editorial context the school originally published them for (e.g. the Jannes Horn photo on the Jannes Horn story) — not repurposed into new contexts.

## Pages

- **Startseite** (`/`) — Hero with mission statement, quick links (Anmeldung, Stundenplan/WebUntis, IServ), Leitbild pull-quote, "Aktuelles" news grid, contact CTA banner.
- **Schulprofil** (`/schulprofil`) — Leitbild, all 7 Leitziele (numbered list), Lage & Ausstattung (facilities, shown as icon tiles that spring in on scroll), and a condensed history timeline (1911–today, with an animated drawing line).
- **Angebot** (`/angebot`) — The 7 Fachbereiche (subject groups), Wahlpflichtkurse & Profile (grade 9/10 tracks), Arbeitsgemeinschaften (AGs), Berufsorientierung, Gewaltprävention.
- **Schulleben** (`/schulleben`) — Grid of 15 real school stories, each with its own full blog post page at `/schulleben/[slug]` (e.g. `/schulleben/tag-der-schiene`). Content is sourced directly from the live site (rs-kennedy.de/schulleben.html) and its linked PDFs/newspaper clippings — two posts (Tag der Schiene, Waldtage 6b) are full real student-written reports; others are shorter real blurbs, kept short rather than padded with invented detail. Shared content lives in `lib/schulleben.ts` and is reused by both the Schulleben grid and the homepage's "Aktuelles" section.
- **Organisatorisches** (`/organisatorisches`) — Reference page with a sticky in-page quick-nav (Anmeldung / Schulbuchausleihe / Abschlussverfahren / Formulare). Anmeldung is a single split panel comparing Klasse 5 vs. Klasse 6–10 (with a checklist for "Bitte mitbringen"), Abschlussverfahren Jg. 10 is an ascending 3-tier layout (the three qualifications are genuinely ranked, so the highest is visually the tallest/highlighted), and Infoblätter/Formulare is a two-column document index instead of a card grid.
- **Personen** (`/personen`) — Current (interim) school leadership with names/emails, plus generic role descriptions for Verwaltung, Schulvorstand, Lehrerkollegium, Schulsozialarbeit, Schülervertretung, Schulelternrat, Schulelternverein.
- **Kontakt** (`/kontakt`) — Address, phone, fax, email, office hours for the Beratungslehrkraft, and an embedded Google Map pinned to the real address.
- **Impressum** (`/impressum`) and **Datenschutz** (`/datenschutz`) — Legal pages with the real responsible parties (Land Niedersachsen / Stadt Braunschweig / current interim leadership) and GDPR rights.

## Content
- **`lib/schulleben.ts`** — Single source of truth for all 15 Schulleben blog posts (slug, tag, title, date, excerpt, full body paragraphs, image). Both `/schulleben` and the homepage's "Aktuelles" section import from here instead of keeping separate copies.

## Components
- **Navbar** (`components/Navbar.tsx`) — Sticky header, JFK monogram + wordmark on the far left; the 7-item nav and the Stundenplan (outline)/IServ-Login (solid) buttons are grouped together as one cluster on the right (Relume "Navbar 14" layout style), with the flexible space living between the logo and that cluster. Collapses to a hamburger menu below the `xl` breakpoint.
- **Footer** (`components/Footer.tsx`) — Address/contact, nav, legal links, and the school's three real certification badges (Schule ohne Rassismus, Sportfreundliche Schule, Zivilcouragepreis).
- **PageHeader** (`components/PageHeader.tsx`) — Shared dark hero banner used at the top of every inner page.
- **Motion system** (`components/motion/`) — `FadeIn`, `Stagger`/`StaggerItem`, `MotionLink`, `HeroImage`, `WordFadeIn` (word-by-word text reveal on mount), `TimelineLine` (animated timeline line), `ScrollHighlightText` (word-by-word text reveal scrubbed live to scroll position), and `IconPop` (icon springs into place on scroll-in) provide the site's scroll-in and hover animations (see Recent Changes below). Used consistently across every page.

## Important notes / things to revisit
- **3 Schulleben posts still need a real event photo**: Weihnachtskonzert 2019, Friedenskonzert 2018, and "Hör zu" currently fall back to a generic school photo (`pic06.jpg`). Checked the live site directly — these three only have video/audio files linked, no photos, so there was nothing real to use. Swap in real photos from the school if they're ever provided (edit the `image`/`imageAlt` fields for those posts in `lib/schulleben.ts`).
- **Enrollment dates omitted on purpose:** the live site's Anmeldung dates (spring 2026) are already in the past — they were not carried over. The Organisatorisches page describes the process generically; update it each year with the current Infoabend/Anmeldung dates.
- **Full teacher/class roster intentionally left out:** the original site publishes every teacher's name next to their class assignment. That's real personal data about school staff, so the rebuild only names the (interim) school leadership and describes other roles generically, pointing to IServ for the full staff list. Revisit this if the school wants it public.
- **No real photography yet** — see "Imagery" above.
- **Downloads/forms are listed as plain text, not linked PDFs** — the actual PDF files (Anmeldeformulare, Schulordnung, etc.) live on the old site and weren't copied over. Add the real files under `public/files/` and link them when available.

## Recent Changes
- 2026-08-30: Found and swapped in real event photos for the Schulleben posts: extracted the actual embedded photos from the school's own PDFs for "Tag der Schiene bei Siemens" (the class group photo in front of the Siemens building, `tag-der-schiene.jpg`) and "Waldtage der Klasse 6b" (their self-built forest camp, `waldtage-6b.jpg`), and confirmed `heal_the_world.jpg` (already in `public/`) is the school's actual captioned photo of the JFK-Chor on stage for "Beat it!" — swapped in for the guessed photo used before. Also caught and fixed a mismatch: `frieden.png`, previously used for the Friedenskonzert 2022 post, is actually real but depicts a different event (a Ukraine-war peace-artwork classroom project, not the concert) — reverted that post to the generic fallback rather than mislabel it. Checked the live site directly for the 3 remaining posts (Weihnachtskonzert 2019, Friedenskonzert 2018, "Hör zu") — they only have video/audio linked, no photos exist to find.
- 2026-08-30: Schulleben became a real blog: replaced the 11 placeholder-era stories with the 15 real stories currently on the live site (rs-kennedy.de), each now with its own full post page at `/schulleben/[slug]` (new `app/schulleben/[slug]/page.tsx`, content in new `lib/schulleben.ts`). Two posts (Tag der Schiene bei Siemens, Waldtage der Klasse 6b) use real full-length student-written reports found in the live site's linked PDFs; others use the real (shorter) text found there, kept short rather than padded out. The homepage's "Aktuelles" section now pulls a curated subset from the same shared data instead of keeping its own separate copy.
- 2026-08-20: Added scroll and hover animations to the homepage — a cinematic slow zoom-in on the hero photo, staggered fade-up reveals as sections scroll into view (already present on most sections, now added to the Leitbild quote), a decorative animated quotation mark above the Leitbild quote, image zoom-in on hover for the "Aktuelles" news cards, arrow micro-animations on card links, and a subtle hover-scale on the contact CTA banner. Uses the existing `components/motion/` system (Framer Motion), plus a new `HeroImage` component for the hero's zoom effect.
- 2026-08-20: The hero headline ("Eigenverantwortlich lernen. Gemeinsam wachsen.") now fades in word by word instead of all at once, via a new `WordFadeIn` component.
- 2026-08-20: Extended scroll/hover animations to the rest of the site for consistency with the homepage: Angebot's Fachbereiche cards, Schulleben's story cards, and Personen's Gremien cards + leadership portrait now zoom their photo slightly on hover (matching the homepage's Aktuelles cards). Schulprofil's Leitbild quote got the same decorative animated quotation mark as the homepage, and its history timeline (Chronik) now draws its vertical line in as you scroll, via a new `TimelineLine` component. Kontakt's "Sprechzeiten" box is now its own hover-lift card. Impressum and Datenschutz (previously one flat fade-in block) now reveal section by section as you scroll, and Datenschutz's "Ihre Rechte" list reveals row by row — kept restrained (no hover effects) since these are legal pages. Organisatorisches was left as-is; it already used scroll-in animation throughout and its list rows aren't clickable, so no hover states were added.
- 2026-08-20: The homepage's Leitbild quote ("Wir achten die Vielfalt...") now uses scroll-triggered text highlighting — each word is dimmed until the reader scrolls it into place, then brightens to full color, tied live to scroll position rather than a fixed timer. New `ScrollHighlightText` component.
- 2026-08-20: Replaced repetitive card-grid layouts across the site with more varied, purpose-built layouts: Personen's "Mitwirkung & Gremien" is now a full-width alternating list (photo left/right, monogram initial for entries without a photo, small running number) instead of a 2-col card grid. The homepage's quick-links are now an asymmetric layout with "Anmeldung" as a large featured dark tile next to two smaller stacked tiles, and "Aktuelles" leads with one large featured story above a tighter grid of the rest — Schulleben's story grid got the same featured-story treatment. Schulprofil's Leitziele are now a numbered full-width list (large numerals, divider rows) instead of a card grid, and Ausstattung is a lighter borderless two-column list with a thin accent top-rule instead of bordered cards. Angebot's Fachbereiche are now a horizontally scrollable card rail instead of a wrapping grid, and Gewaltprävention is a numbered horizontal stepper (it's an inherently sequential, grade-by-grade program) instead of a 2-col card grid.
- 2026-08-20: Fixed a bug in the Angebot Fachbereiche rail where photos would visibly pop/fade in as you scrolled horizontally — they were lazy-loading one at a time as they entered the scroll rail. Set to load eagerly since there are only 7 small images.
- 2026-08-20: Fully redesigned Organisatorisches — it's a reference page (enrollment steps, required documents, a form index), so the redesign leans into that: a sticky quick-nav under the header jumps to each section; Anmeldung became one unified split panel (Klasse 5 vs. Klasse 6–10) with a checkmark-icon checklist instead of two separate boxed cards; Abschlussverfahren became an ascending 3-tier layout reflecting that the three qualifications are genuinely ranked (the highest is tallest and accent-colored); Infoblätter & Formulare became a real two-column document index with file icons instead of a grid of bordered pill boxes.
- 2026-08-20: Redesigned Schulprofil's "Lage & Ausstattung" (school facilities) as icon tiles — each of the 6 facilities (WLAN/digital, Fachräume, Cafeteria, Sport, Schulhof & Schulgarten, Beratung) gets its own small line icon in a colored circle that springs into place as it scrolls into view, and inverts to a solid accent circle on hover. New `IconPop` component.
- 2026-08-21: Restructured the navbar's desktop layout to match the referenced Relume "Navbar 14" style — the nav links and the two buttons (Stundenplan/IServ) are now grouped together as a single cluster on the right, with the logo on the far left and the flexible gap between them, instead of three evenly-spread sections. Visual identity (JFK logo, colors, fonts, mobile menu) unchanged.

## How to customize
- **Colors/fonts:** edit the CSS variables at the top of `app/globals.css` and the font imports in `app/layout.tsx`.
- **Navigation links:** edit `lib/nav.ts`.
- **Add a new page:** create `app/<name>/page.tsx` and add it to `primaryNav` in `lib/nav.ts`.
