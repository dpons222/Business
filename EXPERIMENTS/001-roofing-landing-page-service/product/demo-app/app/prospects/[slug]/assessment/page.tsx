import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StormAssessmentDemo } from "../../../../components/StormAssessmentDemo";
import { getProspectBySlug } from "../../../../lib/prospects";

type ChargerAssessmentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [{ slug: "charger-roofing" }];
}

export async function generateMetadata({
  params,
}: ChargerAssessmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    return {
      title: "Roofing Landing Page Demo",
    };
  }

  return {
    title: `${prospect.companyName} Assessment Flow Demo`,
    description: `Storm damage assessment and inspection intake variant for ${prospect.companyName}.`,
  };
}

export default async function ChargerAssessmentPage({ params }: ChargerAssessmentPageProps) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);

  if (!prospect || prospect.slug !== "charger-roofing") {
    notFound();
  }

  return <StormAssessmentDemo prospect={prospect} />;
}
