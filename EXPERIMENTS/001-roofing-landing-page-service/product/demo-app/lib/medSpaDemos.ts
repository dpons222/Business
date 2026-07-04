export type MedSpaDemoBatch =
  | "treatment_consultation"
  | "package_clarity"
  | "consultation_trust"
  | "proof_to_booking"
  | "booking_cleanup";

export type MedSpaDemo = {
  slug: string;
  businessName: string;
  shortName: string;
  city: string;
  sourceUrl: string;
  heroImageUrl?: string;
  theme: {
    primary: string;
    primaryDark: string;
    accent: string;
    accentSoft: string;
  };
  batch: MedSpaDemoBatch;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  treatmentFocus: string;
  visitorQuestion: string;
  serviceHighlights: string[];
  consultationSteps: string[];
  trustSignals: string[];
  finalNote: string;
};

export const medSpaDemos: MedSpaDemo[] = [
  {
    slug: "adam-eve-medical-aesthetics",
    businessName: "Adam & Eve Medical Aesthetics",
    shortName: "Adam & Eve",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.adamandevemedspa.com/",
    heroImageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/ser-img01.jpg",
    theme: {
      primary: "#5f4a45",
      primaryDark: "#2f2523",
      accent: "#b88768",
      accentSoft: "#f7ebe5",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale treatment consultation",
    headline: "A clearer first step for injectables, fillers, and facial treatments.",
    subheadline:
      "Give first-time visitors a focused path from treatment interest to consultation instead of asking them to sort through the full service menu on their own.",
    primaryCtaLabel: "Request a consultation",
    secondaryCtaLabel: "View treatments",
    treatmentFocus: "Injectables, fillers, and facial treatments",
    visitorQuestion: "Which aesthetic treatment should I ask about first?",
    serviceHighlights: [
      "Start with the most common high-intent treatment groups: injectables, fillers, and facial treatments.",
      "Use the first screen to help visitors choose a consult path before they click away to compare options.",
      "Keep the consultation action visible beside treatment context, not only after a long service scan.",
    ],
    consultationSteps: [
      "Choose the treatment category that matches the visitor's goal.",
      "Request a consultation through the clinic's booking path.",
      "Arrive with a clearer idea of what to ask the provider.",
    ],
    trustSignals: [
      "Scottsdale med spa focused on aesthetic services.",
      "Injectables, fillers, facial treatments, and laser services are part of the service mix.",
      "Consultation and contact paths are available for prospective patients.",
    ],
    finalNote:
      "This page keeps the first action simple: choose a treatment path, then request a consultation with Adam & Eve.",
  },
  {
    slug: "skinspirit-paradise-valley",
    businessName: "SkinSpirit Paradise Valley",
    shortName: "SkinSpirit",
    city: "Phoenix / Paradise Valley, AZ",
    sourceUrl: "https://www.skinspirit.com/locations/paradise-valley",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6764496e34ff7106c11cc5da/67c0fdbcc64efc8805de4ab6_Paradise-Valley%20(1).webp",
    theme: {
      primary: "#335047",
      primaryDark: "#172d28",
      accent: "#c78b61",
      accentSoft: "#f7ede6",
    },
    batch: "treatment_consultation",
    eyebrow: "Paradise Valley consultation path",
    headline: "Help Botox, filler, and facial visitors choose the right consult path.",
    subheadline:
      "The location page already supports complimentary consultation booking. A focused treatment path can give visitors more context before they choose a time.",
    primaryCtaLabel: "Book a consultation",
    secondaryCtaLabel: "Explore services",
    treatmentFocus: "Botox, fillers, and facials",
    visitorQuestion: "Should I book a consultation for Botox, fillers, or skin care?",
    serviceHighlights: [
      "Keep Botox, filler, and facial context close to the consultation action.",
      "Frame the page around natural-looking aesthetic goals without promising outcomes.",
      "Use the Paradise Valley location context so the page feels local rather than generic.",
    ],
    consultationSteps: [
      "Review the core treatment categories before booking.",
      "Use the complimentary consultation path for the Paradise Valley location.",
      "Talk with the provider about which option fits the visit.",
    ],
    trustSignals: [
      "Botox, fillers, and facials are presented for the Phoenix / Paradise Valley location.",
      "Complimentary consultation booking is available for visitors who want guidance.",
      "The location page includes local clinic context and service positioning.",
    ],
    finalNote:
      "This page does not replace the location page; it gives treatment-aware visitors a shorter path into the existing consultation flow.",
  },
  {
    slug: "it-s-a-secret-med-spa-scottsdale",
    businessName: "It's a Secret Med Spa Scottsdale",
    shortName: "It's a Secret",
    city: "Scottsdale, AZ",
    sourceUrl: "https://secretmedspa.com/scottsdale-az/",
    theme: {
      primary: "#242136",
      primaryDark: "#141221",
      accent: "#c6a15b",
      accentSoft: "#f8f0df",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale free consultation path",
    headline: "Turn a large treatment menu into one clear consultation decision.",
    subheadline:
      "The Scottsdale page includes Book Now, free consultation, injectables, laser treatments, skin rejuvenation, and body services. A focused path can help visitors decide where to start.",
    primaryCtaLabel: "Book a free consultation",
    secondaryCtaLabel: "View treatment menu",
    treatmentFocus: "Injectables, laser treatments, and skin rejuvenation",
    visitorQuestion: "Which treatment should I start with at the Scottsdale location?",
    serviceHighlights: [
      "Make free consultation the primary action for visitors still comparing treatments.",
      "Group injectables, laser treatments, and skin rejuvenation into a quick decision path.",
      "Keep Scottsdale address and booking context close to the call to action.",
    ],
    consultationSteps: [
      "Pick the category that best matches the visitor's concern.",
      "Use the current Book Now or free consultation path.",
      "Confirm treatment fit with the Scottsdale team before booking a service.",
    ],
    trustSignals: [
      "The Scottsdale location presents injectables, laser treatments, skin rejuvenation, body services, and wellness options.",
      "Book Now and free consultation actions are available for visitors.",
      "The Scottsdale address and phone number are available for local patients.",
    ],
    finalNote:
      "This page reduces treatment-menu overload by keeping the free consultation path in front of undecided visitors.",
  },
  {
    slug: "ds-skin-lips-medical-spa",
    businessName: "DS Skin & Lips Medical Spa",
    shortName: "DS Skin & Lips",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.dsskinandlips.com/botox/",
    theme: {
      primary: "#3b4a52",
      primaryDark: "#1d282d",
      accent: "#a56f62",
      accentSoft: "#f5e9e6",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale Botox consultation",
    headline: "A Botox-focused path before the appointment request.",
    subheadline:
      "The Botox page already gives visitors a treatment-specific entry point. This focused page keeps the decision simple and moves interested visitors toward the booking path.",
    primaryCtaLabel: "Book Botox appointment",
    secondaryCtaLabel: "Review Botox details",
    treatmentFocus: "Botox injections",
    visitorQuestion: "Is Botox the right first conversation for my wrinkle concerns?",
    serviceHighlights: [
      "Lead with Botox because visitors are already arriving with treatment-specific intent.",
      "Give visitors a quick expectation-setting path before the appointment click.",
      "Avoid outcome promises and keep the next step tied to the booking flow.",
    ],
    consultationSteps: [
      "Review whether Botox matches the visitor's concern.",
      "Use the existing appointment or contact path.",
      "Discuss treatment fit, timing, and expectations with the provider.",
    ],
    trustSignals: [
      "Botox injections are presented for Scottsdale visitors.",
      "Botox is positioned as a non-surgical treatment option.",
      "Appointment and contact paths are available for interested patients.",
    ],
    finalNote:
      "This page keeps Botox visitors focused on the next practical step: use the existing DS Skin & Lips booking path to ask about treatment fit.",
  },
  {
    slug: "phoenix-medspa",
    businessName: "Phoenix Medspa",
    shortName: "Phoenix Medspa",
    city: "Phoenix, AZ",
    sourceUrl: "https://phxmedspa.com/",
    theme: {
      primary: "#214c62",
      primaryDark: "#102d3c",
      accent: "#d18c4b",
      accentSoft: "#f8eadc",
    },
    batch: "treatment_consultation",
    eyebrow: "Phoenix Botox and filler path",
    headline: "Connect pricing and treatment interest to a clearer booking step.",
    subheadline:
      "Botox, Dysport, fillers, PRP therapy, and microneedling are visible treatment options. A focused path can help visitors move from comparing options to requesting an appointment.",
    primaryCtaLabel: "Request appointment",
    secondaryCtaLabel: "Compare treatment options",
    treatmentFocus: "Botox, Dysport, fillers, PRP, and microneedling",
    visitorQuestion: "Which injectable or skin treatment should I ask about first?",
    serviceHighlights: [
      "Help visitors compare Botox, Dysport, fillers, PRP, and microneedling at a high level.",
      "Keep the appointment request visible while visitors review treatment options.",
      "Keep pricing or offer details out of the page unless they are confirmed before publishing.",
    ],
    consultationSteps: [
      "Choose the treatment family the visitor wants to discuss.",
      "Use the existing appointment request path.",
      "Confirm treatment fit and pricing details directly with the clinic.",
    ],
    trustSignals: [
      "Botox, Dysport, fillers, PRP therapy, and microneedling are visible treatment options.",
      "Booking and request paths are available for interested patients.",
      "The clinic is positioned for Phoenix med spa visitors.",
    ],
    finalNote:
      "This page helps visitors bring a clearer treatment question into Phoenix Medspa's existing appointment path.",
  },
];

export function getMedSpaDemoBySlug(slug: string) {
  return medSpaDemos.find((demo) => demo.slug === slug) ?? null;
}

export function getMedSpaDemoStaticParams() {
  return medSpaDemos.map((demo) => ({ slug: demo.slug }));
}
