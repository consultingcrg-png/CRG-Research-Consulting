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
    src: "/videos/crg-at-summit.mp4",
    poster: "/images/crg-at-summit-poster.jpg",
    kicker: "SUMMIT HIGHLIGHTS",
    title: "CRG at Summit",
    description:
      "Highlights from CRG at the summit — the conversations, insights and partnerships shaping our work across the region.",
    durationLabel: "2:02",
  },
];
