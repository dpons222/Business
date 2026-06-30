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
import type { DemoEntry, DemoNiche } from "../lib/demoRegistry";
import { nicheFilters, statusLabels } from "../lib/demoRegistry";

type SortMode = "name" | "date";
type SortDirection = "asc" | "desc";
type NicheFilter = "all" | DemoNiche;
type ContactFilter = "all" | "contacted" | "not_contacted";

const CURRENT_FOCUS_STORAGE_KEY = "local-growth-preview-current-focus";

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

function getActiveFilterLabel(
  nicheLabel: string,
  contactLabel: string,
  nicheFilter: NicheFilter,
  contactFilter: ContactFilter,
) {
  if (nicheFilter === "all" && contactFilter === "all") {
    return "All demos";
  }

  if (nicheFilter === "all") {
    return contactLabel;
  }

  if (contactFilter === "all") {
    return nicheLabel;
  }

  return `${nicheLabel} / ${contactLabel}`;
}

export function ProspectPreviewDashboard({
  currentFocus,
  entries,
}: ProspectPreviewDashboardProps) {
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [activeNiche, setActiveNiche] = useState<NicheFilter>("all");
  const [activeContactFilter, setActiveContactFilter] = useState<ContactFilter>("all");
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
    return entries.reduce<Record<NicheFilter, number>>(
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

  const contactFilters: Array<{ value: ContactFilter; label: string; count: number }> =
    useMemo(() => {
      const contactedCount = entries.filter((entry) => entry.status === "contacted").length;
      const notContactedCount = entries.length - contactedCount;

      return [
        { value: "all", label: "All contact statuses", count: entries.length },
        { value: "contacted", label: "Contacted", count: contactedCount },
        { value: "not_contacted", label: "Not contacted", count: notContactedCount },
      ];
    }, [entries]);

  const visibleEntries = useMemo(() => {
    const nicheFilteredEntries =
      activeNiche === "all" ? entries : entries.filter((entry) => entry.niche === activeNiche);
    const filteredEntries = nicheFilteredEntries.filter((entry) => {
      if (activeContactFilter === "all") {
        return true;
      }

      if (activeContactFilter === "contacted") {
        return entry.status === "contacted";
      }

      return entry.status !== "contacted";
    });

    return [...filteredEntries].sort((first, second) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortMode === "name") {
        return first.title.localeCompare(second.title) * direction;
      }

      return first.createdAt.localeCompare(second.createdAt) * direction;
    });
  }, [activeContactFilter, activeNiche, entries, sortDirection, sortMode]);

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
  const activeNicheLabel =
    nicheFilters.find((filter) => filter.value === activeNiche)?.label ?? "All";
  const activeContactLabel =
    contactFilters.find((filter) => filter.value === activeContactFilter)?.label ??
    "All contact statuses";
  const activeFilterLabel = getActiveFilterLabel(
    activeNicheLabel,
    activeContactLabel,
    activeNiche,
    activeContactFilter,
  );
  const focusOptions = useMemo(() => {
    return [...entries].sort((first, second) => first.title.localeCompare(second.title));
  }, [entries]);

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
              <details className="filter-menu">
                <summary className="filter-summary">
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  Filters
                  <span>{visibleEntries.length}</span>
                </summary>
                <div className="filter-menu-panel">
                  <div className="filter-group">
                    <p>Niche</p>
                    {nicheFilters.map((filter) => (
                      <button
                        className={
                          activeNiche === filter.value ? "filter-option active" : "filter-option"
                        }
                        key={filter.value}
                        type="button"
                        onClick={() => setActiveNiche(filter.value)}
                        aria-pressed={activeNiche === filter.value}
                      >
                        <span>
                          {activeNiche === filter.value ? (
                            <Check size={14} aria-hidden="true" />
                          ) : (
                            <Layers3 size={14} aria-hidden="true" />
                          )}
                          {filter.label}
                        </span>
                        <strong>{nicheCounts[filter.value]}</strong>
                      </button>
                    ))}
                  </div>
                  <div className="filter-group">
                    <p>Contact status</p>
                    {contactFilters.map((filter) => (
                      <button
                        className={
                          activeContactFilter === filter.value
                            ? "filter-option active"
                            : "filter-option"
                        }
                        key={filter.value}
                        type="button"
                        onClick={() => setActiveContactFilter(filter.value)}
                        aria-pressed={activeContactFilter === filter.value}
                      >
                        <span>
                          {activeContactFilter === filter.value ? (
                            <Check size={14} aria-hidden="true" />
                          ) : (
                            <Mail size={14} aria-hidden="true" />
                          )}
                          {filter.label}
                        </span>
                        <strong>{filter.count}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              </details>
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
                <p>Adjust the niche or contact status filter to show more prospect demos.</p>
              </div>
            ) : null}
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
