import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Home,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { DesignVariant } from "../lib/designVariants";
import type { ProspectData } from "../lib/prospects";

type VariantLandingPageProps = {
  prospect: ProspectData;
  variant: DesignVariant;
};

export function VariantLandingPage({ prospect, variant }: VariantLandingPageProps) {
  return (
    <main
      className={`variant-page variant-${variant.id}`}
      style={
        {
          "--primary": prospect.brand.primary,
          "--primary-dark": prospect.brand.primaryDark,
          "--accent": prospect.brand.accent,
          "--accent-soft": prospect.brand.accentSoft,
        } as CSSProperties
      }
    >
      <header className="variant-header">
        <a className="variant-brand" href="#top" aria-label={`${prospect.companyName} roof inspection page`}>
          {prospect.logoUrl ? (
            <img src={prospect.logoUrl} alt={`${prospect.companyName} logo`} />
          ) : null}
          <span>{prospect.companyName}</span>
        </a>
        <nav className="variant-nav" aria-label="Variant actions">
          <a href="#what-to-expect">What to Expect</a>
          <a href={prospect.phoneHref} className="variant-phone">
            <Phone size={16} aria-hidden="true" />
            {prospect.phone}
          </a>
        </nav>
      </header>

      <section id="top" className="variant-hero">
        <div className="variant-hero-copy">
          <p className="variant-eyebrow">{variant.eyebrow}</p>
          <h1>{variant.headline}</h1>
          <p className="variant-lede">{variant.subheadline}</p>
          <div className="variant-actions">
            <a href="#variant-form" className="variant-button variant-button-primary">
              {prospect.recommendedCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={prospect.phoneHref} className="variant-button variant-button-secondary">
              <Phone size={18} aria-hidden="true" />
              {prospect.phone}
            </a>
          </div>
          <div className="variant-proof-row">
            <span>
              <Star size={17} aria-hidden="true" />
              {prospect.rating} based on {prospect.reviewCount}
            </span>
            <span>
              <Home size={17} aria-hidden="true" />
              {prospect.city} / DFW
            </span>
          </div>
        </div>

        <div className="variant-hero-media">
          {prospect.heroImageUrl ? (
            <img src={prospect.heroImageUrl} alt="Roofing project example" />
          ) : null}
          <form id="variant-form" className="variant-form">
            <p>{variant.shortName}</p>
            <h2>{variant.formTitle}</h2>
            <label>
              Name
              <input placeholder="Your name" />
            </label>
            <label>
              Phone
              <input placeholder="Best phone number" />
            </label>
            <label>
              ZIP code
              <input placeholder="Property ZIP code" />
            </label>
            <button type="button" className="variant-button variant-button-primary">
              {prospect.recommendedCta}
            </button>
            <small>{variant.formNote}</small>
          </form>
        </div>
      </section>

      <section className="variant-strip">
        <div>
          <BadgeCheck size={22} aria-hidden="true" />
          <strong>{prospect.rating}</strong>
          <span>{prospect.reviewCount}</span>
        </div>
        <div>
          <ShieldCheck size={22} aria-hidden="true" />
          <strong>Roof inspections</strong>
          <span>For hail, wind, leaks, and shingles</span>
        </div>
        <div>
          <Camera size={22} aria-hidden="true" />
          <strong>Photos and findings</strong>
          <span>Know what needs attention</span>
        </div>
      </section>

      <section id="what-to-expect" className="variant-content-grid">
        <article>
          <p className="variant-eyebrow">Free roof inspection</p>
          <h2>{variant.summary}</h2>
          <p>{prospect.observedIssue}</p>
        </article>
        <div className="variant-check-grid">
          {prospect.inspectionIncludes.slice(0, 4).map((item) => (
            <div key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="variant-process">
        {prospect.process.map((step, index) => (
          <div key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </section>

      <section className="variant-final">
        <h2>Not sure if your roof was damaged?</h2>
        <p>{prospect.formReassurance}</p>
        <a href="#variant-form" className="variant-button variant-button-secondary">
          {prospect.recommendedCta}
        </a>
      </section>
    </main>
  );
}
