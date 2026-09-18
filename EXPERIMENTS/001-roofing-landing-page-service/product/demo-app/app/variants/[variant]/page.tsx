import { toPublicProspect } from "@/lib/publicProspects";
import { notFound } from "next/navigation";
import { VariantLandingPage } from "../../../components/VariantLandingPage";
import { designVariants, getDesignVariant } from "../../../lib/designVariants";
import { defaultProspect } from "../../../lib/prospects";

type VariantPageProps = {
  params: Promise<{
    variant: string;
  }>;
};

export function generateStaticParams() {
  return designVariants.map((variant) => ({
    variant: variant.id,
  }));
}

export default async function VariantPage({ params }: VariantPageProps) {
  const { variant: variantId } = await params;
  const variant = getDesignVariant(variantId);

  if (!variant) {
    notFound();
  }

  return <VariantLandingPage prospect={toPublicProspect(defaultProspect)} variant={variant} />;
}
