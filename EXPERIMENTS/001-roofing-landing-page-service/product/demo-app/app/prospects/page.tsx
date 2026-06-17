import Link from "next/link";
import { prospects } from "../../lib/prospects";

export default function ProspectsIndexPage() {
  return (
    <main className="prospects-index">
      <section>
        <p className="variant-eyebrow">Roofing demo prospects</p>
        <h1>Personalized Demo Pages</h1>
        <p>
          Each page uses the same reusable landing page system with separate prospect
          data, brand assets, copy, photos, and contact details.
        </p>
        <div className="prospects-list">
          {prospects.map((prospect) => (
            <Link href={`/prospects/${prospect.slug}`} key={prospect.slug}>
              {prospect.logoUrl ? (
                <img src={prospect.logoUrl} alt={`${prospect.companyName} logo`} />
              ) : null}
              <span>{prospect.city}</span>
              <strong>{prospect.companyName}</strong>
              <small>{prospect.primaryService}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
