import type { ProspectData } from "./types";

const assetRoot = "/prospects/final-cut-roofing";

export const finalCutRoofing: ProspectData = {
  slug: "final-cut-roofing",
  companyName: "Final Cut Roofing",
  shortName: "Final Cut",
  createdAt: "2026-06-16",
  city: "Frisco, TX",
  serviceArea: "Frisco, McKinney, Plano, The Colony, Denton, and nearby DFW neighborhoods",
  phone: "972-777-0350",
  phoneHref: "tel:9727770350",
  alternatePhone: "888-618-3271",
  alternatePhoneHref: "tel:8886183271",
  primaryService: "free storm and hail damage roof inspection",
  recommendedCta: "Schedule Free Roof Inspection",
  secondaryCta: "Call 972-777-0350",
  rating: "Excellent",
  reviewCount: "29 reviews",
  reviewQuote:
    "Final Cut Roofing stands behind their craftsmanship. Any issues or concerns, one call/text and they have me on the schedule.",
  logoUrl: `${assetRoot}/logo.webp`,
  heroImageUrl: `${assetRoot}/roofing-project.webp`,
  projectImages: [
    {
      src: `${assetRoot}/roofing-project.webp`,
      label: "Storm damage roof replacement",
    },
    {
      src: `${assetRoot}/roof-install-2.webp`,
      label: "Roof installation in progress",
    },
    {
      src: `${assetRoot}/roof-install-3.webp`,
      label: "Full roof replacement",
    },
    {
      src: `${assetRoot}/roofing-after.webp`,
      label: "Completed roofing project",
    },
  ],
  brand: {
    primary: "#10AEE4",
    primaryDark: "#111827",
    accent: "#10AEE4",
    accentSoft: "#E7F8FE",
  },
  sourceWebsite: "https://finalcutroofing.com/free-roof-inspection/",
  observedIssue:
    "If a recent storm moved through your neighborhood, a roof inspection can help catch hail, wind, or leak concerns before they become larger repairs.",
  headline: "Storm Damage in Frisco? Schedule a Free Roof Inspection.",
  subheadline:
    "If hail, wind, or heavy rain hit your neighborhood, Final Cut Roofing can inspect your roof, document visible damage, and explain clear next steps before any work begins.",
  trustLine:
    "Serving Frisco, McKinney, Plano, The Colony, Denton, and nearby DFW homeowners.",
  formReassurance:
    "No pressure. Final Cut Roofing will contact you to confirm the inspection time and answer questions before any work begins.",
  pageAngle:
    "Start with a free inspection so you know what is happening on the roof before deciding on repairs or replacement.",
  damageSigns: [
    "Missing, lifted, or damaged shingles",
    "Hail marks or granule loss",
    "Leaks or ceiling water stains",
    "Damage around vents, flashing, or roof edges",
  ],
  inspectionIncludes: [
    "Exterior roof condition check",
    "Photos of visible concerns",
    "Review of affected areas",
    "Clear repair or replacement options",
    "Next steps before any work begins",
  ],
  process: [
    "Request a free inspection",
    "Get photos and a clear damage review",
    "Choose a repair, replacement, or claim plan",
    "Stay informed while the work is completed",
  ],
  services: [
    "Storm damage inspection",
    "Hail damage repair",
    "Wind damage repair",
    "Roof leak review",
    "Roof repair or replacement guidance",
  ],
  faqs: [
    {
      question: "Is the roof inspection free?",
      answer:
        "Yes. Homeowners can request a free roof inspection before deciding whether repairs or replacement are needed.",
    },
    {
      question: "What if I am not sure there is damage?",
      answer:
        "That is common after storms. Request an inspection if you see leaks, missing shingles, hail marks, or just want peace of mind after severe weather.",
    },
    {
      question: "Will I receive photos?",
      answer:
        "Visible concerns can be documented with photos and explained before any work begins.",
    },
    {
      question: "What happens after I request an inspection?",
      answer:
        "Final Cut Roofing will follow up to confirm the property details, schedule the inspection, and answer questions about next steps.",
    },
  ],
};
