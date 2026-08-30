import type React from "react";

export const SITE_NAME = "CRG Research & Consulting";

export const DEFAULT_TITLE = `${SITE_NAME} | Research & Strategy, Windhoek Namibia`;
export const DEFAULT_DESCRIPTION =
  "Cross-sector research and strategic consulting for governments, organisations and communities.";
export const HOME_DESCRIPTION =
  "CRG Research & Consulting delivers evidence-based research and strategic advisory across land, energy, mining, health and international development in Namibia, Kenya and Nigeria.";
export const KEYWORDS =
  "CRG Research and Consulting, research consultancy Namibia, strategic consulting Windhoek, land and natural resources research, international development consulting Africa, policy research Namibia";

export const OG_IMAGE = "/images/image-8.jpeg";
export const OG_IMAGE_ALT = "CRG Research & Consulting Advisory & Fieldwork";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export const SITE_CONTACT = {
  telephone: "+264 81 3288657",
  streetAddress: "6 Luther Street, The Village, Eros",
  addressLocality: "Windhoek",
  addressRegion: "Khomas",
  addressCountry: "NA",
  geo: { latitude: -22.5609, longitude: 17.0898 },
};

export const SOCIAL_LINKEDIN = "https://www.linkedin.com/company/crg-research-consulting/";

// Canonical base URL. Populated at build/dev time from SITE_URL (or Netlify's
// `URL` build env). Empty until a production domain is available, in which case
// canonical/og:url tags are intentionally omitted rather than pointing nowhere.
export function siteUrl(): string {
  return (import.meta.env.SITE_URL ?? "").trim().replace(/\/+$/, "");
}

export function absolutize(path: string): string {
  const base = siteUrl();
  if (!base) return path;
  return /^https?:\/\//i.test(path) ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export type SeoOptions = {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  canonical?: boolean;
  noindex?: boolean;
  nofollow?: boolean;
};

export function seo(options: SeoOptions = {}) {
  const title = options.title ?? DEFAULT_TITLE;
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const emitUrl = options.canonical !== false;
  const absoluteUrl = emitUrl && siteUrl() ? absolutize(options.path ?? "/") : undefined;
  const robots =
    options.noindex || options.nofollow
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta: React.JSX.IntrinsicElements["meta"][] = [
    { title },
    { name: "description", content: description },
    ...(options.keywords ? [{ name: "keywords", content: options.keywords }] : []),
    { name: "author", content: SITE_NAME },
    { name: "robots", content: robots },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    ...(absoluteUrl ? [{ property: "og:url", content: absoluteUrl }] : []),
    { property: "og:image", content: absolutize(options.image ?? OG_IMAGE) },
    { property: "og:image:alt", content: options.imageAlt ?? OG_IMAGE_ALT },
    { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
    { property: "og:image:type", content: "image/jpeg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absolutize(options.image ?? OG_IMAGE) },
    { name: "twitter:image:alt", content: options.imageAlt ?? OG_IMAGE_ALT },
  ];
  const links: React.JSX.IntrinsicElements["link"][] = absoluteUrl
    ? [{ rel: "canonical", href: absoluteUrl }]
    : [];

  return { meta, links };
}
