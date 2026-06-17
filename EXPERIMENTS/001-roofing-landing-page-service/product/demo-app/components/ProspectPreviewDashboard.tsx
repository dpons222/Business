"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, CalendarDays, ExternalLink } from "lucide-react";
import type { ProspectData } from "../lib/prospects";

type SortMode = "name" | "date";

type ProspectPreviewDashboardProps = {
  activeProspect: ProspectData;
  prospects: ProspectData[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function ProspectPreviewDashboard({
  activeProspect,
  prospects,
}: ProspectPreviewDashboardProps) {
  const [sortMode, setSortMode] = useState<SortMode>("date");

  const sortedProspects = useMemo(() => {
    return [...prospects].sort((first, second) => {
      if (sortMode === "name") {
        return first.companyName.localeCompare(second.companyName);
      }

      return second.createdAt.localeCompare(first.createdAt);
    });
  }, [prospects, sortMode]);

  return (
    <main className="preview-dashboard">
      <section className="preview-dashboard-inner">
        <div className="preview-dashboard-heading">
          <p className="eyebrow">Roof Check Preview</p>
          <h1>Prospect demos</h1>
          <p>Choose a prospect page to review before sharing the direct client-facing URL.</p>
        </div>

        <section className="active-preview" aria-labelledby="active-preview-title">
          <div>
            <p className="eyebrow">Current focus</p>
            <h2 id="active-preview-title">{activeProspect.companyName}</h2>
            <p>{activeProspect.observedIssue}</p>
            <div className="preview-meta-row">
              <span>{activeProspect.city}</span>
              <span>{formatDate(activeProspect.createdAt)}</span>
              <span>{activeProspect.primaryService}</span>
            </div>
          </div>
          <div className="preview-actions">
            <a className="button button-primary" href={`/${activeProspect.slug}`}>
              Open Current Preview
              <ExternalLink size={17} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href={`/prospects/${activeProspect.slug}`}>
              Internal Route
            </a>
          </div>
        </section>

        <section className="preview-list-section" aria-labelledby="preview-list-title">
          <div className="preview-list-toolbar">
            <div>
              <p className="eyebrow">All previews</p>
              <h2 id="preview-list-title">Available prospect pages</h2>
            </div>
            <div className="sort-controls" aria-label="Sort prospect previews">
              <button
                className={sortMode === "date" ? "sort-button active" : "sort-button"}
                type="button"
                onClick={() => setSortMode("date")}
              >
                <CalendarDays size={16} aria-hidden="true" />
                Date Created
              </button>
              <button
                className={sortMode === "name" ? "sort-button active" : "sort-button"}
                type="button"
                onClick={() => setSortMode("name")}
              >
                <ArrowUpDown size={16} aria-hidden="true" />
                A-Z
              </button>
            </div>
          </div>

          <div className="preview-list">
            {sortedProspects.map((prospect) => {
              const isActive = prospect.slug === activeProspect.slug;

              return (
                <article className="preview-row" key={prospect.slug}>
                  <div className="preview-logo-slot">
                    {prospect.logoUrl ? (
                      <img src={prospect.logoUrl} alt={`${prospect.companyName} logo`} />
                    ) : (
                      <span>{prospect.shortName}</span>
                    )}
                  </div>
                  <div>
                    <div className="preview-title-row">
                      <h3>{prospect.companyName}</h3>
                      {isActive ? <span className="active-pill">Current</span> : null}
                    </div>
                    <p>{prospect.city}</p>
                    <small>Created {formatDate(prospect.createdAt)}</small>
                  </div>
                  <div className="preview-row-actions">
                    <a className="button button-primary" href={`/${prospect.slug}`}>
                      Preview
                    </a>
                    <a className="button button-ghost" href={`/prospects/${prospect.slug}`}>
                      Internal
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
