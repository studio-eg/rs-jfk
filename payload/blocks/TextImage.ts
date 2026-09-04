import type { Block } from "payload";

export const TextImage: Block = {
  slug: "textImage",
  interfaceName: "TextImageBlock",
  labels: { singular: "Text & Bild", plural: "Text & Bild" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "imageAlt", type: "text", required: true },
    {
      name: "imagePosition",
      type: "select",
      required: true,
      defaultValue: "right",
      options: [
        { label: "Bild rechts", value: "right" },
        { label: "Bild links", value: "left" },
      ],
    },
  ],
};
