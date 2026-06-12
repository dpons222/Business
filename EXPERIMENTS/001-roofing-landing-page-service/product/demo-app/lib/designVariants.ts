export type VariantId =
  | "storm-response"
  | "trust-first"
  | "premium-local"
  | "compact-conversion";

export type DesignVariant = {
  id: VariantId;
  name: string;
  shortName: string;
  summary: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  formTitle: string;
  formNote: string;
};

export const designVariants: DesignVariant[] = [
  {
    id: "storm-response",
    name: "Storm Damage Inspection",
    shortName: "Free roof inspection",
    summary:
      "If your neighborhood saw hail or wind, have your roof checked before leaks show up inside.",
    eyebrow: "Hail and wind damage roof inspections",
    headline: "Hail hit Frisco? Get a free roof inspection before small damage spreads.",
    subheadline:
      "Final Cut Roofing helps Frisco and North Texas homeowners check for storm damage, document visible concerns, and understand repair or replacement options before problems get worse.",
    formTitle: "Request a Free Storm Damage Inspection",
    formNote: "Tell us where the property is and Final Cut Roofing will follow up to confirm a time.",
  },
  {
    id: "trust-first",
    name: "Local Roof Inspection",
    shortName: "Local roofing help",
    summary:
      "Local roof inspections for homeowners who want clear answers before making a repair decision.",
    eyebrow: "Local Frisco roofing help",
    headline:
      "Need a roof inspection in Frisco? Talk with a local roofing team before the damage gets worse.",
    subheadline:
      "From missing shingles to roof leaks after heavy weather, Final Cut Roofing checks the roof, explains what they find, and helps you choose the right next step.",
    formTitle: "Schedule Free Inspection",
    formNote: "No pressure. Start with a roof check and clear findings.",
  },
  {
    id: "premium-local",
    name: "Roof Repair & Replacement",
    shortName: "Roofing service",
    summary:
      "Roofing help for storm damage, leaks, repair decisions, and replacement planning.",
    eyebrow: "Roofing and storm restoration",
    headline: "Storm damage, roof leaks, or aging shingles? Start with a free roof check.",
    subheadline:
      "Final Cut Roofing provides roof inspections, repairs, and replacement guidance for homeowners across Frisco and nearby DFW communities.",
    formTitle: "Start With a Free Roof Check",
    formNote: "Get clear guidance before choosing repair, replacement, or no immediate work.",
  },
  {
    id: "compact-conversion",
    name: "Fast Roof Inspection",
    shortName: "Fast scheduling",
    summary: "One simple request for hail, wind, leak, and missing-shingle concerns.",
    eyebrow: "Fast inspection request",
    headline: "Free roof inspection in Frisco. Fast scheduling. Clear next steps.",
    subheadline:
      "If you see leaks, missing shingles, hail marks, or storm damage, request a roof check from Final Cut Roofing today.",
    formTitle: "Get Inspection Callback",
    formNote: "Share your contact details and the property ZIP code to get started.",
  },
];

export function getDesignVariant(id: string): DesignVariant | undefined {
  return designVariants.find((variant) => variant.id === id);
}
