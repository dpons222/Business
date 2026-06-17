import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChargerStormResponseLandingPage } from "../../../components/ChargerStormResponseLandingPage";
import { RoofingLandingPage } from "../../../components/RoofingLandingPage";
import { getProspectBySlug, getProspectStaticParams } from "../../../lib/prospects";

type ProspectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProspectStaticParams();
}

export async function generateMetadata({ params }: ProspectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    return {
      title: "Roofing Landing Page Demo",
    };
  }

  return {
    title: `${prospect.companyName} Free Roof Inspection Demo`,
    description: `Focused storm damage and free roof inspection landing page demo for ${prospect.companyName}.`,
  };
}

export default async function ProspectPage({ params }: ProspectPageProps) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    notFound();
  }

  if (prospect.slug === "charger-roofing") {
    return <ChargerStormResponseLandingPage prospect={prospect} />;
  }

  return <RoofingLandingPage prospect={prospect} />;
}
