import type { Metadata } from "next";
import { getSchulprofil } from "@/lib/payload";
import SchulprofilPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Schulprofil",
  description:
    "Leitbild, Leitziele, Lage, Ausstattung und Geschichte der Realschule John-F.-Kennedy-Platz.",
};

export const dynamic = "force-dynamic";

export default async function SchulprofilPage() {
  const profil = await getSchulprofil();
  return <SchulprofilPageClient initialProfil={profil} />;
}
