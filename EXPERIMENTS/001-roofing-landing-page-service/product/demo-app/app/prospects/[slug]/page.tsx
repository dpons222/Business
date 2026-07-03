import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChargerStormResponseLandingPage } from "../../../components/ChargerStormResponseLandingPage";
import { RoofingLandingPage } from "../../../components/RoofingLandingPage";
import { getProspectBySlug, getProspectStaticParams } from "../../../lib/prospects";
import { getRecommendationPreviewEntry } from "../../../lib/prospectDrafts";
import { nicheFilters, statusLabels, type DemoEntry } from "../../../lib/demoRegistry";

type ProspectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getProspectStaticParams();
}

const nicheLabelByValue = Object.fromEntries(
  nicheFilters.map((filter) => [filter.value, filter.label]),
) as Record<string, string>;

export async function generateMetadata({ params }: ProspectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    const recommendation = await getRecommendationPreviewEntry(slug);

    if (recommendation && recommendation.previewLabel !== "Website") {
      return {
        title: `${recommendation.title} Recommendation Preview`,
        description: `Internal recommendation preview for ${recommendation.title}.`,
      };
    }

    return {
      title: "Prospect Preview",
    };
  }

  return {
    title: `${prospect.companyName} Free Roof Inspection`,
    description: `Storm damage and free roof inspection page for ${prospect.companyName}.`,
  };
}

function RecommendationPreviewPage({ entry }: { entry: DemoEntry }) {
  return (
    <main className="preview-dashboard recommendation-preview-page">
      <section className="preview-dashboard-inner">
        <div className="preview-dashboard-heading">
          <p className="eyebrow">Recommendation preview</p>
          <h1>{entry.title}</h1>
          <p>
            Internal package summary for reviewing the recommended offer, source context, and next outreach
            angle before sending.
          </p>
        </div>

        <section className="active-preview recommendation-preview-card" aria-labelledby="recommendation-title">
          <div className="recommendation-preview-header">
            <div className="recommendation-preview-mark" aria-hidden="true">
              {entry.shortName}
            </div>
            <div>
              <p className="eyebrow">Primary recommendation</p>
              <h2 id="recommendation-title">{entry.primaryService}</h2>
              <div className="preview-meta-row">
                <span>{entry.city}</span>
                <span className="niche-pill">{nicheLabelByValue[entry.niche] ?? entry.niche}</span>
                <span className="status-pill">{statusLabels[entry.status]}</span>
                <span>{entry.stageLabel}</span>
              </div>
            </div>
          </div>

          <div className="recommendation-preview-grid">
            <article>
              <h3>Observed opportunity</h3>
              <p>{entry.observedIssue}</p>
            </article>
            <article>
              <h3>Suggested next step</h3>
              <p>
                Use this package to shape the prospect-specific preview, outreach draft, and follow-up notes.
                Confirm the live source page before contacting the business.
              </p>
            </article>
          </div>

          <div className="recommendation-preview-actions">
            <a className="button button-primary" href="/dashboard#available-prospects">
              Back to dashboard
            </a>
            {entry.sourceUrl ? (
              <a className="button button-ghost" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                Source website
              </a>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}

export default async function ProspectPage({ params }: ProspectPageProps) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    const recommendation = await getRecommendationPreviewEntry(slug);

    if (!recommendation || recommendation.previewLabel === "Website") {
      notFound();
    }

    return <RecommendationPreviewPage entry={recommendation} />;
  }

  if (prospect.slug === "charger-roofing") {
    return <ChargerStormResponseLandingPage prospect={prospect} />;
  }

  return <RoofingLandingPage prospect={prospect} />;
}
