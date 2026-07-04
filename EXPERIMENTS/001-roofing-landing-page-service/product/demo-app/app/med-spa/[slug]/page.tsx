import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MedSpaTreatmentConsultPage } from "../../../components/MedSpaTreatmentConsultPage";
import { getMedSpaDemoBySlug, getMedSpaDemoStaticParams } from "../../../lib/medSpaDemos";

type MedSpaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getMedSpaDemoStaticParams();
}

export async function generateMetadata({ params }: MedSpaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = getMedSpaDemoBySlug(slug);

  if (!demo) {
    return {
      title: "Med Spa Treatment Path",
    };
  }

  return {
    title: `${demo.businessName} Treatment Consultation Path`,
    description: demo.subheadline,
  };
}

export default async function MedSpaPage({ params }: MedSpaPageProps) {
  const { slug } = await params;
  const demo = getMedSpaDemoBySlug(slug);

  if (!demo) {
    notFound();
  }

  return <MedSpaTreatmentConsultPage demo={demo} />;
}
