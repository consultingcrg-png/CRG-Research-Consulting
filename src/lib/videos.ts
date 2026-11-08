export type SiteVideo = {
  src: string;
  poster: string;
  kicker: string;
  title: string;
  description: string;
  durationLabel: string;
};

/**
 * Featured videos shown in the hero slideshow and the "See us in action" section.
 * Drop additional .mp4 files into public/videos and add an entry here.
 */
export const SITE_VIDEOS: SiteVideo[] = [
  {
    src: "/videos/crg-reel.mp4",
    poster: "/images/crg-reel-poster.jpg",
    kicker: "IAEOGS 2026",
    title: "CRG at IAEOGS 2026",
    description:
      "Highlights from CRG at the 5th International African Oil & Gas Summit 2026 — the conversations, insights and partnerships shaping our work across the region.",
    durationLabel: "1:06",
  },
];
