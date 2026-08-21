export const primaryNav = [
  { label: "Startseite", href: "/" },
  { label: "Schulprofil", href: "/schulprofil" },
  { label: "Angebot", href: "/angebot" },
  { label: "Schulleben", href: "/schulleben" },
  { label: "Organisatorisches", href: "/organisatorisches" },
  { label: "Personen", href: "/personen" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const legalNav = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

export const externalLinks = {
  iserv: "https://www.rs-kennedy.de/idesk",
  stundenplan:
    "https://borys.webuntis.com/WebUntis/?school=rs%20jfk%20braunschweig#/basic/login",
} as const;
