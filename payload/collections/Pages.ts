import type { CollectionConfig } from "payload";
import { livePreviewBreakpoints } from "../livePreview";
import { pageSectionsField } from "../blocks/sectionsField";

// Slugs that would collide with a route the app already serves as a fixed
// page. A client-created page at one of these would be silently unreachable
// since Next.js always resolves the static route first.
const RESERVED_SLUGS = [
  "angebot",
  "datenschutz",
  "impressum",
  "kontakt",
  "organisatorisches",
  "personen",
  "schulleben",
  "schulprofil",
  "admin",
  "api",
];

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    description:
      "Frei erstellte Seiten aus Bausteinen. Neue Seiten erscheinen NICHT automatisch in der Navigation oben — das muss separat angefragt werden.",
    livePreview: {
      url: (doc) => `/${(doc as { slug?: string })?.slug ?? ""}`,
      breakpoints: livePreviewBreakpoints,
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Used in the page's web address, e.g. /elternbeirat.",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Slug ist erforderlich.";
        if (RESERVED_SLUGS.includes(value)) {
          return `"${value}" ist bereits als feste Seite vergeben. Bitte eine andere Adresse wählen.`;
        }
        return true;
      },
    },
    { name: "heroEyebrow", type: "text" },
    { name: "heroLead", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "heroImageAlt", type: "text" },
    pageSectionsField(),
  ],
};
