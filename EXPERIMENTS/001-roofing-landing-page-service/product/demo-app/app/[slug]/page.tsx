import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChargerStormResponseLandingPage } from "../../components/ChargerStormResponseLandingPage";
import { RoofingLandingPage } from "../../components/RoofingLandingPage";
import { getPublicProspectBySlug, getPublicProspectStaticParams } from "@/lib/publicProspects";

type PublicProspectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublicProspectStaticParams();
}

export async function generateMetadata({
  params,
}: PublicProspectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getPublicProspectBySlug(slug);

  if (!prospect) {
    return {
      title: "Roof Inspection",
    };
  }

  return {
    title: `${prospect.companyName} Roof Inspection`,
    description: `Storm damage and free roof inspection page for ${prospect.companyName}.`,
  };
}

export default async function PublicProspectPage({ params }: PublicProspectPageProps) {
  const { slug } = await params;
  const prospect = getPublicProspectBySlug(slug);

  if (!prospect) {
    notFound();
  }

  if (prospect.slug === "charger-roofing") {
    return <ChargerStormResponseLandingPage prospect={prospect} />;
  }

  return <RoofingLandingPage prospect={prospect} />;
}
