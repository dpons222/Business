"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Globe2,
  SlidersHorizontal,
  Layers3,
  Link as LinkIcon,
  Mail,
  Map as MapIcon,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react";
import type { DashboardFocusItem } from "../lib/dashboardFocus";
import type { DemoEntry, DemoNiche, DemoStatus } from "../lib/demoRegistry";
import { nicheFilters, statusLabels } from "../lib/demoRegistry";
import { relationshipStatusLabel } from "../lib/prospectDrafts";
import type { FollowUpChannelPolicy, ProspectDraftSummary } from "../lib/prospectDrafts";

type SortMode = "name" | "date";
type SortDirection = "asc" | "desc";
type ContactFilter =
  | "contacted"
  | "not_contacted"
  | "do_not_contact"
  | "not_interested"
  | "has_email"
  | "has_email_draft";
type ManualContactMethod =
  | "contact_form"
  | "email"
  | "phone"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "other";
type DemoStatusFilter = Extract<
  DemoStatus,
  | "needs_rebuild"
  | "qa_needed"
  | "ready_for_review"
  | "outreach_ready"
  | "follow_up"
  | "building_demo"
>;
type LocationFilterOption = {
  value: string;
  label: string;
  count: number;
};
type LocationCityFilterOption = LocationFilterOption & {
  key: string;
};
type LocationStateRegionFilterOption = LocationFilterOption & {
  key: string;
  cities: LocationCityFilterOption[];
};
type LocationCountryFilterOption = LocationFilterOption & {
  stateRegions: LocationStateRegionFilterOption[];
};
type EntryLocation = {
  country: string;
  countryLabel: string;
  stateRegion: string;
  stateRegionLabel: string;
  city: string;
};

const CURRENT_FOCUS_STORAGE_KEY = "local-growth-preview-current-focus";
const FOCUS_LIST_STORAGE_KEY = "local-growth-preview-focus-list";

const nicheFilterOptions = nicheFilters.filter(
  (filter): filter is { value: DemoNiche; label: string } => filter.value !== "all",
);
const nicheLabelByValue = Object.fromEntries(
  nicheFilters.map((filter) => [filter.value, filter.label]),
) as Record<"all" | DemoNiche, string>;

const contactFilterOptions: Array<{ value: ContactFilter; label: string }> = [
  { value: "contacted", label: "Contacted" },
  { value: "not_contacted", label: "Not contacted" },
  { value: "do_not_contact", label: "Do not contact" },
  { value: "not_interested", label: "Not interested" },
  { value: "has_email", label: "Has email" },
  { value: "has_email_draft", label: "Has email draft" },
];

const demoStatusFilterOptions: Array<{ value: DemoStatusFilter; label: string }> = [
  { value: "needs_rebuild", label: "Needs rebuild" },
  { value: "qa_needed", label: "QA needed" },
  { value: "ready_for_review", label: "Ready for review" },
  { value: "outreach_ready", label: "Outreach ready" },
  { value: "follow_up", label: "Follow-up" },
  { value: "building_demo", label: "Building demo" },
];

