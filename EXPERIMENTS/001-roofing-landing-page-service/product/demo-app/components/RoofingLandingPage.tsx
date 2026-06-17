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
  const formNote =
    variant?.formNote ?? `${prospect.companyName} is SSL secure. No downpayment. No hidden fees.`;

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
        <div className="brand-topbar">
          {prospect.alternatePhone && prospect.alternatePhoneHref ? (
            <a href={prospect.alternatePhoneHref}>{prospect.alternatePhone}</a>
          ) : null}
          <a href={prospect.phoneHref}>{prospect.phone}</a>
        </div>
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
          <a href="#services" className="header-link">
            Exterior Services
          </a>
          <a href="#insurance" className="header-link">
            Insurance Claims
          </a>
          <a href="#gallery" className="header-link">
            Photo Gallery
          </a>
          <a href="#inspection-form" className="header-link">
            Request Estimate
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
            <h1>{heroHeadline}</h1>
            <p className="hero-lede">{heroSubheadline}</p>
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
                5-star customer service
              </span>
              <span>
                <Home size={17} aria-hidden="true" />
                Frisco, McKinney, Plano, The Colony, Denton
              </span>
            </div>
          </div>

          <form id="inspection-form" className="hero-estimate-form">
            <p className="inspection-label">Request inspection</p>
            <h2>{formTitle}</h2>
            <div className="form-grid">
              <label>
                First Name
                <input type="text" name="firstName" placeholder="First name" />
              </label>
              <label>
                Last Name
                <input type="text" name="lastName" placeholder="Last name" />
              </label>
              <label>
                Phone Number
                <input type="tel" name="phone" placeholder="Best phone number" />
              </label>
              <label>
                Email Address
                <input type="email" name="email" placeholder="Email address" />
              </label>
            </div>
            <label>
              Property ZIP Code
              <input type="text" name="zip" placeholder="Property ZIP code" />
            </label>
            <label>
              What are you seeing?
              <textarea name="issue" placeholder="Hail, leak, missing shingles, or not sure yet" />
            </label>
            <button type="button" className="button button-primary full-width">
              Request Free Inspection
            </button>
            <small>{formNote}</small>
          </form>
        </div>
      </section>

      <section className="storm-alert-band">
        <div>
          <p className="eyebrow">Invest in a roof that pays you back</p>
          <h2>We make choosing a roofing contractor easy.</h2>
        </div>
        <p>
          No downpayment. No hidden fees. Request a free inspection and{" "}
          {prospect.companyName} will guide you through every step of the process.
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
            <h3>Insurance Claim Guidance</h3>
            <p>Get help understanding next steps when storm damage may involve a claim.</p>
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
            From the scope of work to materials, scheduling, financing, and repairs,
            {prospect.shortName} keeps homeowners informed so the project feels manageable.
          </p>
          <div className="help-list">
            {["Pick products and colors", "Design a game plan", "Prepare the property", "Schedule the work", "Review financing"].map(
              (item) => (
                <span key={item}>
                  <ClipboardCheck size={17} aria-hidden="true" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="brand-section process-section">
        <div className="section-heading centered">
          <p className="eyebrow">Our easy process</p>
          <h2>Meet, design, and build with fewer surprises.</h2>
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
              body: "Choose the best path for repair, replacement, materials, scheduling, and claim support.",
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
          <p className="eyebrow">Free roof damage insurance claim assistance</p>
          <h2>Get experts by your side after severe storm damage.</h2>
          <p>
            {prospect.shortName} helps prevent damage from getting worse, document roof concerns,
            and guide you through next steps with no obligation.
          </p>
        </div>
        <a href="#inspection-form" className="button button-primary">
          Request Estimate
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
          <strong>Excellent</strong>
          <span>Based on {prospect.reviewCount}</span>
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

        <form className="lead-form">
          <p className="eyebrow">Request your free estimate today</p>
          <h2>Tell us what happened.</h2>
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
            Address or ZIP code
            <input type="text" name="location" placeholder="Property location" />
          </label>
          <label>
            Details
            <textarea name="details" placeholder="Tell us about hail, wind, leaks, or visible damage" />
          </label>
          <button type="button" className="button button-primary full-width">
            Request Estimate
          </button>
        </form>
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
