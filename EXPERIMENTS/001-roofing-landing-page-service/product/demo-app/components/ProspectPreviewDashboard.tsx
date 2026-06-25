"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, CalendarDays, ExternalLink, Layers3 } from "lucide-react";
import type { DemoEntry, DemoNiche } from "../lib/demoRegistry";
import { nicheFilters, statusLabels } from "../lib/demoRegistry";

type SortMode = "name" | "date";
type SortDirection = "asc" | "desc";
type NicheFilter = "all" | DemoNiche;

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

export function ProspectPreviewDashboard({
  currentFocus,
  entries,
}: ProspectPreviewDashboardProps) {
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [activeNiche, setActiveNiche] = useState<NicheFilter>("all");

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

  const visibleEntries = useMemo(() => {
    const filteredEntries =
      activeNiche === "all" ? entries : entries.filter((entry) => entry.niche === activeNiche);

    return [...filteredEntries].sort((first, second) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortMode === "name") {
        return first.title.localeCompare(second.title) * direction;
      }

      return first.createdAt.localeCompare(second.createdAt) * direction;
    });
  }, [activeNiche, entries, sortDirection, sortMode]);

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
            <h2 id="active-preview-title">{currentFocus.title}</h2>
            <p>{currentFocus.observedIssue}</p>
            <div className="preview-meta-row">
              <span>{currentFocus.city}</span>
              <span>Current active prospect</span>
              <span>{statusLabels[currentFocus.status]}</span>
              <span>{currentFocus.primaryService}</span>
            </div>
          </div>
          <div className="preview-actions">
            <a className="button button-primary" href={currentFocus.href}>
              Open Current Preview
              <ExternalLink size={17} aria-hidden="true" />
            </a>
            {currentFocus.internalHref ? (
              <a className="button button-ghost" href={currentFocus.internalHref}>
                Internal Route
              </a>
            ) : null}
          </div>
        </section>

        <section className="niche-filter-section" aria-label="Filter demos by niche">
          {nicheFilters.map((filter) => (
            <button
              className={activeNiche === filter.value ? "niche-filter active" : "niche-filter"}
              key={filter.value}
              type="button"
              onClick={() => setActiveNiche(filter.value)}
              aria-pressed={activeNiche === filter.value}
            >
              <Layers3 size={16} aria-hidden="true" />
              <span>{filter.label}</span>
              <strong>{nicheCounts[filter.value]}</strong>
            </button>
          ))}
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
            <h2>Use local-growth-preview in the app first.</h2>
          </div>
          <p>
            The UI is now generic. Keep the Vercel project/domain rename as a follow-up after this
            dashboard is validated, so Charger Roofing's existing shared URL remains easy to protect.
          </p>
        </section>

        <section className="preview-list-section" aria-labelledby="preview-list-title">
          <div className="preview-list-toolbar">
            <div>
              <p className="eyebrow">{activeNicheLabel}</p>
              <h2 id="preview-list-title">Available prospect previews</h2>
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

          <div className="preview-list">
            {visibleEntries.map((entry) => {
              const isCurrentFocus = entry.slug === currentFocus.slug;

              return (
                <article className="preview-row" key={`${entry.niche}-${entry.slug}`}>
                  <div className="preview-logo-slot">
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
                    <a className="button button-primary" href={entry.href}>
                      Preview
                    </a>
                    {entry.internalHref ? (
                      <a className="button button-ghost" href={entry.internalHref}>
                        Internal
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
            {visibleEntries.length === 0 ? (
              <div className="empty-filter-state">
                <h3>No demos in this niche yet.</h3>
                <p>Add the next prospect demo and register it with this niche to make it appear here.</p>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}
