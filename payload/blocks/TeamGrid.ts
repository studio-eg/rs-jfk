import type { Block } from "payload";

export const TeamGrid: Block = {
  slug: "teamGrid",
  interfaceName: "TeamGridBlock",
  labels: { singular: "Personen-Übersicht", plural: "Personen-Übersichten" },
  fields: [
    { name: "heading", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "members",
      type: "array",
      minRows: 1,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "email", type: "text" },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
