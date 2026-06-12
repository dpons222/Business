import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  Home,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { ProspectData } from "../lib/prospects";

type RoofingLandingPageProps = {
  prospect: ProspectData;
};

export function RoofingLandingPage({ prospect }: RoofingLandingPageProps) {
  return (
    <main
      style={
        {
          "--primary": prospect.brand.primary,
          "--primary-dark": prospect.brand.primaryDark,
          "--accent": prospect.brand.accent,
          "--accent-soft": prospect.brand.accentSoft,
        } as CSSProperties
      }
    >
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${prospect.companyName} roof inspection page`}>
          {prospect.logoUrl ? (
            <span className="brand-logo">
              <img src={prospect.logoUrl} alt={`${prospect.companyName} logo`} />
            </span>
          ) : (
            <span className="brand-mark">FC</span>
          )}
          <span>
            <strong>{prospect.companyName}</strong>
            <small>Roofing and storm damage inspections</small>
          </span>
        </a>
        <nav className="header-actions" aria-label="Primary actions">
          <a href="#inspection-form" className="header-link">
            Request Inspection
          </a>
          <a href={prospect.phoneHref} className="button button-ghost">
            <Phone size={17} aria-hidden="true" />
            {prospect.phone}
          </a>
        </nav>
      </header>

      <section id="top" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Storm damage roof inspection</p>
          <h1>{prospect.headline}</h1>
          <p className="hero-lede">{prospect.subheadline}</p>
          <div className="hero-actions">
            <a href="#inspection-form" className="button button-primary">
              {prospect.recommendedCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={prospect.phoneHref} className="button button-secondary">
              <Phone size={18} aria-hidden="true" />
              {prospect.secondaryCta}
            </a>
          </div>
          <div className="trust-row" aria-label="Trust proof">
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

        <aside className="hero-panel" aria-label="Roof inspection request">
          {prospect.heroImageUrl ? (
            <figure className="hero-image-card">
              <img src={prospect.heroImageUrl} alt="Roofing project example" />
              <figcaption>Roof inspections, repairs, and replacement guidance.</figcaption>
            </figure>
          ) : null}
          <div className="panel-card panel-card-top">
            <span className="icon-pill">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <div>
              <h2>Start with a roof inspection</h2>
              <p>{prospect.pageAngle}</p>
            </div>
          </div>
          <div className="inspection-card">
            <p className="inspection-label">Free inspection request</p>
            <h3>Request Your Free Roof Inspection</h3>
            <div className="mock-fields" aria-hidden="true">
              <span>Name</span>
              <span>Phone</span>
              <span>Email</span>
              <span>ZIP code</span>
            </div>
            <a href="#inspection-form" className="button button-primary full-width">
              Start Request
            </a>
          </div>
        </aside>
      </section>

      <section className="section intro-band">
        <div>
          <p className="eyebrow">After hail, wind, or heavy rain</p>
          <h2>Small roof damage can turn into bigger home repairs.</h2>
        </div>
        <p>{prospect.observedIssue}</p>
      </section>

      <section className="section two-column">
        <div>
          <p className="eyebrow">What homeowners notice</p>
          <h2>Hail damage is not always obvious from the ground.</h2>
          <p>
            If you notice any of these signs, schedule a roof check before the next round
            of rain or severe weather.
          </p>
        </div>
        <div className="card-grid">
          {prospect.damageSigns.map((item) => (
            <div className="mini-card" key={item}>
              <CheckCircle2 size={19} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <div className="section-heading">
          <p className="eyebrow">Free roof inspection</p>
          <h2>What the free roof inspection includes</h2>
          <p>
            Final Cut Roofing checks visible concerns, explains what they find, and helps
            you understand your repair or replacement options.
          </p>
        </div>
        <div className="feature-list">
          {prospect.inspectionIncludes.map((item) => (
            <div className="feature-item" key={item}>
              <Camera size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section proof-section">
        <div className="proof-card">
          <BadgeCheck size={25} aria-hidden="true" />
          <p className="stat">{prospect.rating}</p>
          <p>{prospect.reviewCount}</p>
        </div>
        <div className="proof-copy">
          <p className="eyebrow">Local roofing help</p>
          <h2>{prospect.trustLine}</h2>
          <p>
            Get clear guidance from a roofing team that understands North Texas storm
            damage, roof leaks, and replacement decisions.
          </p>
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading centered">
          <p className="eyebrow">Simple process</p>
          <h2>Four clear steps from concern to next action</h2>
        </div>
        <div className="steps">
          {prospect.process.map((step, index) => (
            <div className="step-card" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section services-form">
        <div className="services-card">
          <p className="eyebrow">Storm-related services</p>
          <h2>Roofing help for common storm concerns.</h2>
          <div className="service-list">
            {prospect.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>

        <form id="inspection-form" className="lead-form">
          <p className="eyebrow">Free inspection request</p>
          <h2>Request Your Free Roof Inspection</h2>
          <p>{prospect.formReassurance}</p>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" placeholder="Best phone number" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="Email address" />
          </label>
          <label>
            Address or ZIP code
            <input type="text" name="location" placeholder="Property location" />
          </label>
          <label>
            What are you seeing?
            <textarea name="issue" placeholder="Leak, hail, missing shingles, or not sure yet" />
          </label>
          <button type="button" className="button button-primary full-width">
            {prospect.recommendedCta}
          </button>
        </form>
      </section>

      <section className="section faq-section">
        <div className="section-heading centered">
          <p className="eyebrow">Homeowner questions</p>
          <h2>Questions before you schedule</h2>
        </div>
        <div className="faq-list">
          {prospect.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <Clock size={28} aria-hidden="true" />
        <h2>Not sure if the last storm damaged your roof?</h2>
        <p>{prospect.formReassurance}</p>
        <div className="hero-actions">
          <a href="#inspection-form" className="button button-primary">
            {prospect.recommendedCta}
          </a>
          <a href={prospect.phoneHref} className="button button-secondary">
            <Phone size={18} aria-hidden="true" />
            {prospect.secondaryCta}
          </a>
        </div>
      </section>
    </main>
  );
}
