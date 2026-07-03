import type { ProspectData } from "./types";

const assetRoot = "https://edproofing.com/wp-content/uploads";

export const edpRoofing: ProspectData = {
  slug: "edp-roofing",
  companyName: "EDP Roofing",
  shortName: "EDP",
  createdAt: "2026-06-24",
  city: "Dallas, TX",
  serviceArea: "Dallas, DFW, and nearby North Texas communities",
  phone: "(972) 274-5277",
  phoneHref: "tel:9722745277",
  primaryService: "Dallas storm damage roof inspection",
  recommendedCta: "Talk To A Roofer",
  secondaryCta: "Call (972) 274-5277",
  rating: "4.9 Google",
  reviewCount: "22 reviews",
  trustSignal: "GAF Gold Elite Commercial Contractor and BBB A+ proof for Dallas homeowners",
  logoUrl: `${assetRoot}/2020/09/logo.png`,
  heroImageUrl: `${assetRoot}/2026/02/new-gaf-class-4-roof-buckner-terracs-dallas.webp`,
  projectImages: [
    {
      src: `${assetRoot}/2026/02/new-gaf-class-4-roof-buckner-terracs-dallas.webp`,
      label: "Dallas GAF Class 4 roof project",
    },
    {
      src: `${assetRoot}/2026/02/insurance-advocacy-edp-roofing-for-dallas-homeowner.webp`,
      label: "Dallas homeowner roof inspection guidance",
    },
    {
      src: `${assetRoot}/2026/02/GAF-gold-elite.webp`,
      label: "GAF Gold Elite contractor proof",
    },
  ],
  brand: {
    primary: "#122B46",
    primaryDark: "#071827",
    accent: "#D9A229",
    accentSoft: "#F5E6C3",
  },
  sourceWebsite: "https://edproofing.com/storm-damage-roof-repair-dallas/",
  observedIssue:
    "EDP's Dallas storm damage page has strong proof and storm-specific content, but it uses several competing CTAs and dense insurance/service sections before one clear next action.",
  headline: "Dallas Storm Damage? Talk To A Roofer.",
  subheadline:
    "After hail, leaks, wind, or storm damage, EDP Roofing can review the roof concern, explain what to look at next, and help you understand practical repair or documentation options.",
  trustLine:
    "Dallas roofing company with 4.9 Google rating, 22 reviews, GAF Gold Elite proof, BBB A+ badge, and local storm-damage experience.",
  formReassurance:
    "No pressure. EDP can follow up to confirm your property details, review what happened during the storm, and help you decide whether an inspection or repair estimate is the next step.",
  galleryEyebrow: "Dallas storm damage proof",
  galleryHeading: "One inspection-first action after Dallas storm damage.",
  pageAngle:
    "Use one direct talk-to-a-roofer path for Dallas homeowners after hail, roof leaks, wind damage, or storm concerns.",
  damageSigns: [
    "Roof leaks or ceiling stains after heavy rain",
    "Hail impact or missing granules",
    "Loose, lifted, or missing shingles after wind",
    "Visible damage after a storm or fallen debris",
    "Roof concerns that may need documentation before repairs",
  ],
  inspectionIncludes: [
    "Storm damage concern review",
    "Roof leak and hail damage discussion",
    "Photo or documentation guidance when needed",
    "Repair or replacement next-step explanation",
    "Cautious claim-support discussion without outcome promises",
  ],
  process: [
    "Talk to a Dallas roofer",
    "Review storm, hail, or leak concerns",
    "Decide on inspection, estimate, repair, or documentation next steps",
  ],
  services: [
    "Storm damage roof repair",
    "Hail damage roof inspection",
    "Roof leak repair guidance",
    "Emergency roof repair discussion",
    "Insurance documentation support",
  ],
  faqs: [
    {
      question: "Why talk to a roofer first?",
      answer:
        "A quick roofer conversation can confirm whether the storm concern needs an inspection, an estimate, a repair discussion, or documentation support.",
    },
    {
      question: "What trust proof does EDP show?",
      answer:
        "EDP shows a 4.9 Google rating, 22 reviews, GAF Gold Elite credentials, BBB A+ proof, Google review badges, and local Dallas project imagery.",
    },
    {
      question: "Can the inspection help with insurance documentation?",
      answer:
        "Yes, but cautiously. It can mention documentation and claim-support discussion without implying coverage approval, claim outcomes, or payment guarantees.",
    },
    {
      question: "What happens after a homeowner submits?",
      answer:
        "EDP can follow up to confirm the storm concern, property details, and whether an inspection, estimate, or documentation discussion is the practical next step.",
    },
  ],
};
