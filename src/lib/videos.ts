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
    src: "/videos/crg-part-2.mp4",
    poster: "/images/image-8.jpeg",
    kicker: "INSIDE CRG",
    title: "Research in Action",
    description:
      "A look at how CRG teams combine fieldwork, analysis and stakeholder engagement to turn evidence into impact.",
    durationLabel: "0:21",
  },
];
