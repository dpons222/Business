import type { ProspectData } from "./types";

const assetRoot = "https://www.loaconstruction.com";

export const loaConstruction: ProspectData = {
  slug: "loa-construction",
  companyName: "LOA Construction",
  shortName: "LOA",
  createdAt: "2026-06-23",
  city: "Austin",
  serviceArea: "Austin, Central Texas, Round Rock, and nearby service areas",
  phone: "512-375-3654",
  phoneHref: "tel:5123753654",
  alternatePhone: "512-686-3983",
  alternatePhoneHref: "tel:5126863983",
  primaryService: "free Austin hail damage roof inspection",
  recommendedCta: "Request Free Hail Inspection",
  secondaryCta: "Call 512-375-3654",
  rating: "5.0 stars",
  reviewCount: "1,000+ reviews",
  trustSignal: "Same-day, hassle-free inspection",
  logoUrl: `${assetRoot}/assets/img/1679531099-logo-color.svg`,
  heroImageUrl: `${assetRoot}/assets/img-export/1679603186-gallery-banner.jpg?auto=format,compress&w=2200`,
  projectImages: [
    {
      src: `${assetRoot}/assets/img-export/1679603186-gallery-banner.jpg?auto=format,compress&w=2200`,
      label: "Austin roofing project exterior",
    },
    {
      src: `${assetRoot}/assets/img-export/hail-storm-blog.webp?auto=format,compress&w=800`,
      label: "Hail storm roof inspection article image",
    },
  ],
  brand: {
    primary: "#1F3F63",
    primaryDark: "#102235",
    accent: "#C79A32",
    accentSoft: "#F7EED9",
  },
  sourceWebsite:
    "https://www.loaconstruction.com/blog/after-the-hail-surge-in-austin-roof-inspections-and-claims/",
  observedIssue:
    "LOA's Austin hail article has the right inspection message, but the request path is buried in long educational content instead of presented as one focused storm-response action.",
  headline: "Hail Hit Austin? Book a Free Roof Inspection with LOA Construction.",
  subheadline:
    "If hail, wind, or heavy rain hit your neighborhood, LOA can inspect your roof, document visible concerns, and explain repair or replacement options before small damage becomes a bigger issue.",
  trustLine:
    "Austin roofing company with a 5.0-star reputation and 1,000+ reviews shown on the public LOA site.",
  formReassurance:
    "No pressure. LOA can follow up to confirm the inspection time, review what you are seeing, and explain the next step before any repair decision is needed.",
  galleryEyebrow: "Austin storm response",
  galleryHeading: "Turn LOA's hail article into a clear inspection request path.",
  pageAngle:
    "Start with a free inspection so you know whether hail damage needs repair, replacement, or continued monitoring.",
  damageSigns: [
    "Granules collecting in gutters or near downspouts",
    "Cracked, loose, or missing shingles",
    "Dented flashing, vents, gutters, or metal roof panels",
    "Water stains, damp drywall, or attic moisture after a storm",
  ],
  inspectionIncludes: [
    "Roof surface condition review",
    "Hail and wind damage check",
    "Photos or notes about visible concerns",
    "Repair or replacement options if damage is found",
    "Clear next steps for documentation and scheduling",
  ],
  process: [
    "Request a free inspection",
    "Get a roof check and damage review",
    "Review repair, replacement, or documentation next steps",
  ],
  services: [
    "Hail damage roof inspection",
    "Storm damage roof repair",
    "Roof replacement guidance",
    "Roof leak and interior water stain review",
    "Insurance documentation support",
  ],
  faqs: [
    {
      question: "Is the hail inspection free?",
      answer:
        "LOA's public hail article tells Austin homeowners to call and set up a free inspection after hail. The inspection request should confirm timing and property details before any repair decision.",
    },
    {
      question: "What if I cannot see damage from the ground?",
      answer:
        "Hail damage can show up as granule loss, cracked shingles, dented flashing, or leaks that are not obvious from the ground. A roof inspection can document visible concerns more safely.",
    },
    {
      question: "Can LOA help with insurance documentation?",
      answer:
        "LOA's public page says their team inspects the roof, documents damage, and provides estimates for required repairs or replacement. Coverage decisions still depend on the homeowner's policy and insurer.",
    },
    {
      question: "When should I request an inspection after hail?",
      answer:
        "LOA's article recommends a thorough roof inspection within seven days after a hail event, especially if you notice granules in gutters, water stains, or other visible storm concerns.",
    },
  ],
};

