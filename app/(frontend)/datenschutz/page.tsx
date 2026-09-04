import type { Metadata } from "next";
import { getDatenschutz } from "@/lib/payload";
import DatenschutzPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export const dynamic = "force-dynamic";

export default async function DatenschutzPage() {
  const datenschutz = await getDatenschutz();
  return <DatenschutzPageClient initialDatenschutz={datenschutz} />;
}