const manualContactMethodOptions: Array<{ value: ManualContactMethod; label: string }> = [
  { value: "contact_form", label: "Contact form" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

type ProspectDraft = {
  businessName: string;
  businessEmail: string | null;
  contactStatus: string | null;
  outreachSendStatus: string | null;
  outreachSendChannel: string | null;
  outreachApproved: boolean;
  outreachApprovedAt: string | null;
  outreachApprovedBy: string | null;
  subject: string | null;
  body: string | null;
  website: string | null;
  demoUrl: string | null;
  dateContacted: string | null;
  lastContactedAt: string | null;
  followUp1DueAt: string | null;
  followUp1SentAt: string | null;
  followUp2DueAt: string | null;
  followUp2SentAt: string | null;
  nextFollowUpAt: string | null;
  followUpSendStatus: string | null;
  followUpApproved: boolean;
  followUpApprovedAt: string | null;
  followUpApprovedBy: string | null;
  followUpStep: "follow_up_1" | "follow_up_2" | null;
  followUpSubject: string | null;
  followUpBody: string | null;
  followUpLastError: string | null;
  followUpChannelPolicy: FollowUpChannelPolicy;
  replyStatus: string | null;
  notes: string | null;
  approvalBlockers: string[];
  followUpApprovalBlockers: string[];
  source: "supabase" | "local";
};

type ProspectPreviewDashboardProps = {
  entries: DemoEntry[];
  initialFocusItems: DashboardFocusItem[];
  initialFocusSource: "supabase" | "unavailable";
  nowIso: string;
  prospectDraftSummaries: Record<string, ProspectDraftSummary>;
};

type FollowUpQueueItem = {
  entry: DemoEntry;
  summary: ProspectDraftSummary;
  dueAt: string | null;
  label: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function toggleSelectedValue<T extends string>(selectedValues: T[], value: T) {
  return selectedValues.includes(value)
    ? selectedValues.filter((selectedValue) => selectedValue !== value)
    : [...selectedValues, value];
}

function focusItemForSlug(slug: string): DashboardFocusItem {
  return {
    slug,
    addedAt: new Date().toISOString(),
    addedBy: null,
  };
}

function sortFocusItems(items: DashboardFocusItem[]) {
  return [...items].sort((first, second) => second.addedAt.localeCompare(first.addedAt));
}

function normalizeFocusItems(items: DashboardFocusItem[], validSlugs: Set<string>) {
  const seenSlugs = new Set<string>();
  const normalizedItems: DashboardFocusItem[] = [];

  items.forEach((item) => {
    if (!item.slug || !validSlugs.has(item.slug) || seenSlugs.has(item.slug)) {
      return;
    }

    const parsedAddedAt = new Date(item.addedAt);

    normalizedItems.push({
      slug: item.slug,
      addedAt: Number.isFinite(parsedAddedAt.getTime())
        ? parsedAddedAt.toISOString()
        : new Date().toISOString(),
      addedBy: item.addedBy ?? null,
    });
    seenSlugs.add(item.slug);
  });

  return sortFocusItems(normalizedItems);
}

function readStoredFocusItems(validSlugs: Set<string>) {
  const storedFocusItems = window.localStorage.getItem(FOCUS_LIST_STORAGE_KEY);
  const storedCurrentFocusSlug = window.localStorage.getItem(CURRENT_FOCUS_STORAGE_KEY);
  const parsedItems: DashboardFocusItem[] = [];

  if (storedFocusItems) {
    try {
      const parsedValue = JSON.parse(storedFocusItems) as unknown;

      if (Array.isArray(parsedValue)) {
        parsedValue.forEach((item) => {
          if (!item || typeof item !== "object") {
            return;
          }

          const candidate = item as Partial<DashboardFocusItem>;

          if (!candidate.slug || typeof candidate.slug !== "string") {
            return;
          }

          parsedItems.push({
            slug: candidate.slug,
            addedAt:
              typeof candidate.addedAt === "string"
                ? candidate.addedAt
                : new Date().toISOString(),
            addedBy: typeof candidate.addedBy === "string" ? candidate.addedBy : null,
          });
        });
      }
    } catch {
      window.localStorage.removeItem(FOCUS_LIST_STORAGE_KEY);
    }
  }

  if (
    storedCurrentFocusSlug &&
    validSlugs.has(storedCurrentFocusSlug) &&
    !parsedItems.some((item) => item.slug === storedCurrentFocusSlug)
  ) {
    parsedItems.push(focusItemForSlug(storedCurrentFocusSlug));
  }

  return normalizeFocusItems(parsedItems, validSlugs);
}

function writeStoredFocusItems(items: DashboardFocusItem[]) {
  window.localStorage.setItem(FOCUS_LIST_STORAGE_KEY, JSON.stringify(items));
  window.localStorage.removeItem(CURRENT_FOCUS_STORAGE_KEY);
}

function getEntryContactStatus(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return summaries[entry.slug]?.contactStatus ?? (entry.status === "contacted" ? "contacted" : "not_contacted");
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function entryHasEmail(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return Boolean(summaries[entry.slug]?.businessEmail ?? entry.contactEmail);
}

function entryHasEmailDraft(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return summaries[entry.slug]?.hasEmailDraft ?? Boolean(entry.hasEmailDraft);
}

function normalizeSearchValue(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function normalizeLocationValue(value: string) {
  return value.trim().toLowerCase();
}

function locationStateRegionKey(countryValue: string, stateRegionValue: string) {
  return `${countryValue}::${stateRegionValue}`;
}

function locationCityKey(countryValue: string, stateRegionValue: string, cityValue: string) {
  return `${countryValue}::${stateRegionValue}::${cityValue}`;
}

function countryLabel(country: string) {
  if (country.toUpperCase() === "US") {
    return "United States";
  }

  return country;
}

function stateRegionLabel(stateRegion: string) {
  const stateRegionLabels: Record<string, string> = {
    TX: "Texas",
    VA: "Virginia",
  };
  const normalizedStateRegion = stateRegion.toUpperCase();

  return stateRegionLabels[normalizedStateRegion] ?? stateRegion;
}

function parseEntryLocation(entry: Pick<DemoEntry, "city">): EntryLocation {
  const [rawCity, rawRegion, rawCountry] = entry.city
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const city = rawCity || "Unknown city";
  const regionCandidate = rawRegion || "Unspecified region";
  const country = (
    rawCountry || (regionCandidate.toUpperCase() === "US" ? regionCandidate : "US")
  ).toUpperCase();
  const stateRegion =
    !rawCountry && regionCandidate.toUpperCase() === "US"
      ? "Unspecified region"
      : regionCandidate;

  return {
    country,
    countryLabel: countryLabel(country),
    stateRegion,
    stateRegionLabel: stateRegionLabel(stateRegion),
    city,
  };
}

function buildLocationFilterTree(entries: DemoEntry[]): LocationCountryFilterOption[] {
  const countryMap = new Map<string, LocationCountryFilterOption>();

  entries.forEach((entry) => {
    const location = parseEntryLocation(entry);
    const countryValue = normalizeLocationValue(location.country);
    const stateRegionValue = normalizeLocationValue(location.stateRegion);
    const cityValue = normalizeLocationValue(location.city);

    if (!countryValue || !stateRegionValue || !cityValue) {
      return;
    }

    let country = countryMap.get(countryValue);

    if (!country) {
      country = {
        value: countryValue,
        label: location.countryLabel,
        count: 0,
        stateRegions: [],
      };
      countryMap.set(countryValue, country);
    }

    country.count += 1;

    const stateKey = locationStateRegionKey(countryValue, stateRegionValue);
    let stateRegion = country.stateRegions.find((state) => state.key === stateKey);

    if (!stateRegion) {
      stateRegion = {
        key: stateKey,
        value: stateRegionValue,
        label: location.stateRegionLabel,
        count: 0,
        cities: [],
      };
      country.stateRegions.push(stateRegion);
    }

    stateRegion.count += 1;

    const cityKey = locationCityKey(countryValue, stateRegionValue, cityValue);
    const city = stateRegion.cities.find((cityOption) => cityOption.key === cityKey);

    if (city) {
      city.count += 1;
      return;
    }

    stateRegion.cities.push({
      key: cityKey,
      value: cityValue,
      label: location.city,
      count: 1,
    });
  });

  return [...countryMap.values()]
    .map((country) => ({
      ...country,
      stateRegions: country.stateRegions
        .map((stateRegion) => ({
          ...stateRegion,
          cities: [...stateRegion.cities].sort((first, second) =>
            first.label.localeCompare(second.label),
          ),
        }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    }))
    .sort((first, second) => first.label.localeCompare(second.label));
}

function entryMatchesSearch(
  entry: DemoEntry,
  summaries: Record<string, ProspectDraftSummary>,
  searchTerm: string,
) {
  if (!searchTerm) {
    return true;
  }

  const summary = summaries[entry.slug];
  const location = parseEntryLocation(entry);
  const searchableText = [
    entry.title,
    entry.shortName,
    entry.slug,
    entry.city,
    location.countryLabel,
    location.stateRegionLabel,
    entry.niche,
    entry.primaryService,
    entry.stageLabel,
    statusLabels[entry.status],
    summary?.businessEmail,
    summary?.contactStatus ? relationshipStatusLabel(summary.contactStatus) : null,
  ]
    .map(normalizeSearchValue)
    .filter(Boolean)
    .join(" ");

  return searchableText.includes(searchTerm);
}

function entryMatchesContactFilter(
  entry: DemoEntry,
  filter: ContactFilter,
  summaries: Record<string, ProspectDraftSummary>,
) {
  if (filter === "contacted") {
    return getEntryContactStatus(entry, summaries) === "contacted";
  }

  if (filter === "not_contacted") {
    return getEntryContactStatus(entry, summaries) === "not_contacted";
  }

  if (filter === "do_not_contact") {
    return getEntryContactStatus(entry, summaries) === "do_not_contact";
  }

  if (filter === "not_interested") {
    return getEntryContactStatus(entry, summaries) === "not_interested";
  }

  if (filter === "has_email") {
    return entryHasEmail(entry, summaries);
  }

  return entryHasEmailDraft(entry, summaries);
}

const stoppedFollowUpStatuses = new Set([
  "do_not_contact",
  "not_interested",
  "positive_reply",
  "negative_reply",
  "won",
  "lost",
  "not_fit",
]);
const replyFollowUpStatuses = new Set(["positive_reply", "neutral_reply", "negative_reply"]);

function isStoppedOrReplied(status: string | null | undefined, replyStatus: string | null | undefined) {
  return Boolean(
    (status && (stoppedFollowUpStatuses.has(status) || replyFollowUpStatuses.has(status))) ||
      replyStatus?.trim(),
  );
}

function getManualFollowUpStep(draft: ProspectDraft | null) {
  if (!draft || draft.followUp2SentAt || draft.contactStatus === "follow_up_2_sent") {
    return null;
  }

  if (
    draft.followUp1SentAt ||
    draft.contactStatus === "follow_up_1_sent" ||
    draft.contactStatus === "follow_up_2_due"
  ) {
    return "follow_up_2" as const;
  }

  return "follow_up_1" as const;
}

function sortFollowUps(first: FollowUpQueueItem, second: FollowUpQueueItem) {
  const firstTime = first.dueAt ? new Date(first.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
  const secondTime = second.dueAt ? new Date(second.dueAt).getTime() : Number.MAX_SAFE_INTEGER;

  if (firstTime !== secondTime) {
    return firstTime - secondTime;
  }

  return first.entry.title.localeCompare(second.entry.title);
}

const lockedOutreachStatuses = new Set(["approved_for_draft", "draft_created", "approved", "queued", "sent"]);

const outreachStatusLabels: Record<string, string> = {
  not_ready: "Not ready",
  ready_for_review: "Ready for review",
  approved_for_draft: "Approved for Gmail draft",
  draft_created: "Gmail draft created",
  approved: "Approved for n8n send",
  queued: "Queued",
  sent: "Sent",
  failed: "Failed",
  skipped: "Skipped",
};

function draftStatusLabel(status: string | null) {
  if (!status) {
    return "No outreach status";
  }

  return outreachStatusLabels[status] ?? status;
}

function followUpStatusLabel(status: string | null) {
  if (!status) {
    return "No follow-up send status";
  }

  return outreachStatusLabels[status] ?? status;
}

function relationshipPillClass(status: string | null | undefined) {
  return status ? `relationship-pill relationship-pill-${status}` : "relationship-pill";
}

function summaryFromDraft(draft: ProspectDraft): ProspectDraftSummary {
  return {
    businessEmail: draft.businessEmail,
    contactStatus: draft.contactStatus,
    hasEmailDraft: Boolean(draft.subject?.trim() && draft.body?.trim()),
    outreachSendStatus: draft.outreachSendStatus as ProspectDraftSummary["outreachSendStatus"],
    dateContacted: draft.dateContacted,
    lastContactedAt: draft.lastContactedAt,
    followUp1DueAt: draft.followUp1DueAt,
    followUp1SentAt: draft.followUp1SentAt,
    followUp2DueAt: draft.followUp2DueAt,
    followUp2SentAt: draft.followUp2SentAt,
    nextFollowUpAt: draft.nextFollowUpAt,
    followUpSendStatus: draft.followUpSendStatus as ProspectDraftSummary["followUpSendStatus"],
    followUpApproved: draft.followUpApproved,
    followUpStep: draft.followUpStep,
    hasFollowUpDraft: Boolean(draft.followUpSubject?.trim() && draft.followUpBody?.trim()),
    replyStatus: draft.replyStatus,
    source: "supabase",
  };
}

export function ProspectPreviewDashboard({
  entries,
  initialFocusItems,
  initialFocusSource,
  nowIso,
  prospectDraftSummaries: initialProspectDraftSummaries,
}: ProspectPreviewDashboardProps) {
  const [prospectDraftSummaries, setProspectDraftSummaries] = useState(
    initialProspectDraftSummaries,
  );
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isFilterRailOpen, setIsFilterRailOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<DemoNiche[]>([]);
  const [selectedContactFilters, setSelectedContactFilters] = useState<ContactFilter[]>([]);
  const [selectedDemoStatuses, setSelectedDemoStatuses] = useState<DemoStatusFilter[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStateRegions, setSelectedStateRegions] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [focusItems, setFocusItems] = useState<DashboardFocusItem[]>(initialFocusItems);
  const [focusPersistenceSource, setFocusPersistenceSource] = useState<
    "supabase" | "local"
  >(initialFocusSource === "supabase" ? "supabase" : "local");
  const [focusPersistenceMessage, setFocusPersistenceMessage] = useState(
    initialFocusSource === "supabase"
      ? "Synced with Supabase."
      : "Using local focus list until Supabase is available.",
  );
  const [hasLoadedSavedFocus, setHasLoadedSavedFocus] = useState(false);
  const [isFocusSaving, setIsFocusSaving] = useState(false);
  const [draftEntry, setDraftEntry] = useState<DemoEntry | null>(null);
  const [draft, setDraft] = useState<ProspectDraft | null>(null);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [approvalIntent, setApprovalIntent] = useState<
    | "approve"
    | "revoke"
    | "manual_contact"
    | "manual_follow_up"
    | "approve_follow_up"
    | "revoke_follow_up"
    | "do_not_contact"
    | "not_interested"
    | null
  >(null);
  const [isApprovalChecked, setIsApprovalChecked] = useState(false);
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [isApprovalSaving, setIsApprovalSaving] = useState(false);
  const [manualContactMethod, setManualContactMethod] =
    useState<ManualContactMethod>("contact_form");
  const [manualContactNote, setManualContactNote] = useState("");
  const [relationshipNote, setRelationshipNote] = useState("");
  const [manualFollowUpDays, setManualFollowUpDays] = useState(7);
  const [isManualContactChecked, setIsManualContactChecked] = useState(false);
  const [manualFollowUpNote, setManualFollowUpNote] = useState("");
  const [isManualFollowUpChecked, setIsManualFollowUpChecked] = useState(false);

  useEffect(() => {
    setProspectDraftSummaries(initialProspectDraftSummaries);
  }, [initialProspectDraftSummaries]);

  const entrySlugSet = useMemo(() => new Set(entries.map((entry) => entry.slug)), [entries]);
  const entryBySlug = useMemo(() => {
    return entries.reduce<Record<string, DemoEntry>>((entryMap, entry) => {
      entryMap[entry.slug] = entry;
      return entryMap;
    }, {});
  }, [entries]);

  useEffect(() => {
    const normalizedInitialItems = normalizeFocusItems(initialFocusItems, entrySlugSet);
    const storedFocusItems = readStoredFocusItems(entrySlugSet);

    if (normalizedInitialItems.length > 0 || initialFocusSource === "supabase") {
      setFocusItems(normalizedInitialItems);
      setFocusPersistenceSource("supabase");
      setFocusPersistenceMessage("Synced with Supabase.");
      writeStoredFocusItems(normalizedInitialItems);

      if (normalizedInitialItems.length === 0 && storedFocusItems.length > 0) {
        void saveFocusItemsToSupabase("replace", storedFocusItems, {
          items: storedFocusItems,
        });
      }
    } else if (storedFocusItems.length > 0) {
      setFocusItems(storedFocusItems);
      setFocusPersistenceSource("local");
      setFocusPersistenceMessage("Using local focus list until Supabase is available.");
      writeStoredFocusItems(storedFocusItems);
    }

    setHasLoadedSavedFocus(true);
  }, [entrySlugSet, initialFocusItems, initialFocusSource]);

  const nicheCounts = useMemo(() => {
    return entries.reduce<Record<"all" | DemoNiche, number>>(
      (counts, entry) => {
        counts.all += 1;
        counts[entry.niche] += 1;
        return counts;
      },
      {
        all: 0,
        roofing: 0,
        restaurant: 0,
        med_spa: 0,
        hvac: 0,
        plumbing: 0,
        other: 0,
      },
    );
  }, [entries]);
  const locationFilterTree = useMemo(() => buildLocationFilterTree(entries), [entries]);

  const visibleEntries = useMemo(() => {
    const searchTerm = normalizeSearchValue(searchQuery);

    const filteredEntries = entries.filter((entry) => {
      const location = parseEntryLocation(entry);
      const countryValue = normalizeLocationValue(location.country);
      const stateRegionValue = normalizeLocationValue(location.stateRegion);
      const cityValue = normalizeLocationValue(location.city);
      const stateRegionKey = locationStateRegionKey(countryValue, stateRegionValue);
      const cityKey = locationCityKey(countryValue, stateRegionValue, cityValue);
      const matchesNiche =
        selectedNiches.length === 0 || selectedNiches.includes(entry.niche);
      const matchesCountry =
        selectedCountries.length === 0 || selectedCountries.includes(countryValue);
      const matchesStateRegion =
        selectedStateRegions.length === 0 || selectedStateRegions.includes(stateRegionKey);
      const matchesCity =
        selectedCities.length === 0 || selectedCities.includes(cityKey);
      const matchesContactStatus =
        selectedContactFilters.length === 0 ||
        selectedContactFilters.every((filter) =>
          entryMatchesContactFilter(entry, filter, prospectDraftSummaries),
        );
      const matchesDemoStatus =
        selectedDemoStatuses.length === 0 ||
        selectedDemoStatuses.some((status) => entry.status === status);
      const matchesSearch = entryMatchesSearch(entry, prospectDraftSummaries, searchTerm);

      return (
        matchesNiche &&
        matchesCountry &&
        matchesStateRegion &&
        matchesCity &&
        matchesContactStatus &&
        matchesDemoStatus &&
        matchesSearch
      );
    });

    return [...filteredEntries].sort((first, second) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortMode === "name") {
        return first.title.localeCompare(second.title) * direction;
      }

      return first.createdAt.localeCompare(second.createdAt) * direction;
    });
  }, [
    entries,
    prospectDraftSummaries,
    searchQuery,
    selectedCities,
    selectedContactFilters,
    selectedCountries,
    selectedDemoStatuses,
    selectedNiches,
    selectedStateRegions,
    sortDirection,
    sortMode,
  ]);

  function updateSort(nextSortMode: SortMode) {
    if (nextSortMode === sortMode) {
      setSortDirection((currentDirection) => (currentDirection === "asc" ? "desc" : "asc"));
      return;
    }

    setSortMode(nextSortMode);
    setSortDirection(nextSortMode === "date" ? "desc" : "asc");
  }

  const dateSortLabel =
    sortMode === "date" && sortDirection === "asc" ? "Oldest First" : "Newest First";
  const nameSortLabel = sortMode === "name" && sortDirection === "desc" ? "Z-A" : "A-Z";
  const trimmedSearchQuery = searchQuery.trim();
  const activeFilterCount =
    selectedNiches.length +
    selectedCountries.length +
    selectedStateRegions.length +
    selectedCities.length +
    selectedContactFilters.length +
    selectedDemoStatuses.length +
    (trimmedSearchQuery ? 1 : 0);
  const activeFilterLabel =
    activeFilterCount > 0
      ? `${activeFilterCount} active filter${activeFilterCount === 1 ? "" : "s"}`
      : "All demos";
  const normalizedFocusItems = useMemo(
    () => normalizeFocusItems(focusItems, entrySlugSet),
    [entrySlugSet, focusItems],
  );
  const focusedSlugSet = useMemo(
    () => new Set(normalizedFocusItems.map((item) => item.slug)),
    [normalizedFocusItems],
  );
  const focusedEntries = useMemo(() => {
    return normalizedFocusItems
      .map((item) => ({
        item,
        entry: entryBySlug[item.slug],
      }))
      .filter(
        (focusEntry): focusEntry is { item: DashboardFocusItem; entry: DemoEntry } =>
          Boolean(focusEntry.entry),
      );
  }, [entryBySlug, normalizedFocusItems]);
  const followUpQueue = useMemo(() => {
    const nowTime = new Date(nowIso).getTime();
    const queue = entries.reduce<{
      due: FollowUpQueueItem[];
      upcoming: FollowUpQueueItem[];
      followedUp: FollowUpQueueItem[];
      repliedOrStopped: FollowUpQueueItem[];
    }>(
      (groups, entry) => {
        const summary = prospectDraftSummaries[entry.slug];

        if (!summary || summary.source !== "supabase") {
          return groups;
        }

        const status = summary.contactStatus;
        const hasFollowUpHistory = Boolean(summary.followUp1SentAt || summary.followUp2SentAt);
        const item: FollowUpQueueItem = {
          entry,
          summary,
          dueAt: summary.nextFollowUpAt,
          label: relationshipStatusLabel(status),
        };

        if (isStoppedOrReplied(status, summary.replyStatus)) {
          groups.repliedOrStopped.push(item);
          return groups;
        }

        if (summary.outreachSendStatus !== "sent" || !summary.nextFollowUpAt) {
          if (hasFollowUpHistory) {
            groups.followedUp.push(item);
          }

          return groups;
        }

        const nextFollowUpTime = new Date(summary.nextFollowUpAt).getTime();

        if (!Number.isFinite(nextFollowUpTime)) {
          return groups;
        }

        if (nextFollowUpTime <= nowTime) {
          groups.due.push(item);
          return groups;
        }

        groups.upcoming.push(item);
        return groups;
      },
      {
        due: [],
        upcoming: [],
        followedUp: [],
        repliedOrStopped: [],
      },
    );

    return {
      due: queue.due.sort(sortFollowUps),
      upcoming: queue.upcoming.sort(sortFollowUps),
      followedUp: queue.followedUp.sort(sortFollowUps),
      repliedOrStopped: queue.repliedOrStopped.sort(sortFollowUps),
    };
  }, [entries, nowIso, prospectDraftSummaries]);

  function resetFilters() {
    setSearchQuery("");
    setSelectedNiches([]);
    setSelectedCountries([]);
    setSelectedStateRegions([]);
    setSelectedCities([]);
    setSelectedContactFilters([]);
    setSelectedDemoStatuses([]);
  }

  async function saveFocusItemsToSupabase(
    action: "add" | "remove" | "clear" | "replace",
    nextItems: DashboardFocusItem[],
    payload: { slug?: string; items?: DashboardFocusItem[] } = {},
  ) {
    const normalizedItems = normalizeFocusItems(nextItems, entrySlugSet);

    setFocusItems(normalizedItems);
    writeStoredFocusItems(normalizedItems);
    setIsFocusSaving(true);

    try {
      const response = await fetch("/api/dashboard-focus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          ...payload,
        }),
      });

      if (!response.ok) {
        throw new Error("Focus API unavailable");
      }

      const result = (await response.json()) as {
        items?: DashboardFocusItem[];
        source?: "supabase";
      };
      const syncedItems = normalizeFocusItems(result.items ?? normalizedItems, entrySlugSet);

      setFocusItems(syncedItems);
      setFocusPersistenceSource("supabase");
      setFocusPersistenceMessage("Synced with Supabase.");
      writeStoredFocusItems(syncedItems);
    } catch {
      setFocusPersistenceSource("local");
      setFocusPersistenceMessage("Saved locally. Supabase sync will be retried on the next change.");
    } finally {
      setIsFocusSaving(false);
    }
  }

  function addEntryToFocus(entry: DemoEntry) {
    if (focusedSlugSet.has(entry.slug)) {
      return;
    }

    const nextItems = [focusItemForSlug(entry.slug), ...normalizedFocusItems];
    void saveFocusItemsToSupabase("add", nextItems, { slug: entry.slug });
  }

  function removeEntryFromFocus(slug: string) {
    const nextItems = normalizedFocusItems.filter((item) => item.slug !== slug);
    void saveFocusItemsToSupabase("remove", nextItems, { slug });
  }

  function clearFocusList() {
    void saveFocusItemsToSupabase("clear", []);
  }

  function toggleCountryFilter(country: LocationCountryFilterOption) {
    const isSelected = selectedCountries.includes(country.value);
    const stateRegionKeys = country.stateRegions.map((stateRegion) => stateRegion.key);
    const cityKeys = country.stateRegions.flatMap((stateRegion) =>
      stateRegion.cities.map((city) => city.key),
    );

    if (isSelected) {
      setSelectedCountries((current) =>
        current.filter((countryValue) => countryValue !== country.value),
      );
      setSelectedStateRegions((current) =>
        current.filter((stateRegionKey) => !stateRegionKeys.includes(stateRegionKey)),
      );
      setSelectedCities((current) => current.filter((cityKey) => !cityKeys.includes(cityKey)));
      return;
    }

    setSelectedCountries((current) =>
      current.includes(country.value) ? current : [...current, country.value],
    );
  }

  function toggleStateRegionFilter(
    country: LocationCountryFilterOption,
    stateRegion: LocationStateRegionFilterOption,
  ) {
    const isSelected = selectedStateRegions.includes(stateRegion.key);
    const cityKeys = stateRegion.cities.map((city) => city.key);

    if (isSelected) {
      setSelectedStateRegions((current) =>
        current.filter((stateRegionKey) => stateRegionKey !== stateRegion.key),
      );
      setSelectedCities((current) => current.filter((cityKey) => !cityKeys.includes(cityKey)));
      return;
    }

    setSelectedCountries((current) =>
      current.includes(country.value) ? current : [...current, country.value],
    );
    setSelectedStateRegions((current) =>
      current.includes(stateRegion.key) ? current : [...current, stateRegion.key],
    );
  }

  function toggleCityFilter(
    country: LocationCountryFilterOption,
    stateRegion: LocationStateRegionFilterOption,
    city: LocationCityFilterOption,
  ) {
    setSelectedCountries((current) =>
      current.includes(country.value) ? current : [...current, country.value],
    );
    setSelectedStateRegions((current) =>
      current.includes(stateRegion.key) ? current : [...current, stateRegion.key],
    );
    setSelectedCities((current) => toggleSelectedValue(current, city.key));
  }

  async function openDraft(entry: DemoEntry) {
    setDraftEntry(entry);
    setDraft(null);
    setDraftError(null);
    setCopiedLabel(null);
    setApprovalIntent(null);
    setIsApprovalChecked(false);
    setApprovalError(null);
    setManualContactMethod("contact_form");
    setManualContactNote("");
    setRelationshipNote("");
    setManualFollowUpDays(7);
    setIsManualContactChecked(false);
    setManualFollowUpNote("");
    setIsManualFollowUpChecked(false);
    setIsDraftLoading(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${entry.slug}`);

      if (!response.ok) {
        throw new Error("Draft is not available yet.");
      }

      const nextDraft = (await response.json()) as ProspectDraft;
      setDraft(nextDraft);
    } catch (error) {
      setDraftError(error instanceof Error ? error.message : "Draft could not be loaded.");
    } finally {
      setIsDraftLoading(false);
    }
  }

  function closeDraft() {
    setDraftEntry(null);
    setDraft(null);
    setDraftError(null);
    setCopiedLabel(null);
    setApprovalIntent(null);
    setIsApprovalChecked(false);
    setApprovalError(null);
    setIsApprovalSaving(false);
    setManualContactMethod("contact_form");
    setManualContactNote("");
    setRelationshipNote("");
    setManualFollowUpDays(7);
    setIsManualContactChecked(false);
    setManualFollowUpNote("");
    setIsManualFollowUpChecked(false);
    setIsDraftLoading(false);
  }

  function syncDraftSummary(slug: string, nextDraft: ProspectDraft) {
    if (nextDraft.source !== "supabase") {
      return;
    }

    setProspectDraftSummaries((currentSummaries) => ({
      ...currentSummaries,
      [slug]: summaryFromDraft(nextDraft),
    }));
  }

  async function submitApprovalAction(action: "approve_for_send" | "revoke_send_approval") {
    if (!draftEntry) {
      return;
    }

    setApprovalError(null);
    setIsApprovalSaving(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${draftEntry.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; draft?: ProspectDraft }
        | ProspectDraft
        | null;

      if (!response.ok) {
        if (payload && "draft" in payload && payload.draft) {
          setDraft(payload.draft);
        }

        throw new Error(
          payload && "error" in payload && payload.error
            ? payload.error
            : "Approval update failed.",
        );
      }

      setDraft(payload as ProspectDraft);
      syncDraftSummary(draftEntry.slug, payload as ProspectDraft);
      setApprovalIntent(null);
      setIsApprovalChecked(false);
    } catch (error) {
      setApprovalError(error instanceof Error ? error.message : "Approval update failed.");
    } finally {
      setIsApprovalSaving(false);
    }
  }

  async function submitFollowUpApprovalAction(
    action: "approve_follow_up_send" | "revoke_follow_up_send",
  ) {
    if (!draftEntry) {
      return;
    }

    setApprovalError(null);
    setIsApprovalSaving(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${draftEntry.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; draft?: ProspectDraft }
        | ProspectDraft
        | null;

      if (!response.ok) {
        if (payload && "draft" in payload && payload.draft) {
          setDraft(payload.draft);
          syncDraftSummary(draftEntry.slug, payload.draft);
        }

        throw new Error(
          payload && "error" in payload && payload.error
            ? payload.error
            : "Follow-up approval update failed.",
        );
      }

      const nextDraft = payload as ProspectDraft;
      setDraft(nextDraft);
      syncDraftSummary(draftEntry.slug, nextDraft);
      setApprovalIntent(null);
      setIsApprovalChecked(false);
    } catch (error) {
      setApprovalError(
        error instanceof Error ? error.message : "Follow-up approval update failed.",
      );
    } finally {
      setIsApprovalSaving(false);
    }
  }

  async function submitManualContactAction() {
    if (!draftEntry) {
      return;
    }

    setApprovalError(null);
    setIsApprovalSaving(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${draftEntry.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "record_manual_contact",
          method: manualContactMethod,
          note: manualContactNote,
          followUpDays: manualFollowUpDays,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; draft?: ProspectDraft }
        | ProspectDraft
        | null;

      if (!response.ok) {
        if (payload && "draft" in payload && payload.draft) {
          setDraft(payload.draft);
          syncDraftSummary(draftEntry.slug, payload.draft);
        }

        throw new Error(
          payload && "error" in payload && payload.error
            ? payload.error
            : "Manual contact update failed.",
        );
      }

      const nextDraft = payload as ProspectDraft;
      setDraft(nextDraft);
      syncDraftSummary(draftEntry.slug, nextDraft);
      setApprovalIntent(null);
      setIsManualContactChecked(false);
      setManualContactNote("");
    } catch (error) {
      setApprovalError(error instanceof Error ? error.message : "Manual contact update failed.");
    } finally {
      setIsApprovalSaving(false);
    }
  }

  async function submitManualFollowUpAction() {
    if (!draftEntry) {
      return;
    }

    setApprovalError(null);
    setIsApprovalSaving(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${draftEntry.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "record_manual_follow_up",
          note: manualFollowUpNote,
          followUpDays: manualFollowUpDays,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; draft?: ProspectDraft }
        | ProspectDraft
        | null;

      if (!response.ok) {
        if (payload && "draft" in payload && payload.draft) {
          setDraft(payload.draft);
          syncDraftSummary(draftEntry.slug, payload.draft);
        }

        throw new Error(
          payload && "error" in payload && payload.error
            ? payload.error
            : "Manual follow-up update failed.",
        );
      }

      const nextDraft = payload as ProspectDraft;
      setDraft(nextDraft);
      syncDraftSummary(draftEntry.slug, nextDraft);
      setApprovalIntent(null);
      setIsManualFollowUpChecked(false);
      setManualFollowUpNote("");
    } catch (error) {
      setApprovalError(error instanceof Error ? error.message : "Manual follow-up update failed.");
    } finally {
      setIsApprovalSaving(false);
    }
  }

  async function submitRelationshipAction(action: "mark_do_not_contact" | "mark_not_interested") {
    if (!draftEntry) {
      return;
    }

    setApprovalError(null);
    setIsApprovalSaving(true);

    try {
      const response = await fetch(`/api/prospect-drafts/${draftEntry.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          note: relationshipNote,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; draft?: ProspectDraft }
        | ProspectDraft
        | null;

      if (!response.ok) {
        if (payload && "draft" in payload && payload.draft) {
          setDraft(payload.draft);
          syncDraftSummary(draftEntry.slug, payload.draft);
        }

        throw new Error(
          payload && "error" in payload && payload.error
            ? payload.error
            : "Relationship status update failed.",
        );
      }

      const nextDraft = payload as ProspectDraft;
      setDraft(nextDraft);
      syncDraftSummary(draftEntry.slug, nextDraft);
      setApprovalIntent(null);
      setRelationshipNote("");
    } catch (error) {
      setApprovalError(
        error instanceof Error ? error.message : "Relationship status update failed.",
      );
    } finally {
      setIsApprovalSaving(false);
    }
  }

  async function copyText(label: string, value: string | null | undefined) {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    window.setTimeout(() => setCopiedLabel(null), 1500);
  }

  const draftEmailBlock = draft
    ? [
        draft.businessEmail ? `To: ${draft.businessEmail}` : null,
        draft.subject ? `Subject: ${draft.subject}` : null,
        draft.body,
      ]
        .filter(Boolean)
        .join("\n\n")
    : "";
  const followUpEmailBlock = draft
    ? [
        draft.businessEmail ? `To: ${draft.businessEmail}` : null,
        draft.followUpSubject ? `Subject: ${draft.followUpSubject}` : null,
        draft.followUpBody,
      ]
        .filter(Boolean)
        .join("\n\n")
    : "";
  const canApproveForSend =
    draft?.source === "supabase" &&
    draft.approvalBlockers.length === 0 &&
    draft.outreachSendStatus === "ready_for_review" &&
    !lockedOutreachStatuses.has(draft.outreachSendStatus ?? "");
  const canRevokeSendApproval =
    draft?.source === "supabase" && draft.outreachSendStatus === "approved";
  const canRecordManualContact =
    draft?.source === "supabase" &&
    draft.contactStatus === "not_contacted" &&
    draft.outreachSendStatus !== "sent";
  const manualContactUnavailableReason =
    draft?.source !== "supabase"
      ? "Manual contact can only be recorded for Supabase-backed prospects."
      : draft.contactStatus === "contacted" || draft.outreachSendStatus === "sent"
        ? "This prospect is already marked contacted."
        : draft.contactStatus !== "not_contacted"
          ? `Manual contact can only be recorded for not contacted prospects. Current status: ${relationshipStatusLabel(
              draft.contactStatus,
            )}.`
        : undefined;
  const manualFollowUpStep = getManualFollowUpStep(draft);
  const manualFollowUpLabel =
    manualFollowUpStep === "follow_up_2" ? "Follow-up 2" : "Follow-up 1";
  const canRecordManualFollowUp =
    draft?.source === "supabase" &&
    draft.outreachSendStatus === "sent" &&
    draft.contactStatus !== "not_contacted" &&
    Boolean(manualFollowUpStep) &&
    !isStoppedOrReplied(draft.contactStatus, draft.replyStatus);
  const manualFollowUpUnavailableReason =
    draft?.source !== "supabase"
      ? "Follow-ups can only be recorded for Supabase-backed prospects."
      : draft.outreachSendStatus !== "sent"
        ? "Follow-ups can only be recorded after first outreach is marked sent."
        : draft.contactStatus === "not_contacted"
          ? "First outreach must be recorded before a follow-up."
          : isStoppedOrReplied(draft.contactStatus, draft.replyStatus)
            ? "Stopped or replied prospects are not eligible for follow-up."
            : !manualFollowUpStep
              ? "Both supported follow-ups are already recorded."
              : undefined;
  const followUpApprovalStep = draft?.followUpStep ?? manualFollowUpStep;
  const followUpApprovalLabel =
    followUpApprovalStep === "follow_up_2" ? "Follow-up 2" : "Follow-up 1";
  const followUpChannelPolicy = draft?.followUpChannelPolicy;
  const isManualOnlyFollowUp =
    Boolean(followUpChannelPolicy) && !followUpChannelPolicy?.canAutoSendFollowUps;
  const visibleFollowUpApprovalBlockers =
    draft?.followUpApprovalBlockers.filter(
      (blocker) => blocker !== draft.followUpChannelPolicy.approvalBlocker,
    ) ?? [];
  const canApproveFollowUpSend =
    draft?.source === "supabase" &&
    draft.followUpApprovalBlockers.length === 0 &&
    draft.followUpSendStatus === "ready_for_review" &&
    draft.followUpChannelPolicy.canAutoSendFollowUps;
  const canRevokeFollowUpApproval =
    draft?.source === "supabase" && draft.followUpSendStatus === "approved";

  function renderFollowUpGroup(
    title: string,
    items: FollowUpQueueItem[],
    emptyLabel: string,
    options: { actionable?: boolean } = {},
  ) {
    return (
      <article className="follow-up-card">
        <div className="follow-up-card-heading">
          <h3>{title}</h3>
          <span>{items.length}</span>
        </div>
        {items.length > 0 ? (
          <div className="follow-up-card-list">
            {items.slice(0, 5).map((item) => (
              <div className="follow-up-row" key={`${title}-${item.entry.slug}`}>
                <div>
                  <strong>{item.entry.title}</strong>
                  <small>
                    {item.label} - {formatDateTime(item.dueAt)}
                  </small>
                </div>
                <button
                  className={options.actionable ? "button button-primary" : "button button-ghost"}
                  type="button"
                  onClick={() => openDraft(item.entry)}
                >
                  {options.actionable ? "Record" : "Open"}
                </button>
              </div>
            ))}
            {items.length > 5 ? <p>{items.length - 5} more in this group.</p> : null}
          </div>
        ) : (
          <p className="follow-up-empty">{emptyLabel}</p>
        )}
      </article>
    );
  }

  return (
    <main className="preview-dashboard">
      <section className="preview-dashboard-inner">
        <div className="preview-dashboard-heading">
          <p className="eyebrow">local-growth-preview</p>
          <h1>Multi-niche demo hub</h1>
          <p>
            Review prospect demos and recommendation packages across roofing, restaurants, med
            spas, HVAC, plumbing, and future local growth experiments before sharing a direct
            client-facing URL.
          </p>
        </div>

        <section
          id="current-focus"
          className="active-preview"
          aria-labelledby="active-preview-title"
        >
          <div className="focus-list-header">
            <div>
              <p className="eyebrow">Focus list</p>
              <h2 id="active-preview-title">Current focus</h2>
              <p>
                Keep the businesses you are actively working in one shared dashboard list.
              </p>
            </div>
            <div className="focus-list-header-actions">
              <span className={focusPersistenceSource === "supabase" ? "focus-sync-pill" : "focus-sync-pill local"}>
                {focusPersistenceSource === "supabase" ? "Supabase" : "Local"}
              </span>
              {focusedEntries.length > 0 ? (
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={clearFocusList}
                  disabled={isFocusSaving}
                >
                  Clear Focus
                </button>
              ) : null}
            </div>
          </div>

          {focusedEntries.length > 0 ? (
            <div className="focus-list" aria-label="Focused businesses">
              {focusedEntries.map(({ entry, item }) => (
                <article className="focus-list-item" key={entry.slug}>
                  <div className={`preview-logo-slot logo-slot-${entry.slug}`}>
                    {entry.logoUrl ? (
                      <img src={entry.logoUrl} alt={`${entry.title} logo`} />
                    ) : (
                      <span>{entry.shortName}</span>
                    )}
                  </div>
                  <div className="focus-list-item-body">
                    <div className="preview-title-row">
                      <h3>{entry.title}</h3>
                      <span className="active-pill">Focused</span>
                      <span className="niche-pill">{nicheLabelByValue[entry.niche]}</span>
                      <span className="status-pill">{statusLabels[entry.status]}</span>
                    </div>
                    <p>{entry.observedIssue}</p>
                    <div className="preview-meta-row">
                      <span>{entry.city}</span>
                      <span>Added {formatDate(item.addedAt.slice(0, 10))}</span>
                      <span>{entry.primaryService}</span>
                    </div>
                  </div>
                  <div className="preview-actions focus-list-item-actions">
                    <a
                      className="button button-primary"
                      href={entry.href}
                      target={entry.isExternalHref ? "_blank" : undefined}
                      rel={entry.isExternalHref ? "noreferrer" : undefined}
                    >
                      {entry.previewLabel === "Website" ? "Open Website" : "Open preview"}
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                    {entry.sourceUrl ? (
                      <a
                        className="button button-ghost"
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                        <LinkIcon size={16} aria-hidden="true" />
                      </a>
                    ) : null}
                    <button
                      className="button button-ghost"
                      type="button"
                      onClick={() => openDraft(entry)}
                    >
                      Email Draft
                      <Mail size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="button button-ghost"
                      type="button"
                      onClick={() => removeEntryFromFocus(entry.slug)}
                      disabled={isFocusSaving}
                    >
                      Remove
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="focus-empty">
              <h3>No businesses are focused.</h3>
              <p>Add businesses from the prospect list when they become active work.</p>
            </div>
          )}

          <p className="focus-status-note">
            {isFocusSaving ? "Saving focus list..." : focusPersistenceMessage}
          </p>
        </section>

        <section className="follow-up-queue" aria-labelledby="follow-up-queue-title">
          <div className="follow-up-queue-heading">
            <div>
              <p className="eyebrow">Manual follow-up queue</p>
              <h2 id="follow-up-queue-title">Contacted prospects</h2>
            </div>
            <span>{followUpQueue.due.length} due now</span>
          </div>
          <div className="follow-up-grid">
            {renderFollowUpGroup("Due now", followUpQueue.due, "No follow-ups are due.", {
              actionable: true,
            })}
            {renderFollowUpGroup("Upcoming", followUpQueue.upcoming, "No upcoming follow-ups.")}
            {renderFollowUpGroup(
              "Already followed up",
              followUpQueue.followedUp,
              "No completed follow-ups yet.",
            )}
            {renderFollowUpGroup(
              "Replied or stopped",
              followUpQueue.repliedOrStopped,
              "No replied or stopped prospects.",
            )}
          </div>
        </section>

        <section
          id="available-prospect-previews"
          className="preview-list-section"
          aria-labelledby="preview-list-title"
        >
          <div className="preview-list-toolbar">
            <div>
              <p className="eyebrow">{activeFilterLabel}</p>
              <h2 id="preview-list-title">Available prospects</h2>
            </div>
            <div className="toolbar-controls">
              {activeFilterCount > 0 ? (
                <button className="filter-reset-button" type="button" onClick={resetFilters}>
                  Reset
                </button>
              ) : null}
              <div className="prospect-search">
                <label className="sr-only" htmlFor="prospect-search-input">
                  Search businesses
                </label>
                <Search size={16} aria-hidden="true" />
                <input
                  id="prospect-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search businesses"
                  autoComplete="off"
                />
                {trimmedSearchQuery ? (
                  <button
                    className="search-clear-button"
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear business search"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              <div className="sort-controls" aria-label="Sort prospect previews">
                <button
                  className={sortMode === "date" ? "sort-button active" : "sort-button"}
                  type="button"
                  onClick={() => updateSort("date")}
                  aria-pressed={sortMode === "date"}
                >
                  <CalendarDays size={16} aria-hidden="true" />
                  {dateSortLabel}
                </button>
                <button
                  className={sortMode === "name" ? "sort-button active" : "sort-button"}
                  type="button"
                  onClick={() => updateSort("name")}
                  aria-pressed={sortMode === "name"}
                >
                  <ArrowUpDown size={16} aria-hidden="true" />
                  {nameSortLabel}
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              isFilterRailOpen ? "prospect-browser" : "prospect-browser filters-collapsed"
            }
          >
            <aside
              className={isFilterRailOpen ? "filter-rail" : "filter-rail collapsed"}
              id="prospect-filter-rail"
              aria-label="Prospect filters"
            >
              <div className="filter-rail-header">
                <button
                  className="filter-rail-toggle"
                  type="button"
                  onClick={() => setIsFilterRailOpen((isOpen) => !isOpen)}
                  aria-expanded={isFilterRailOpen}
                  aria-controls="prospect-filter-panel"
                  title={isFilterRailOpen ? "Collapse filters" : "Open filters"}
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  {isFilterRailOpen ? <span>Filters</span> : null}
                  {activeFilterCount > 0 ? <strong>{activeFilterCount}</strong> : null}
                </button>
                {isFilterRailOpen ? (
                  <div>
                    <strong>{visibleEntries.length} shown</strong>
                  </div>
                ) : null}
                {isFilterRailOpen && activeFilterCount > 0 ? (
                  <button className="filter-reset-button" type="button" onClick={resetFilters}>
                    Reset
                  </button>
                ) : null}
              </div>

              {isFilterRailOpen ? (
                <div className="filter-rail-panel" id="prospect-filter-panel">
                  {activeFilterCount > 0 ? (
                    <div className="active-filter-count">{activeFilterCount} active</div>
                  ) : null}

                  <details className="filter-rail-group">
                    <summary>Niche</summary>
                    <div className="filter-rail-options">
                      {nicheFilterOptions.map((filter) => {
                        const isSelected = selectedNiches.includes(filter.value);

                        return (
                          <button
                            className={isSelected ? "rail-filter-option active" : "rail-filter-option"}
                            key={filter.value}
                            type="button"
                            onClick={() =>
                              setSelectedNiches((current) =>
                                toggleSelectedValue(current, filter.value),
                              )
                            }
                            aria-pressed={isSelected}
                          >
                            <span>
                              {isSelected ? (
                                <Check size={14} aria-hidden="true" />
                              ) : (
                                <Layers3 size={14} aria-hidden="true" />
                              )}
                              {filter.label}
                            </span>
                            <strong>{nicheCounts[filter.value]}</strong>
                          </button>
                        );
                      })}
                    </div>
                  </details>

                  <details className="filter-rail-group">
                    <summary>Location</summary>
                    <div className="location-filter-tree">
                      {locationFilterTree.map((country) => {
                        const isCountrySelected = selectedCountries.includes(country.value);

                        return (
                          <div className="location-filter-branch" key={country.value}>
                            <button
                              className={
                                isCountrySelected ? "rail-filter-option active" : "rail-filter-option"
                              }
                              type="button"
                              onClick={() => toggleCountryFilter(country)}
                              aria-pressed={isCountrySelected}
                              aria-expanded={isCountrySelected}
                            >
                              <span>
                                {isCountrySelected ? (
                                  <Check size={14} aria-hidden="true" />
                                ) : (
                                  <Globe2 size={14} aria-hidden="true" />
                                )}
                                {country.label}
                              </span>
                              <strong>{country.count}</strong>
                            </button>

                            {isCountrySelected ? (
                              <div className="location-filter-children">
                                {country.stateRegions.map((stateRegion) => {
                                  const isStateRegionSelected = selectedStateRegions.includes(
                                    stateRegion.key,
                                  );

                                  return (
                                    <div className="location-filter-branch" key={stateRegion.key}>
                                      <button
                                        className={
                                          isStateRegionSelected
                                            ? "rail-filter-option location-filter-child-option active"
                                            : "rail-filter-option location-filter-child-option"
                                        }
                                        type="button"
                                        onClick={() =>
                                          toggleStateRegionFilter(country, stateRegion)
                                        }
                                        aria-pressed={isStateRegionSelected}
                                        aria-expanded={isStateRegionSelected}
                                      >
                                        <span>
                                          {isStateRegionSelected ? (
                                            <Check size={14} aria-hidden="true" />
                                          ) : (
                                            <MapIcon size={14} aria-hidden="true" />
                                          )}
                                          {stateRegion.label}
                                        </span>
                                        <strong>{stateRegion.count}</strong>
                                      </button>

                                      {isStateRegionSelected ? (
                                        <div className="location-filter-children">
                                          {stateRegion.cities.map((city) => {
                                            const isCitySelected = selectedCities.includes(
                                              city.key,
                                            );

                                            return (
                                              <button
                                                className={
                                                  isCitySelected
                                                    ? "rail-filter-option location-filter-child-option active"
                                                    : "rail-filter-option location-filter-child-option"
                                                }
                                                key={city.key}
                                                type="button"
                                                onClick={() =>
                                                  toggleCityFilter(country, stateRegion, city)
                                                }
                                                aria-pressed={isCitySelected}
                                              >
                                                <span>
                                                  {isCitySelected ? (
                                                    <Check size={14} aria-hidden="true" />
                                                  ) : (
                                                    <MapPin size={14} aria-hidden="true" />
                                                  )}
                                                  {city.label}
                                                </span>
                                                <strong>{city.count}</strong>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </details>

                  <details className="filter-rail-group">
                    <summary>Contact status</summary>
                    <div className="filter-rail-options">
                      {contactFilterOptions.map((filter) => {
                        const isSelected = selectedContactFilters.includes(filter.value);
                        const count = entries.filter((entry) =>
                          entryMatchesContactFilter(entry, filter.value, prospectDraftSummaries),
                        ).length;

                        return (
                          <button
                            className={isSelected ? "rail-filter-option active" : "rail-filter-option"}
                            key={filter.value}
                            type="button"
                            onClick={() =>
                              setSelectedContactFilters((current) =>
                                toggleSelectedValue(current, filter.value),
                              )
                            }
                            aria-pressed={isSelected}
                          >
                            <span>
                              {isSelected ? (
                                <Check size={14} aria-hidden="true" />
                              ) : (
                                <Mail size={14} aria-hidden="true" />
                              )}
                              {filter.label}
                            </span>
                            <strong>{count}</strong>
                          </button>
                        );
                      })}
                    </div>
                  </details>

                  <details className="filter-rail-group">
                    <summary>Demo status</summary>
                    <div className="filter-rail-options">
                      {demoStatusFilterOptions.map((filter) => {
                        const isSelected = selectedDemoStatuses.includes(filter.value);
                        const count = entries.filter((entry) => entry.status === filter.value).length;

                        return (
                          <button
                            className={isSelected ? "rail-filter-option active" : "rail-filter-option"}
                            key={filter.value}
                            type="button"
                            onClick={() =>
                              setSelectedDemoStatuses((current) =>
                                toggleSelectedValue(current, filter.value),
                              )
                            }
                            aria-pressed={isSelected}
                          >
                            <span>
                              {isSelected ? (
                                <Check size={14} aria-hidden="true" />
                              ) : (
                                <FileText size={14} aria-hidden="true" />
                              )}
                              {filter.label}
                            </span>
                            <strong>{count}</strong>
                          </button>
                        );
                      })}
                    </div>
                  </details>
                </div>
              ) : null}
            </aside>

            <div className="prospect-results">
              <div className="preview-list">
                {visibleEntries.map((entry) => {
                  const isFocused = focusedSlugSet.has(entry.slug);
                  const contactStatus = getEntryContactStatus(entry, prospectDraftSummaries);

                  return (
                    <article className="preview-row" key={`${entry.niche}-${entry.slug}`}>
                      <div className={`preview-logo-slot logo-slot-${entry.slug}`}>
                        {entry.logoUrl ? (
                          <img src={entry.logoUrl} alt={`${entry.title} logo`} />
                        ) : (
                          <span>{entry.shortName}</span>
                        )}
                      </div>
                      <div>
                        <div className="preview-title-row">
                          <h3>{entry.title}</h3>
                          {isFocused ? <span className="active-pill">Focused</span> : null}
                          <span className="niche-pill">{nicheLabelByValue[entry.niche]}</span>
                          <span className="status-pill">{statusLabels[entry.status]}</span>
                          <span className={relationshipPillClass(contactStatus)}>
                            {relationshipStatusLabel(contactStatus)}
                          </span>
                        </div>
                        <p>{entry.city}</p>
                        <small>
                          {entry.stageLabel} - Created {formatDate(entry.createdAt)}
                        </small>
                      </div>
                      <div className="preview-row-actions">
                        <button
                          className={
                            isFocused
                              ? "button button-ghost active-focus-button"
                              : "button button-ghost"
                          }
                          type="button"
                          onClick={() =>
                            isFocused
                              ? removeEntryFromFocus(entry.slug)
                              : addEntryToFocus(entry)
                          }
                          disabled={isFocusSaving}
                          aria-pressed={isFocused}
                        >
                          <Star size={15} aria-hidden="true" />
                          {isFocused ? "Remove Focus" : "Add to Focus"}
                        </button>
                        <a
                          className="button button-primary"
                          href={entry.href}
                          target={entry.isExternalHref ? "_blank" : undefined}
                          rel={entry.isExternalHref ? "noreferrer" : undefined}
                        >
                          {entry.previewLabel ?? "Preview"}
                        </a>
                        {entry.sourceUrl ? (
                          <a
                            className="button button-ghost"
                            href={entry.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Source
                            <LinkIcon size={15} aria-hidden="true" />
                          </a>
                        ) : null}
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => openDraft(entry)}
                        >
                          Email Draft
                          <Mail size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  );
                })}
                {visibleEntries.length === 0 ? (
                  <div className="empty-filter-state">
                    <h3>No demos match this view.</h3>
                    <p>
                      Adjust the search, niche, location, contact status, or demo status filter to
                      show more demos.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </section>
      {draftEntry ? (
        <div className="draft-drawer-backdrop" role="presentation" onClick={closeDraft}>
          <aside
            className="draft-drawer"
            aria-label={`${draftEntry.title} email draft`}
            aria-modal="true"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="draft-drawer-header">
              <div>
                <p className="eyebrow">Email Draft</p>
                <h2>{draftEntry.title}</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={closeDraft}
                aria-label="Close email draft"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {isDraftLoading ? (
              <div className="draft-loading">Loading draft...</div>
            ) : draftError ? (
              <div className="draft-empty">
                <h3>Draft unavailable</h3>
                <p>{draftError}</p>
              </div>
            ) : draft ? (
              <>
                <div className="draft-status-row">
                  <span>{draft.source === "supabase" ? "Supabase" : "Local fallback"}</span>
                  <span className={relationshipPillClass(draft.contactStatus)}>
                    {relationshipStatusLabel(draft.contactStatus)}
                  </span>
                  <span>{draftStatusLabel(draft.outreachSendStatus)}</span>
                  <span>{draft.followUpChannelPolicy.label}</span>
                  <span>{followUpStatusLabel(draft.followUpSendStatus)}</span>
                  {draft.outreachApproved ? (
                    <span>Approved by {draft.outreachApprovedBy ?? "dashboard user"}</span>
                  ) : null}
                  {draft.followUpApproved ? (
                    <span>Follow-up approved by {draft.followUpApprovedBy ?? "dashboard user"}</span>
                  ) : null}
                </div>

                <div className="draft-link-row">
                  {draft.website ? (
                    <a href={draft.website} target="_blank" rel="noreferrer">
                      Source
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                  {draft.demoUrl ? (
                    <a href={draft.demoUrl} target="_blank" rel="noreferrer">
                      Preview
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>

                <section className="draft-field">
                  <div>
                    <label>Follow-up state</label>
                  </div>
                  <p>
                    Last contacted: {formatDateTime(draft.lastContactedAt)}. Next follow-up:{" "}
                    {formatDateTime(draft.nextFollowUpAt)}.
                  </p>
                  <p>
                    Follow-up 1 sent: {formatDateTime(draft.followUp1SentAt)}. Follow-up 2 sent:{" "}
                    {formatDateTime(draft.followUp2SentAt)}.
                  </p>
                </section>

                <section className="draft-field">
                  <div>
                    <label>To</label>
                    <button
                      className="copy-button"
                      type="button"
                      onClick={() => copyText("email", draft.businessEmail)}
                      disabled={!draft.businessEmail}
                    >
                      <Copy size={14} aria-hidden="true" />
                      Copy
                    </button>
                  </div>
                  <p>{draft.businessEmail ?? "No verified email stored yet."}</p>
                </section>

                <section className="draft-field">
                  <div>
                    <label>Subject</label>
                    <button
                      className="copy-button"
                      type="button"
                      onClick={() => copyText("subject", draft.subject)}
                      disabled={!draft.subject}
                    >
                      <Copy size={14} aria-hidden="true" />
                      Copy
                    </button>
                  </div>
                  <p>{draft.subject ?? "No subject draft stored yet."}</p>
                </section>

                <section className="draft-field draft-body-field">
                  <div>
                    <label>Body</label>
                    <button
                      className="copy-button"
                      type="button"
                      onClick={() => copyText("body", draft.body)}
                      disabled={!draft.body}
                    >
                      <Copy size={14} aria-hidden="true" />
                      Copy
                    </button>
                  </div>
                  <pre>{draft.body ?? "No body draft stored yet."}</pre>
                </section>

                <section className="draft-approval-panel" aria-label="n8n send approval">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">n8n Send Approval</p>
                      <h3>{draftStatusLabel(draft.outreachSendStatus)}</h3>
                    </div>
                    {canRevokeSendApproval ? (
                      <CheckCircle2 size={22} aria-hidden="true" />
                    ) : (
                      <AlertTriangle size={22} aria-hidden="true" />
                    )}
                  </div>

                  {draft.approvalBlockers.length > 0 ? (
                    <div className="draft-approval-checks">
                      <strong>Approval checks</strong>
                      <ul>
                        {draft.approvalBlockers.map((blocker) => (
                          <li key={blocker}>{blocker}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="approval-ready-copy">
                      Recipient, subject, body, and stable demo URL are ready for n8n sending.
                    </p>
                  )}

                  {approvalError &&
                  (approvalIntent === "approve" || approvalIntent === "revoke") ? (
                    <p className="approval-error">{approvalError}</p>
                  ) : null}

                  {approvalIntent === "approve" ? (
                    <div className="draft-confirmation-panel">
                      <dl>
                        <div>
                          <dt>To</dt>
                          <dd>{draft.businessEmail}</dd>
                        </div>
                        <div>
                          <dt>Subject</dt>
                          <dd>{draft.subject}</dd>
                        </div>
                        <div>
                          <dt>Demo</dt>
                          <dd>{draft.demoUrl}</dd>
                        </div>
                      </dl>
                      <label className="approval-check-label">
                        <input
                          type="checkbox"
                          checked={isApprovalChecked}
                          onChange={(event) => setIsApprovalChecked(event.target.checked)}
                        />
                        I reviewed the exact recipient, subject, body, and stable demo link, and
                        approve n8n to send this email.
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={() => submitApprovalAction("approve_for_send")}
                          disabled={!isApprovalChecked || isApprovalSaving}
                        >
                          Approve for n8n Send
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setApprovalIntent(null);
                            setIsApprovalChecked(false);
                          }}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {approvalIntent === "revoke" ? (
                    <div className="draft-confirmation-panel">
                      <p>
                        This removes n8n send approval and returns the row to ready for review.
                      </p>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-danger"
                          type="button"
                          onClick={() => submitApprovalAction("revoke_send_approval")}
                          disabled={isApprovalSaving}
                        >
                          Revoke Approval
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => setApprovalIntent(null)}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!approvalIntent ? (
                    <div className="draft-approval-actions">
                      <button
                        className="button button-primary"
                        type="button"
                        onClick={() => {
                          setApprovalIntent("approve");
                          setIsManualContactChecked(false);
                        }}
                        disabled={!canApproveForSend || isApprovalSaving}
                        title={
                          canApproveForSend
                            ? undefined
                            : "Approval is unavailable until this is a complete Supabase email row marked ready for review."
                        }
                      >
                        Approve for n8n Send
                      </button>
                      {canRevokeSendApproval ? (
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => setApprovalIntent("revoke")}
                          disabled={isApprovalSaving}
                        >
                          Revoke
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </section>

                <section className="draft-approval-panel" aria-label="Manual outreach tracking">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">Manual Outreach</p>
                      <h3>{relationshipStatusLabel(draft.contactStatus)}</h3>
                    </div>
                    {draft.contactStatus === "contacted" || draft.outreachSendStatus === "sent" ? (
                      <CheckCircle2 size={22} aria-hidden="true" />
                    ) : (
                      <Mail size={22} aria-hidden="true" />
                    )}
                  </div>

                  <p className="approval-ready-copy">
                    Use this after you contact the business outside the email automation.
                  </p>

                  {manualContactUnavailableReason ? (
                    <div className="draft-approval-checks">
                      <strong>Manual contact checks</strong>
                      <p>{manualContactUnavailableReason}</p>
                    </div>
                  ) : null}

                  {approvalIntent === "manual_contact" ? (
                    <div className="draft-confirmation-panel">
                      <div className="manual-contact-grid">
                        <label>
                          Method
                          <select
                            value={manualContactMethod}
                            onChange={(event) =>
                              setManualContactMethod(event.target.value as ManualContactMethod)
                            }
                          >
                            {manualContactMethodOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Follow-up days
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={manualFollowUpDays}
                            onChange={(event) =>
                              setManualFollowUpDays(Number(event.target.value) || 7)
                            }
                          />
                        </label>
                      </div>
                      <label className="manual-contact-note-label">
                        Note
                        <textarea
                          rows={3}
                          value={manualContactNote}
                          onChange={(event) => setManualContactNote(event.target.value)}
                          placeholder="Optional context, such as form page used or contact name."
                        />
                      </label>
                      <label className="approval-check-label">
                        <input
                          type="checkbox"
                          checked={isManualContactChecked}
                          onChange={(event) => setIsManualContactChecked(event.target.checked)}
                        />
                        I already contacted this business manually.
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={submitManualContactAction}
                          disabled={!isManualContactChecked || isApprovalSaving}
                        >
                          Save Manual Contact
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setApprovalIntent(null);
                            setIsManualContactChecked(false);
                          }}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!approvalIntent ? (
                    <div className="draft-approval-actions">
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() => {
                          setApprovalIntent("manual_contact");
                          setIsApprovalChecked(false);
                        }}
                        disabled={!canRecordManualContact || isApprovalSaving}
                        title={manualContactUnavailableReason}
                      >
                        Contacted Manually
                      </button>
                    </div>
                  ) : null}
                </section>

                <section className="draft-approval-panel" aria-label="Follow-up send approval">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">Follow-up Send Approval</p>
                      <h3>{followUpStatusLabel(draft.followUpSendStatus)}</h3>
                    </div>
                    {canRevokeFollowUpApproval ? (
                      <CheckCircle2 size={22} aria-hidden="true" />
                    ) : (
                      <CalendarDays size={22} aria-hidden="true" />
                    )}
                  </div>

                  <div className="follow-up-draft-preview">
                    <div>
                      <span>{followUpApprovalLabel}</span>
                      {draft.followUpApproved ? (
                        <small>
                          Approved by {draft.followUpApprovedBy ?? "dashboard user"}{" "}
                          {formatDateTime(draft.followUpApprovedAt)}
                        </small>
                      ) : null}
                    </div>
                    <section className="draft-field">
                      <div>
                        <label>Follow-up subject</label>
                        <button
                          className="copy-button"
                          type="button"
                          onClick={() => copyText("follow-up subject", draft.followUpSubject)}
                          disabled={!draft.followUpSubject}
                        >
                          <Copy size={14} aria-hidden="true" />
                          Copy
                        </button>
                      </div>
                      <p>{draft.followUpSubject ?? "No follow-up subject stored yet."}</p>
                    </section>
                    <section className="draft-field draft-body-field">
                      <div>
                        <label>Follow-up body</label>
                        <button
                          className="copy-button"
                          type="button"
                          onClick={() => copyText("follow-up body", draft.followUpBody)}
                          disabled={!draft.followUpBody}
                        >
                          <Copy size={14} aria-hidden="true" />
                          Copy
                        </button>
                      </div>
                      <pre>{draft.followUpBody ?? "No follow-up body stored yet."}</pre>
                    </section>
                  </div>

                  {isManualOnlyFollowUp ? (
                    <div className="draft-approval-checks">
                      <strong>Manual follow-up required</strong>
                      <p>
                        {draft.followUpChannelPolicy.label} follow-ups are reminder-only. Send this
                        follow-up manually, then use Record Follow-up to update the sequence.
                      </p>
                    </div>
                  ) : null}

                  {visibleFollowUpApprovalBlockers.length > 0 ? (
                    <div className="draft-approval-checks">
                      <strong>Follow-up approval checks</strong>
                      <ul>
                        {visibleFollowUpApprovalBlockers.map((blocker) => (
                          <li key={blocker}>{blocker}</li>
                        ))}
                      </ul>
                    </div>
                  ) : !isManualOnlyFollowUp ? (
                    <p className="approval-ready-copy">
                      Stored follow-up copy, recipient, step, and stable demo URL are ready for
                      n8n sending.
                    </p>
                  ) : null}

                  {approvalError &&
                  (approvalIntent === "approve_follow_up" ||
                    approvalIntent === "revoke_follow_up") ? (
                    <p className="approval-error">{approvalError}</p>
                  ) : null}

                  {approvalIntent === "approve_follow_up" ? (
                    <div className="draft-confirmation-panel">
                      <dl>
                        <div>
                          <dt>To</dt>
                          <dd>{draft.businessEmail}</dd>
                        </div>
                        <div>
                          <dt>Step</dt>
                          <dd>{followUpApprovalLabel}</dd>
                        </div>
                        <div>
                          <dt>Subject</dt>
                          <dd>{draft.followUpSubject}</dd>
                        </div>
                        <div>
                          <dt>Demo</dt>
                          <dd>{draft.demoUrl}</dd>
                        </div>
                      </dl>
                      <label className="approval-check-label">
                        <input
                          type="checkbox"
                          checked={isApprovalChecked}
                          onChange={(event) => setIsApprovalChecked(event.target.checked)}
                        />
                        I reviewed the exact recipient, subject, body, demo link, follow-up step,
                        and current manual reply state.
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={() => submitFollowUpApprovalAction("approve_follow_up_send")}
                          disabled={!isApprovalChecked || isApprovalSaving}
                        >
                          Approve Follow-up Send
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setApprovalIntent(null);
                            setIsApprovalChecked(false);
                          }}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {approvalIntent === "revoke_follow_up" ? (
                    <div className="draft-confirmation-panel">
                      <p>
                        This removes follow-up send approval and returns the follow-up row to ready
                        for review.
                      </p>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-danger"
                          type="button"
                          onClick={() => submitFollowUpApprovalAction("revoke_follow_up_send")}
                          disabled={isApprovalSaving}
                        >
                          Revoke Follow-up Approval
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => setApprovalIntent(null)}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!approvalIntent ? (
                    <div className="draft-approval-actions">
                      <button
                        className="button button-primary"
                        type="button"
                        onClick={() => {
                          setApprovalIntent("approve_follow_up");
                          setIsApprovalChecked(false);
                          setIsManualContactChecked(false);
                          setIsManualFollowUpChecked(false);
                        }}
                        disabled={!canApproveFollowUpSend || isApprovalSaving}
                        title={
                          canApproveFollowUpSend
                            ? undefined
                            : isManualOnlyFollowUp
                              ? "Automated follow-up send approval is only available for email-channel prospects."
                              : "Follow-up approval is unavailable until stored copy and readiness checks pass."
                        }
                      >
                        Approve Follow-up Send
                      </button>
                      {canRevokeFollowUpApproval ? (
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => setApprovalIntent("revoke_follow_up")}
                          disabled={isApprovalSaving}
                        >
                          Revoke Follow-up
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </section>

                <section className="draft-approval-panel" aria-label="Manual follow-up tracking">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">Manual Follow-up</p>
                      <h3>{manualFollowUpStep ? manualFollowUpLabel : "Sequence complete"}</h3>
                    </div>
                    {manualFollowUpStep ? (
                      <CalendarDays size={22} aria-hidden="true" />
                    ) : (
                      <CheckCircle2 size={22} aria-hidden="true" />
                    )}
                  </div>

                  <p className="approval-ready-copy">
                    Record this only after the follow-up was sent outside n8n.
                  </p>

                  {manualFollowUpUnavailableReason ? (
                    <div className="draft-approval-checks">
                      <strong>Follow-up checks</strong>
                      <p>{manualFollowUpUnavailableReason}</p>
                    </div>
                  ) : null}

                  {approvalIntent === "manual_follow_up" ? (
                    <div className="draft-confirmation-panel">
                      {manualFollowUpStep === "follow_up_1" ? (
                        <div className="manual-contact-grid">
                          <label>
                            Follow-up 2 days
                            <input
                              type="number"
                              min="1"
                              max="30"
                              value={manualFollowUpDays}
                              onChange={(event) =>
                                setManualFollowUpDays(Number(event.target.value) || 7)
                              }
                            />
                          </label>
                        </div>
                      ) : null}
                      <label className="manual-contact-note-label">
                        Note
                        <textarea
                          rows={3}
                          value={manualFollowUpNote}
                          onChange={(event) => setManualFollowUpNote(event.target.value)}
                          placeholder="Optional context from the follow-up send."
                        />
                      </label>
                      <label className="approval-check-label">
                        <input
                          type="checkbox"
                          checked={isManualFollowUpChecked}
                          onChange={(event) => setIsManualFollowUpChecked(event.target.checked)}
                        />
                        I already sent {manualFollowUpLabel.toLowerCase()} manually and want to
                        update Supabase.
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={submitManualFollowUpAction}
                          disabled={!isManualFollowUpChecked || isApprovalSaving}
                        >
                          Save {manualFollowUpLabel}
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setApprovalIntent(null);
                            setIsManualFollowUpChecked(false);
                          }}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!approvalIntent ? (
                    <div className="draft-approval-actions">
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() => {
                          setApprovalIntent("manual_follow_up");
                          setIsApprovalChecked(false);
                          setIsManualContactChecked(false);
                        }}
                        disabled={!canRecordManualFollowUp || isApprovalSaving}
                        title={manualFollowUpUnavailableReason}
                      >
                        Record {manualFollowUpLabel}
                      </button>
                    </div>
                  ) : null}
                </section>

                <section className="draft-approval-panel" aria-label="Prospect outcome tracking">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">Prospect Outcome</p>
                      <h3>{relationshipStatusLabel(draft.contactStatus)}</h3>
                    </div>
                    <AlertTriangle size={22} aria-hidden="true" />
                  </div>

                  <p className="approval-ready-copy">
                    Use these when this prospect should leave the active outreach queue.
                  </p>

                  {approvalIntent === "do_not_contact" || approvalIntent === "not_interested" ? (
                    <div className="draft-confirmation-panel">
                      <p>
                        {approvalIntent === "do_not_contact"
                          ? "Mark this as an internal decision not to contact the business."
                          : "Mark this when the prospect has indicated they are not interested."}
                      </p>
                      <label className="manual-contact-note-label">
                        Note
                        <textarea
                          rows={3}
                          value={relationshipNote}
                          onChange={(event) => setRelationshipNote(event.target.value)}
                          placeholder="Optional reason or context for this status."
                        />
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-danger"
                          type="button"
                          onClick={() =>
                            submitRelationshipAction(
                              approvalIntent === "do_not_contact"
                                ? "mark_do_not_contact"
                                : "mark_not_interested",
                            )
                          }
                          disabled={isApprovalSaving}
                        >
                          {approvalIntent === "do_not_contact"
                            ? "Save Do Not Contact"
                            : "Save Not Interested"}
                        </button>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setApprovalIntent(null);
                            setRelationshipNote("");
                          }}
                          disabled={isApprovalSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!approvalIntent ? (
                    <div className="draft-approval-actions">
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() => setApprovalIntent("do_not_contact")}
                        disabled={
                          draft.source !== "supabase" ||
                          draft.contactStatus === "do_not_contact" ||
                          isApprovalSaving
                        }
                      >
                        Do Not Contact
                      </button>
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() => setApprovalIntent("not_interested")}
                        disabled={
                          draft.source !== "supabase" ||
                          draft.contactStatus === "not_interested" ||
                          isApprovalSaving
                        }
                      >
                        Not Interested
                      </button>
                    </div>
                  ) : null}
                </section>

                <div className="draft-drawer-actions">
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => copyText("full email", draftEmailBlock)}
                    disabled={!draftEmailBlock}
                  >
                    <FileText size={16} aria-hidden="true" />
                    Copy Email
                  </button>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => copyText("follow-up email", followUpEmailBlock)}
                    disabled={!followUpEmailBlock}
                  >
                    <FileText size={16} aria-hidden="true" />
                    Copy Follow-up
                  </button>
                  {copiedLabel ? <span>Copied {copiedLabel}</span> : null}
                </div>
              </>
            ) : null}
          </aside>
        </div>
      ) : null}
    </main>
  );
}
