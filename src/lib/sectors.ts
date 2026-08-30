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

export const RESOURCE_TYPES = [
  "Research Report",
  "Policy Brief",
  "Toolkit",
  "Working Paper",
  "Dataset",
  "Case Study",
  "Other",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const NEWS_CATEGORIES = [
  "Corporate Announcement",
  "Fieldwork & Research",
  "Conference & Events",
  "Strategic Partnership",
  "Sector Insights",
  "Press Release",
  "Other",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];
