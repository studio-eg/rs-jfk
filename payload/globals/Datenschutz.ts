import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";
import { pageSectionsField } from "../blocks/sectionsField";

export const Datenschutz: GlobalConfig = {
  slug: "datenschutz",
  admin: {
    livePreview: { url: livePreviewUrl("/datenschutz"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    {
      name: "sections",
      type: "array",
      minRows: 1,
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "paragraphs",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "text",
              type: "textarea",
              required: true,
              admin: {
                description: "Use a line break for a new line within this paragraph (e.g. an address block).",
              },
            },
          ],
        },
      ],
    },
    {
      name: "rechte",
      type: "array",
      minRows: 1,
      admin: { description: "The \"Ihre Rechte\" (your rights) list." },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
    { name: "aufsichtsbehoerdeText", type: "textarea", required: true },
    { name: "aufsichtsbehoerdeEmail", type: "text", required: true },
    pageSectionsField(),
  ],
};
