import type { Media } from "@/payload-types";

/**
 * Payload upload relationship fields are typed as `number | Media | null`
 * depending on query depth. This resolves either shape to a usable URL.
 */
export function mediaUrl(value: number | Media | null | undefined): string | undefined {
  if (value && typeof value === "object") {
    return value.url ?? undefined;
  }
  return undefined;
}
