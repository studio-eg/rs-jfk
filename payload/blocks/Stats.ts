import type { Block } from "payload";

export const Stats: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  labels: { singular: "Zahlen & Statistiken", plural: "Zahlen & Statistiken" },
  fields: [
    { name: "intro", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "value", type: "text", required: true, admin: { description: "e.g. 850 or 98%" } },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
