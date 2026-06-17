import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChargerStormResponseLandingPage } from "../../components/ChargerStormResponseLandingPage";
import { RoofingLandingPage } from "../../components/RoofingLandingPage";
import { getProspectBySlug, getProspectStaticParams } from "../../lib/prospects";

type PublicProspectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProspectStaticParams();
}

export async function generateMetadata({
  params,
}: PublicProspectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    return {
      title: "Roof Inspection Preview",
    };
  }

  return {
    title: `${prospect.companyName} Roof Inspection Preview`,
    description: `Focused storm damage and free roof inspection page preview for ${prospect.companyName}.`,
  };
}

export default async function PublicProspectPage({ params }: PublicProspectPageProps) {
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
