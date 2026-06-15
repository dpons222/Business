export type VariantId =
  | "brand-photo-hero"
  | "brand-split-hero"
  | "storm-dark-emergency"
  | "storm-bright-direct"
  | "trust-reviews-first"
  | "trust-process-first";

export type TemplateId = "brand-led-conversion" | "urgent-storm-response" | "trust-proof-local";

export type DesignVariant = {
  id: VariantId;
  templateId: TemplateId;
  templateName: string;
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
    id: "brand-photo-hero",
    templateId: "brand-led-conversion",
    templateName: "Brand-Led Conversion",
    name: "Photo Hero",
    shortName: "Project photo first",
    summary:
      "A branded page that leads with the company's own roof photography, logo, phone number, proof, and inspection form.",
    eyebrow: "Frisco roof inspection",
    headline: "Storm damage? Schedule a free roof inspection with Final Cut Roofing.",
    subheadline:
      "If hail, wind, or heavy rain hit Frisco or nearby DFW neighborhoods, Final Cut Roofing can inspect your roof, document visible damage, and explain clear next steps before any work begins.",
    formTitle: "Request Your Free Roof Inspection",
    formNote: "Final Cut Roofing is SSL secure. No downpayment. No hidden fees.",
  },
  {
    id: "brand-split-hero",
    templateId: "brand-led-conversion",
    templateName: "Brand-Led Conversion",
    name: "Split Hero",
    shortName: "Brand and form side by side",
    summary:
      "A polished split layout that balances company identity, service-area trust, and a visible lead form above the fold.",
    eyebrow: "Roofing and storm restoration",
    headline: "Roof leaks, storm damage, or aging shingles? Start with a free roof check.",
    subheadline:
      "Final Cut Roofing provides roof inspections, repairs, and replacement guidance for homeowners across Frisco and nearby DFW communities.",
    formTitle: "Start With a Free Roof Check",
    formNote: "Get clear guidance before choosing repair, replacement, or no immediate work.",
  },
  {
    id: "storm-dark-emergency",
    templateId: "urgent-storm-response",
    templateName: "Urgent Storm Response",
    name: "Dark Emergency",
    shortName: "Urgent storm response",
    summary:
      "If your neighborhood saw hail or wind, have your roof checked before leaks show up inside.",
    eyebrow: "Hail and wind damage roof inspections",
    headline: "Hail hit Frisco? Get a free roof inspection before small damage spreads.",
    subheadline:
      "Final Cut Roofing helps Frisco and North Texas homeowners check for storm damage, document visible concerns, and understand repair or replacement options before problems get worse.",
    formTitle: "Request a Free Storm Damage Inspection",
    formNote: "Tell us what you are seeing and Final Cut Roofing will follow up to confirm a time.",
  },
  {
    id: "storm-bright-direct",
    templateId: "urgent-storm-response",
    templateName: "Urgent Storm Response",
    name: "Bright Direct",
    shortName: "Fast storm scheduling",
    summary: "A brighter, faster storm page for homeowners who need a roof check after severe weather.",
    eyebrow: "Fast inspection request",
    headline: "Free roof inspection in Frisco. Fast scheduling. Clear next steps.",
    subheadline:
      "If you see leaks, missing shingles, hail marks, or storm damage, request a roof check from Final Cut Roofing today.",
    formTitle: "Get Inspection Callback",
    formNote: "Share your contact details and property ZIP code to get started.",
  },
  {
    id: "trust-reviews-first",
    templateId: "trust-proof-local",
    templateName: "Trust & Proof Local",
    name: "Reviews First",
    shortName: "Local proof first",
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
    id: "trust-process-first",
    templateId: "trust-proof-local",
    templateName: "Trust & Proof Local",
    name: "Process First",
    shortName: "Simple process first",
    summary:
      "A calmer page built around what happens next: inspection, photos, findings, and repair choices.",
    eyebrow: "Simple roof inspection process",
    headline: "Know what happens next before you schedule a roof inspection.",
    subheadline:
      "This direction reduces uncertainty by showing homeowners the inspection path before asking them to submit the form.",
    formTitle: "Schedule Free Inspection",
    formNote: "Know what happens next before deciding on repair, replacement, or a claim.",
  },
];

export function getDesignVariant(id: string): DesignVariant | undefined {
  return designVariants.find((variant) => variant.id === id);
}

export const designTemplateGroups = [
  {
    id: "brand-led-conversion",
    name: "Brand-Led Conversion",
    variants: designVariants.filter((variant) => variant.templateId === "brand-led-conversion"),
  },
  {
    id: "urgent-storm-response",
    name: "Urgent Storm Response",
    variants: designVariants.filter((variant) => variant.templateId === "urgent-storm-response"),
  },
  {
    id: "trust-proof-local",
    name: "Trust & Proof Local",
    variants: designVariants.filter((variant) => variant.templateId === "trust-proof-local"),
  },
] as const;
