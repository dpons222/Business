import type { DemoNiche, DemoStatus } from "./demoRegistry";

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
