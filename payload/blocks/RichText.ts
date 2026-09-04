import type { Block } from "payload";

export const RichText: Block = {
  slug: "richText",
  interfaceName: "RichTextBlock",
  labels: { singular: "Freitext", plural: "Freitexte" },
  fields: [{ name: "content", type: "richText", required: true }],
};
