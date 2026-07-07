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

type ServiceCard = NonNullable<MedSpaDemo["featuredServices"]>[number];
type ConsultationChoice = NonNullable<MedSpaDemo["consultationChoices"]>[number];
type GalleryImage = NonNullable<MedSpaDemo["galleryImages"]>[number];

const serviceEyebrows = [
  "Treatment path",
  "Consult option",
  "Booking lane",
  "Care focus",
];

function toPublicCopy(value: string) {
  return value
    .replace(/\bsource-backed\b/gi, "current")
    .replace(/\bsource-safe\b/gi, "careful")
    .replace(/\bsource material\b/gi, "the service menu")
    .replace(/\bsource pages\b/gi, "service pages")
    .replace(/\bsource site\b/gi, "website")
    .replace(/\bsource page\b/gi, "website")
    .replace(/\bpublic source material\b/gi, "the service menu")
    .replace(/\bpublic source page\b/gi, "website")
    .replace(/\bpublic site\b/gi, "website")
    .replace(/\bpublic page\b/gi, "website")
    .replace(/\bhomepage\b/gi, "website")
    .replace(/\bthis visit path\b/gi, "this page")
    .replace(/\bthe website\b/gi, "the clinic")
    .replace(/\bwebsite already\b/gi, "clinic already")
    .replace(/\bvisible on the website\b/gi, "available")
    .replace(/\bvisible on the clinic website\b/gi, "available")
    .replace(/\bvisible source-backed\b/gi, "available")
    .replace(/\bvisible\b/gi, "available")
    .replace(/\bthe demo\b/gi, "this visit path")
    .replace(/\bThis demo\b/g, "This visit path")
    .replace(/\bthis visit path\b/gi, "this page")
    .replace(/\bSource material lists\b/g, "The service menu includes")
    .replace(/\bThe website lists\b/g, "The clinic lists")
    .replace(/\bThe website says\b/g, "The clinic notes")
    .replace(/\bThe website describes\b/g, "The clinic describes")
    .replace(/\bThe website includes\b/g, "The clinic includes")
    .replace(/\bThe website provides\b/g, "The clinic provides")
    .replace(/\bThe website gives\b/g, "The clinic gives")
    .replace(/\bThe website already\b/g, "The clinic already")
    .replace(/\bThe clinic page\b/g, "The clinic")
    .replace(/\bThe clinic lists\b/g, "Clinic details include")
    .replace(/\bthe clinic lists\b/g, "clinic details include")
    .replace(/\s+/g, " ")
    .trim();
}

function splitHighlight(highlight: string) {
  const [rawTitle, ...rest] = highlight.split(":");
  if (!rest.length) {
    return {
      title: "Treatment path",
      body: highlight,
    };
  }

  return {
    title: rawTitle.trim(),
    body: rest.join(":").trim(),
  };
}

