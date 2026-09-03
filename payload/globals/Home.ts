import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Home: GlobalConfig = {
  slug: "home",
  admin: {
    livePreview: { url: livePreviewUrl("/"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    {
      name: "heroEyebrow",
      type: "text",
      required: true,
    },
    {
      name: "heroTitle",
      type: "textarea",
      required: true,
      admin: {
        description: "Use a line break for a two-line headline, e.g. \"Eigenverantwortlich lernen.\\nGemeinsam wachsen.\"",
      },
    },
    {
      name: "heroSubtitle",
      type: "textarea",
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "heroImageAlt",
      type: "text",
      required: true,
    },
    {
      name: "quickLinks",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
        { name: "ctaLabel", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Enable for links that leave the site (opens in a new tab).",
          },
        },
      ],
    },
    {
      name: "leitbildQuote",
      type: "textarea",
      required: true,
    },
    {
      name: "selectedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      admin: {
        description: "Pick which Schulleben posts appear under \"Aktuelles\" on the homepage, in order. Leave empty to show the 6 most recent posts automatically.",
      },
    },
    {
      name: "ctaTitle",
      type: "text",
      required: true,
    },
    {
      name: "ctaText",
      type: "text",
      required: true,
    },
    {
      name: "ctaButtonLabel",
      type: "text",
      required: true,
    },
  ],
};
