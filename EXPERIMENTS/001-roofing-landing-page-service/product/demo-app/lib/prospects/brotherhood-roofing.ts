import type { ProspectData } from "./types";

const assetRoot = "https://brotherhoodroofing.com/wp-content/uploads";

export const brotherhoodRoofing: ProspectData = {
  slug: "brotherhood-roofing",
  companyName: "Brotherhood Roofing",
  shortName: "Brotherhood",
  createdAt: "2026-06-24",
  city: "Frisco",
  serviceArea: "Dallas, Frisco, and the Dallas-Fort Worth metro area",
  phone: "972-742-5332",
  phoneHref: "tel:9727425332",
  primaryService: "free DFW hail and storm damage roof inspection",
  recommendedCta: "Schedule Free Inspection",
  secondaryCta: "Call 972-742-5332",
  reviewQuote:
    "Excellent work and highly recommend.",
  trustSignal: "Serving the Metroplex since October 2002",
  logoUrl: `${assetRoot}/2020/11/Brotherhood-Roofing-logo.png`,
  heroImageUrl: `${assetRoot}/2020/12/Hail-Storm-Damage-Repair-in-Dallas.png`,
  projectImages: [
    {
      src: `${assetRoot}/2020/12/Hail-Storm-Damage-Repair-in-Dallas.png`,
      label: "Hail and storm damage repair in Dallas",
    },
    {
      src: `${assetRoot}/2020/12/Spotting-Hail-Damage-1.png`,
      label: "Spotting hail damage",
    },
    {
      src: `${assetRoot}/2020/11/photo-1.png`,
      label: "Brotherhood Roofing project photo",
    },
  ],
  brand: {
    primary: "#23395B",
    primaryDark: "#111A2B",
    accent: "#D6A129",
    accentSoft: "#F7E8C5",
  },
  sourceWebsite: "https://brotherhoodroofing.com/services/hail-and-storm-damage/",
  observedIssue:
    "Brotherhood's hail and storm damage page has useful education, repeated inspection CTAs, and trust proof, but the scheduling path is separated by a lot of reading.",
  headline: "DFW Hail or Storm Damage? Schedule a Free Roof Inspection.",
  subheadline:
    "Brotherhood Roofing can inspect your roof after wind, hail, or flying debris, explain visible concerns, and help you decide whether repair, replacement, or documentation is the practical next step.",
  trustLine:
    "Dallas / Frisco roofing company serving the Metroplex since October 2002 with a clear free roof inspection path for storm damage concerns.",
  formReassurance:
    "No pressure. Brotherhood can follow up to confirm your property details, discuss what you noticed after the storm, and schedule the free inspection.",
  galleryEyebrow: "DFW storm inspection",
  galleryHeading: "Turn Brotherhood's helpful hail education into a faster inspection request path.",
  pageAngle:
    "Start with a free inspection so DFW homeowners can move from storm-damage concern to a clear next step.",
  damageSigns: [
    "Missing, cracked, broken, or curling shingles",
    "Shingles, debris, or tree branches on or near the roof",
    "Water leaks, attic moisture, or ceiling stains",
    "Dented gutters, downspouts, siding, or exterior fixtures",
    "Granules collecting in gutters or near downspouts",
  ],
  inspectionIncludes: [
    "Roof surface review for hail, wind, and debris damage",
    "Gutter and exterior storm-impact check",
    "Attic or leak review if needed",
    "Clear explanation of visible concerns",
    "Repair, replacement, or documentation next-step guidance",
  ],
  process: [
    "Schedule a free inspection",
    "Get the roof and exterior storm-impact check",
    "Review practical repair, replacement, or documentation options",
  ],
  services: [
    "Hail damage roof inspection",
    "Storm damage assessment",
    "Residential roof repair guidance",
    "Roof replacement guidance",
    "Insurance assistance support",
  ],
  faqs: [
    {
      question: "Is Brotherhood's storm inspection free?",
      answer:
        "Yes. Homeowners can schedule a free roof inspection after hail, wind, leaks, missing shingles, or other storm concerns.",
    },
    {
      question: "What are common storm damage signs?",
      answer:
        "Common warning signs include missing or broken shingles, shingles on the ground, water leaks, dented gutters, debris, exposed nails, and granules in gutters or downspouts.",
    },
    {
      question: "Should I request an inspection if I cannot see damage?",
      answer:
        "Yes. Gutters, siding, and deck damage can suggest roof impact too. A professional inspection can help document visible issues more safely.",
    },
    {
      question: "Can Brotherhood help with insurance documentation?",
      answer:
        "Yes. Brotherhood can document visible roof concerns and provide insurance assistance. Coverage decisions still depend on the homeowner's policy and insurer.",
    },
  ],
};
