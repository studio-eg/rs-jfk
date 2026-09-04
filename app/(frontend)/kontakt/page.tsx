import type { Metadata } from "next";
import { getKontakt } from "@/lib/payload";
import KontaktPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "Adresse, Telefon, Fax und E-Mail der Realschule John-F.-Kennedy-Platz in Braunschweig.",
};

export const dynamic = "force-dynamic";

export default async function KontaktPage() {
  const kontakt = await getKontakt();
  return <KontaktPageClient initialKontakt={kontakt} />;
}
