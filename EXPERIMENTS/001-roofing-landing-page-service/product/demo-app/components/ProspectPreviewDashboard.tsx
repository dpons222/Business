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
  SlidersHorizontal,
  Layers3,
  Link as LinkIcon,
  Mail,
  Star,
  X,
} from "lucide-react";
import type { DemoEntry, DemoNiche, DemoStatus } from "../lib/demoRegistry";
import { nicheFilters, statusLabels } from "../lib/demoRegistry";
import type { ProspectDraftSummary } from "../lib/prospectDrafts";

type SortMode = "name" | "date";
type SortDirection = "asc" | "desc";
type ContactFilter = "contacted" | "not_contacted" | "has_email" | "has_email_draft";
type ManualContactMethod =
  | "contact_form"
  | "phone"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "other";
type DemoStatusFilter = Extract<
  DemoStatus,
  "ready_for_review" | "outreach_ready" | "follow_up" | "building_demo"
>;

const CURRENT_FOCUS_STORAGE_KEY = "local-growth-preview-current-focus";

const nicheFilterOptions = nicheFilters.filter(
  (filter): filter is { value: DemoNiche; label: string } => filter.value !== "all",
);

const contactFilterOptions: Array<{ value: ContactFilter; label: string }> = [
  { value: "contacted", label: "Contacted" },
  { value: "not_contacted", label: "Not contacted" },
  { value: "has_email", label: "Has email" },
  { value: "has_email_draft", label: "Has email draft" },
];

const demoStatusFilterOptions: Array<{ value: DemoStatusFilter; label: string }> = [
  { value: "ready_for_review", label: "Ready for review" },
  { value: "outreach_ready", label: "Outreach ready" },
  { value: "follow_up", label: "Follow-up" },
  { value: "building_demo", label: "Building demo" },
];

const manualContactMethodOptions: Array<{ value: ManualContactMethod; label: string }> = [
  { value: "contact_form", label: "Contact form" },
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
  notes: string | null;
  approvalBlockers: string[];
  source: "supabase" | "local";
};

type ProspectPreviewDashboardProps = {
  currentFocus: DemoEntry;
  entries: DemoEntry[];
  prospectDraftSummaries: Record<string, ProspectDraftSummary>;
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

function getEntryContactStatus(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return summaries[entry.slug]?.contactStatus ?? entry.status;
}

function entryHasEmail(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return Boolean(summaries[entry.slug]?.businessEmail ?? entry.contactEmail);
}

function entryHasEmailDraft(entry: DemoEntry, summaries: Record<string, ProspectDraftSummary>) {
  return summaries[entry.slug]?.hasEmailDraft ?? Boolean(entry.hasEmailDraft);
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
    return getEntryContactStatus(entry, summaries) !== "contacted";
  }

  if (filter === "has_email") {
    return entryHasEmail(entry, summaries);
  }

  return entryHasEmailDraft(entry, summaries);
}

const lockedOutreachStatuses = new Set(["approved_for_draft", "draft_created", "approved", "queued", "sent"]);

