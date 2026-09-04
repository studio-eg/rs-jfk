import { getPayload } from "payload";
import config from "@/payload.config";
import type {
  Home,
  Post,
  Page,
  Schulprofil,
  Angebot,
  Organisatorisch,
  Personen,
  Kontakt,
  Impressum,
  Datenschutz,
} from "@/payload-types";

export const getPayloadClient = () => getPayload({ config });

export async function getHome(): Promise<Home> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "home", depth: 2 });
}

export async function getSchulprofil(): Promise<Schulprofil> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "schulprofil", depth: 1 });
}

export async function getAngebot(): Promise<Angebot> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "angebot", depth: 1 });
}

export async function getOrganisatorisches(): Promise<Organisatorisch> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "organisatorisches", depth: 1 });
}

export async function getPersonen(): Promise<Personen> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "personen", depth: 1 });
}

export async function getKontakt(): Promise<Kontakt> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "kontakt", depth: 1 });
}

export async function getImpressum(): Promise<Impressum> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "impressum", depth: 1 });
}

export async function getDatenschutz(): Promise<Datenschutz> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "datenschutz", depth: 1 });
}

export async function getPosts(): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 100,
    sort: "-publishedDate",
  });
  return result.docs;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
}

export async function getPages(): Promise<Page[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    depth: 1,
    limit: 100,
  });
  return result.docs;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
}
