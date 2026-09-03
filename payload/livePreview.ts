import type { LivePreviewConfig } from "payload";

export const livePreviewBreakpoints: NonNullable<LivePreviewConfig["breakpoints"]> = [
  { name: "mobile", label: "Mobil", width: 375, height: 667 },
  { name: "tablet", label: "Tablet", width: 768, height: 1024 },
  { name: "desktop", label: "Desktop", width: 1440, height: 900 },
];

export function livePreviewUrl(path: string): LivePreviewConfig["url"] {
  return () => path;
}
