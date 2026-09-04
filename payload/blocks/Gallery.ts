import type { Block } from "payload";

export const Gallery: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  labels: { singular: "Bildergalerie", plural: "Bildergalerien" },
  fields: [
    { name: "intro", type: "textarea" },
    {
      name: "images",
      type: "array",
      minRows: 1,
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text", required: true },
        { name: "caption", type: "text" },
      ],
    },
  ],
};
