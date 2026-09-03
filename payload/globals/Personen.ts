import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Personen: GlobalConfig = {
  slug: "personen",
  admin: {
    livePreview: { url: livePreviewUrl("/personen"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "heroEyebrow", type: "text", required: true },
    { name: "heroLead", type: "textarea", required: true },

    { name: "schulleitungPhoto", type: "upload", relationTo: "media", required: true },
    { name: "schulleitungPhotoAlt", type: "text", required: true },
    { name: "schulleitungIntro", type: "textarea", required: true },
    {
      name: "schulleitungMembers",
      type: "array",
      minRows: 1,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "email", type: "text", required: true },
      ],
    },
    { name: "schulleitungNote", type: "textarea", required: true },

    {
      name: "gremien",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    { name: "closingNote", type: "textarea", required: true },
  ],
};
