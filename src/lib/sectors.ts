export const KEY_SECTORS = [
  "Land & Natural Resources",
  "Oil & Gas",
  "Tourism & Hospitality",
  "Energy",
  "Health",
  "Mining",
  "Defence",
  "International Development",
  "Other",
] as const;

export type SectorType = (typeof KEY_SECTORS)[number];
