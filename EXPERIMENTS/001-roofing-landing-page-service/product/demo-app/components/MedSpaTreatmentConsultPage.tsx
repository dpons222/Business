import type { CSSProperties } from "react";
import type { MedSpaDemo } from "../lib/medSpaDemos";

type MedSpaTreatmentConsultPageProps = {
  demo: MedSpaDemo;
};

export function MedSpaTreatmentConsultPage({ demo }: MedSpaTreatmentConsultPageProps) {
  const themeStyle = {
    "--medspa-primary": demo.theme.primary,
    "--medspa-primary-dark": demo.theme.primaryDark,
    "--medspa-accent": demo.theme.accent,
    "--medspa-accent-soft": demo.theme.accentSoft,
  } as CSSProperties;

  return (
    <main className="medspa-page" style={themeStyle}>
      <header className="medspa-header">
        <a className="medspa-brand" href="#top" aria-label={`${demo.businessName} treatment page`}>
          <span className="medspa-brand-mark">{demo.shortName.slice(0, 3).toUpperCase()}</span>
          <span>
            <strong>{demo.businessName}</strong>
            <small>{demo.city}</small>
          </span>
        </a>
        <nav className="medspa-nav" aria-label="Page sections">
          <a href="#treatment-path">Treatment path</a>
          <a href="#first-visit">First visit</a>
          <a className="button button-primary" href={demo.sourceUrl}>
            {demo.primaryCtaLabel}
          </a>
        </nav>
      </header>

      <section id="top" className="medspa-hero">
        <div className="medspa-hero-copy">
          <p className="eyebrow">{demo.eyebrow}</p>
          <h1>{demo.headline}</h1>
          <p>{demo.subheadline}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={demo.sourceUrl}>
              {demo.primaryCtaLabel}
            </a>
            <a className="button button-ghost" href="#treatment-path">
              {demo.secondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className="medspa-hero-visual" aria-label={`${demo.treatmentFocus} visit path`}>
          {demo.heroImageUrl ? (
            <img src={demo.heroImageUrl} alt="" aria-hidden="true" />
          ) : (
            <div className="medspa-visual-panel" aria-hidden="true">
              <span>01</span>
              <strong>Choose the treatment focus</strong>
              <span>02</span>
              <strong>Ask the right consult question</strong>
              <span>03</span>
              <strong>Use the existing booking path</strong>
            </div>
          )}
          <div className="medspa-visual-card">
            <span>Focus</span>
            <strong>{demo.treatmentFocus}</strong>
          </div>
        </div>
      </section>

      <section className="medspa-section medspa-question-band">
        <p className="eyebrow">Patient question</p>
        <h2>{demo.visitorQuestion}</h2>
      </section>

      <section id="treatment-path" className="medspa-section medspa-split">
        <div>
          <p className="eyebrow">Treatment path</p>
          <h2>Make the next step easier to choose.</h2>
          <p>
            Visitors should not have to compare every service before they know what to do next. This
            page gives them one focused path into the consultation or booking flow.
          </p>
        </div>
        <div className="medspa-card-grid">
          {demo.serviceHighlights.map((highlight) => (
            <article className="medspa-mini-card" key={highlight}>
              <span aria-hidden="true" />
              <p>{highlight}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="first-visit" className="medspa-section medspa-process">
        <div className="medspa-section-heading">
          <p className="eyebrow">First visit path</p>
          <h2>Keep the consultation flow simple.</h2>
        </div>
        <div className="medspa-process-grid">
          {demo.consultationSteps.map((step, index) => (
            <article className="medspa-process-card" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="medspa-section medspa-trust">
        <div>
          <p className="eyebrow">Why this path fits</p>
          <h2>Use the treatment details already available.</h2>
        </div>
        <ul>
          {demo.trustSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <section className="medspa-final-cta">
        <p>{demo.finalNote}</p>
        <a className="button button-primary" href={demo.sourceUrl}>
          {demo.primaryCtaLabel}
        </a>
      </section>
    </main>
  );
}
