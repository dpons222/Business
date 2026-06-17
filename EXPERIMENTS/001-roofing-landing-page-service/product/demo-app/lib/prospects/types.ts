export type ProjectImage = {
  src: string;
  label: string;
};

export type ProspectData = {
  slug: string;
  companyName: string;
  shortName: string;
  city: string;
  serviceArea: string;
  phone: string;
  phoneHref: string;
  alternatePhone?: string;
  alternatePhoneHref?: string;
  primaryService: string;
  recommendedCta: string;
  secondaryCta: string;
  rating?: string;
  reviewCount?: string;
  reviewQuote?: string;
  trustSignal?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  projectImages: ProjectImage[];
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
