import Link from "next/link";
import { legalNav } from "@/lib/nav";
import { getKontakt } from "@/lib/payload";
import type { Header } from "@/payload-types";

const badges = [
  {
    label: "Schule ohne Rassismus – Schule mit Courage",
    href: "https://www.schule-ohne-rassismus.org",
  },
  {
    label: "Sportfreundliche Schule (3. Zertifizierung)",
    href: "https://www.mk.niedersachsen.de/startseite/schule/schuelerinnen_und_schueler_eltern/schulsport/schulsport-6289.html",
  },
  {
    label: "Zivilcouragepreis der Polizeidirektion Braunschweig",
    href: "https://www.polizei-beratung.de/themen-und-tipps/zivilcourage/",
  },
];

export async function Footer({ initialHeader }: { initialHeader: Header }) {
  const kontakt = await getKontakt();
  const navItems = initialHeader.navItems ?? [];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--ink)] text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                Realschule
              </span>
              John-F.-Kennedy-Platz
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              {kontakt.addressLine1}
              <br /> {kontakt.addressLine2}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${kontakt.phoneHref}`} className="hover:text-white">
                  Telefon: {kontakt.phone}
                </a>
              </li>
              <li>Telefax: {kontakt.fax}</li>
              <li>
                <a
                  href={`mailto:${kontakt.email}`}
                  className="hover:text-white"
                >
                  {kontakt.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.id ?? item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Rechtliches
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-xs text-white/50">
          {badges.map((badge) => (
            <a
              key={badge.label}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80"
            >
              {badge.label}
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Realschule John-F.-Kennedy-Platz, Braunschweig. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