function cleanServiceTitle(title: string, index: number) {
  const cleaned = title
    .replace(/\bpath\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || serviceEyebrows[index % serviceEyebrows.length];
}

function buildServiceBody(body: string, demo: MedSpaDemo) {
  const cleaned = toPublicCopy(body)
    .replace(/\bare available treatment families\b/gi, "are available")
    .replace(/\bare available service paths\b/gi, "are available")
    .replace(/\bare available options\b/gi, "are available")
    .replace(/\bare available\b/gi, "can guide the first conversation")
    .replace(/\bis available\b/gi, "can guide the first conversation")
    .replace(/\bremain available\b/gi, "remain part of the conversation")
    .replace(/\bkept separate\b/gi, "organized separately")
    .replace(/\.$/, "")
    .trim();

  if (!cleaned) {
    return `Use this lane to choose the right ${demo.shortName} question before booking.`;
  }

  return `${cleaned}. Use this lane to bring one clear question into the visit.`;
}

function buildServiceCards(demo: MedSpaDemo, ctaHref: string): ServiceCard[] {
  return demo.serviceHighlights.slice(0, 4).map((highlight, index) => {
    const { title, body } = splitHighlight(highlight);

    return {
      title: cleanServiceTitle(title, index),
      eyebrow: serviceEyebrows[index % serviceEyebrows.length],
      body: buildServiceBody(body, demo),
      href: ctaHref,
      ctaLabel: index === 0 ? demo.primaryCtaLabel : "Start here",
    };
  });
}

function buildConsultationChoices(
  demo: MedSpaDemo,
  serviceCards: ServiceCard[],
  ctaHref: string,
): ConsultationChoice[] {
  return serviceCards.slice(0, 4).map((service) => ({
    title: `${service.title} consult`,
    body: `Choose this if your first ${demo.shortName} question is about ${service.title.toLowerCase()}.`,
    href: service.href || ctaHref,
    ctaLabel: service.ctaLabel || demo.primaryCtaLabel,
  }));
}

function buildHeroStats(demo: MedSpaDemo, serviceCards: ServiceCard[]) {
  const cityParts = demo.city.split("/");
  const cityLabel = demo.city.includes(",")
    ? "AZ"
    : cityParts[cityParts.length - 1]?.trim() || "local";

  return [
    { value: String(Math.max(serviceCards.length, 1)), label: "starting paths" },
    { value: "1", label: "clear booking step" },
    { value: cityLabel, label: "clinic context" },
  ];
}

function buildGalleryImages(): GalleryImage[] {
  return [];
}

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
  const serviceCards = (demo.featuredServices ?? buildServiceCards(demo, primaryCtaHref)).map(
    (service) => ({
      ...service,
      title: toPublicCopy(service.title),
      eyebrow: toPublicCopy(service.eyebrow),
      body: toPublicCopy(service.body),
      ctaLabel: toPublicCopy(service.ctaLabel),
    }),
  );
  const consultationChoices = (
    demo.consultationChoices ?? buildConsultationChoices(demo, serviceCards, primaryCtaHref)
  ).map((choice) => ({
    ...choice,
    title: toPublicCopy(choice.title),
    body: toPublicCopy(choice.body),
    ctaLabel: choice.ctaLabel ? toPublicCopy(choice.ctaLabel) : choice.ctaLabel,
  }));
  const galleryImages = demo.galleryImages ?? buildGalleryImages();
  const heroStats = demo.heroStats ?? buildHeroStats(demo, serviceCards);
  const treatmentPathHeading = toPublicCopy(
    demo.treatmentPathHeading ?? "Make the next step easier to choose.",
  );
  const treatmentPathIntro = toPublicCopy(
    demo.treatmentPathIntro ??
      "Visitors should not have to compare every service before they know what to do next. This page gives them one focused path into the consultation or booking flow.",
  );
  const consultationHeading = toPublicCopy(
    demo.consultationHeading ?? "Keep the consultation flow simple.",
  );
  const consultationIntro = toPublicCopy(
    demo.consultationIntro ??
      "The page keeps the current booking or consultation path available while visitors review the treatment context.",
  );
  const trustHeading = toPublicCopy(
    demo.trustHeading ?? "Use the treatment details already available.",
  );
  const trustIntro = toPublicCopy(
    demo.trustIntro ??
      "The clinic already gives enough service context to support a focused visitor path.",
  );
  const promo = demo.promo
    ? {
        ...demo.promo,
        label: toPublicCopy(demo.promo.label),
        title: toPublicCopy(demo.promo.title),
        body: toPublicCopy(demo.promo.body),
        ctaLabel: toPublicCopy(demo.promo.ctaLabel),
      }
    : null;
  const locationIntro =
    demo.locationIntro ??
    `${demo.businessName} serves ${demo.city} visitors through its current booking or contact path.`;
  const cityLabel = demo.city.split("/")[0].trim();
  const hasExpandedClinicContent = Boolean(
    serviceCards.length ||
      consultationChoices.length ||
      demo.teamMembers?.length ||
      galleryImages.length ||
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
      {promo ? (
        <aside className="medspa-promo-strip" aria-label={promo.label}>
          <span>{promo.label}</span>
          <strong>{promo.title}</strong>
          <p>{promo.body}</p>
          <a href={promo.ctaHref}>
            {promo.ctaLabel}
            <LinkIcon href={promo.ctaHref} />
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
          <p className="eyebrow">{toPublicCopy(demo.eyebrow)}</p>
          {demo.heroBadge ? (
            <span className="medspa-hero-badge">{toPublicCopy(demo.heroBadge)}</span>
          ) : null}
          <h1>{toPublicCopy(demo.headline)}</h1>
          <p>{toPublicCopy(demo.subheadline)}</p>
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
          {heroStats.length ? (
            <dl className="medspa-hero-stats">
              {heroStats.map((stat) => (
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
              <strong>{serviceCards[0]?.title ?? "Choose the treatment focus"}</strong>
              <span>02</span>
              <strong>{toPublicCopy(demo.visitorQuestion)}</strong>
              <span>03</span>
              <strong>Use the booking path</strong>
            </div>
          )}
          <div className="medspa-visual-card">
            <span>Start with</span>
            <strong>{toPublicCopy(demo.treatmentFocus)}</strong>
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
              {serviceCards.map((service) => (
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
                  <article className="medspa-process-card" key={index}>
                    <span>{index + 1}</span>
                    <p>{toPublicCopy(step)}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside id="visit" className="medspa-visit-card">
              <p className="eyebrow">Visit {demo.shortName}</p>
              <h3>{demo.businessName}</h3>
              <p>{toPublicCopy(locationIntro)}</p>
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

          {consultationChoices.length ? (
            <section className="medspa-section medspa-choice-section" aria-label="Consult options">
              <div className="medspa-section-heading">
                <p className="eyebrow">Consult paths</p>
                <h2>{toPublicCopy(demo.visitorQuestion)}</h2>
              </div>
              <div className="medspa-choice-grid">
                {consultationChoices.map((choice) => (
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

          {galleryImages.length ? (
            <section className="medspa-section medspa-gallery-section" aria-label="Clinic images">
              <div className="medspa-gallery-grid">
                {galleryImages.map((image) => (
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
                <p className="eyebrow">{cityLabel} team</p>
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
                {demo.trustSignals.map((signal, index) => (
                  <li key={index}>
                    <Star size={16} aria-hidden="true" />
                    {toPublicCopy(signal)}
                  </li>
                ))}
              </ul>
            </div>
            {demo.reviewThemes?.length ? (
              <div className="medspa-review-theme-grid">
                {demo.reviewThemes.map((theme) => (
                  <article className="medspa-review-theme" key={theme.title}>
                    <span>Review theme</span>
                    <h3>{toPublicCopy(theme.title)}</h3>
                    <p>{toPublicCopy(theme.body)}</p>
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
            <h2>{toPublicCopy(demo.visitorQuestion)}</h2>
          </section>

          <section id="treatment-path" className="medspa-section medspa-split">
            <div>
              <p className="eyebrow">Service path</p>
              <h2>{treatmentPathHeading}</h2>
              <p>{treatmentPathIntro}</p>
            </div>
            <div className="medspa-card-grid">
              {demo.serviceHighlights.map((highlight, index) => (
                <article className="medspa-mini-card" key={index}>
                  <span aria-hidden="true" />
                  <p>{toPublicCopy(highlight)}</p>
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
                <article className="medspa-process-card" key={index}>
                  <span>{index + 1}</span>
                  <p>{toPublicCopy(step)}</p>
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
              {demo.trustSignals.map((signal, index) => (
                <li key={index}>{toPublicCopy(signal)}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="medspa-final-cta">
        <p>{toPublicCopy(demo.finalNote)}</p>
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
