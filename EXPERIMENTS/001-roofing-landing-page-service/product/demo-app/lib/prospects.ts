export type ProspectData = {
  companyName: string;
  city: string;
  serviceArea: string;
  phone: string;
  phoneHref: string;
  primaryService: string;
  recommendedCta: string;
  secondaryCta: string;
  rating?: string;
  reviewCount?: string;
  trustSignal?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  brand: {
    primary: string;
    primaryDark: string;
    accent: string;
    accentSoft: string;
  };
  sourceWebsite: string;
  observedIssue: string;
  headline: string;
  subheadline: string;
  trustLine: string;
  formReassurance: string;
  pageAngle: string;
  damageSigns: string[];
  inspectionIncludes: string[];
  process: string[];
  services: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const finalCutRoofing: ProspectData = {
  companyName: "Final Cut Roofing",
  city: "Frisco",
  serviceArea: "Frisco, McKinney, Plano, The Colony, Denton, and nearby DFW neighborhoods",
  phone: "972-777-0350",
  phoneHref: "tel:9727770350",
  primaryService: "free storm and hail damage roof inspection",
  recommendedCta: "Schedule Free Roof Inspection",
  secondaryCta: "Call 972-777-0350",
  rating: "Excellent",
  reviewCount: "29 reviews",
  logoUrl: "/final-cut/logo.webp",
  heroImageUrl: "/final-cut/roofing-project.webp",
  brand: {
    primary: "#10AEE4",
    primaryDark: "#111827",
    accent: "#10AEE4",
    accentSoft: "#E7F8FE",
  },
  sourceWebsite: "https://finalcutroofing.com/free-roof-inspection/",
  observedIssue:
    "If a recent storm moved through your neighborhood, a roof inspection can help catch hail, wind, or leak concerns before they become larger repairs.",
  headline: "Storm Damage? Schedule a Free Roof Inspection with Final Cut Roofing.",
  subheadline:
    "If hail, wind, or heavy rain hit Frisco or nearby DFW neighborhoods, Final Cut Roofing can inspect your roof, document visible damage, and explain clear next steps before any work begins.",
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
    "Request your inspection",
    "Final Cut Roofing checks visible roof damage",
    "You receive findings and photos",
    "You choose the next step that fits your home",
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
