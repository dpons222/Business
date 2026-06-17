import { notFound } from "next/navigation";
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

export default async function ProspectPage({ params }: ProspectPageProps) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect) {
    notFound();
  }

  return <RoofingLandingPage prospect={prospect} />;
}
