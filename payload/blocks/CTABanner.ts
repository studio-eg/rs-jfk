import type { Block } from "payload";

export const CTABanner: Block = {
  slug: "ctaBanner",
  interfaceName: "CTABannerBlock",
  labels: { singular: "CTA-Banner", plural: "CTA-Banner" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "text", type: "textarea", required: true },
    { name: "buttonLabel", type: "text", required: true },
    {
      name: "buttonHref",
      type: "text",
      required: true,
      admin: {
        description: "e.g. /kontakt or https://example.com",
      },
    },
  ],
};
