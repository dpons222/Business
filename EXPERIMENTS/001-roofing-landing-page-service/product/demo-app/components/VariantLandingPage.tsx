import type { DesignVariant } from "../lib/designVariants";
import type { PublicProspect } from "../lib/publicProspects";
import { RoofingLandingPage } from "./RoofingLandingPage";

type VariantLandingPageProps = {
  prospect: PublicProspect;
  variant: DesignVariant;
};

export function VariantLandingPage({ prospect, variant }: VariantLandingPageProps) {
  return <RoofingLandingPage prospect={prospect} variant={variant} />;
}
