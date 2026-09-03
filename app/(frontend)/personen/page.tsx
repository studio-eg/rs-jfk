import type { Metadata } from "next";
import { getPersonen } from "@/lib/payload";
import PersonenPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Personen & Gremien",
  description:
    "Schulleitung, Verwaltung, Gremien und Mitwirkung an der Realschule John-F.-Kennedy-Platz.",
};

export default async function PersonenPage() {
  const personen = await getPersonen();
  return <PersonenPageClient initialPersonen={personen} />;
}
