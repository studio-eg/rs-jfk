import type { Block } from "payload";

export const Quote: Block = {
  slug: "quote",
  interfaceName: "QuoteBlock",
  labels: { singular: "Zitat", plural: "Zitate" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "author", type: "text" },
    { name: "role", type: "text" },
    { name: "photo", type: "upload", relationTo: "media" },
  ],
};
