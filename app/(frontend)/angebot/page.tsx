import type { Metadata } from "next";
import { getAngebot } from "@/lib/payload";
import AngebotPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Unser Angebot",
  description:
    "Fachbereiche, Wahlpflichtkurse, Arbeitsgemeinschaften, Berufsorientierung und Gewaltprävention.",
};

export const dynamic = "force-dynamic";

export default async function AngebotPage() {
  const angebot = await getAngebot();
  return <AngebotPageClient initialAngebot={angebot} />;
}
