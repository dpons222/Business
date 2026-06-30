"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  CalendarDays,
  Check,
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

type SortMode = "name" | "date";
type SortDirection = "asc" | "desc";
type ContactFilter = "contacted" | "not_contacted" | "has_email" | "has_email_draft";
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

type ProspectDraft = {
  businessName: string;
  businessEmail: string | null;
  contactStatus: string | null;
  outreachSendStatus: string | null;
  outreachSendChannel: string | null;
  subject: string | null;
  body: string | null;
  website: string | null;
  demoUrl: string | null;
  source: "supabase" | "local";
};

type ProspectPreviewDashboardProps = {
  currentFocus: DemoEntry;
  entries: DemoEntry[];
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

function entryMatchesContactFilter(entry: DemoEntry, filter: ContactFilter) {
  if (filter === "contacted") {
    return entry.status === "contacted";
  }

  if (filter === "not_contacted") {
    return entry.status !== "contacted";
  }

  if (filter === "has_email") {
    return Boolean(entry.contactEmail);
  }

  return Boolean(entry.hasEmailDraft);
}

export function ProspectPreviewDashboard({
  currentFocus,
  entries,
}: ProspectPreviewDashboardProps) {
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
        selectedContactFilters.some((filter) => entryMatchesContactFilter(entry, filter));
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
  }, [entries, selectedContactFilters, selectedDemoStatuses, selectedNiches, sortDirection, sortMode]);

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
    setIsDraftLoading(false);
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
              <button
                className={isFilterRailOpen ? "filter-toggle active" : "filter-toggle"}
                type="button"
                onClick={() => setIsFilterRailOpen((isOpen) => !isOpen)}
                aria-expanded={isFilterRailOpen}
                aria-controls="prospect-filter-rail"
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filter
                {activeFilterCount > 0 ? <span>{activeFilterCount}</span> : null}
              </button>
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
            {isFilterRailOpen ? (
              <aside className="filter-rail" id="prospect-filter-rail" aria-label="Prospect filters">
                <div className="filter-rail-header">
                  <div>
                    <p className="eyebrow">Filters</p>
                    <strong>{visibleEntries.length} shown</strong>
                  </div>
                  {activeFilterCount > 0 ? (
                    <button className="filter-reset-button" type="button" onClick={resetFilters}>
                      Reset
                    </button>
                  ) : null}
                </div>

                <details className="filter-rail-group" open>
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

                <details className="filter-rail-group" open>
                  <summary>Contact status</summary>
                  <div className="filter-rail-options">
                    {contactFilterOptions.map((filter) => {
                      const isSelected = selectedContactFilters.includes(filter.value);
                      const count = entries.filter((entry) =>
                        entryMatchesContactFilter(entry, filter.value),
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

                <details className="filter-rail-group" open>
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
              </aside>
            ) : null}

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
                  {draft.outreachSendStatus ? <span>{draft.outreachSendStatus}</span> : null}
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
