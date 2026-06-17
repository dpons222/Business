import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChargerStormResponseLandingPage } from "../../../../components/ChargerStormResponseLandingPage";
import { getProspectBySlug } from "../../../../lib/prospects";

type ChargerStormResponsePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return <ChargerStormResponseLandingPage prospect={prospect} />;
}
