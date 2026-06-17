import type { DesignVariant } from "../lib/designVariants";
import type { ProspectData } from "../lib/prospects";
import { RoofingLandingPage } from "./RoofingLandingPage";

type VariantLandingPageProps = {
  prospect: ProspectData;
  variant: DesignVariant;
};

export function VariantLandingPage({ prospect, variant }: VariantLandingPageProps) {
  return <RoofingLandingPage prospect={prospect} variant={variant} />;
}
