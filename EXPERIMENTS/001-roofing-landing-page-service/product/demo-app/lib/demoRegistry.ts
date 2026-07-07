import { chargerRoofing, prospects } from "./prospects";
import { medSpaDemos } from "./medSpaDemos";

export type DemoNiche = "roofing" | "restaurant" | "med_spa" | "hvac" | "plumbing" | "other";

export type DemoStatus =
  | "researching"
  | "building_demo"
  | "needs_rebuild"
  | "qa_needed"
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
  previewLabel?: string;
  isExternalHref?: boolean;
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
  { value: "med_spa", label: "Med Spas" },
  { value: "hvac", label: "HVAC" },
  { value: "plumbing", label: "Plumbing" },
  { value: "other", label: "Other / Testing" },
];

export const statusLabels: Record<DemoStatus, string> = {
  researching: "Researching",
  building_demo: "Building demo",
  needs_rebuild: "Needs rebuild",
  qa_needed: "QA needed",
  ready_for_review: "Ready for review",
  outreach_ready: "Outreach ready",
  contacted: "Contacted",
  follow_up: "Follow-up",
  planned: "Planned",
};

export const currentFocusSlug = "pizabella";
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

const medSpaEntries: DemoEntry[] = medSpaDemos.map((demo) => ({
  slug: demo.slug,
  title: demo.businessName,
  shortName: demo.shortName,
  createdAt: "2026-07-04",
  city: demo.city,
  niche: "med_spa",
  status: "qa_needed",
  stageLabel:
    demo.slug === "lazaderm-chandler"
      ? "Rebuilt exemplar; QA still required"
      : "Finished demo rebuilt; QA still required",
  primaryService: demo.treatmentFocus,
  observedIssue: demo.subheadline,
  href: `/med-spa/${demo.slug}`,
  sourceUrl: demo.sourceUrl,
  hasEmailDraft: false,
}));

export const localDemoEntries: DemoEntry[] = [
  ...restaurantEntries,
  ...roofingEntries,
  ...medSpaEntries,
  ...internalTestEntries,
];

export const localDemoMetadataBySlug = new Map(
  localDemoEntries.map((entry) => [entry.slug, entry]),
);

// Backward-compatible export for existing demo pages. Dashboard data should use
// Supabase first and treat this list as route/asset metadata plus local fallback.
export const demoEntries = localDemoEntries;

export const currentFocusEntry =
  localDemoEntries.find((entry) => entry.isCurrentFocus) ?? localDemoEntries[0];

export function getLocalDemoEntryBySlug(slug: string): DemoEntry | undefined {
  return localDemoMetadataBySlug.get(slug);
}

export const getDemoEntryBySlug = getLocalDemoEntryBySlug;
