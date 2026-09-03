import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Schulprofil: GlobalConfig = {
  slug: "schulprofil",
  admin: {
    livePreview: { url: livePreviewUrl("/schulprofil"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "heroEyebrow", type: "text", required: true },
    { name: "heroLead", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media", required: true },
    { name: "heroImageAlt", type: "text", required: true },

    { name: "leitbildText", type: "textarea", required: true },

    { name: "leitzieleIntro", type: "textarea", required: true },
    {
      name: "leitziele",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "textarea", required: true }],
    },

    { name: "lageIntro", type: "textarea", required: true },
    {
      name: "ausstattung",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
        {
          name: "icon",
          type: "select",
          required: true,
          options: ["wifi", "room", "cup", "sport", "leaf", "chat"],
          admin: {
            description: "Picks which built-in icon is shown — the icons themselves aren't editable here.",
          },
        },
      ],
    },

    { name: "chronikTitle", type: "text", required: true },
    { name: "chronikIntro", type: "textarea", required: true },
    {
      name: "chronik",
      type: "array",
      minRows: 1,
      fields: [
        { name: "year", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
  ],
};