const outreachStatusLabels: Record<string, string> = {
  not_ready: "Not ready",
  ready_for_review: "Ready for review",
  approved_for_draft: "Approved for Gmail draft",
  draft_created: "Gmail draft created",
  approved: "Approved for send",
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

function summaryFromDraft(draft: ProspectDraft): ProspectDraftSummary {
  return {
    businessEmail: draft.businessEmail,
    contactStatus: draft.contactStatus,
    hasEmailDraft: Boolean(draft.subject?.trim() && draft.body?.trim()),
    outreachSendStatus: draft.outreachSendStatus as ProspectDraftSummary["outreachSendStatus"],
    source: "supabase",
  };
}

export function ProspectPreviewDashboard({
  currentFocus,
  entries,
  prospectDraftSummaries: initialProspectDraftSummaries,
}: ProspectPreviewDashboardProps) {
  const [prospectDraftSummaries, setProspectDraftSummaries] = useState(
    initialProspectDraftSummaries,
  );
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isFilterRailOpen, setIsFilterRailOpen] = useState(true);
  const [selectedNiches, setSelectedNiches] = useState<DemoNiche[]>([]);
  const [selectedContactFilters, setSelectedContactFilters] = useState<ContactFilter[]>([]);
  const [selectedDemoStatuses, setSelectedDemoStatuses] = useState<DemoStatusFilter[]>([]);
  const [selectedFocusSlug, setSelectedFocusSlug] = useState(currentFocus.slug);
  const [hasLoadedSavedFocus, setHasLoadedSavedFocus] = useState(false);
  const [draftEntry, setDraftEntry] = useState<DemoEntry | null>(null);
  const [draft, setDraft] = useState<ProspectDraft | null>(null);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [approvalIntent, setApprovalIntent] = useState<
    "approve" | "revoke" | "manual_contact" | null
  >(null);
  const [isApprovalChecked, setIsApprovalChecked] = useState(false);
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [isApprovalSaving, setIsApprovalSaving] = useState(false);
  const [manualContactMethod, setManualContactMethod] =
    useState<ManualContactMethod>("contact_form");
  const [manualContactNote, setManualContactNote] = useState("");
  const [manualFollowUpDays, setManualFollowUpDays] = useState(7);
  const [isManualContactChecked, setIsManualContactChecked] = useState(false);

  useEffect(() => {
    setProspectDraftSummaries(initialProspectDraftSummaries);
  }, [initialProspectDraftSummaries]);

  useEffect(() => {
    const savedSlug = window.localStorage.getItem(CURRENT_FOCUS_STORAGE_KEY);

    if (savedSlug && entries.some((entry) => entry.slug === savedSlug)) {
      setSelectedFocusSlug(savedSlug);
    }

    setHasLoadedSavedFocus(true);
  }, [entries]);

  const selectedCurrentFocus =
    entries.find((entry) => entry.slug === selectedFocusSlug) ?? currentFocus;

  useEffect(() => {
    if (!hasLoadedSavedFocus) {
      return;
    }

    const hasSelectedEntry = entries.some((entry) => entry.slug === selectedFocusSlug);

    if (!hasSelectedEntry) {
      setSelectedFocusSlug(currentFocus.slug);
      return;
    }

    window.localStorage.setItem(CURRENT_FOCUS_STORAGE_KEY, selectedFocusSlug);
  }, [currentFocus.slug, entries, hasLoadedSavedFocus, selectedFocusSlug]);

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
        hvac: 0,
        plumbing: 0,
        other: 0,
      },
    );
  }, [entries]);

  const visibleEntries = useMemo(() => {
    const filteredEntries = entries.filter((entry) => {
      const matchesNiche =
        selectedNiches.length === 0 || selectedNiches.includes(entry.niche);
      const matchesContactStatus =
        selectedContactFilters.length === 0 ||
        selectedContactFilters.every((filter) =>
          entryMatchesContactFilter(entry, filter, prospectDraftSummaries),
        );
      const matchesDemoStatus =
        selectedDemoStatuses.length === 0 ||
        selectedDemoStatuses.some((status) => entry.status === status);

      return matchesNiche && matchesContactStatus && matchesDemoStatus;
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
    selectedContactFilters,
    selectedDemoStatuses,
    selectedNiches,
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
  const activeFilterCount =
    selectedNiches.length + selectedContactFilters.length + selectedDemoStatuses.length;
  const activeFilterLabel =
    activeFilterCount > 0
      ? `${activeFilterCount} active filter${activeFilterCount === 1 ? "" : "s"}`
      : "All demos";
  const focusOptions = useMemo(() => {
    return [...entries].sort((first, second) => first.title.localeCompare(second.title));
  }, [entries]);

  function resetFilters() {
    setSelectedNiches([]);
    setSelectedContactFilters([]);
    setSelectedDemoStatuses([]);
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
    setManualFollowUpDays(7);
    setIsManualContactChecked(false);
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
    setManualFollowUpDays(7);
    setIsManualContactChecked(false);
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

  async function submitApprovalAction(action: "approve_for_draft" | "revoke_draft_approval") {
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
  const canApproveForDraft =
    draft?.source === "supabase" &&
    draft.approvalBlockers.length === 0 &&
    draft.outreachSendStatus === "ready_for_review" &&
    !lockedOutreachStatuses.has(draft.outreachSendStatus ?? "");
  const canRevokeDraftApproval =
    draft?.source === "supabase" && draft.outreachSendStatus === "approved_for_draft";
  const canRecordManualContact =
    draft?.source === "supabase" &&
    draft.contactStatus !== "contacted" &&
    draft.outreachSendStatus !== "sent";
  const manualContactUnavailableReason =
    draft?.source !== "supabase"
      ? "Manual contact can only be recorded for Supabase-backed prospects."
      : draft.contactStatus === "contacted" || draft.outreachSendStatus === "sent"
        ? "This prospect is already marked contacted."
        : undefined;

  return (
    <main className="preview-dashboard">
      <section className="preview-dashboard-inner">
        <div className="preview-dashboard-heading">
          <p className="eyebrow">local-growth-preview</p>
          <h1>Multi-niche demo hub</h1>
          <p>
            Review prospect demos across roofing, restaurants, HVAC, plumbing, and future local
            growth experiments before sharing a direct client-facing URL.
          </p>
        </div>

        <section className="active-preview" aria-labelledby="active-preview-title">
          <div>
            <p className="eyebrow">Current focus</p>
            <h2 id="active-preview-title">{selectedCurrentFocus.title}</h2>
            <p>{selectedCurrentFocus.observedIssue}</p>
            <div className="preview-meta-row">
              <span>{selectedCurrentFocus.city}</span>
              <span>Current active prospect</span>
              <span>{statusLabels[selectedCurrentFocus.status]}</span>
              <span>{selectedCurrentFocus.primaryService}</span>
            </div>
          </div>
          <div className="current-focus-panel">
            <label className="focus-select-label" htmlFor="current-focus-select">
              Set current focus
              <select
                className="focus-select"
                id="current-focus-select"
                value={selectedCurrentFocus.slug}
                onChange={(event) => setSelectedFocusSlug(event.target.value)}
              >
                {focusOptions.map((entry) => (
                  <option key={`${entry.niche}-${entry.slug}`} value={entry.slug}>
                    {entry.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="preview-actions">
              <a className="button button-primary" href={selectedCurrentFocus.href}>
                Open Current Preview
                <ExternalLink size={17} aria-hidden="true" />
              </a>
              {selectedCurrentFocus.sourceUrl ? (
                <a
                  className="button button-ghost"
                  href={selectedCurrentFocus.sourceUrl}
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
                onClick={() => openDraft(selectedCurrentFocus)}
              >
                Email Draft
                <Mail size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="pipeline-summary" aria-label="Pipeline summary">
          <article>
            <span>{entries.length}</span>
            <p>Total demos tracked</p>
          </article>
          <article>
            <span>{nicheCounts.restaurant}</span>
            <p>Restaurant demos</p>
          </article>
          <article>
            <span>{nicheCounts.roofing}</span>
            <p>Roofing demos</p>
          </article>
          <article>
            <span>local-growth-preview</span>
            <p>Generic hub name</p>
          </article>
        </section>

        <section className="rename-note" aria-label="Project rename note">
          <div>
            <p className="eyebrow">Project naming</p>
            <h2>Use local-growth-preview for every niche demo.</h2>
          </div>
          <p>
            The preview hub is now generic and can track roofing, restaurant, HVAC, plumbing, and
            other local business demos from one dashboard.
          </p>
        </section>

        <section className="preview-list-section" aria-labelledby="preview-list-title">
          <div className="preview-list-toolbar">
            <div>
              <p className="eyebrow">{activeFilterLabel}</p>
              <h2 id="preview-list-title">Available prospect previews</h2>
            </div>
            <div className="toolbar-controls">
              {activeFilterCount > 0 ? (
                <button className="filter-reset-button" type="button" onClick={resetFilters}>
                  Reset
                </button>
              ) : null}
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
                  const isCurrentFocus = entry.slug === selectedCurrentFocus.slug;

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
                          {isCurrentFocus ? <span className="active-pill">Current</span> : null}
                          <span className="niche-pill">{entry.niche}</span>
                          <span className="status-pill">{statusLabels[entry.status]}</span>
                        </div>
                        <p>{entry.city}</p>
                        <small>
                          {entry.stageLabel} - Created {formatDate(entry.createdAt)}
                        </small>
                      </div>
                      <div className="preview-row-actions">
                        <button
                          className={
                            isCurrentFocus
                              ? "button button-ghost active-focus-button"
                              : "button button-ghost"
                          }
                          type="button"
                          onClick={() => setSelectedFocusSlug(entry.slug)}
                          disabled={isCurrentFocus}
                          aria-pressed={isCurrentFocus}
                        >
                          <Star size={15} aria-hidden="true" />
                          {isCurrentFocus ? "Current Focus" : "Set Focus"}
                        </button>
                        <a className="button button-primary" href={entry.href}>
                          Preview
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
                    <h3>No demos match these filters.</h3>
                    <p>Adjust the niche, contact status, or demo status filter to show more demos.</p>
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
                  <span>{draft.contactStatus ?? "No contact status"}</span>
                  <span>{draftStatusLabel(draft.outreachSendStatus)}</span>
                  {draft.outreachApproved ? <span>Reviewed by Diego</span> : null}
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

                <section className="draft-approval-panel" aria-label="Gmail draft approval">
                  <div className="draft-approval-heading">
                    <div>
                      <p className="eyebrow">Gmail Draft Approval</p>
                      <h3>{draftStatusLabel(draft.outreachSendStatus)}</h3>
                    </div>
                    {canRevokeDraftApproval ? (
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
                      Recipient, subject, body, and stable demo URL are ready for Gmail draft
                      creation.
                    </p>
                  )}

                  {approvalError ? <p className="approval-error">{approvalError}</p> : null}

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
                        I reviewed the exact recipient, subject, body, and stable demo link.
                      </label>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={() => submitApprovalAction("approve_for_draft")}
                          disabled={!isApprovalChecked || isApprovalSaving}
                        >
                          Approve Gmail Draft
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
                        This removes Gmail draft approval and returns the row to ready for review.
                      </p>
                      <div className="draft-approval-actions">
                        <button
                          className="button button-danger"
                          type="button"
                          onClick={() => submitApprovalAction("revoke_draft_approval")}
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
                        disabled={!canApproveForDraft || isApprovalSaving}
                        title={
                          canApproveForDraft
                            ? undefined
                            : "Approval is unavailable until this is a complete Supabase draft marked ready for review."
                        }
                      >
                        Review Approval
                      </button>
                      {canRevokeDraftApproval ? (
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
                      <h3>{draft.contactStatus === "contacted" ? "Contacted" : "Not contacted"}</h3>
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
