import "server-only";
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
  primaryCtaHref?: string;
  bookingCtaHref?: string;
  bookingCtaLabel?: string;
  phone?: string;
  phoneHref?: string;
  addressLines?: string[];
  hours?: string[];
  locationIntro?: string;
  serviceArea?: string;
  heroImageUrl?: string;
  logoUrl?: string;
  promo?: {
    label: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  heroBadge?: string;
  heroStats?: Array<{
    value: string;
    label: string;
  }>;
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
  treatmentPathHeading?: string;
  treatmentPathIntro?: string;
  serviceHighlights: string[];
  consultationHeading?: string;
  consultationIntro?: string;
  consultationSteps: string[];
  consultationChoices?: Array<{
    title: string;
    body: string;
    href?: string;
    ctaLabel?: string;
  }>;
  trustHeading?: string;
  trustIntro?: string;
  trustSignals: string[];
  featuredServices?: Array<{
    title: string;
    eyebrow: string;
    body: string;
    href: string;
    ctaLabel: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
    imageUrl: string;
  }>;
  reviewThemes?: Array<{
    title: string;
    body: string;
  }>;
  galleryImages?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  finalNote: string;
};

export const medSpaDemos: MedSpaDemo[] = [
  {
    slug: "adam-eve-medical-aesthetics",
    businessName: "Adam & Eve Medical Aesthetics",
    shortName: "Adam & Eve",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.adamandevemedspa.com/",
    primaryCtaHref: "https://www.adamandevemedspa.com/contact-us/",
    bookingCtaHref: "https://adamevemedical.zenoti.com/webstoreNew/services",
    bookingCtaLabel: "Book online",
    phone: "(480) 575-6584",
    phoneHref: "tel:+14805756584",
    addressLines: [
      "31309 N. Scottsdale Rd",
      "Suite 100",
      "Scottsdale, AZ 85266",
    ],
    hours: ["Mon - Fri: 9 am - 7 pm", "Sat: 10 am - 5 pm", "Sun: Closed"],
    locationIntro:
      "Start with a focused treatment question online, then visit Adam & Eve's North Scottsdale Road clinic for a consultation.",
    heroImageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/about-img.png",
    logoUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/adamandevemedspa-logo.png",
    heroBadge: "Complimentary patient consultation available",
    heroStats: [
      { value: "6", label: "service families" },
      { value: "9-7", label: "weekday hours" },
      { value: "N. Scottsdale", label: "clinic area" },
    ],
    theme: {
      primary: "#59433c",
      primaryDark: "#251917",
      accent: "#b88463",
      accentSoft: "#f7ece6",
    },
    batch: "treatment_consultation",
    eyebrow: "Adam & Eve Medical Aesthetics",
    headline: "Find the right Scottsdale aesthetic consultation first.",
    subheadline:
      "A focused entry point for Adam & Eve visitors choosing between injectables, laser skin treatments, facials, skin tightening, and body services before they book or request a consultation.",
    primaryCtaLabel: "Request consultation",
    secondaryCtaLabel: "Choose a treatment lane",
    treatmentFocus: "Botox, fillers, laser skin care, facials, and skin tightening",
    visitorQuestion:
      "Should I start with injectables, laser skin, facials, tightening, or body treatment?",
    treatmentPathHeading: "Choose by goal, then move straight to the right Adam & Eve next step.",
    treatmentPathIntro:
      "Adam & Eve has a wide service menu. This page organizes it around the first question Scottsdale visitors usually need answered before booking: what should I ask about first?",
    serviceHighlights: [
      "Injectables: Botox, Dysport, Juvederm, Restylane, Sculptra, Jeuveau, Xeomin, and Radiesse options help visitors start with expression lines, volume, or facial balancing.",
      "Laser and texture: Clear + Brilliant, CO2 laser resurfacing, IPL Photofacial, RF Microneedling, ResurFX, UltraClear, and laser hair removal options are grouped for skin tone, texture, and hair concerns.",
      "Aesthetic and skin care: HydraFacial, chemical peels, clinical facials, DiamondGlow, dermaplaning, microneedling, and OxyGeneo give skin-care shoppers a dedicated lane.",
      "Body, tightening, and wellness: Ultherapy, SculpSure, triLift, Aveli, hormone therapy, IV therapy, semaglutide, and tirzepatide stay available after the first consultation question is chosen.",
    ],
    consultationHeading: "A prepared consult without making visitors scan every treatment.",
    consultationIntro:
      "Pick a goal, use the consultation request or online booking path, and bring one clear question to the Scottsdale team.",
    consultationSteps: [
      "Choose one concern: expression lines, facial volume, pigment, texture, skin refresh, tightening, body contouring, or wellness support.",
      "Request a consultation or use online booking with that service family in mind.",
      "Review options with Adam & Eve's team before selecting a treatment plan.",
    ],
    consultationChoices: [
      {
        title: "Expression lines or facial balance",
        body:
          "Start here if your first question is about Botox, Dysport, Juvederm, Restylane, Sculptra, Jeuveau, Xeomin, or Radiesse.",
        href: "https://www.adamandevemedspa.com/services/injectable-dermal-fillers-scottsdale/",
        ctaLabel: "Review injectables",
      },
      {
        title: "Sun damage, tone, or texture",
        body:
          "Use this lane for IPL, Clear + Brilliant, CO2 resurfacing, RF microneedling, ResurFX, UltraClear, or laser hair removal questions.",
        href: "https://www.adamandevemedspa.com/services/laser-skin-resurfacing-scottsdale/",
        ctaLabel: "Explore lasers",
      },
      {
        title: "Facial refresh or event prep",
        body:
          "Compare HydraFacial, chemical peels, clinical facials, DiamondGlow, dermaplaning, microneedling, and OxyGeneo before scheduling.",
        href: "https://www.adamandevemedspa.com/services/aesthetic-treatments-scottsdale-az/",
        ctaLabel: "Compare facials",
      },
      {
        title: "Lift, tightening, or body concern",
        body:
          "Choose this path for Ultherapy, triLift, SculpSure, Aveli, or a body-focused consultation.",
        href: "https://www.adamandevemedspa.com/services/skin-tightening-scottsdale-az/",
        ctaLabel: "View tightening",
      },
    ],
    trustHeading: "Scottsdale team context belongs near the CTA.",
    trustIntro:
      "Adam & Eve publishes provider, technology, testimonial, contact, and office details, so the page keeps those confidence cues close to the action.",
    trustSignals: [
      "Adam & Eve lists its Scottsdale office at 31309 N. Scottsdale Rd, Suite 100.",
      "Their service menu includes injectables, laser treatments, aesthetic treatments, skin tightening, body treatments, wellness, and vaginal rejuvenation.",
      "The about page identifies Chelsea Hoese, NP, and team members including Nicole Le Rendard, Jenni Presmyk, Jennifer Olesinski, Jenna Arancibia, and Maria McGarry.",
      "Consultation details include online booking, a contact page, new patient forms, phone, and listed office hours.",
      "The about page describes Allergan Black Diamond status since 2012.",
    ],
    featuredServices: [
      {
        title: "Injectables and fillers",
        eyebrow: "Fine lines, volume, balance",
        body:
          "A clear lane for Botox, Dysport, Juvederm, Restylane, Sculptra, Jeuveau, Xeomin, Radiesse, and related filler questions.",
        href: "https://www.adamandevemedspa.com/services/injectable-dermal-fillers-scottsdale/",
        ctaLabel: "Review injectables",
      },
      {
        title: "Laser skin consultation",
        eyebrow: "Tone, pigment, texture",
        body:
          "A laser-focused path for IPL Photofacial, Clear + Brilliant, CO2 resurfacing, RF Microneedling, ResurFX, UltraClear, and laser hair removal.",
        href: "https://www.adamandevemedspa.com/services/laser-skin-resurfacing-scottsdale/",
        ctaLabel: "Explore lasers",
      },
      {
        title: "Facials and skin care",
        eyebrow: "Refresh, peel, glow",
        body:
          "A skin-care path for HydraFacial, chemical peels, clinical facials, DiamondGlow, dermaplaning, microneedling, and OxyGeneo.",
        href: "https://www.adamandevemedspa.com/services/aesthetic-treatments-scottsdale-az/",
        ctaLabel: "Compare facials",
      },
      {
        title: "Tightening and body goals",
        eyebrow: "Lift, contour, support",
        body:
          "A body and tightening lane for Ultherapy, SculpSure, triLift, Aveli, and related treatment questions before consultation.",
        href: "https://www.adamandevemedspa.com/services/skin-tightening-scottsdale-az/",
        ctaLabel: "View tightening",
      },
    ],
    teamMembers: [
      {
        name: "Chelsea Hoese",
        role: "Nurse Practitioner",
        imageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/chelsea-hoese-img.jpg",
      },
      {
        name: "Nicole Le Rendard",
        role: "RN, nurse injector",
        imageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/nicole-le-rendard-img.jpg",
      },
      {
        name: "Jennifer Olesinski",
        role: "LME, CLT",
        imageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/jennifer-img.jpg",
      },
      {
        name: "Jenna Arancibia",
        role: "LME, CLT",
        imageUrl: "https://www.adamandevemedspa.com/wp-content/uploads/2024/11/Jenna-Arancibia.jpg",
      },
    ],
    reviewThemes: [
      {
        title: "First-visit comfort",
        body:
          "Testimonials on Adam & Eve's site mention first-time visits, clear information, and confidence returning for more care.",
      },
      {
        title: "Provider trust",
        body:
          "Review excerpts refer to knowledgeable staff, answered questions, and trust with face-focused treatments.",
      },
      {
        title: "Treatment guidance",
        body:
          "The page keeps those comfort cues beside the consultation step so a new visitor can choose a path with less guesswork.",
      },
    ],
    galleryImages: [
      {
        src: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/about-img.png",
        alt: "Adam & Eve Medical Aesthetics consultation setting",
        caption: "Scottsdale consultation setting",
      },
      {
        src: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/ourservices-injectables.jpg",
        alt: "Adam & Eve injectables service image",
        caption: "Injectables and fillers",
      },
      {
        src: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/Laser-Treatments.jpg",
        alt: "Adam & Eve laser treatments service image",
        caption: "Laser skin treatments",
      },
      {
        src: "https://www.adamandevemedspa.com/wp-content/uploads/2022/09/Aesthetic-Treatments-e1685067108573.jpg",
        alt: "Adam & Eve aesthetic treatments service image",
        caption: "Facials and skin care",
      },
    ],
    finalNote:
      "Choose the treatment lane that best matches your goal, then request an Adam & Eve consultation or book online with a clearer first question.",
  },
  {
    slug: "all-about-me-medical-aesthetics",
    businessName: "All About Me Medical Aesthetics",
    shortName: "All About Me",
    city: "Phoenix, AZ",
    sourceUrl: "https://allaboutmeaz.com/",
    primaryCtaHref: "https://allaboutmeaz.com/",
    heroImageUrl: "https://allaboutmeaz.com/_static_/background/og-image.jpg",
    logoUrl: "https://allaboutmeaz.com/_static_/logos/logo.png",
    theme: {
      primary: "#856247",
      primaryDark: "#2a2421",
      accent: "#c79b67",
      accentSoft: "#f7eee6",
    },
    batch: "treatment_consultation",
    eyebrow: "Phoenix service-to-consult path",
    headline: "Turn a broad aesthetics menu into one consult-ready path.",
    subheadline:
      "A focused All About Me page for Phoenix visitors who are interested in injectables, body contouring, skin treatments, or medical weight loss but need one clear next step.",
    primaryCtaLabel: "Book a consult",
    secondaryCtaLabel: "Choose a service path",
    treatmentFocus: "Injectables, body contouring, skin treatments, and wellness consults",
    visitorQuestion:
      "I see several treatment options. Which one should I ask about first when I book?",
    treatmentPathHeading: "Guide visitors by intent before the Zenoti booking click.",
    treatmentPathIntro:
      "All About Me already has strong service breadth, a first-visit offer, testimonials, and a booking path. This demo organizes the first decision before visitors leave for scheduling.",
    serviceHighlights: [
      "Refresh path: Botox, fillers, chemical peels, microneedling, and laser services are visible source-backed options.",
      "Body and wellness path: CoolSculpting and medical weight loss content are visible, but the page keeps outcome language conservative.",
      "New-patient path: the public page describes one-on-one consultations and a first-visit offer, so the booking action can sit beside that context.",
    ],
    consultationHeading: "Give new patients a tighter first-visit script.",
    consultationIntro:
      "The public site says consultations are a one-on-one conversation about skin and aesthetic goals. This page helps the visitor arrive with one clear focus.",
    consultationSteps: [
      "Pick the starting point: injectables, skin texture, body contouring, or wellness-supported weight loss.",
      "Use All About Me's booking path to choose the consultation or service starting point.",
      "Bring the service goal into the visit so the provider team can guide the next step.",
    ],
    trustHeading: "Keep proof near the consult action.",
    trustIntro:
      "The public page includes provider expertise, reviews, address, phone, hours, and testimonials. The demo keeps those support points close to the booking path.",
    trustSignals: [
      "The Phoenix office is listed at 34406 N. 27th Dr. Building 4, Suite 128.",
      "The source site lists a Zenoti booking path, phone number, business hours, testimonials, and social/review links.",
      "Provider and team copy is visible on the source site, including Dr. Leslie Predmore and clinical-grade skincare positioning.",
    ],
    finalNote:
      "This page gives a first-time All About Me visitor one focused consult path before the scheduling step.",
  },
  {
    slug: "arcadia-wellness-center",
    businessName: "Arcadia Wellness Center",
    shortName: "Arcadia Wellness",
    city: "Phoenix / Arcadia, AZ",
    sourceUrl: "https://arcadiawellnesscenter.com/",
    primaryCtaHref: "https://arcadiawellnesscenter.com/book-appointment/",
    heroImageUrl:
      "https://arcadiawellnesscenter.com/wp-content/uploads/2024/04/240404113313-arcadia-wellness-1025x1536.jpg.webp",
    logoUrl:
      "https://arcadiawellnesscenter.com/wp-content/uploads/2022/05/awc_2019logo_forweb1.png",
    theme: {
      primary: "#4f6f67",
      primaryDark: "#1d332f",
      accent: "#b7925e",
      accentSoft: "#f2ecdf",
    },
    batch: "package_clarity",
    eyebrow: "Arcadia aesthetics path",
    headline: "Separate aesthetics from wellness so visitors know where to start.",
    subheadline:
      "A focused Arcadia Wellness page for Phoenix visitors comparing Botox, fillers, laser services, hormone care, and weight-loss support.",
    primaryCtaLabel: "Book appointment",
    secondaryCtaLabel: "See aesthetic path",
    treatmentFocus: "Aesthetics, laser services, Botox, fillers, and wellness support",
    visitorQuestion:
      "I want aesthetic help, but this clinic also offers wellness care. Which path should I choose first?",
    treatmentPathHeading: "Make the aesthetics route visible before broader wellness services.",
    treatmentPathIntro:
      "Arcadia Wellness has a broad whole-person service mix. This page gives aesthetic visitors a clean first path while still preserving the clinic's wellness context.",
    serviceHighlights: [
      "Aesthetics and laser path: peels, microneedling, IPL photofacial, and fractional laser resurfacing are listed on the source page.",
      "Cosmetic injections path: Botox, Juvederm, Kybella, and related nonsurgical treatments are listed for aging concerns.",
      "Wellness support path: hormone therapy, weight loss, food allergies, pain management, and general medical care remain clearly separate from the aesthetic starting point.",
    ],
    consultationHeading: "Reduce the first-click decision.",
    consultationIntro:
      "The source page includes Book Appointment, contact, phone, email, and service links. The demo makes the first click clearer for aesthetic visitors.",
    consultationSteps: [
      "Choose whether the visit is aesthetic, laser-focused, injection-focused, or wellness-focused.",
      "Use Arcadia Wellness Center's booking page to request the appropriate appointment.",
      "Use phone or email only when the visitor needs help choosing between aesthetics and wellness care.",
    ],
    trustHeading: "Use local clinic context without mixing service promises.",
    trustIntro:
      "The public page provides service categories, client comments, address, hours, phone, email, and the clinic's Arcadia positioning.",
    trustSignals: [
      "The clinic lists 2850 East Camelback Road #175, Phoenix, AZ 85016.",
      "The source page lists phone, email, weekday hours, Book Appointment, Contact Us, and telemedicine availability.",
      "The public footer describes the clinic as offering hormone optimization, medical weight loss, Botox and fillers, laser services, pain management, vitamin supplementation, and general medical care.",
    ],
    finalNote:
      "This page helps Arcadia visitors decide whether they are booking for aesthetics or wellness before they reach the appointment flow.",
  },
  {
    slug: "arizona-medical-medspa",
    businessName: "Arizona Medical Medspa",
    shortName: "AZ Medical",
    city: "Scottsdale, AZ",
    sourceUrl: "https://arizonamedicalmedspa.com/",
    primaryCtaHref: "https://www.vagaro.com/arizonamobilemedicineandbotox/book-now",
    logoUrl:
      "https://img1.wsimg.com/isteam/ip/e59d4322-0a7c-4b9d-82e2-8df5d433ccaa/6c7401d9-304b-4ca8-9d48-739a562766e5.png",
    theme: {
      primary: "#526c73",
      primaryDark: "#22343a",
      accent: "#b88a5f",
      accentSoft: "#f4ece5",
    },
    batch: "consultation_trust",
    eyebrow: "Scottsdale first-visit path",
    headline: "Know what to ask before the injectable appointment.",
    subheadline:
      "A consultation-first path for Scottsdale visitors comparing Botox, Dysport, fillers, Sculptra, Kybella, and CO2 laser options before scheduling.",
    primaryCtaLabel: "Book appointment",
    secondaryCtaLabel: "Plan the first visit",
    treatmentFocus: "Botox, Dysport, fillers, Sculptra, Kybella, and CO2 laser",
    visitorQuestion:
      "I am ready to schedule, but what should I ask about first when I book Botox, Dysport, or filler?",
    treatmentPathHeading: "Turn heavy appointment intent into a clearer first visit.",
    treatmentPathIntro:
      "Arizona Medical Medspa already promotes scheduling and a broad injectable menu. This page gives a new client a focused way to prepare before using the Vagaro booking flow.",
    serviceHighlights: [
      "Injectable path: Botox, Dysport, Juvederm, Restylane, Sculptra, Kybella, and filler services are visible in public source material.",
      "Laser path: advanced CO2 laser treatments are part of the public service positioning and should stay separate from injectable decision copy.",
      "Provider path: source material positions the service around an experienced physician assistant, so the page can frame the booking as a provider-guided conversation.",
    ],
    consultationHeading: "Make the post-schedule expectation simple.",
    consultationIntro:
      "The demo does not promise treatment results. It helps the visitor decide what concern to bring into the appointment request.",
    consultationSteps: [
      "Choose the main concern: lines, volume, lips, skin texture, or laser resurfacing.",
      "Use the current Vagaro booking path for Arizona Medical Medspa.",
      "Bring one focused question into the first visit so the provider can guide fit, timing, and expectations.",
    ],
    trustHeading: "Keep the medical positioning careful and source-backed.",
    trustIntro:
      "The public site and scheduling profile give enough detail to frame a safe consultation path without adding clinical claims.",
    trustSignals: [
      "The public site title currently reads Arizona Mobile Medicine, while public copy also uses Arizona Medical Medspa positioning.",
      "Source material lists Botox, Dysport, fillers, Kybella, Sculptra, PRP, laser, and online scheduling.",
      "The public copy references a highly trained physician assistant with over 21 years of experience; do not expand that into unsupported medical claims.",
    ],
    finalNote:
      "This page gives an Arizona Medical Medspa visitor one focused appointment question before they enter the Vagaro scheduling path.",
  },
  {
    slug: "beautify-spa",
    businessName: "Beautify Spa",
    shortName: "Beautify",
    city: "Scottsdale, AZ",
    sourceUrl: "https://lovebeautify.com/",
    primaryCtaHref: "https://lovebeautify.com/",
    heroImageUrl: "https://lovebeautify.com/wp-content/uploads/2026/01/featured-image-1024x510.png",
    logoUrl:
      "https://wp-assets.pilotpractice.com/lovebeautify.com/2026/01/beauy-fy-geader-logo.png",
    theme: {
      primary: "#7a5548",
      primaryDark: "#2b1f1c",
      accent: "#d2a65f",
      accentSoft: "#f8eddb",
    },
    batch: "package_clarity",
    eyebrow: "Scottsdale Tox Club path",
    headline: "Make the Tox Club choice easier before booking.",
    subheadline:
      "A Beautify-specific membership path for Scottsdale visitors comparing Botox, fillers, facials, lasers, and the Tox Club offer.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "Review Tox Club path",
    treatmentFocus: "Tox Club, injectables, facials, lasers, and filler savings",
    visitorQuestion:
      "Should I book a single injectable visit, or does the Tox Club fit how often I come in?",
    treatmentPathHeading: "Turn a strong club offer into a clearer first decision.",
    treatmentPathIntro:
      "Beautify already has strong proof and a visible Tox Club offer. This page makes the membership decision easier before visitors click Book Now or call the Scottsdale spa.",
    serviceHighlights: [
      "Tox Club path: the public page describes monthly membership options, up to 50 units, filler discounts, bonus treatments/products, and VIP savings.",
      "Single-visit path: Botox, fillers, facials, lasers, and specialty treatments remain available for visitors who are not ready for membership.",
      "Proof path: Beautify publicly positions itself around 14+ years in business, nearly 10,000 5-star reviews, and a 95.6% client approval rating.",
    ],
    consultationHeading: "Keep booking tied to the visitor's commitment level.",
    consultationIntro:
      "The demo separates one-time treatment interest from repeat-care membership interest so a visitor can book with the right question in mind.",
    consultationSteps: [
      "Choose whether the visitor is exploring a one-time tox visit, filler visit, facial, laser service, or membership path.",
      "Use Beautify's Book Now flow or call the Scottsdale phone number shown on the source site.",
      "Ask the team whether the Tox Club or a single treatment visit fits the visitor's timing and goals.",
    ],
    trustHeading: "Use Beautify's existing proof without adding promises.",
    trustIntro:
      "The public page already provides the proof and membership details needed for a strong page; the demo should not invent additional benefits.",
    trustSignals: [
      "Beautify lists Scottsdale medspa services including facials, laser and specialty treatments, injectables, Tox Club, and lasers.",
      "The public page lists phone number 480-970-1395 and visible Book Now actions.",
      "The source page describes Tox Club details, review volume, customer satisfaction language, and long-running business history.",
    ],
    finalNote:
      "This page gives Beautify visitors a clearer choice: book a single service now or ask whether Tox Club fits their repeat-treatment plan.",
  },
  {
    slug: "bellagio-med-spa-arcadia",
    businessName: "Bellagio Med Spa - Arcadia",
    shortName: "Bellagio",
    city: "Phoenix / Arcadia, AZ",
    sourceUrl: "https://www.bellagiomedicalspa.com/",
    primaryCtaHref: "https://www.bellagiomedicalspa.com/services/microneedling",
    heroImageUrl:
      "https://cdn.prod.website-files.com/675a9513da7423975479c5e8%2F6760dd7fb3193f26b40ee4a6_HORIZONTAL%20-%20SITE%20VIDEO-poster-00001.jpg",
    logoUrl:
      "https://cdn.prod.website-files.com/675a9513da7423975479c5e8/675b5163be25a81d1e8d563e_bellagio%20logo.webp",
    theme: {
      primary: "#6d5747",
      primaryDark: "#261f1a",
      accent: "#c7965b",
      accentSoft: "#f6ebdc",
    },
    batch: "package_clarity",
    eyebrow: "Arcadia consultation path",
    headline: "Choose the right program before the complimentary consultation.",
    subheadline:
      "A Bellagio Med Spa Arcadia path for visitors comparing injectables, skin treatments, body contouring, programs, financing, and consultation options.",
    primaryCtaLabel: "Book consultation",
    secondaryCtaLabel: "Compare first steps",
    treatmentFocus: "Programs, injectables, skin treatments, body contouring, and financing",
    visitorQuestion:
      "Do I need a treatment, a program, financing information, or a complimentary consultation first?",
    treatmentPathHeading: "Put the Arcadia first-visit decision before the full service menu.",
    treatmentPathIntro:
      "Bellagio already shows broad services, structured programs, financing, and complimentary consultation paths. This demo makes the first step easier for an Arcadia visitor.",
    serviceHighlights: [
      "Consultation path: the public site points visitors to a complimentary consultation and Zenoti booking.",
      "Program path: source pages reference structured programs and treatment planning, which should lead into consult guidance instead of a hard sell.",
      "Decision support path: CareCredit, PatientFi, Affirm, and HFD financing partners are visible source-backed support points.",
    ],
    consultationHeading: "Use the consultation to sort service, program, and payment questions.",
    consultationIntro:
      "The page keeps financing visible as decision support, while the primary action remains the consultation.",
    consultationSteps: [
      "Choose the reason for the visit: skin, injectables, body, wellness-style program, or financing question.",
      "Use Bellagio's current Zenoti consultation booking path.",
      "Ask the Arcadia team how the selected service or program fits the visitor's goals and budget questions.",
    ],
    trustHeading: "Keep Arcadia details and financing context close to action.",
    trustIntro:
      "The source site and public directory listings provide enough local and payment context to make the route feel specific.",
    trustSignals: [
      "Public listings identify Bellagio Med Spa - Arcadia at 4290 E Indian School Rd, Suite 111, Phoenix, AZ 85018.",
      "The source site says first visits begin with a complimentary consultation and a personalized treatment plan discussion.",
      "The source site lists CareCredit, PatientFi, Affirm, and HFD as flexible payment-plan partners.",
    ],
    finalNote:
      "This page helps an Arcadia visitor decide what they need to ask before booking Bellagio's complimentary consultation.",
  },
  {
    slug: "body-health-restoration-center-paradise-valley",
    businessName: "Body + Health Restoration Center Paradise Valley",
    shortName: "BHRC",
    city: "Paradise Valley / Phoenix, AZ",
    sourceUrl: "https://www.bhrcenter.com/location/paradise-valley-az/",
    primaryCtaHref:
      "https://dashboard.boulevard.io/booking/businesses/16efc1a2-a78b-47e7-a1e1-4056243ac27b/widget?locationId=6170c72a-0e3b-47d7-afaf-af96e1c1cd4e",
    heroImageUrl:
      "https://www.bhrcenter.com/wp-content/uploads/bhrc/paradise-valley-az/provider-karrie.png",
    logoUrl: "https://www.bhrcenter.com/wp-content/uploads/2024/11/logo.svg",
    theme: {
      primary: "#24433f",
      primaryDark: "#132624",
      accent: "#c6a36a",
      accentSoft: "#f5eee1",
    },
    batch: "package_clarity",
    eyebrow: "Paradise Valley aesthetics path",
    headline: "Choose aesthetics first, then book the right complimentary consult.",
    subheadline:
      "A Paradise Valley path for visitors who want Botox, Dysport, fillers, lip enhancement, laser resurfacing, or skin rejuvenation without sorting through every longevity and wellness option first.",
    primaryCtaLabel: "Book consultation",
    secondaryCtaLabel: "Choose aesthetic path",
    treatmentFocus: "Aesthetic consults, injectables, skin, laser, and body options",
    visitorQuestion:
      "I want an aesthetic visit, but should I start with injectables, skin and laser care, or a body-focused consultation?",
    treatmentPathHeading: "Separate the aesthetic decision from the full wellness menu.",
    treatmentPathIntro:
      "BHRC Paradise Valley combines aesthetics, longevity medicine, and performance/body services. This path keeps aesthetic visitors focused on the most relevant first question before they enter the booking flow.",
    serviceHighlights: [
      "Regenerative aesthetics path: Botox and Dysport, dermal fillers, lip enhancement, Morpheus8, laser resurfacing, and chemical peels are visible Paradise Valley options.",
      "Skin rejuvenation path: HydraFacial, microneedling, IPL photofacial, Clear + Brilliant, skin rejuvenation, and acne treatment can sit together as a skin-first choice.",
      "Body and wellness boundary: CoolSculpting, Emsculpt NEO, medical weight loss, hormone therapy, IV drips, and NAD+ stay available without crowding the aesthetic consultation path.",
    ],
    consultationHeading: "Use the complimentary consultation to sort the first visit.",
    consultationIntro:
      "The strongest first step for an undecided aesthetic visitor is a complimentary consultation at the Paradise Valley location, with the treatment category already narrowed.",
    consultationSteps: [
      "Choose the first concern: facial balancing, lip enhancement, skin texture, laser resurfacing, or body contouring.",
      "Book the Paradise Valley consultation through BHRC's current Boulevard scheduling path.",
      "Ask the provider team which aesthetic option fits the visit before comparing wellness or longevity services.",
    ],
    trustHeading: "Keep the Paradise Valley proof close to the booking action.",
    trustIntro:
      "The public location page already gives local address, hours, provider context, consultation details, and service categories that support a specific first-visit path.",
    trustSignals: [
      "BHRC lists the Paradise Valley location at 10633 N. Tatum Blvd, Ste 104, Phoenix, AZ 85028.",
      "The page presents complimentary consultations, same-day appointment availability, MD/NP licensed providers, and a 4.9-star Google rating.",
      "The provider section names Karrie Bargo, NP; Alysa Christianson; and Stephanie Heringer, RN with aesthetic, laser, injectable, and body-contouring context.",
    ],
    finalNote:
      "A Paradise Valley visitor can enter the consultation with one clear aesthetic direction instead of comparing every service category at once.",
  },
  {
    slug: "chandler-med-spa",
    businessName: "Chandler Med Spa",
    shortName: "CMS",
    city: "Chandler, AZ",
    sourceUrl: "https://chandlermedspa.com/",
    primaryCtaHref: "https://www.vagaro.com/chandlermedspa/book-now",
    theme: {
      primary: "#2f5d68",
      primaryDark: "#173139",
      accent: "#d8a15e",
      accentSoft: "#f8ead8",
    },
    batch: "booking_cleanup",
    eyebrow: "Chandler booking path",
    headline: "Pick the treatment goal first, then reserve the consult.",
    subheadline:
      "A cleaner Chandler Med Spa path that moves visitors past repeated account navigation and into Botox, laser hair removal, weight-loss, skin, and wrinkle-reduction options.",
    primaryCtaLabel: "Reserve consultation",
    secondaryCtaLabel: "Choose treatment goal",
    treatmentFocus: "Botox, laser hair removal, weight loss shots, skin treatments, and wrinkle reduction",
    visitorQuestion:
      "I want to book, but which Chandler Med Spa service should I ask about first?",
    treatmentPathHeading: "Put one booking action beside the main treatment choices.",
    treatmentPathIntro:
      "Visitors already have a Vagaro booking path, a contact page, and service pages. This version makes the first booking decision cleaner by grouping the visible services before the reservation click.",
    serviceHighlights: [
      "Refresh path: Botox, wrinkle reduction, laser photo facials, chemical peels, traditional microneedling, and RF microneedling are visible service options.",
      "Body and wellness path: medical weight-loss shots, cellulite and fat reduction, toning, spider vein removal, and vascular/pigmented lesion reduction can be framed as a separate consult question.",
      "Booking path: the free consultation CTA, Vagaro booking link, and contact page stay consistent instead of competing with account/sign-in text.",
    ],
    consultationHeading: "Make the first booking feel intentional.",
    consultationIntro:
      "A visitor should be able to choose a treatment goal and reserve a free consultation without scrolling through repeated navigation or account links.",
    consultationSteps: [
      "Select the goal: Botox or wrinkle reduction, laser hair removal, skin resurfacing, weight-loss support, or body-focused treatment.",
      "Use Chandler Med Spa's current Vagaro booking path to reserve the consultation.",
      "Bring the chosen service goal into the visit so the team can guide the right treatment conversation.",
    ],
    trustHeading: "Use the owner and service context already visible.",
    trustIntro:
      "The public page provides enough local and team context to make the booking path feel specific without adding unsupported claims.",
    trustSignals: [
      "The homepage positions Chandler Med Spa as a Chandler, AZ beauty and wellness destination.",
      "The owner section names Kristi Preston, PA-C, and Shanon Preston, certified laser technician.",
      "The visible menu includes Botox, laser hair removal, wrinkle and fat reduction, medical weight loss, prices, contact, and pre/post-care videos.",
    ],
    finalNote:
      "The page gives Chandler visitors one practical path: choose the treatment goal, then reserve the free consultation.",
  },
  {
    slug: "skin-savvy-aesthetics",
    businessName: "Skin Savvy Aesthetics",
    shortName: "Skin Savvy",
    city: "Scottsdale, AZ",
    sourceUrl: "https://skinsavvyscottsdale.com/",
    primaryCtaHref:
      "https://skinsavvyaesthetics.myaestheticrecord.com/online-booking/h/NF8yMTUxX2NsaW5pY3M=",
    heroImageUrl:
      "https://skinsavvyscottsdale.com/wp-content/uploads/2026/01/Team-Photo-2025-copy.jpg",
    logoUrl:
      "https://skinsavvyscottsdale.com/wp-content/uploads/2022/03/SkinSavvyAesthetics-e1667943759194.webp",
    theme: {
      primary: "#446d73",
      primaryDark: "#17363b",
      accent: "#d5a36f",
      accentSoft: "#f3eee5",
    },
    batch: "package_clarity",
    eyebrow: "Scottsdale membership path",
    headline: "Connect membership savings to the consultation decision.",
    subheadline:
      "A Skin Savvy page for Scottsdale visitors comparing injectables, laser treatments, facials, and VIP membership before they book a complimentary skin care consultation.",
    primaryCtaLabel: "Book consultation",
    secondaryCtaLabel: "Review care path",
    treatmentFocus: "Membership, injectables, facials, lasers, and repeat skin care",
    visitorQuestion:
      "Should I book the consultation first, become a member, or choose a treatment category?",
    treatmentPathHeading: "Make membership feel connected to the first visit.",
    treatmentPathIntro:
      "Skin Savvy already shows a complimentary consultation, broad services, financing, and a membership offer. This page puts those choices in a cleaner order for a visitor who wants repeat care.",
    serviceHighlights: [
      "Consultation path: Skin Savvy invites visitors who are unsure which service they need to schedule a complimentary skin care consultation.",
      "Treatment path: Botox, Dysport, Daxxify, lip fillers, dermal fillers, lasers, facials, microneedling, peels, and skincare services are visible on the public site.",
      "Membership path: the public page describes VIP membership options with discounts on many services, so membership can be framed as a repeat-care decision after the visitor understands their plan.",
    ],
    consultationHeading: "Keep booking, membership, and financing in one decision path.",
    consultationIntro:
      "The first step should help the visitor understand whether they need guidance, a specific treatment, or a repeat-care option.",
    consultationSteps: [
      "Start with the complimentary consultation when the visitor is unsure which Skin Savvy service fits.",
      "Review injectables, lasers, facials, or weight-loss support as separate service lanes before booking.",
      "Consider VIP membership or financing after the treatment category is clear, instead of making it a separate first decision.",
    ],
    trustHeading: "Use the Scottsdale credibility already on the site.",
    trustIntro:
      "The source page gives local contact details, provider context, public proof, and a broad service list without needing extra claims.",
    trustSignals: [
      "Skin Savvy lists 8418 E Shea Blvd Ste 101, Scottsdale, AZ 85260, phone 480-520-0216, and info@skinsavvyscottsdale.com.",
      "The public site describes Skin Savvy as a Scottsdale med spa for injectables, fillers, Botox, facials, laser, and skincare.",
      "The source page references BBB accreditation with an A+ rating, WebMD, RealSelf, team training, membership, financing, and patient portal paths.",
    ],
    finalNote:
      "The page gives a Scottsdale visitor one clean sequence: choose the care path, book the consultation, then evaluate membership for repeat treatments.",
  },
  {
    slug: "skinspirit-paradise-valley",
    businessName: "SkinSpirit Paradise Valley",
    shortName: "SkinSpirit",
    city: "Phoenix / Paradise Valley, AZ",
    sourceUrl: "https://www.skinspirit.com/locations/paradise-valley",
    primaryCtaHref: "https://www.skinspirit.com/book-an-appointment",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6764496e34ff7106c11cc5da/67c0fdbcc64efc8805de4ab6_Paradise-Valley%20(1).webp",
    logoUrl:
      "https://cdn.prod.website-files.com/6764496e34ff7106c11cc5cf/6764496e34ff7106c11cc6c4_logo-long.svg",
    theme: {
      primary: "#25473c",
      primaryDark: "#11251f",
      accent: "#e6b37b",
      accentSoft: "#f3eadc",
    },
    batch: "treatment_consultation",
    eyebrow: "Paradise Valley consultation path",
    headline: "Choose the Botox, filler, or skin consult path with Paradise Valley context.",
    subheadline:
      "A focused SkinSpirit Paradise Valley page for visitors who want a free consultation but need a clearer first step across injectables, facials, microneedling, and energy-based treatments.",
    primaryCtaLabel: "Book a consultation",
    secondaryCtaLabel: "Choose treatment path",
    treatmentFocus: "Botox, dermal filler, facials, microneedling, and desert-skin care",
    visitorQuestion:
      "Should I book around wrinkle relaxers, facial balancing, a facial, or a skin-rejuvenation service?",
    treatmentPathHeading: "Route high-intent visitors before the booking click.",
    treatmentPathIntro:
      "The Paradise Valley page already offers free consultation booking, provider profiles, and treatment categories. This version puts the most common first-visit decisions beside the booking action.",
    serviceHighlights: [
      "Neurotoxin path: Botox, Dysport, and Daxxify are listed for forehead lines, 11s, and crow's feet.",
      "Filler path: dermal filler, Juvederm, Sculptra, Restylane, Radiesse, and facial balancing are visible options for profile and proportion conversations.",
      "Skin path: custom facials, Signature Facial, DiamondGlow, peels, microneedling, BBL/IPL Photofacial, RF microneedling, and other services are listed for the Paradise Valley clinic.",
    ],
    consultationHeading: "Put provider context close to free consultation booking.",
    consultationIntro:
      "The page should help the visitor choose the consultation angle before landing in SkinSpirit's booking flow.",
    consultationSteps: [
      "Choose the first concern: expression lines, facial balance, skin texture, glow, or a broader treatment plan.",
      "Use the Paradise Valley booking path for the free consultation.",
      "Bring the chosen concern to the appointment so the provider can guide the right treatment conversation.",
    ],
    trustHeading: "Make Paradise Valley feel distinct from other SkinSpirit locations.",
    trustIntro:
      "The source page includes address, hours, phone, email, providers, location context, and national proof signals.",
    trustSignals: [
      "SkinSpirit Paradise Valley lists 12650 N Tatum Blvd. Suite 103, Phoenix, AZ 85032, phone (602) 835-4000, and paradisevalley@skinspirit.com.",
      "The page names Amy Henderson, Javier Solis, and Zulema Hernandez Campos as Phoenix - Paradise Valley aesthetic providers or injectors.",
      "The location page references safe and trusted treatments, noticeable results, highly trained experts, press logos, and nearby Paradise Valley shopping and parking context.",
    ],
    finalNote:
      "The page gives Paradise Valley visitors a clear way to choose the consult topic, then book through SkinSpirit's current scheduling path.",
  },
  {
    slug: "skinspirit-scottsdale",
    businessName: "SkinSpirit Scottsdale",
    shortName: "SkinSpirit",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.skinspirit.com/locations/scottsdale",
    primaryCtaHref: "https://www.skinspirit.com/book-an-appointment",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6764496e34ff7106c11cc5da/67c0feb71c7bdfd5be19a635_Scottsdale.webp",
    logoUrl:
      "https://cdn.prod.website-files.com/6764496e34ff7106c11cc5cf/6764496e34ff7106c11cc6c4_logo-long.svg",
    theme: {
      primary: "#233f35",
      primaryDark: "#101f1a",
      accent: "#dfb176",
      accentSoft: "#f4eadb",
    },
    batch: "proof_to_booking",
    eyebrow: "Scottsdale proof-first consultation",
    headline: "Bring Scottsdale provider proof closer to the free consultation.",
    subheadline:
      "A trust-forward SkinSpirit Scottsdale page that helps visitors compare Botox, filler, facials, laser, and skin health options with local provider context near the booking action.",
    primaryCtaLabel: "Schedule free consultation",
    secondaryCtaLabel: "See proof path",
    treatmentFocus: "Provider-led consultation for Botox, fillers, facials, lasers, and skincare",
    visitorQuestion:
      "Who will guide my Scottsdale consultation, and which service should I ask about first?",
    treatmentPathHeading: "Use proof before asking the visitor to book.",
    treatmentPathIntro:
      "SkinSpirit Scottsdale already has a strong booking path. This page places local provider context and service choices close together so the visitor can book with more confidence.",
    serviceHighlights: [
      "Injectables path: Botox, Dysport, Daxxify, dermal filler, Juvederm, Restylane, Sculptra, Radiesse, and facial balancing are visible on the Scottsdale page.",
      "Skin path: custom facial, Signature Facial, DiamondGlow, chemical peels, microneedling, HALO, BBL/IPL Photofacial, and RF microneedling are listed treatment options.",
      "Location path: the Scottsdale page positions the clinic in Zocallo Plaza with parking, local experts, and free consultation booking.",
    ],
    consultationHeading: "Make the consultation feel expert-guided before the form.",
    consultationIntro:
      "The first step should pair the service category with the right Scottsdale proof point instead of sending visitors straight to scheduling.",
    consultationSteps: [
      "Pick the category: wrinkle relaxers, filler and facial balancing, facials and peels, laser or energy treatments, or general skin health.",
      "Review the Scottsdale provider context and location details beside that category.",
      "Use SkinSpirit Scottsdale's free consultation booking path and bring one focused concern to the visit.",
    ],
    trustHeading: "Keep local proof and brand credibility near the CTA.",
    trustIntro:
      "The source page provides enough Scottsdale-specific context to support the consultation action without adding unsupported claims.",
    trustSignals: [
      "SkinSpirit Scottsdale lists 15425 N Scottsdale Rd #140, Scottsdale, AZ 85254, phone (480) 863-2800, and scottsdale@skinspirit.com.",
      "The page names Scottsdale providers including Lindsay Barrett, Marie Kardjian, and Tiffanie Van Eimeren, with provider experience and treatment focus details.",
      "The source page highlights safe and trusted treatments, noticeable results, highly trained experts, press logos, and Zocallo Plaza parking context.",
    ],
    finalNote:
      "The page helps a Scottsdale visitor connect local provider proof to one consultation question, then schedule through SkinSpirit's current booking path.",
  },
  {
    slug: "institute-of-aesthetics",
    businessName: "Institute of Aesthetics",
    shortName: "iA",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.instituteofaesthetics.com/",
    primaryCtaHref: "https://elpvz.myaestheticrecord.com/online-booking",
    heroImageUrl:
      "https://images.squarespace-cdn.com/content/v1/64f8b5d202b2531397792797/23c61dd4-39b9-4e2b-ac37-4237afd2cffa/facial-rejuvenation-scottsdale.jpg",
    logoUrl:
      "https://images.squarespace-cdn.com/content/v1/64f8b5d202b2531397792797/31a27f18-bfec-47fb-9d65-51d1920f9674/Institute+Of+Aesthetics+Secondary+Logo+A+Almond+Rgb+900px+W+300ppi.png?format=1500w",
    theme: {
      primary: "#4c463b",
      primaryDark: "#25221c",
      accent: "#c4aa78",
      accentSoft: "#f4efe4",
    },
    batch: "consultation_trust",
    eyebrow: "Scottsdale natural injectables consult",
    headline: "Start with a natural-looking plan, not a treatment menu.",
    subheadline:
      "A premium Institute of Aesthetics path for Scottsdale visitors considering Botox, Dysport, fillers, Sculptra, laser skin treatments, regenerative aesthetics, or wellness support.",
    primaryCtaLabel: "Book consultation",
    secondaryCtaLabel: "Choose consult focus",
    treatmentFocus: "Natural injectables, facial balancing, laser skin, and regenerative aesthetics",
    visitorQuestion:
      "I want to look refreshed, but should I ask about injectables, laser skin, regenerative aesthetics, or wellness first?",
    treatmentPathHeading: "Match the boutique tone with one thoughtful first step.",
    treatmentPathIntro:
      "Institute of Aesthetics already positions care around natural, medically guided results. This page narrows the first decision so a visitor can request a consultation with a clear category in mind.",
    serviceHighlights: [
      "Injectables path: Botox, Dysport, dermal fillers, Sculptra, and facial balancing are visible service options for natural facial rejuvenation.",
      "Skin and laser path: BBL, Moxi, microneedling, facials, and laser skin treatments are presented for texture, tone, pigmentation, and skin health.",
      "Regenerative and wellness path: regenerative aesthetics, medical weight loss, hormone optimization, and medical wellness are visible, but kept separate from the injectable consult path.",
    ],
    consultationHeading: "Make the consultation feel personal before booking.",
    consultationIntro:
      "The page should feel like a quiet boutique entry point: choose the aesthetic concern, then use the current booking path to start the conversation.",
    consultationSteps: [
      "Choose the starting category: natural injectables, facial balancing, skin and laser, regenerative aesthetics, or wellness support.",
      "Use Institute of Aesthetics' current My Aesthetic Record booking path.",
      "Ask the Scottsdale team for a medically guided plan built around facial harmony and long-term skin health.",
    ],
    trustHeading: "Keep clinical leadership and location proof close to the CTA.",
    trustIntro:
      "The public site gives enough provider and location context to support a high-trust consultation path without a loud promo feel.",
    trustSignals: [
      "Institute of Aesthetics lists 14220 N. Northsight Blvd Suite 150, Scottsdale, AZ 85260.",
      "The site names founder Jennifer Prince, FNP-C, CANS, and describes clinical leadership over advanced aesthetic providers.",
      "The homepage emphasizes natural-looking injectables, advanced laser skin treatments, regenerative aesthetics, medical wellness, and personalized treatment planning.",
    ],
    finalNote:
      "A Scottsdale visitor leaves with one refined next step: book a consultation around the category they actually want to discuss.",
  },
  {
    slug: "it-s-a-secret-med-spa-biltmore",
    businessName: "It's a Secret Med Spa Biltmore",
    shortName: "Secret Biltmore",
    city: "Phoenix / Biltmore, AZ",
    sourceUrl: "https://secretmedspa.com/biltmore-phoenix-az/",
    primaryCtaHref: "https://secretmedspa.com/biltmore-phoenix-az/",
    theme: {
      primary: "#242136",
      primaryDark: "#141221",
      accent: "#c6a15b",
      accentSoft: "#f8f0df",
    },
    batch: "consultation_trust",
    eyebrow: "Biltmore free consultation path",
    headline: "Know what happens after the Biltmore consultation request.",
    subheadline:
      "A Biltmore-specific path for Phoenix visitors who want Botox, Dysport, fillers, laser treatments, skin rejuvenation, body services, or a free consultation before choosing.",
    primaryCtaLabel: "Book free consultation",
    secondaryCtaLabel: "Preview next steps",
    treatmentFocus: "Free consultation, injectables, fillers, lasers, facials, and body shaping",
    visitorQuestion:
      "If I request a free consultation at the Biltmore location, what should I be ready to ask about first?",
    treatmentPathHeading: "Make the first follow-up question clear before booking.",
    treatmentPathIntro:
      "The Biltmore page already presents free consultation, phone, address, hours, and a broad treatment menu. This version shows visitors how to arrive with one useful treatment direction.",
    serviceHighlights: [
      "Injectables path: Botox, Dysport, Sculptra, PRF/PRP, Radiesse, and fillers are visible Biltmore treatment areas.",
      "Skin and laser path: laser hair removal, Sciton BBL, Morpheus8, Clear & Brilliant, HydraFacial, microneedling, and chemical peels are visible source-backed options.",
      "Body and wellness path: CoolSculpting, Morpheus8 Body, medical weight loss, peptides, memberships, pricing, financing, and gift cards are visible navigation/support options.",
    ],
    consultationHeading: "Use the free consult to sort the treatment lane.",
    consultationIntro:
      "The page should not promise a response script or clinical outcome. It should simply help the visitor choose the first category before using Zenoti or calling the location.",
    consultationSteps: [
      "Choose the concern: expression lines, facial volume, skin texture, unwanted hair, body shaping, or wellness support.",
      "Use the current Secret Med Spa Zenoti booking path or call the Biltmore phone number.",
      "Ask the provider which service category fits the visit before comparing every treatment on the menu.",
    ],
    trustHeading: "Keep Biltmore-specific location details visible.",
    trustIntro:
      "The source page gives enough location and treatment context to make this distinct from the Scottsdale location.",
    trustSignals: [
      "The Biltmore location is listed at 4637 N. 24th St., Phoenix, AZ 85016.",
      "The page lists phone (480) 923-3668 and hours Monday-Friday 10 AM-7 PM, Saturday 9 AM-5 PM, and Sunday 10 AM-5 PM.",
      "The public page describes the Biltmore neighborhood and tells visitors to book a free consultation with a provider to discuss concerns and treatment goals.",
    ],
    finalNote:
      "The page gives Biltmore visitors one practical action: request the free consultation with a treatment lane already in mind.",
  },
  {
    slug: "it-s-a-secret-med-spa-scottsdale",
    businessName: "It's a Secret Med Spa Scottsdale",
    shortName: "It's a Secret",
    city: "Scottsdale, AZ",
    sourceUrl: "https://secretmedspa.com/scottsdale-az/",
    primaryCtaHref: "https://secretmedspa.com/scottsdale-az/",
    theme: {
      primary: "#242136",
      primaryDark: "#141221",
      accent: "#c6a15b",
      accentSoft: "#f8f0df",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale injectables path",
    headline: "Choose the Scottsdale injectable path before booking.",
    subheadline:
      "A focused It’s a Secret Scottsdale path for visitors comparing Botox, Dysport, fillers, Kybella, Sculptra, laser, and skin services before the Zenoti booking click.",
    primaryCtaLabel: "Book a free consultation",
    secondaryCtaLabel: "Choose treatment path",
    treatmentFocus: "Scottsdale injectables, Botox, Dysport, fillers, and skin services",
    visitorQuestion:
      "Should I start with Botox or Dysport, filler, a laser service, or a free consultation at the Scottsdale location?",
    treatmentPathHeading: "Narrow the high-intent Scottsdale menu before booking.",
    treatmentPathIntro:
      "The Scottsdale page has multiple treatment sections and booking CTAs. This version puts the injectable decision first while still giving skin, laser, and body visitors a clear alternate path.",
    serviceHighlights: [
      "Injectables path: Dysport, Botox, cheek filler, lip filler, Kybella, Sculptra, Radiesse, and Hylenex are visible Scottsdale treatment options.",
      "Laser path: Sciton BBL, Morpheus8, laser hair removal, Potenza RF, Sciton Moxi, Clear & Brilliant, vein reduction, and cherry angioma removal are visible in the treatment menu.",
      "Skin and body path: HydraFacial, SkinPen microneedling, BBL photofacial, chemical peels, exosomes, CoolSculpting, Morpheus8 Body, peptides, and medical weight loss are available as separate paths.",
    ],
    consultationHeading: "Make the free consultation the safest first click.",
    consultationIntro:
      "If the visitor is unsure which injectable or laser treatment fits, the consultation path should come before scanning the entire menu.",
    consultationSteps: [
      "Choose the first goal: soften lines, add facial volume, improve skin texture, reduce unwanted hair, or explore body/wellness options.",
      "Use the current Secret Med Spa Zenoti booking path for Scottsdale.",
      "Ask the provider to confirm the right treatment lane before booking a specific service.",
    ],
    trustHeading: "Keep the Scottsdale location distinct from Biltmore.",
    trustIntro:
      "The page uses Scottsdale-specific address, phone, and treatment language so it does not read like a duplicate of the Phoenix location.",
    trustSignals: [
      "The Scottsdale location is listed at 7012 E. Greenway Pkwy, Suite 140, Scottsdale, AZ 85254.",
      "The public page lists phone (480) 685-2647 and hours Monday-Friday 10 AM-7 PM, Saturday 9 AM-5 PM, and Sunday 10 AM-5 PM.",
      "The page says visitors can book a free consultation with a Scottsdale provider to discuss concerns and goals for treatment.",
    ],
    finalNote:
      "The page turns a large Scottsdale treatment menu into one practical next step: pick the treatment lane, then book the free consultation.",
  },
  {
    slug: "ds-skin-lips-medical-spa",
    businessName: "DS Skin & Lips Medical Spa",
    shortName: "DS Skin & Lips",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.dsskinandlips.com/botox/",
    primaryCtaHref: "https://www.dsskinandlips.com/book-an-appointment/",
    theme: {
      primary: "#3b4a52",
      primaryDark: "#1d282d",
      accent: "#a56f62",
      accentSoft: "#f5e9e6",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale Botox consultation",
    headline: "Answer the first Botox question before the appointment click.",
    subheadline:
      "A DS Skin & Lips path for Scottsdale visitors comparing Botox, Dysport, lip filler, facial balancing, and injectable treatment questions before requesting an appointment.",
    primaryCtaLabel: "Book Botox appointment",
    secondaryCtaLabel: "Compare injectable paths",
    treatmentFocus: "Botox, Dysport, lip filler, and facial balancing consults",
    visitorQuestion:
      "Should I start with Botox for wrinkles, Dysport, lip filler, or a broader facial-balancing consultation?",
    treatmentPathHeading: "Keep first-time injectable visitors focused and careful.",
    treatmentPathIntro:
      "The Botox page already has strong appointment intent. This path adds a simple decision layer so new visitors can ask about the right injectable conversation without expecting a one-size-fits-all answer.",
    serviceHighlights: [
      "Botox path: the public Botox page frames Botox as a nonsurgical option for facial wrinkles and folds.",
      "Injectable comparison path: the site navigation also lists Dysport, fillers, lip filler, facial balancing, Sculptra, Kybella, jawline contouring, and related treatment pages.",
      "Appointment path: new-patient and existing-patient phone numbers, the Scottsdale address, contact page, and appointment page are visible around the Botox journey.",
    ],
    consultationHeading: "Make the appointment request specific without promising outcomes.",
    consultationIntro:
      "The visitor should know what they want to ask before they use the appointment form or call the Scottsdale office.",
    consultationSteps: [
      "Choose the first concern: forehead or expression lines, lip shape, facial balance, under-eye questions, or general injectable guidance.",
      "Use DS Skin & Lips' current appointment page or new-patient phone number to request the visit.",
      "Discuss treatment fit, timing, and expectations with the provider before assuming which injectable is right.",
    ],
    trustHeading: "Put provider and contact context near the CTA.",
    trustIntro:
      "The public page gives enough Scottsdale, provider, and appointment context to support a safer first-time Botox path.",
    trustSignals: [
      "DS Skin & Lips lists 617 N. Scottsdale Rd, Ste. B, Scottsdale, AZ 85257.",
      "The page lists new-patient phone (480) 864-5100 and existing-patient phone (480) 800-9965.",
      "The Botox page names Amber DiAngelis as Clinical Director and founder, and describes her as a board-certified skin specialist and master injector.",
    ],
    finalNote:
      "A Scottsdale visitor leaves with one focused next step: request an appointment with the specific injectable question already in mind.",
  },
  {
    slug: "elixir-medical-spa",
    businessName: "Elixir Medical Spa",
    shortName: "Elixir",
    city: "Scottsdale, AZ",
    sourceUrl: "https://elixirmedspa.com/",
    primaryCtaHref: "https://elixirmedicalspa.janeapp.com/",
    logoUrl: "https://elixirmedspa.com/storage/2024/09/Elixir-med-spa-Header-logo-in-Scottsdale-AZ.svg",
    theme: {
      primary: "#4b2431",
      primaryDark: "#231118",
      accent: "#d6aa64",
      accentSoft: "#f8eadc",
    },
    batch: "package_clarity",
    eyebrow: "Scottsdale package path",
    headline: "Understand the glow-up package before the booking click.",
    subheadline:
      "An Elixir Medical Spa path for visitors comparing tox, lip filler, cheeks, membership, self assessment, and Jane booking before choosing a package.",
    primaryCtaLabel: "Book with Elixir",
    secondaryCtaLabel: "Compare package paths",
    treatmentFocus: "Tox, lip filler, cheeks, wrinkle relaxers, fillers, and skin services",
    visitorQuestion:
      "Should I book a small tox-and-lip visit, a fuller cheeks/lips/tox package, or ask a question first?",
    treatmentPathHeading: "Explain the package choice without overpromising results.",
    treatmentPathIntro:
      "Elixir already lists specific package names, prices, self assessment, reviews, services, and Jane booking. This page gives visitors a cleaner way to decide what to ask before they book.",
    serviceHighlights: [
      "Starter package path: the public page lists 20 units of tox and 1/2 syringe lip filler as a visible package option.",
      "Fuller package path: the page lists Cheeks, Lips, & Tox Glow Up with 3 full syringes and 50 units of tox, plus a Voluma note.",
      "Service context path: facials, fillers, weight loss, wrinkle relaxers, laser hair removal, Clear + Brilliant, IPL photofacial, and ResurFX are visible service categories.",
    ],
    consultationHeading: "Route package interest into the right next step.",
    consultationIntro:
      "The visitor should know whether they are ready to book, should take the self assessment, or should ask Elixir a package-specific question first.",
    consultationSteps: [
      "Choose the starting point: light tox and lips, cheeks/lips/tox package, filler consult, or skin and laser service.",
      "Use Elixir's Jane booking path when the visitor is ready to reserve a service or package conversation.",
      "Use the self assessment or contact path if the visitor is unsure which package fits their goals.",
    ],
    trustHeading: "Keep Elixir's local proof next to the package action.",
    trustIntro:
      "The public page gives enough package, location, provider, and review context to make this feel like an Elixir offer page instead of a generic package summary.",
    trustSignals: [
      "Elixir lists 8734 E. Shea Blvd. Suite #136, Scottsdale, AZ 85260 and phone (602) 613-1111.",
      "The page names Alizia Gutierrez RN, BSN and describes her aesthetics background and conservative injection techniques.",
      "The public page includes client reviews, monthly specials, membership, self assessment, Jane booking, and potion package navigation.",
    ],
    finalNote:
      "The page helps a Scottsdale visitor compare Elixir's visible package paths before they enter Jane booking.",
  },
  {
    slug: "flawless-faces-medspa",
    businessName: "Flawless Faces Medspa",
    shortName: "Flawless",
    city: "Chandler, AZ",
    sourceUrl: "https://flawlessfacesaz.com/",
    primaryCtaHref: "https://flawless-faces-pllc.square.site/s/appointments",
    heroImageUrl: "https://flawlessfacesaz.com/images/flawless-faces-medspa-chandler-hero.jpg",
    logoUrl: "https://flawlessfacesaz.com/logo.png",
    theme: {
      primary: "#2b1d2c",
      primaryDark: "#151016",
      accent: "#d94083",
      accentSoft: "#fde7f0",
    },
    batch: "treatment_consultation",
    eyebrow: "Chandler Botox and filler path",
    headline: "Choose Botox, filler, or consult before Square booking.",
    subheadline:
      "A Flawless Faces path for Chandler visitors who want the playful Ocotillo experience, but need one focused injectable decision before they book.",
    primaryCtaLabel: "Book appointment",
    secondaryCtaLabel: "Pick injectable path",
    treatmentFocus: "Botox, Dysport, Juvederm, Restylane, Sculptra, Kybella, and first-visit consults",
    visitorQuestion:
      "Do I book Botox, filler, a free first-visit consult, or a skin/laser appointment with Dani?",
    treatmentPathHeading: "Keep the personality, tighten the booking decision.",
    treatmentPathIntro:
      "Flawless Faces already has a clear Square booking link and strong clinic voice. This page keeps that tone while making the first injectable choice easier.",
    serviceHighlights: [
      "Injectables path: Botox, Dysport, Juvederm, Kybella, Restylane, and Sculptra are listed under Ali's injectable services.",
      "Skin and laser path: Chemical peels, DiamondGlow, Subnovii, facials, microneedling with PRP, CO2 laser, and laser hair removal are listed under Dani's skin and laser work.",
      "Offer path: the public page lists a first-time Alle Botox offer, DiamondGlow rebate, referral rewards, and in-house rewards context.",
    ],
    consultationHeading: "Make the Square booking choice feel obvious.",
    consultationIntro:
      "First-time visitors can start with a free consult, while ready-to-book visitors can choose the service family before entering Square.",
    consultationSteps: [
      "Choose the appointment lane: Botox/Dysport, filler/lips, skin and laser, wellness, or first-visit consult.",
      "Use Flawless Faces' Square booking path to reserve the appointment.",
      "Ask Ali or Dani to confirm the right plan before the first injectable or laser treatment.",
    ],
    trustHeading: "Use the proof Flawless already leads with.",
    trustIntro:
      "The public page has strong local, practitioner, and review proof, so this path can be confident without inventing extra claims.",
    trustSignals: [
      "Flawless Faces lists Chandler, AZ / Ocotillo, phone 602.622.7000, and 3165 S. Alma School Rd, Suite 29.",
      "The homepage presents Ali Garzuzi, RN BSN as founder/master injector and Dani as master aesthetician and laser specialist.",
      "The public page states 20+ years in healthcare, 5.0 Google rating, 854 reviews across platforms, two practitioners, and free first-visit consults.",
    ],
    finalNote:
      "The page gives Chandler visitors one clear move: choose the appointment lane, then book through Square.",
  },
  {
    slug: "inside-out-aesthetics",
    businessName: "Inside Out Aesthetics",
    shortName: "IOA",
    city: "Scottsdale, AZ",
    sourceUrl: "https://insideoutaesthetics.com/",
    primaryCtaHref: "https://insideoutaesthetics.com/virtual-consultation/",
    heroImageUrl: "https://insideoutaesthetics.com/wp-content/uploads/2021/11/Inside-Out-Aesthetics-54-1.jpg",
    theme: {
      primary: "#41433f",
      primaryDark: "#20221f",
      accent: "#b89060",
      accentSoft: "#f4eadf",
    },
    batch: "consultation_trust",
    eyebrow: "Scottsdale consult-first path",
    headline: "Choose virtual consult, call, or specials without guessing.",
    subheadline:
      "An Inside Out Aesthetics path that puts virtual consultation first, call/text second, and specials signup in the right supporting role for Scottsdale treatment inquiries.",
    primaryCtaLabel: "Start virtual consult",
    secondaryCtaLabel: "Compare next steps",
    treatmentFocus: "Virtual consultation, Botox, HydraFacial, facials, skin, and injectable services",
    visitorQuestion:
      "Should I start with a virtual consultation, call or text the team, or sign up for specials first?",
    treatmentPathHeading: "Give each contact option a clear job.",
    treatmentPathIntro:
      "Inside Out offers several useful contact paths. This page turns them into a simple hierarchy so visitors know which one fits their intent.",
    serviceHighlights: [
      "Consult path: the public page promotes a virtual consultation to help determine which treatments may be best.",
      "Treatment path: Botox, dermal fillers, HydraFacial, DiamondGlow, microneedling, Vivace RF, Virtue RF, laser hair reduction, IPL, ResurFX, and other services are visible in the treatment navigation.",
      "Support path: call 480.307.9901, text 877.710.1250, and signup fields for news, tips, and specials are visible near the Get Started section.",
    ],
    consultationHeading: "Start with the highest-intent path, then offer backup options.",
    consultationIntro:
      "The visitor who wants treatment guidance should start with virtual consultation. Call/text is best for timing or appointment questions, and specials signup supports future interest.",
    consultationSteps: [
      "Use virtual consultation when the visitor needs treatment guidance before choosing Botox, HydraFacial, skin, or injectable services.",
      "Call 480.307.9901 or text 877.710.1250 when the question is schedule-related or the visitor prefers direct contact.",
      "Use specials signup only when the visitor wants news, tips, and offers instead of booking now.",
    ],
    trustHeading: "Keep the accessible tone and local details visible.",
    trustIntro:
      "The public page already emphasizes education, support, virtual consultation, product guidance, and treatment options, so this page makes the next step clearer without changing the voice.",
    trustSignals: [
      "Inside Out lists 6865 E. Becker Lane, Suite 100, Scottsdale, AZ 85254.",
      "The public page says the virtual consultation helps determine which treatments would be best for the visitor.",
      "Recent public Instagram feed text references complimentary consultation, Botox, HydraFacial, facials, RF microneedling, and call/text booking paths.",
    ],
    finalNote:
      "The page helps an Inside Out visitor pick the right next step instead of treating every contact option as equal.",
  },
  {
    slug: "lazaderm-chandler",
    businessName: "Lazaderm Chandler",
    shortName: "Lazaderm",
    city: "Chandler, AZ",
    sourceUrl: "https://lazaderm.com/locations/chandler-az",
    primaryCtaHref: "https://lazaderm.com/free-consultation",
    bookingCtaHref: "https://lazaderm.com/schedule",
    bookingCtaLabel: "Book online",
    phone: "1-480-573-7546",
    phoneHref: "tel:+14805737546",
    addressLines: ["2551 W Queen Creek Rd", "Unit 1", "Chandler, AZ 85248"],
    hours: [
      "Monday-Friday 9:00am-5:00pm",
      "Holiday hours may vary",
    ],
    locationIntro:
      "The Chandler clinic is near downtown Ocotillo and serves Chandler plus nearby Tempe, Mesa, Gilbert, Scottsdale, and surrounding areas.",
    serviceArea: "Chandler, Tempe, Mesa, Gilbert, Scottsdale",
    heroImageUrl:
      "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Locations/24-Lazaderm-GP_Chandler_750x840_2024-05-02-201224_njsz.jpg?w=750&h=840&auto=compress%2Cformat&fit=crop&dm=1718109555&s=b980212f02865fe36f067b51d8e17943",
    logoUrl: "https://lazaderm.com/assets/images/logo-color.svg",
    promo: {
      label: "Current specials",
      title: "Check Lazaderm specials before you book.",
      body:
        "Lazaderm keeps current events and specials available for popular aesthetic treatments and gift card offers.",
      ctaLabel: "View specials",
      ctaHref: "https://lazaderm.com/specials",
    },
    heroBadge: "Physician-led aesthetic clinic in Chandler",
    heroStats: [
      { value: "4", label: "first-step service lanes" },
      { value: "1", label: "free consultation path" },
      { value: "AZ", label: "Chandler clinic" },
    ],
    theme: {
      primary: "#3f77af",
      primaryDark: "#111827",
      accent: "#7d3bb8",
      accentSoft: "#edf7fb",
    },
    batch: "treatment_consultation",
    eyebrow: "Lazaderm Chandler",
    headline: "Start your free consult with the right treatment lane.",
    subheadline:
      "A focused Chandler path for new visitors comparing BOTOX, filler, laser skin treatments, and CoolSculpting before they request a free consultation.",
    primaryCtaLabel: "Request free consultation",
    secondaryCtaLabel: "Choose a starting point",
    treatmentFocus: "Botox, Dysport, dermal fillers, laser treatments, and CoolSculpting",
    visitorQuestion:
      "Should I ask about wrinkle relaxers, filler, laser skin, or body contouring first?",
    treatmentPathHeading: "Pick the service family before the consultation click.",
    treatmentPathIntro:
      "Lazaderm offers a deep Chandler treatment menu. This page turns that breadth into four clear starting lanes so the consultation request feels prepared instead of vague.",
    serviceHighlights: [
      "Wrinkle relaxer lane: BOTOX and Dysport for visitors focused on expression lines.",
      "Volume lane: JUVEDERM, Restylane, Sculptra, Bellafill, and related filler options for facial contour questions.",
      "Skin and laser lane: Moxi, BBL HERO, HALO, Fraxel, HydraFacial, microneedling, peels, and laser hair removal.",
      "Body lane: CoolSculpting Elite for visitors who want to ask about non-surgical body contouring.",
    ],
    consultationHeading: "Make the free consult request more specific.",
    consultationIntro:
      "The consultation path stays simple: choose the concern, request the free consult, then let the Chandler team guide fit, timing, and next steps.",
    consultationSteps: [
      "Choose a starting lane: wrinkle relaxer, filler, laser and skin, or body contouring.",
      "Use Lazaderm's free consultation path, book online, or call the Chandler number.",
      "Bring that treatment lane into the visit so the team can guide the right service sequence.",
    ],
    consultationChoices: [
      {
        title: "Wrinkle relaxer consult",
        body:
          "Ask whether BOTOX or Dysport is the right first conversation for expression lines, crow's feet, or forehead lines.",
        href: "https://lazaderm.com/services/botox-injections",
        ctaLabel: "Review BOTOX",
      },
      {
        title: "Filler and facial contour consult",
        body:
          "Start with volume, lip, cheek, chin, or facial contour questions before comparing every filler option.",
        href: "https://lazaderm.com/services/juvederm-fillers",
        ctaLabel: "Review filler",
      },
      {
        title: "Laser and skin refresh consult",
        body:
          "Bring texture, tone, hair removal, pigmentation, or overall skin-refresh questions into one consult lane.",
        href: "https://lazaderm.com/services/skin",
        ctaLabel: "Review skin treatments",
      },
      {
        title: "CoolSculpting consult",
        body:
          "Use the consultation to ask whether CoolSculpting Elite fits your body-contouring goals and treatment area.",
        href: "https://lazaderm.com/services/coolsculpting",
        ctaLabel: "Review CoolSculpting",
      },
    ],
    trustHeading: "Chandler team, services, and reviews in one place.",
    trustIntro:
      "The Chandler page supports the consultation action with a visible local clinic, service list, named team members, and review themes around injectables, laser care, and staff guidance.",
    trustSignals: [
      "Lazaderm Chandler lists 2551 W Queen Creek Rd, Unit 1, Chandler, AZ 85248 and phone 1-480-573-7546.",
      "The Chandler team section names Lornell E. Hansen II, MD; Amy O'Hara, NMD; Alisha Knowlton; and Brooke Wonder.",
      "Chandler reviews mention BOTOX, filler, laser care, provider guidance, staff warmth, and first-time visitor comfort.",
      "The service menu includes face, body, and skin treatment paths with BOTOX, Dysport, JUVEDERM, CoolSculpting, Moxi, BBL HERO, HALO, HydraFacial, microneedling, and more.",
    ],
    featuredServices: [
      {
        title: "BOTOX and Dysport",
        eyebrow: "Smooth lines",
        body:
          "Start here when the main question is expression lines, crow's feet, elevens, or forehead movement.",
        href: "https://lazaderm.com/services/botox-injections",
        ctaLabel: "View BOTOX",
      },
      {
        title: "Filler and facial contour",
        eyebrow: "Restore volume",
        body:
          "Use this lane for lip, cheek, chin, smile-line, and facial contour questions before the consult.",
        href: "https://lazaderm.com/services/juvederm-fillers",
        ctaLabel: "View filler",
      },
      {
        title: "Laser and skin treatments",
        eyebrow: "Refresh skin",
        body:
          "Group Moxi, BBL HERO, HALO, Fraxel, HydraFacial, peels, microneedling, and laser hair removal questions together.",
        href: "https://lazaderm.com/services/skin",
        ctaLabel: "View skin",
      },
      {
        title: "CoolSculpting Elite",
        eyebrow: "Body contouring",
        body:
          "Start here for non-surgical body-contouring questions before choosing a treatment area.",
        href: "https://lazaderm.com/services/coolsculpting",
        ctaLabel: "View CoolSculpting",
      },
    ],
    teamMembers: [
      {
        name: "Lornell E. Hansen II, MD",
        role: "Owner / Medical Director",
        imageUrl:
          "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Staff-Pictures/24-Lazaderm-GP_People-600x600_Lornell-Hansen.jpg?w=250&h=250&auto=compress%2Cformat&fit=crop&dm=1718109691&s=29be0f8e91abc3772e461f4081be1c86",
      },
      {
        name: "Amy O'Hara, NMD",
        role: "NMD",
        imageUrl:
          "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Staff-Pictures/Dr-OHara-AZ.jpg?w=250&h=250&auto=compress%2Cformat&fit=crop&dm=1733421690&s=9436cb3e4897b00646b1000e3f1b8db1",
      },
      {
        name: "Alisha Knowlton",
        role: "CLT, LE",
        imageUrl:
          "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Staff-Pictures/Alisha-AZ.jpg?w=250&h=250&auto=compress%2Cformat&fit=crop&dm=1744925806&s=dcc808b785a547c0c1be650cce326ebe",
      },
      {
        name: "Brooke Wonder",
        role: "First Impressions Coordinator, Client Relations, Aesthetician, LA CLT, LSO",
        imageUrl:
          "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Staff-Pictures/24-Lazaderm-GP_People-600x600_BrookeBradly.jpg?w=250&h=250&auto=compress%2Cformat&fit=crop&dm=1718109757&s=8add3d0e99cdd6d84a6691e872c1f8da",
      },
    ],
    reviewThemes: [
      {
        title: "Injectable confidence",
        body:
          "Reviews frequently mention BOTOX, fillers, natural-looking guidance, and providers who take time with questions.",
      },
      {
        title: "Comfort for first-time visitors",
        body:
          "Several Chandler reviews focus on feeling welcomed, listened to, and more comfortable during an unfamiliar treatment.",
      },
      {
        title: "Laser and skin-care guidance",
        body:
          "Skin and laser reviews mention consultation support, after-care explanations, and clear treatment expectations.",
      },
    ],
    galleryImages: [
      {
        src: "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Locations/24-Lazaderm-GP_Chandler_750x840_2024-05-02-201224_njsz.jpg?w=750&h=840&auto=compress%2Cformat&fit=crop&dm=1718109555&s=b980212f02865fe36f067b51d8e17943",
        alt: "Lazaderm Chandler clinic exterior",
        caption: "Chandler clinic",
      },
      {
        src: "https://laza-derm.transforms.svdcdn.com/production/general-uploads/Service-Detail-Pages/MOXI-Laser/24-Lazaderm-GP-Service-Detail-Pages-Moxi-Laser-RCB-550x582.png?w=550&h=582&auto=compress%2Cformat&fit=crop&dm=1720475232&s=398954ecfda88adfdeb512212b9e933f",
        alt: "Laser facial treatment at Lazaderm",
        caption: "Laser and skin care",
      },
      {
        src: "https://laza-derm.transforms.svdcdn.com/production/general-uploads/lazaderm-az-crew.jpg?w=1200&h=594&auto=compress%2Cformat&fit=crop&dm=1743195214&s=a8dec08123ae61d02d925f365fb21f4e",
        alt: "Lazaderm Chandler team",
        caption: "Chandler team",
      },
    ],
    finalNote:
      "Choose the service lane that matches your goal, then request Lazaderm's free Chandler consultation.",
  },
  {
    slug: "moderne-medical-aesthetics",
    businessName: "Moderne Medical Aesthetics",
    shortName: "Moderne",
    city: "Scottsdale, AZ",
    sourceUrl: "https://www.modernemedical.com/",
    primaryCtaHref: "https://ehjns.myaestheticrecord.com/online-booking",
    heroImageUrl: "https://lirp.cdn-website.com/52e22626/dms3rep/multi/opt/allison-572h.jpg",
    logoUrl: "https://lirp.cdn-website.com/52e22626/dms3rep/multi/opt/New-White-Logo+%281%29-438w.png",
    theme: {
      primary: "#3b3531",
      primaryDark: "#1d1917",
      accent: "#b98f68",
      accentSoft: "#f4e8de",
    },
    batch: "treatment_consultation",
    eyebrow: "Scottsdale service-to-appointment path",
    headline: "Turn a service card into a clear appointment decision.",
    subheadline:
      "A Moderne Medical path for Scottsdale visitors comparing Dysport, dermal fillers, Sculptra, PDO threads, and laser treatments before booking online.",
    primaryCtaLabel: "Schedule appointment",
    secondaryCtaLabel: "Choose treatment focus",
    treatmentFocus: "Dysport, dermal fillers, Sculptra, PDO threads, and laser treatments",
    visitorQuestion:
      "I see the service cards, but should I book Dysport, filler, Sculptra, threads, or laser first?",
    treatmentPathHeading: "Replace generic button friction with a guided first choice.",
    treatmentPathIntro:
      "Moderne's public service grid is strong, but some visible link text reads generically. This demo keeps the polished Scottsdale positioning while making each treatment decision clearer.",
    serviceHighlights: [
      "Injectable path: Dysport, dermal fillers, Sculptra, and Botox Cosmetic brand context are visible on the public site.",
      "Lift and texture path: PDO thread lifts, laser treatments, Sylfirm, M22, CoolPeel, DiamondGlow, and skincare partner logos are visible support cues.",
      "Appointment path: Schedule an Appointment Online appears repeatedly and connects to My Aesthetic Record booking.",
    ],
    consultationHeading: "Make booking feel curated, not generic.",
    consultationIntro:
      "The visitor should pick the service family first, then use the booking path with a clear reason for the appointment.",
    consultationSteps: [
      "Choose the goal: soften expression lines, restore volume, stimulate collagen, discuss threads, or improve tone and texture.",
      "Use Moderne's current My Aesthetic Record online booking path.",
      "Ask the Moderne team which treatment path fits the visitor's aesthetic goals and timing.",
    ],
    trustHeading: "Use founder credibility without overloading the first screen.",
    trustIntro:
      "The homepage already gives founder and practice context that can sit near the appointment path.",
    trustSignals: [
      "Moderne Medical Aesthetics is positioned as an award-winning medical spa in Scottsdale, Arizona.",
      "The site names founder Allison Woodworth, RN, MSN, FNP-C, Board Certified Nurse Practitioner.",
      "The homepage describes a private concierge environment, personalized treatments, aesthetic injectables, and non-surgical treatment options.",
    ],
    finalNote:
      "The page helps a Scottsdale visitor turn one service-card interest into a specific appointment request.",
  },
  {
    slug: "paradise-medspa",
    businessName: "Paradise Medspa",
    shortName: "Paradise",
    city: "Phoenix, AZ",
    sourceUrl: "https://paradisemedspa.com/",
    primaryCtaHref:
      "https://app.joinmoxie.com/booking/paradise-medspa-wellness?date=2025-02-18T00%3A12%3A19.831Z",
    heroImageUrl: "https://paradisemedspa.com/wp-content/uploads/2025/05/clean-face-transparent-2025-a.png",
    logoUrl: "https://paradisemedspa.com/wp-content/uploads/2023/05/Paradise-Medspa-H-Teal.svg",
    theme: {
      primary: "#1f6b67",
      primaryDark: "#103b38",
      accent: "#d89b5b",
      accentSoft: "#eaf6f4",
    },
    batch: "proof_to_booking",
    eyebrow: "Phoenix trust-first consultation path",
    headline: "Put proof and one treatment path beside the booking step.",
    subheadline:
      "A Paradise Medspa Phoenix path that connects cosmetic proof, provider credibility, and wrinkle-treatment interest before the Moxie appointment click.",
    primaryCtaLabel: "Book appointment",
    secondaryCtaLabel: "Review trust path",
    treatmentFocus: "Wrinkle treatments, Botox, dermal fillers, Morpheus8, microneedling, and wellness support",
    visitorQuestion:
      "I trust the clinic broadly, but which treatment path should I ask about when I book?",
    treatmentPathHeading: "Tie reputation to one practical next step.",
    treatmentPathIntro:
      "Paradise Medspa already has strong proof, broad service categories, and appointment booking. This page keeps proof close to one treatment decision instead of asking visitors to scan every service.",
    serviceHighlights: [
      "Cosmetic path: Botox, dermal fillers, Morpheus8, microneedling, chemical peels, IPL, HydraFacial, AviClear, and Clear + Brilliant are visible cosmetic and skin services.",
      "Body and wellness path: CoolSculpting, medical weight loss, hormone therapy, peptides, regenerative therapy, and supplements are visible but kept separate from wrinkle-treatment copy.",
      "Proof path: the homepage presents Featured In logos, client review sections, provider credentials, and a long-running Phoenix positioning.",
    ],
    consultationHeading: "Make the appointment request trust-forward and specific.",
    consultationIntro:
      "Visitors should be able to use the proof to feel comfortable, then book with one treatment category in mind.",
    consultationSteps: [
      "Choose the initial concern: wrinkle treatment, skin texture, acne/rosacea, pigmentation, body contouring, or wellness support.",
      "Use Paradise Medspa's current Moxie booking path.",
      "Ask the team whether Botox, filler, Morpheus8, microneedling, or another visible service fits the concern.",
    ],
    trustHeading: "Use only proof already visible on the public page.",
    trustIntro:
      "The homepage provides enough reputation and provider detail to support a confidence-building consultation page without adding unsupported claims.",
    trustSignals: [
      "Paradise Medspa lists 2060 W. Whispering Wind Drive, Suite 170, Phoenix, AZ 85085.",
      "The homepage says Paradise MedSpa has served the Valley since 2008 and has helped thousands of patients.",
      "The provider section names Dr. Rebecca Weiss and Dr. Kristine Sarna, with professional credentials listed on the page.",
    ],
    finalNote:
      "The page helps Phoenix visitors use Paradise Medspa's proof to book with one clear treatment question.",
  },
  {
    slug: "phoenix-medspa",
    businessName: "Phoenix Medspa",
    shortName: "Phoenix Medspa",
    city: "Phoenix, AZ",
    sourceUrl: "https://phxmedspa.com/",
    primaryCtaHref: "https://phxmedspa.com/book-now/",
    heroImageUrl: "https://phxmedspa.com/wp-content/uploads/2022/11/Depositphotos_295704870_XL-768x512.jpg",
    theme: {
      primary: "#214c62",
      primaryDark: "#102d3c",
      accent: "#d18c4b",
      accentSoft: "#f8eadc",
    },
    batch: "treatment_consultation",
    eyebrow: "Phoenix pricing-to-booking path",
    headline: "Use clear Botox and filler pricing to book with confidence.",
    subheadline:
      "A Phoenix Medspa path for visitors comparing Botox, Dysport, Daxxify, filler pricing, PRP, microneedling, threads, and financing before booking.",
    primaryCtaLabel: "Book appointment",
    secondaryCtaLabel: "Compare price paths",
    treatmentFocus: "Botox, Dysport, Daxxify, fillers, PRP, microneedling, and threads",
    visitorQuestion:
      "I can see the prices. Should I book tox, filler, PRP, microneedling, or ask a question first?",
    treatmentPathHeading: "Turn price shopping into a focused first appointment.",
    treatmentPathIntro:
      "Phoenix Medspa already makes pricing, phone, email, financing, provider, and location details visible. This page helps visitors decide what to do after comparing numbers.",
    serviceHighlights: [
      "Tox path: the source page lists Botox at $9.99, Dysport at $3.33, and Daxxify at $9.99.",
      "Filler path: visible pricing includes lip filler $399 / $699, smile line filler $699, chin filler $699, cheek filler $749, jawline filler $749, Sculptra $699, and filler dissolver $199 per vial.",
      "Support path: the page lists Cherry payment plans, CareCredit, Alle and Aspire rewards, text/call, email, Phoenix and Mesa locations, and booking details.",
    ],
    consultationHeading: "Make the booking request match the price question.",
    consultationIntro:
      "Instead of asking visitors to choose from the whole price list, this path helps them bring one treatment question into the booking flow.",
    consultationSteps: [
      "Choose the first category: tox, filler, PRP/PRF, threads, Kybella/Lipodissolve, or hair restoration.",
      "Use Phoenix Medspa's current Book Now path, or call/text 480-326-7477 if the visitor needs clarification.",
      "Confirm final treatment fit, timing, provider availability, and payment details directly with the clinic.",
    ],
    trustHeading: "Keep pricing, providers, and location details together.",
    trustIntro:
      "The source page provides enough stable context to make a price-aware visitor feel prepared without inventing savings or outcomes.",
    trustSignals: [
      "Phoenix Medspa lists Salon Boutique, 3115 E Indian School Rd, Suite 51, Phoenix, AZ 85016 and phone 480-326-7477.",
      "The staff section names Dr. Paul Dillaway, Refel Seleem, RN, and Kelsey Jueth, RN.",
      "The source page lists major card payments, Cherry Financing, CareCredit, Apple Pay, Venmo, Zelle, Cash, and Alle and Aspire rewards.",
    ],
    finalNote:
      "The page helps a price-aware visitor choose one treatment question before booking Phoenix Medspa.",
  },
  {
    slug: "regency-specialties-matisse-medspa",
    businessName: "Regency Specialties - Matisse Medspa",
    shortName: "Matisse",
    city: "Phoenix, AZ",
    sourceUrl: "https://regencyspecialties.com/matisse-medspa/",
    primaryCtaHref:
      "https://patient.klara.com/#/widget/publicScheduling/scheduling/YmZhNjRlNzljNTdmMTc3OTFmNTVlMGVhZTczMjRkYTAyMzhhZjYyOTVlMTRiOGI5ZGRiN2M2M2E3NzBlCmQxOTkkanFHRzQ1YVVTWHpJc0ZUMk9oRWx0QT09",
    heroImageUrl: "https://wp-assets.pilotpractice.com/regencyspecialties.com/2025/04/Frame-54-1-1.webp",
    logoUrl: "https://wp-assets.pilotpractice.com/regencyspecialties.com/2025/04/Frame-54.webp",
    theme: {
      primary: "#24414a",
      primaryDark: "#12242a",
      accent: "#b9895a",
      accentSoft: "#f3e8de",
    },
    batch: "consultation_trust",
    eyebrow: "Phoenix medspa first-step path",
    headline: "Start with Matisse Medspa, not the full specialty practice.",
    subheadline:
      "A focused Regency Specialties path that separates Botox, fillers, PRP, facials, peels, and lasers from the broader dermatology and plastic surgery navigation.",
    primaryCtaLabel: "Book consultation",
    secondaryCtaLabel: "Choose medspa path",
    treatmentFocus: "Botox, Juvederm, PRP, facials, HydraFacial, peels, lasers, and microneedling",
    visitorQuestion:
      "I’m interested in Matisse Medspa. Should I ask about injectables, facials and peels, or lasers and devices first?",
    treatmentPathHeading: "Keep the aesthetic visitor inside the medspa lane.",
    treatmentPathIntro:
      "Regency Specialties has broader dermatology and plastic surgery context. This page uses that trust carefully while keeping the visitor focused on medspa services and the first scheduling step.",
    serviceHighlights: [
      "Aesthetic injections path: Botox, Juvederm, and PRP injections are visible Matisse Medspa options.",
      "Facial and peel path: facials, HydraFacial, and VI Peel Precision Plus are visible medspa service paths.",
      "Laser and device path: CoolPeel, HALO laser, Lamprobe, BroadBand Light, laser hair reduction, SkinPen microneedling, and Virtue RF microneedling are listed under Matisse.",
    ],
    consultationHeading: "Make patient-info support secondary, not the first decision.",
    consultationIntro:
      "New-patient forms and patient information are useful, but the first step for an aesthetic visitor is choosing the medspa category and scheduling the consultation.",
    consultationSteps: [
      "Choose the medspa category: injections, facials and peels, lasers and devices, or hair restoration support.",
      "Use Regency Specialties' current Klara public scheduling path.",
      "Use patient forms only after the visit path is clear or the practice requests them.",
    ],
    trustHeading: "Use broader practice trust without diluting the medspa path.",
    trustIntro:
      "The page keeps Phoenix practice details visible while avoiding a jump into unrelated specialty services.",
    trustSignals: [
      "Regency lists a Phoenix location at 10240 W. Indian School Rd. #115, Phoenix, AZ 85037.",
      "The Matisse page links medspa-specific services, before-and-after content, patient info, new patient forms, testimonials, and scheduling.",
      "The broader site includes dermatology and plastic surgery navigation, so this path intentionally keeps the aesthetic visitor focused on Matisse Medspa.",
    ],
    finalNote:
      "The page helps a Phoenix visitor schedule the Matisse Medspa consultation without getting lost in the larger practice menu.",
  },
  {
    slug: "sculpt-az-med-spa",
    businessName: "Sculpt AZ Med Spa",
    shortName: "Sculpt AZ",
    city: "Phoenix / Biltmore and Ahwatukee, AZ",
    sourceUrl: "https://www.sculptazmedspa.com/",
    primaryCtaHref: "https://www.joinblvd.com/b/sculptazmedspa/widget#/visit-type",
    heroImageUrl: "https://cdn.prod.website-files.com/66fdd88c1fdfa2129b2694af/69ac5be69271d1728a9697f5_3.jpg",
    logoUrl:
      "https://cdn.prod.website-files.com/66fdd88c1fdfa2129b2694af/69b1cca18791e16661551c91_d4eaa6c20841370bfe1e53bc5e1d26c2_sculptaz_logo_light.svg",
    theme: {
      primary: "#4c403a",
      primaryDark: "#201b18",
      accent: "#c89a63",
      accentSoft: "#f6ecdf",
    },
    batch: "treatment_consultation",
    eyebrow: "Phoenix Radiesse consultation path",
    headline: "Make the Radiesse booking path clear before the visit.",
    subheadline:
      "A Sculpt AZ Med Spa page for visitors comparing Radiesse, injectables, body sculpting, before-and-after proof, and Biltmore or Ahwatukee appointment options.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "Review treatment path",
    treatmentFocus: "Radiesse, injectables, body sculpting, and multi-location booking",
    visitorQuestion:
      "Should I book Radiesse, another injectable, or a body-sculpting consultation at Biltmore or Ahwatukee?",
    treatmentPathHeading: "Use Radiesse as the first treatment conversation.",
    treatmentPathIntro:
      "The source page shows a visible booking path, Radiesse appointment context, before-and-after sections, and two Phoenix-area locations. This page makes that first service-specific booking decision easier.",
    serviceHighlights: [
      "Treatment path: Radiesse is a strong first service focus, while injectables and body-sculpting services remain available for broader consult questions.",
      "Location path: Biltmore and Ahwatukee addresses are both visible, so visitors should choose the location before they book.",
      "Proof path: before-and-after content is visible on the source site, but this demo avoids making outcome promises and keeps proof as decision support.",
    ],
    consultationHeading: "Make booking depend on service and location.",
    consultationIntro:
      "Visitors should understand the service question and the location choice before entering the Boulevard scheduling widget.",
    consultationSteps: [
      "Choose the starting point: Radiesse, another injectable, body sculpting, or general consultation.",
      "Choose Biltmore or Ahwatukee based on the visible location details.",
      "Use Sculpt AZ's current Boulevard booking widget and confirm treatment fit with the team.",
    ],
    trustHeading: "Keep location and contact details close to the CTA.",
    trustIntro:
      "The source page provides enough local context to make this feel specific while staying careful with before-and-after claims.",
    trustSignals: [
      "Sculpt AZ lists Biltmore at 3121 E Lincoln Drive, Phoenix, AZ 85016 and Ahwatukee at 15410 S Mountain Pkwy Suite 103, Phoenix, AZ 85044.",
      "The page lists phone (602) 699-3311 and email frontdesk@sculptazmedspa.com for both locations.",
      "The source site shows Book Now, Boulevard booking, before-and-after content, services navigation, and CareCredit support.",
    ],
    finalNote:
      "The page helps a Sculpt AZ visitor choose Radiesse or another consult path, then book the right Phoenix-area location.",
  },
  {
    slug: "zensken-med-spa",
    businessName: "Zensken Med Spa",
    shortName: "Zensken",
    city: "Phoenix / Arcadia, AZ",
    sourceUrl: "https://www.zensken.com/",
    primaryCtaHref: "https://www.zensken.com/schedule-medspa-appointment",
    heroImageUrl:
      "https://static.wixstatic.com/media/ef5c62_27f7003c5ab1446cb74e950f3b8c4743~mv2.jpg/v1/fill/w_633,h_745,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ef5c62_27f7003c5ab1446cb74e950f3b8c4743~mv2.jpg",
    logoUrl:
      "https://static.wixstatic.com/media/ef5c62_a6078cb7ed3d4f6c86c865eab64d583c~mv2.png/v1/crop/x_0,y_5,w_320,h_52/fill/w_244,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Rectangle%20All%20Black.png",
    theme: {
      primary: "#5c4738",
      primaryDark: "#241c17",
      accent: "#c7a15d",
      accentSoft: "#f4ead8",
    },
    batch: "treatment_consultation",
    eyebrow: "Arcadia signature consult path",
    headline: "Shorten the lip filler and facial-balancing path before scheduling.",
    subheadline:
      "A Zensken page for Phoenix and Arcadia visitors who are drawn to lip filler, dermal filler, Botox, Bellafill, or a non-surgical rejuvenation consult but need one simpler next step.",
    primaryCtaLabel: "Schedule free consult",
    secondaryCtaLabel: "Choose consult focus",
    treatmentFocus: "Lip filler, dermal filler, Botox, Bellafill, and facial balancing",
    visitorQuestion:
      "Should I schedule for lip filler, facial balancing, Botox, Bellafill, or a broader rejuvenation consult?",
    treatmentPathHeading: "Lead with one signature treatment decision.",
    treatmentPathIntro:
      "Zensken presents many treatment options, proof visuals, financing, Club Zen, and a free consult path. This page gives a high-intent visitor a shorter way into the schedule flow.",
    serviceHighlights: [
      "Signature filler path: lip filler, dermal fillers, Bellafill, jawline filler, smile-line filler, and facial balancing are visible on the public site.",
      "Refresh path: Botox, tox treatments, Sculptra, Silhouette Thread Lifts, microneedling, chemical peels, and non-surgical facelift services are listed as service options.",
      "Support path: Zensken also presents Club Zen membership, Cherry, CareCredit, gift cards, services, reviews, common questions, and a free first consult CTA.",
    ],
    consultationHeading: "Make the free consult easier to prepare for.",
    consultationIntro:
      "The schedule page should feel like the next step after a visitor chooses the specific treatment conversation they want to start.",
    consultationSteps: [
      "Choose the consult focus: lip filler, facial balancing, Botox, Bellafill, skin treatment, or broader rejuvenation.",
      "Use Zensken's current schedule page or call/text path to request the free first consultation.",
      "Bring the chosen treatment focus into the visit so the team can guide fit, product options, and next steps.",
    ],
    trustHeading: "Use the Arcadia experience and proof already visible.",
    trustIntro:
      "The public page gives local positioning, service breadth, visual proof, and booking context without needing unsupported outcome promises.",
    trustSignals: [
      "Zensken lists 4626 E Indian School Rd, Phoenix, AZ 85018, call/text 877-654-9806, and info@zensken.com.",
      "The homepage positions Zensken as a Phoenix med spa in the Arcadia neighborhood and says the practice serves Arcadia, Scottsdale, and Phoenix.",
      "The source page highlights lip filler, Botox, dermal fillers, Bellafill, microneedling, hormone therapy, weight loss injections, Club Zen, Cherry financing, CareCredit, reviews, and aesthetic injector training.",
    ],
    finalNote:
      "The page gives a Zensken visitor one practical path: pick the signature treatment question, then schedule the free first consult.",
  },
];

export function getMedSpaDemoBySlug(slug: string) {
  return medSpaDemos.find((demo) => demo.slug === slug) ?? null;
}

export function getMedSpaDemoStaticParams() {
  return medSpaDemos.map((demo) => ({ slug: demo.slug }));
}
