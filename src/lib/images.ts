/**
 * Image URL adapter.
 * Phase 1 uses stable Unsplash photo IDs. Replace `resolveImageUrl`
 * later with a CDN, Supabase Storage, or CMS source without touching UI.
 */
export type ImageSize = "thumb" | "card" | "hero" | "gallery";

const WIDTHS: Record<ImageSize, number> = {
  thumb: 480,
  card: 900,
  hero: 2000,
  gallery: 1600,
};

export function resolveImageUrl(imageId: string, size: ImageSize = "card") {
  const width = WIDTHS[size];
  const quality = size === "thumb" ? 70 : 80;
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
