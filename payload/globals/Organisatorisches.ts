import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";
import { pageSectionsField } from "../blocks/sectionsField";

export const Organisatorisches: GlobalConfig = {
  slug: "organisatorisches",
  admin: {
    livePreview: { url: livePreviewUrl("/organisatorisches"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "heroLead", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media", required: true },
    { name: "heroImageAlt", type: "text", required: true },

    // Section headings/ids are intentionally NOT editable here — the sticky
    // quick-nav at the top of the page links to fixed anchors (#anmeldung,
    // #schulbuecher, #abschluss, #formulare) that must stay in sync with the
    // page's section markup. Only the content within each section is editable.
    { name: "anmeldungKl5Text", type: "textarea", required: true },
    {
      name: "mitbringen",
      type: "array",
      minRows: 1,
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "anmeldungKl6bis10Text", type: "textarea", required: true },

    { name: "schulbuchausleiheText", type: "textarea", required: true },

    { name: "abschluesseIntro", type: "textarea", required: true },
    {
      name: "abschluesse",
      type: "array",
      minRows: 1,
      fields: [
        { name: "level", type: "text", required: true },
        { name: "title", type: "text", required: true },
      ],
    },

    { name: "formulareText", type: "textarea", required: true },
    {
      name: "infoblaetter",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "datei", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "schulbuecherDokumente",
      type: "array",
      minRows: 1,
      fields: [
        { name: "klasse", type: "text", required: true },
        { name: "datei", type: "upload", relationTo: "media", required: true },
        { name: "dateiSopaed", type: "upload", relationTo: "media" },
      ],
    },
    pageSectionsField(),
  ],
};
