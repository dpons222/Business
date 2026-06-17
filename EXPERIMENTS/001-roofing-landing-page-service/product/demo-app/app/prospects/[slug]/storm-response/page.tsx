import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChargerVariantSwitcher } from "../../../../components/ChargerVariantSwitcher";
import { RoofingLandingPage } from "../../../../components/RoofingLandingPage";
import type { DesignVariant } from "../../../../lib/designVariants";
import { getProspectBySlug } from "../../../../lib/prospects";

type ChargerStormResponsePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const chargerStormResponseVariant = {
  id: "storm-dark-emergency",
  templateId: "urgent-storm-response",
  templateName: "Urgent Storm Response",
  name: "Charger Storm Response Landing Page",
  shortName: "Storm response landing page",
  summary:
    "A traditional urgent storm response landing page for San Antonio homeowners who want a free roof check after hail or wind.",
  eyebrow: "San Antonio hail and wind damage",
  headline: "Hail hit San Antonio? Schedule a free roof inspection with Charger Roofing.",
  subheadline:
    "If you see hail marks, leaks, missing shingles, or exterior damage after severe weather, Charger Roofing can check the roof, document visible concerns, and explain practical next steps.",
  formTitle: "Request a Free Storm Damage Inspection",
  formNote:
    "No pressure. Share what happened and Charger Roofing can follow up to confirm the roof check request.",
} satisfies DesignVariant;

export function generateStaticParams() {
  return [{ slug: "charger-roofing" }];
}

export async function generateMetadata({
  params,
}: ChargerStormResponsePageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    return {
      title: "Roofing Landing Page Demo",
    };
  }

  return {
    title: `${prospect.companyName} Storm Response Landing Page Demo`,
    description: `Urgent storm response landing page variant for ${prospect.companyName}.`,
  };
}

export default async function ChargerStormResponsePage({
  params,
}: ChargerStormResponsePageProps) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    notFound();
  }

  return (
    <>
      <ChargerVariantSwitcher activeVariant="storm-response" />
      <RoofingLandingPage prospect={prospect} variant={chargerStormResponseVariant} />
    </>
  );
}
