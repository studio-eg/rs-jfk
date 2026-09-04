import type { Metadata } from "next";
import { getImpressum } from "@/lib/payload";
import ImpressumPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Impressum",
};

export const dynamic = "force-dynamic";

export default async function ImpressumPage() {
  const impressum = await getImpressum();
  return <ImpressumPageClient initialImpressum={impressum} />;
}
