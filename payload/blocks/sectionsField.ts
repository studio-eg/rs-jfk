import type { Field } from "payload";

import { pageBuilderBlocks } from "./index";

export const pageSectionsField = (): Field => ({
  name: "pageSections",
  type: "blocks",
  blocks: pageBuilderBlocks,
  admin: {
    initCollapsed: true,
    description:
      "Zusätzliche Bausteine, die am Ende dieser Seite angezeigt werden.",
  },
});
