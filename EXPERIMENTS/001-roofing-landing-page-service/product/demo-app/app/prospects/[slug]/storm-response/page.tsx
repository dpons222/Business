import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChargerStormResponseLandingPage } from "../../../../components/ChargerStormResponseLandingPage";
import { getPublicProspectBySlug } from "@/lib/publicProspects";

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
  const prospect = getPublicProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    return {
      title: "Storm Response",
    };
  }

  return {
    title: `${prospect.companyName} Storm Response`,
    description: `Urgent storm response inspection page for ${prospect.companyName}.`,
  };
}

export default async function ChargerStormResponsePage({
  params,
}: ChargerStormResponsePageProps) {
  const { slug } = await params;
  const prospect = getPublicProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    notFound();
  }

  return <ChargerStormResponseLandingPage prospect={prospect} />;
}
