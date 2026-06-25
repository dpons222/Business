import { chargerRoofing, prospects } from "./prospects";

export type DemoNiche = "roofing" | "restaurant" | "hvac" | "plumbing" | "other";

export type DemoStatus =
  | "researching"
  | "building_demo"
  | "ready_for_review"
  | "outreach_ready"
  | "contacted"
  | "follow_up"
  | "planned";

export type DemoEntry = {
  slug: string;
  title: string;
  shortName: string;
  createdAt: string;
  city: string;
  niche: DemoNiche;
  status: DemoStatus;
  stageLabel: string;
  primaryService: string;
  observedIssue: string;
  href: string;
  internalHref?: string;
  logoUrl?: string;
  isCurrentFocus?: boolean;
};

export const nicheFilters: Array<{ value: "all" | DemoNiche; label: string }> = [
  { value: "all", label: "All" },
  { value: "roofing", label: "Roofing" },
  { value: "restaurant", label: "Restaurants" },
  { value: "hvac", label: "HVAC" },
  { value: "plumbing", label: "Plumbing" },
  { value: "other", label: "Other / Testing" },
];

export const statusLabels: Record<DemoStatus, string> = {
  researching: "Researching",
  building_demo: "Building demo",
  ready_for_review: "Ready for review",
  outreach_ready: "Outreach ready",
  contacted: "Contacted",
  follow_up: "Follow-up",
  planned: "Planned",
};

const currentFocusSlug = "pizabella";

const roofingEntries: DemoEntry[] = prospects.map((prospect) => ({
  slug: prospect.slug,
  title: prospect.companyName,
  shortName: prospect.shortName,
  createdAt: prospect.createdAt,
  city: prospect.city,
  niche: "roofing",
  status: prospect.slug === chargerRoofing.slug ? "contacted" : "ready_for_review",
  stageLabel:
    prospect.slug === chargerRoofing.slug
      ? "Outreach sent, wait mode"
      : "Roofing demo prepared",
  primaryService: prospect.primaryService,
  observedIssue: prospect.observedIssue,
  href: `/${prospect.slug}`,
  internalHref: `/prospects/${prospect.slug}`,
  logoUrl: prospect.logoUrl,
  isCurrentFocus: prospect.slug === currentFocusSlug,
}));

const restaurantEntries: DemoEntry[] = [
  {
    slug: "pizabella",
    title: "Pizabella / Pizza Bella",
    shortName: "Pizza Bella",
    createdAt: "2026-06-25",
    city: "Woodstock, VA",
    niche: "restaurant",
    status: "ready_for_review",
    stageLabel: "Restaurant audit preview prepared",
    primaryService: "Restaurant Customer Journey Cleanup",
    observedIssue:
      "Online ordering is active, but the public Home/About path, menu merchandising, specials workflow, and public order links need cleanup before outreach.",
    href: "/pizabella",
    internalHref: "/pizabella",
    logoUrl:
      "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-01-30+at+12.12.03+PM.png",
    isCurrentFocus: currentFocusSlug === "pizabella",
  },
];

export const demoEntries: DemoEntry[] = [...restaurantEntries, ...roofingEntries];

export const currentFocusEntry =
  demoEntries.find((entry) => entry.isCurrentFocus) ?? demoEntries[0];

export function getDemoEntryBySlug(slug: string): DemoEntry | undefined {
  return demoEntries.find((entry) => entry.slug === slug);
}
