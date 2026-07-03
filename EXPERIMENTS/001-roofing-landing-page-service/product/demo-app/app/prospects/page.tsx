import Link from "next/link";
import { statusLabels } from "../../lib/demoRegistry";
import { getDashboardProspectData } from "../../lib/prospectDrafts";

export default async function ProspectsIndexPage() {
  const { entries } = await getDashboardProspectData();

  return (
    <main className="prospects-index">
      <section>
        <p className="variant-eyebrow">local-growth-preview</p>
        <h1>Personalized Demo Pages</h1>
        <p>
          Each demo uses shared systems with separate prospect data, brand assets, copy, photos,
          contact details, niche metadata, and status tracking.
        </p>
        <div className="prospects-list">
          {entries.map((entry) => (
            <Link href={entry.internalHref ?? entry.href} key={`${entry.niche}-${entry.slug}`}>
              {entry.logoUrl ? <img src={entry.logoUrl} alt={`${entry.title} logo`} /> : null}
              <span>{entry.niche}</span>
              <strong>{entry.title}</strong>
              <small>
                {statusLabels[entry.status]} - {entry.primaryService}
              </small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
