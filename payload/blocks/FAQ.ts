import type { Block } from "payload";

export const FAQ: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  labels: { singular: "FAQ / Fragen & Antworten", plural: "FAQ / Fragen & Antworten" },
  fields: [
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
