import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";
import { pageSectionsField } from "../blocks/sectionsField";

export const Impressum: GlobalConfig = {
  slug: "impressum",
  admin: {
    livePreview: { url: livePreviewUrl("/impressum"), breakpoints: livePreviewBreakpoints },
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
    pageSectionsField(),
  ],
};
