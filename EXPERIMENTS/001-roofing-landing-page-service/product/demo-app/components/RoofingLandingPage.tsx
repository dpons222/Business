import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  FileText,
  Hammer,
  Home,
  Images,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { CSSProperties } from "react";
import { DemoLeadForm } from "./DemoLeadForm";
import type { DesignVariant } from "../lib/designVariants";
import type { ProspectData } from "../lib/prospects";

type RoofingLandingPageProps = {
  prospect: ProspectData;
  variant?: DesignVariant;
};

export function RoofingLandingPage({ prospect, variant }: RoofingLandingPageProps) {
  const variantId = variant?.id ?? "brand-photo-hero";
  const heroEyebrow = variant?.eyebrow ?? "Got roof hail damage?";
  const heroHeadline = variant?.headline ?? prospect.headline;
  const heroSubheadline = variant?.subheadline ?? prospect.subheadline;
  const formTitle = variant?.formTitle ?? "Request Your Free Roof Inspection";
  const formNote = variant?.formNote ?? prospect.formReassurance;
  const brandMark = prospect.companyName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const primaryProof = prospect.rating
    ? `${prospect.rating} rating`
    : "Free inspection available";
  const secondaryProof = prospect.reviewCount
    ? `Based on ${prospect.reviewCount}`
    : prospect.trustSignal ?? "Free roof checkup available";
  const supportProof = "Focused storm damage review";
  const reviewHeading = prospect.rating ?? prospect.trustSignal ?? "Free inspection offer";
  const reviewSubline = prospect.reviewCount ? `Based on ${prospect.reviewCount}` : prospect.trustLine;

  return (
    <main
      className={`landing-page landing-${variantId}`}
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
            <span className="brand-mark">{brandMark}</span>
          )}
          <span>
            <strong>{prospect.companyName}</strong>
            <small>Roofing and storm damage inspections</small>
          </span>
        </a>
        <nav className="header-actions" aria-label="Primary actions">
          <a href="#services" className="header-link">
            Exterior Services
          </a>
          <a href="#insurance" className="header-link">
            Storm Guidance
          </a>
          <a href="#gallery" className="header-link">
            Photo Gallery
          </a>
          <a href="#inspection-form" className="header-link">
            Request Inspection
          </a>
          <a href={prospect.phoneHref} className="button button-ghost">
            <Phone size={17} aria-hidden="true" />
            {prospect.phone}
          </a>
        </nav>
      </header>

      <section id="top" className="brand-hero">
        {prospect.heroImageUrl ? (
          <img className="brand-hero-bg" src={prospect.heroImageUrl} alt="" aria-hidden="true" />
        ) : null}
        <div className="brand-hero-overlay" />
        <div className="brand-hero-inner">
          <div className="brand-hero-copy">
            <p className="eyebrow">{heroEyebrow}</p>
            <h1>
              <span className="desktop-copy">{heroHeadline}</span>
              <span className="mobile-copy">
                Storm Damage
                <br />
                in {prospect.city}?
                <br />
                Schedule a Free
                <br />
                Roof Inspection.
              </span>
            </h1>
            <p className="hero-lede">
              <span className="desktop-copy">{heroSubheadline}</span>
              <span className="mobile-copy">
                Hail, wind, or heavy rain?
                <br />
                {prospect.companyName} can check your roof,
                <br />
                document visible damage, and explain next steps.
              </span>
            </p>
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
            <div className="brand-proof-row" aria-label="Trust proof">
              <span>
                <Star size={17} aria-hidden="true" />
                <strong>{primaryProof}</strong>
              </span>
              <span>
                <BadgeCheck size={17} aria-hidden="true" />
                <strong>{secondaryProof}</strong>
              </span>
              <span>
                <ShieldCheck size={17} aria-hidden="true" />
                <strong>{supportProof}</strong>
              </span>
              <span>
                <Home size={17} aria-hidden="true" />
                <strong>{prospect.trustLine}</strong>
              </span>
            </div>
          </div>

          <DemoLeadForm
            companyName={prospect.companyName}
            ctaLabel={prospect.recommendedCta}
            formNote={formNote}
            formTitle={formTitle}
          />
        </div>
      </section>

      <section className="storm-alert-band">
        <div>
          <p className="eyebrow">Free storm damage inspection</p>
          <h2>Make the next step clear after hail or wind.</h2>
        </div>
        <p>
          {prospect.pageAngle} Request an inspection and {prospect.shortName} can explain what
          happens before any repair decision is made.
        </p>
      </section>

      <section id="services" className="brand-section service-showcase">
        <div className="section-heading">
          <p className="eyebrow">Why choose {prospect.shortName}</p>
          <h2>When wind or hail strikes, it is critical to act urgently.</h2>
          <p>
            {prospect.shortName} helps document visible roof damage, explain options, and keep
            the process clear before small problems spread.
          </p>
        </div>
        <div className="brand-feature-grid">
          {prospect.inspectionIncludes.slice(0, 4).map((item) => (
            <div className="brand-feature" key={item}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="service-cards">
          <article>
            <ShieldCheck size={26} aria-hidden="true" />
            <h3>Free Roof Inspection</h3>
            <p>Start with a clear roof damage review before making any repair decision.</p>
          </article>
          <article>
            <Camera size={26} aria-hidden="true" />
            <h3>Photos & Documentation</h3>
            <p>See what was found, where it is located, and what needs attention.</p>
          </article>
          <article>
            <FileText size={26} aria-hidden="true" />
            <h3>Claim Next Steps</h3>
            <p>Understand what was found before deciding whether to discuss a claim.</p>
          </article>
        </div>
      </section>

      <section className="brand-section photo-split">
        <div className="photo-collage">
          {prospect.projectImages.slice(0, 3).map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.label} />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
        <div>
          <p className="eyebrow">Your problem. Our solution.</p>
          <h2>Your free roof inspection is just a click or phone call away.</h2>
          <p>
            From the first roof check to documentation, options, scheduling, and repairs,{" "}
            {prospect.shortName} keeps homeowners informed so the next step feels manageable.
          </p>
          <div className="help-list">
            {prospect.process.map((item) => (
              <span key={item}>
                <ClipboardCheck size={17} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section process-section">
        <div className="section-heading centered">
          <p className="eyebrow">Our easy process</p>
          <h2>Know what happens before repair or replacement decisions.</h2>
        </div>
        <div className="brand-process">
          {[
            {
              icon: ClipboardCheck,
              title: "Request Consult",
              body: "Schedule a free inspection so the team can analyze your needs and provide a quote.",
            },
            {
              icon: FileText,
              title: "Design Your Plan",
              body: "Choose the best path for repair, replacement, materials, scheduling, and documentation.",
            },
            {
              icon: Hammer,
              title: "Build & Complete",
              body: "The project is completed while you stay informed, safe, and comfortable.",
            },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <article key={step.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="insurance" className="insurance-band">
        <div>
          <p className="eyebrow">Storm damage documentation</p>
          <h2>Get experienced eyes on the roof after severe weather.</h2>
          <p>
            {prospect.shortName} helps prevent damage from getting worse, document roof concerns,
            and guide you through next steps with no obligation.
          </p>
        </div>
        <a href="#inspection-form" className="button button-primary">
          {prospect.recommendedCta}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <section id="gallery" className="brand-section gallery-section">
        <div className="section-heading">
          <p className="eyebrow">Before & after images</p>
          <h2>See the kind of roof work homeowners trust {prospect.shortName} to handle.</h2>
        </div>
        <div className="gallery-grid">
          {prospect.projectImages.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.label} />
              <figcaption>
                <Images size={16} aria-hidden="true" />
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="review-band">
        <div className="review-score">
          <BadgeCheck size={30} aria-hidden="true" />
          <strong>{reviewHeading}</strong>
          <span>{reviewSubline}</span>
        </div>
        {prospect.reviewQuote ? <blockquote>"{prospect.reviewQuote}"</blockquote> : null}
      </section>

      <section className="brand-section services-form">
        <div className="services-card">
          <p className="eyebrow">Storm-related services</p>
          <h2>Roofing help for common storm concerns.</h2>
          <div className="service-list">
            {prospect.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>

        <div className="lead-form followup-card">
          <p className="eyebrow">Ready when you are</p>
          <h2>Tell {prospect.shortName} what happened.</h2>
          <p>{prospect.formReassurance}</p>
          <div className="followup-actions">
            <a href="#inspection-form" className="button button-primary">
              Use the Inspection Form
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={prospect.phoneHref} className="button button-ghost">
              <Phone size={18} aria-hidden="true" />
              {prospect.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="brand-section faq-section">
        <div className="section-heading centered">
          <p className="eyebrow">Frequently asked questions</p>
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

      <section className="brand-final-cta">
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
