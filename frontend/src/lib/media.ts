import type { StrapiImage } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getStrapiMediaUrl(image: StrapiImage | null | undefined): string {
  if (!image?.url) return "";

  // If the URL is already absolute, return as-is
  if (image.url.startsWith("http://") || image.url.startsWith("https://")) {
    return image.url;
  }

  // Otherwise prefix with Strapi URL
  return `${STRAPI_URL}${image.url}`;
}
