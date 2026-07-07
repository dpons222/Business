import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import type { MedSpaDemo } from "../lib/medSpaDemos";

type MedSpaTreatmentConsultPageProps = {
  demo: MedSpaDemo;
};

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function LinkIcon({ href }: { href: string }) {
  return isExternalHref(href) ? (
    <ExternalLink size={16} aria-hidden="true" />
  ) : (
    <ArrowRight size={16} aria-hidden="true" />
  );
}

export function MedSpaTreatmentConsultPage({ demo }: MedSpaTreatmentConsultPageProps) {
  const primaryCtaHref = demo.primaryCtaHref ?? demo.sourceUrl;
  const bookingCtaHref = demo.bookingCtaHref ?? primaryCtaHref;
  const treatmentPathHeading =
    demo.treatmentPathHeading ?? "Make the next step easier to choose.";
  const treatmentPathIntro =
    demo.treatmentPathIntro ??
    "Visitors should not have to compare every service before they know what to do next. This page gives them one focused path into the consultation or booking flow.";
  const consultationHeading = demo.consultationHeading ?? "Keep the consultation flow simple.";
  const consultationIntro =
    demo.consultationIntro ??
    "The page keeps the current booking or consultation path visible while visitors review the treatment context.";
  const trustHeading = demo.trustHeading ?? "Use the treatment details already available.";
  const trustIntro =
    demo.trustIntro ??
    "The public site already gives enough service context to support a focused visitor path.";
  const hasExpandedClinicContent = Boolean(
    demo.featuredServices?.length ||
      demo.consultationChoices?.length ||
      demo.teamMembers?.length ||
      demo.galleryImages?.length ||
      demo.reviewThemes?.length ||
      demo.addressLines?.length,
  );
  const navItems = [
    { href: "#services", label: "Services", visible: hasExpandedClinicContent },
    { href: "#first-visit", label: "First visit", visible: true },
    { href: "#team", label: "Team", visible: Boolean(demo.teamMembers?.length) },
    { href: "#reviews", label: "Reviews", visible: Boolean(demo.reviewThemes?.length) },
    { href: "#visit", label: "Visit", visible: Boolean(demo.addressLines?.length) },
  ].filter((item) => item.visible);
  const themeStyle = {
    "--medspa-primary": demo.theme.primary,
    "--medspa-primary-dark": demo.theme.primaryDark,
    "--medspa-accent": demo.theme.accent,
    "--medspa-accent-soft": demo.theme.accentSoft,
  } as CSSProperties;

  return (
    <main
      className={`medspa-page${hasExpandedClinicContent ? " medspa-page-expanded" : ""}`}
      style={themeStyle}
    >
      {demo.promo ? (
        <aside className="medspa-promo-strip" aria-label={demo.promo.label}>
          <span>{demo.promo.label}</span>
          <strong>{demo.promo.title}</strong>
          <p>{demo.promo.body}</p>
          <a href={demo.promo.ctaHref}>
            {demo.promo.ctaLabel}
            <LinkIcon href={demo.promo.ctaHref} />
          </a>
        </aside>
      ) : null}

      <header className="medspa-header">
        <a className="medspa-brand" href="#top" aria-label={`${demo.businessName} page`}>
          <span className="medspa-brand-mark">
            {demo.logoUrl ? (
              <img src={demo.logoUrl} alt={`${demo.businessName} logo`} />
            ) : (
              demo.shortName.slice(0, 3).toUpperCase()
            )}
          </span>
          <span>
            <strong>{demo.businessName}</strong>
            <small>{demo.city}</small>
          </span>
        </a>
        <nav className="medspa-nav" aria-label="Page sections">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary" href={primaryCtaHref}>
            <CalendarCheck size={16} aria-hidden="true" />
            {demo.primaryCtaLabel}
          </a>
        </nav>
      </header>

      <section id="top" className="medspa-hero">
        <div className="medspa-hero-copy">
          <p className="eyebrow">{demo.eyebrow}</p>
          {demo.heroBadge ? <span className="medspa-hero-badge">{demo.heroBadge}</span> : null}
          <h1>{demo.headline}</h1>
          <p>{demo.subheadline}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={primaryCtaHref}>
              <CalendarCheck size={17} aria-hidden="true" />
              {demo.primaryCtaLabel}
            </a>
            {demo.bookingCtaLabel ? (
              <a className="button button-ghost" href={bookingCtaHref}>
                {demo.bookingCtaLabel}
                <LinkIcon href={bookingCtaHref} />
              </a>
            ) : (
              <a className="button button-ghost" href="#treatment-path">
                {demo.secondaryCtaLabel}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            )}
            {demo.phoneHref && demo.phone ? (
              <a className="button button-ghost" href={demo.phoneHref}>
                <Phone size={17} aria-hidden="true" />
                {demo.phone}
              </a>
            ) : null}
          </div>
          {demo.heroStats?.length ? (
            <dl className="medspa-hero-stats">
              {demo.heroStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="medspa-hero-visual" aria-label={`${demo.businessName} visit path`}>
          {demo.heroImageUrl ? (
            <img src={demo.heroImageUrl} alt={`${demo.businessName} location`} />
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
            <span>Start with</span>
            <strong>{demo.treatmentFocus}</strong>
          </div>
        </div>
      </section>

      {hasExpandedClinicContent ? (
        <>
          <section id="services" className="medspa-section medspa-service-showcase">
            <div className="medspa-section-heading">
              <p className="eyebrow">Choose a starting point</p>
              <h2>{treatmentPathHeading}</h2>
              <p>{treatmentPathIntro}</p>
            </div>
            <div className="medspa-service-grid">
              {(demo.featuredServices ?? []).map((service) => (
                <article className="medspa-service-card" key={service.title}>
                  <span>{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <a href={service.href}>
                    {service.ctaLabel}
                    <LinkIcon href={service.href} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="first-visit" className="medspa-section medspa-consult-section">
            <div className="medspa-consult-copy">
              <p className="eyebrow">Free consultation</p>
              <h2>{consultationHeading}</h2>
              <p>{consultationIntro}</p>
              <div className="medspa-process-grid">
                {demo.consultationSteps.map((step, index) => (
                  <article className="medspa-process-card" key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside id="visit" className="medspa-visit-card">
              <p className="eyebrow">Visit Lazaderm Chandler</p>
              <h3>{demo.businessName}</h3>
              {demo.locationIntro ? <p>{demo.locationIntro}</p> : null}
              {demo.addressLines?.length ? (
                <address>
                  <MapPin size={18} aria-hidden="true" />
                  <span>{demo.addressLines.join(", ")}</span>
                </address>
              ) : null}
              {demo.hours?.length ? (
                <ul>
                  {demo.hours.map((hour) => (
                    <li key={hour}>{hour}</li>
                  ))}
                </ul>
              ) : null}
              <div className="medspa-visit-actions">
                <a className="button button-primary" href={primaryCtaHref}>
                  <CalendarCheck size={16} aria-hidden="true" />
                  {demo.primaryCtaLabel}
                </a>
                {demo.phoneHref && demo.phone ? (
                  <a className="button button-ghost" href={demo.phoneHref}>
                    <Phone size={16} aria-hidden="true" />
                    Call {demo.phone}
                  </a>
                ) : null}
              </div>
            </aside>
          </section>

          {demo.consultationChoices?.length ? (
            <section className="medspa-section medspa-choice-section" aria-label="Consult options">
              <div className="medspa-section-heading">
                <p className="eyebrow">Consult paths</p>
                <h2>{demo.visitorQuestion}</h2>
              </div>
              <div className="medspa-choice-grid">
                {demo.consultationChoices.map((choice) => (
                  <article className="medspa-choice-card" key={choice.title}>
                    <Sparkles size={20} aria-hidden="true" />
                    <h3>{choice.title}</h3>
                    <p>{choice.body}</p>
                    {choice.href && choice.ctaLabel ? (
                      <a href={choice.href}>
                        {choice.ctaLabel}
                        <LinkIcon href={choice.href} />
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {demo.galleryImages?.length ? (
            <section className="medspa-section medspa-gallery-section" aria-label="Clinic images">
              <div className="medspa-gallery-grid">
                {demo.galleryImages.map((image) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={image.alt} />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {demo.teamMembers?.length ? (
            <section id="team" className="medspa-section medspa-team-section">
              <div className="medspa-section-heading">
                <p className="eyebrow">Chandler team</p>
                <h2>{trustHeading}</h2>
                <p>{trustIntro}</p>
              </div>
              <div className="medspa-team-grid">
                {demo.teamMembers.map((member) => (
                  <article className="medspa-team-card" key={member.name}>
                    <img src={member.imageUrl} alt={member.name} />
                    <div>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section id="reviews" className="medspa-section medspa-trust-reviews">
            <div>
              <p className="eyebrow">Why visitors choose this path</p>
              <h2>Services, location, and comfort cues stay close to the next step.</h2>
              <ul>
                {demo.trustSignals.map((signal) => (
                  <li key={signal}>
                    <Star size={16} aria-hidden="true" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
            {demo.reviewThemes?.length ? (
              <div className="medspa-review-theme-grid">
                {demo.reviewThemes.map((theme) => (
                  <article className="medspa-review-theme" key={theme.title}>
                    <span>Review theme</span>
                    <h3>{theme.title}</h3>
                    <p>{theme.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        </>
      ) : (
        <>
          <section className="medspa-section medspa-question-band">
            <p className="eyebrow">Start here</p>
            <h2>{demo.visitorQuestion}</h2>
          </section>

          <section id="treatment-path" className="medspa-section medspa-split">
            <div>
              <p className="eyebrow">Service path</p>
              <h2>{treatmentPathHeading}</h2>
              <p>{treatmentPathIntro}</p>
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
              <h2>{consultationHeading}</h2>
              <p>{consultationIntro}</p>
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
              <p className="eyebrow">Why visitors choose this path</p>
              <h2>{trustHeading}</h2>
              <p>{trustIntro}</p>
            </div>
            <ul>
              {demo.trustSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="medspa-final-cta">
        <p>{demo.finalNote}</p>
        <div className="medspa-final-actions">
          <a className="button button-primary" href={primaryCtaHref}>
            <CalendarCheck size={17} aria-hidden="true" />
            {demo.primaryCtaLabel}
          </a>
          {demo.bookingCtaLabel ? (
            <a className="button button-ghost" href={bookingCtaHref}>
              {demo.bookingCtaLabel}
              <LinkIcon href={bookingCtaHref} />
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
