import type { Metadata } from "next";

/** Canonical public URL of the site, used for absolute metadata URLs. */
export const SITE_URL = "https://saithsfuff.com";

/** Social share image (app/opengraph-image.png), served from the site root. */
const SHARE_IMAGE = "/opengraph-image.png";

/**
 * Builds page metadata with matching Open Graph and Twitter tags.
 *
 * A page-level `openGraph`/`twitter` object replaces the root layout's, so the
 * share image is set explicitly here to keep it on every page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: "saithsfuff",
      images: SHARE_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: SHARE_IMAGE,
    },
  };
}
