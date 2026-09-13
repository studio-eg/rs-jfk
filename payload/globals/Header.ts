import type { GlobalConfig } from "payload";
import { livePreviewBreakpoints, livePreviewUrl } from "../livePreview";

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    livePreview: { url: livePreviewUrl("/"), breakpoints: livePreviewBreakpoints },
  },
  fields: [
    { name: "logoEyebrow", type: "text", required: true, defaultValue: "Realschule" },
    { name: "logoText", type: "text", required: true, defaultValue: "John-F.-Kennedy-Platz" },
    { name: "logoImage", type: "upload", relationTo: "media" },
    {
      name: "logoImageAlt",
      type: "text",
      defaultValue: "Logo der Realschule John-F.-Kennedy-Platz",
    },
    {
      name: "navItems",
      type: "array",
      minRows: 1,
      admin: {
        description:
          "Die Hauptlinks in der Navigation oben. Für eine frei erstellte Seite den Adressteil eintragen, z.B. /elternbeirat.",
      },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "href",
          type: "text",
          required: true,
          admin: { description: "z.B. /kontakt oder /elternbeirat" },
        },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Öffnet den Link in einem neuen Tab." },
        },
      ],
    },
    {
      name: "secondaryButton",
      type: "group",
      admin: { description: "Der Button mit dem Rahmen (z.B. Stundenplan)." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "external", type: "checkbox", defaultValue: true },
      ],
    },
    {
      name: "primaryButton",
      type: "group",
      admin: { description: "Der farbig ausgefüllte Button (z.B. IServ-Login)." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "external", type: "checkbox", defaultValue: true },
      ],
    },
  ],
};
