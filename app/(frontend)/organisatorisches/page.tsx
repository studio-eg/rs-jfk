import type { Metadata } from "next";
import { getOrganisatorisches } from "@/lib/payload";
import OrganisatorischesPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Organisatorisches",
  description:
    "Anmeldung, Schulbuchausleihe, Abschlussverfahren und Formulare der Realschule John-F.-Kennedy-Platz.",
};

export default async function OrganisatorischesPage() {
  const org = await getOrganisatorisches();
  return <OrganisatorischesPageClient initialOrg={org} />;
}
