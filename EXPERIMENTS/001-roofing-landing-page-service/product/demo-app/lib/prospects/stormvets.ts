import type { ProspectData } from "./types";

const assetRoot = "https://stormvets.com/wp-content/uploads";

export const stormvets: ProspectData = {
  slug: "stormvets",
  companyName: "StormVets",
  shortName: "StormVets",
  createdAt: "2026-06-24",
  city: "Frisco, TX",
  serviceArea: "Frisco, Collin County, Denton, and nearby North Texas communities",
  phone: "(469) 422-4238",
  phoneHref: "tel:4694224238",
  primaryService: "free Frisco roof inspection",
  recommendedCta: "Request Free Roof Inspection",
  secondaryCta: "Call (469) 422-4238",
  trustSignal: "Veteran-owned roofing company",
  logoUrl: `${assetRoot}/2025/08/StormVets-FullLogo-Transparent-NoBuffer.png`,
  heroImageUrl:
    `${assetRoot}/2025/09/StormVets-Blake-Vin-Aubrey-TX-Prosper-Roof-Inspection-1.webp`,
  projectImages: [
    {
      src: `${assetRoot}/2025/09/StormVets-Blake-Vin-Aubrey-TX-Prosper-Roof-Inspection-1.webp`,
      label: "StormVets roof inspection team",
    },
    {
      src: `${assetRoot}/2025/08/StormVets-roof-inspections-blake-owner-dallas-frisco-tx.webp`,
      label: "StormVets owner inspection photo",
    },
    {
      src: `${assetRoot}/2025/08/StormVets-roof-inspections-vin-owner-dallas-frisco-tx.webp`,
      label: "StormVets roof inspection in North Texas",
    },
  ],
  brand: {
    primary: "#223B5F",
    primaryDark: "#101D33",
    accent: "#B83232",
    accentSoft: "#F4DDDD",
  },
  sourceWebsite: "https://stormvets.com/free-roof-inspection-frisco-tx/",
  observedIssue:
    "StormVets' Frisco free inspection page has strong veteran-owned trust proof and a clear form, but the request path appears after navigation, service-area copy, and broad roofing context.",
  headline: "Frisco Storm Damage? Request a Free Roof Inspection.",
  subheadline:
    "StormVets can inspect your roof after hail, wind, or severe North Texas weather, document visible concerns, and explain what the roof actually needs before you decide on repairs.",
  trustLine:
    "Veteran-owned roofing company serving Frisco and nearby North Texas communities with no-cost, no-obligation inspections.",
  formReassurance:
    "No pressure. StormVets can follow up to confirm the property details, review what you are seeing, and schedule the inspection before any repair decision is needed.",
  galleryEyebrow: "Frisco inspection trust",
  galleryHeading: "Move StormVets' no-cost inspection request closer to the storm concern.",
  pageAngle:
    "Start with a no-cost inspection so Frisco homeowners can understand whether hail, wind, or severe weather left damage that needs attention.",
  damageSigns: [
    "Hail marks, granule loss, or bruised shingles",
    "Lifted, loose, cracked, or missing shingles after wind",
    "Leaks, ceiling stains, or attic moisture after storms",
    "Damage around vents, flashing, gutters, or exterior fixtures",
  ],
  inspectionIncludes: [
    "Roof surface review for wind and hail damage",
    "Photo and video documentation when needed",
    "Clear explanation of what the roof actually needs",
    "No-cost, no-obligation inspection request",
    "Guidance for repair, replacement, or insurance next steps",
  ],
  process: [
    "Request a free Frisco roof inspection",
    "Get a damage assessment with documentation",
    "Review repair, replacement, or claim-support options",
  ],
  services: [
    "Free roof inspections",
    "Wind and hail damage assessment",
    "Roof repair guidance",
    "Roof replacement guidance",
    "Insurance claim support",
  ],
  faqs: [
    {
      question: "Is the StormVets inspection free?",
      answer:
        "Yes. The inspection can be positioned as no-cost and no-obligation for homeowners in Frisco and nearby communities.",
    },
    {
      question: "What does StormVets look for during the inspection?",
      answer:
        "Inspections can look for wind and hail damage caused by local Texas storms and can include pictures or videos when needed.",
    },
    {
      question: "Can StormVets help if insurance is involved?",
      answer:
        "StormVets says they can work with homeowners and their insurance company after an inspection. Any coverage decision still depends on the policy and insurer.",
    },
    {
      question: "Why request the inspection after a storm?",
      answer:
        "A no-cost inspection gives homeowners a clearer view of wind, hail, or leak concerns before deciding whether repair, replacement, or insurance next steps are needed.",
    },
  ],
};
