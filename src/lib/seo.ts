import type React from "react";

export const SITE_NAME = "CRG Research & Consulting";
export const CANONICAL_DOMAIN = "https://www.crg-research.com";

export const DEFAULT_TITLE = `CRG Research & Consulting | Strategic Research & Advisory – Windhoek, Namibia`;
export const DEFAULT_DESCRIPTION =
  "CRG Research & Consulting is a leading African research and strategic consulting firm headquartered in Windhoek, Namibia. We deliver evidence-based advisory across land, energy, mining, health and international development.";
export const HOME_DESCRIPTION =
  "CRG Research & Consulting (CRG) delivers evidence-based research and strategic advisory across land & natural resources, energy, oil & gas, mining, health, defence, tourism and international development in Namibia, Kenya and Nigeria. Contact us at www.crg-research.com.";

export const KEYWORDS =
  "CRG Research and Consulting, CRG Research & Consulting, CRG Consulting, CRG Research, crg-research.com, research consultancy Namibia, strategic consulting Windhoek Namibia, land and natural resources consulting Africa, international development consulting Namibia, policy research Namibia, evidence-based research Africa, strategic advisory Africa, research consulting Windhoek, development consulting sub-Saharan Africa, CRG advisory, CRG Namibia, oil and gas consulting Namibia, mining consulting Namibia, health consulting Africa, feasibility studies Namibia, monitoring evaluation learning Africa, MEL consulting, capacity building Africa, geospatial intelligence Africa, GIS consulting Namibia, fieldwork research Africa, community consultations Africa, baseline assessment Africa, socio-economic impact assessment, governance advisory Africa, institutional reform Africa, CRG Research Consulting Namibia";

export const OG_IMAGE = "/images/image-8.jpeg";
export const OG_IMAGE_ALT = "CRG Research & Consulting – Advisory & Fieldwork in Africa";
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

/**
 * Returns the canonical site URL.
 * Priority: env SITE_URL → env VITE_SITE_URL → Netlify URL env → hardcoded production domain.
 */
export function siteUrl(): string {
  const env =
    ((import.meta.env as Record<string, string>)["SITE_URL"] ?? "") ||
    ((import.meta.env as Record<string, string>)["VITE_SITE_URL"] ?? "") ||
    ((import.meta.env as Record<string, string>)["URL"] ?? "");
  // Fall back to the production canonical domain so canonical tags are always emitted.
  const resolved = env.trim().replace(/\/+$/, "") || CANONICAL_DOMAIN;
  return resolved;
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
  const absoluteUrl = emitUrl ? absolutize(options.path ?? "/") : undefined;
  const robots =
    options.noindex || options.nofollow
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta: React.JSX.IntrinsicElements["meta"][] = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: options.keywords ?? KEYWORDS },
    { name: "author", content: SITE_NAME },
    { name: "application-name", content: SITE_NAME },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { name: "theme-color", content: "#0b3954" },
    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_ZA" },
    { property: "og:locale:alternate", content: "en_US" },
    ...(absoluteUrl ? [{ property: "og:url", content: absoluteUrl }] : []),
    { property: "og:image", content: absolutize(options.image ?? OG_IMAGE) },
    { property: "og:image:alt", content: options.imageAlt ?? OG_IMAGE_ALT },
    { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
    { property: "og:image:type", content: "image/jpeg" },
    // Twitter / X card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absolutize(options.image ?? OG_IMAGE) },
    { name: "twitter:image:alt", content: options.imageAlt ?? OG_IMAGE_ALT },
  ];

  const links: React.JSX.IntrinsicElements["link"][] = [
    ...(absoluteUrl ? [{ rel: "canonical", href: absoluteUrl }] : []),
    { rel: "alternate", hrefLang: "en", href: absolutize(options.path ?? "/") },
  ];

  return { meta, links };
}

