export function getLivePreviewServerURL(): string {
  return typeof window !== "undefined" ? window.location.origin : "";
}
