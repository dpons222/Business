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
  sourceUrl?: string;
  contactEmail?: string;
  hasEmailDraft?: boolean;
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
const contactedRoofingSlugs = new Set([chargerRoofing.slug, "sixth-gen-roofing"]);

const roofingEntries: DemoEntry[] = prospects.map((prospect) => ({
  slug: prospect.slug,
  title: prospect.companyName,
  shortName: prospect.shortName,
  createdAt: prospect.createdAt,
  city: prospect.city,
  niche: "roofing",
  status: contactedRoofingSlugs.has(prospect.slug) ? "contacted" : "ready_for_review",
  stageLabel:
    contactedRoofingSlugs.has(prospect.slug)
      ? "Outreach sent, wait mode"
      : "Roofing demo prepared",
  primaryService: prospect.primaryService,
  observedIssue: prospect.observedIssue,
  href: `/${prospect.slug}`,
  internalHref: `/prospects/${prospect.slug}`,
  sourceUrl: prospect.sourceWebsite,
  contactEmail: prospect.contactEmail,
  hasEmailDraft: true,
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
    stageLabel: "Customer-facing restaurant demo prepared",
    primaryService: "Restaurant website and ordering path preview",
    observedIssue:
      "Customer-facing Pizza Bella preview is prepared; internal notes still track the website, menu, specials, and public link cleanup opportunity.",
    href: "/pizabella",
    internalHref: "/pizabella",
    sourceUrl: "https://landing.arrowpos.com/home/pizzabella",
    hasEmailDraft: true,
    logoUrl:
      "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-01-30+at+12.12.03+PM.png",
    isCurrentFocus: currentFocusSlug === "pizabella",
  },
];

const internalTestEntries: DemoEntry[] = [
  {
    slug: "internal-test-follow-up-reminder",
    title: "Internal Test Follow-Up Reminder",
    shortName: "Internal Follow-Up Test",
    createdAt: "2026-07-02",
    city: "Internal Test, US",
    niche: "other",
    status: "follow_up",
    stageLabel: "Internal automation validation row",
    primaryService: "Follow-up approval workflow validation",
    observedIssue:
      "Synthetic prospect used only to validate reminder and approval-gated follow-up automation.",
    href: "/internal-test-follow-up-reminder",
    sourceUrl: "https://example.com/internal-follow-up-reminder-test",
    contactEmail: "digidaps@gmail.com",
    hasEmailDraft: true,
  },
];

export const demoEntries: DemoEntry[] = [...restaurantEntries, ...roofingEntries, ...internalTestEntries];

export const currentFocusEntry =
  demoEntries.find((entry) => entry.isCurrentFocus) ?? demoEntries[0];

export function getDemoEntryBySlug(slug: string): DemoEntry | undefined {
  return demoEntries.find((entry) => entry.slug === slug);
}
