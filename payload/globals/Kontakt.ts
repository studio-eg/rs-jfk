import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Kontakt: GlobalConfig = {
  slug: "kontakt",
  admin: {
    description:
      "This is the school's single source of contact info — also shown in the footer and (once added) Impressum.",
    livePreview: { url: livePreviewUrl("/kontakt"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "schoolName", type: "text", required: true },
    { name: "addressLine1", type: "text", required: true },
    { name: "addressLine2", type: "text", required: true },
    { name: "phone", type: "text", required: true, admin: { description: "Display text, e.g. \"(0531) 470 5030\"" } },
    { name: "phoneHref", type: "text", required: true, admin: { description: "Phone number for the tel: link, e.g. \"+495314705030\"" } },
    { name: "fax", type: "text", required: true },
    { name: "email", type: "text", required: true },
    { name: "mapQuery", type: "text", required: true, admin: { description: "Address used to center the Google Maps embed." } },

    { name: "sprechzeitenTitle", type: "text", required: true },
    { name: "sprechzeitenText", type: "textarea", required: true },

    { name: "heroEyebrow", type: "text", required: true },
    { name: "heroLead", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media", required: true },
    { name: "heroImageAlt", type: "text", required: true },
  ],
};
