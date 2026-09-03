import type { CollectionConfig } from "payload";
import { livePreviewBreakpoints } from "../livePreview";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedDate"],
    livePreview: {
      url: (doc) => `/schulleben/${(doc as { slug?: string })?.slug ?? ""}`,
      breakpoints: livePreviewBreakpoints,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "Used in the post's web address, e.g. /schulleben/mein-beitrag. Changing this changes the post's URL.",
      },
    },
    {
      name: "tag",
      type: "text",
      required: true,
      admin: {
        description:
          "A short category label shown on the post card, e.g. \"Sport\" or \"Musik\". Any text works.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        description: "Used to sort posts (newest first) and to pick the homepage's latest posts.",
      },
    },
    {
      name: "dateLabel",
      type: "text",
      admin: {
        description:
          "Optional: override how the date is displayed, e.g. \"Interview 17. Januar 2024, Präsentation 12. März 2024\". Leave empty to just show the date above.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: {
        description: "Short summary shown on post cards and used as the page description.",
      },
    },
    {
      name: "body",
      type: "richText",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      required: true,
      admin: {
        description: "Describes the image for screen readers, e.g. \"Schülerinnen und Schüler beim Lauftag 2024\".",
      },
    },
  ],
};
