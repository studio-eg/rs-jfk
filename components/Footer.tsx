import Link from "next/link";
import { primaryNav, legalNav } from "@/lib/nav";

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

export function Footer() {
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
              John-F.-Kennedy-Platz 1
              <br /> 38100 Braunschweig
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="tel:+49531470 5030" className="hover:text-white">
                  Telefon: (0531) 470 5030
                </a>
              </li>
              <li>Telefax: (0531) 470 5031</li>
              <li>
                <a
                  href="mailto:rskennedyplatz@braunschweig.de"
                  className="hover:text-white"
                >
                  rskennedyplatz@braunschweig.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {primaryNav.slice(0, 5).map((item) => (
                <li key={item.href}>
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
