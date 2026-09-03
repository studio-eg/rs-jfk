import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Angebot: GlobalConfig = {
  slug: "angebot",
  admin: {
    livePreview: { url: livePreviewUrl("/angebot"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "heroEyebrow", type: "text", required: true },
    { name: "heroTitle", type: "text", required: true },
    { name: "heroLead", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media", required: true },
    { name: "heroImageAlt", type: "text", required: true },

    { name: "fachbereicheIntro", type: "textarea", required: true },
    {
      name: "fachbereiche",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "fields", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },

    { name: "wahlpflichtTitle", type: "text", required: true },
    { name: "wahlpflichtText", type: "textarea", required: true },
    { name: "profileTitle", type: "text", required: true },
    { name: "profileIntro", type: "textarea", required: true },
    {
      name: "profile",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "text", required: true },
      ],
    },

    { name: "agIntro", type: "textarea", required: true },
    {
      name: "ags",
      type: "array",
      minRows: 1,
      fields: [{ name: "name", type: "text", required: true }],
    },

    { name: "berufsorientierungText", type: "textarea", required: true },

    { name: "gewaltpraeventionIntro", type: "textarea", required: true },
    {
      name: "gewaltpraevention",
      type: "array",
      minRows: 1,
      fields: [
        { name: "stage", type: "text", required: true },
        { name: "text", type: "text", required: true },
      ],
    },
  ],
};
