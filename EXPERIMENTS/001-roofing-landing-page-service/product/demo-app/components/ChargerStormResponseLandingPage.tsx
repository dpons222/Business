import { chargerStormResponseVariant } from "../lib/chargerVariants";
import type { PublicProspect } from "../lib/publicProspects";
import { RoofingLandingPage } from "./RoofingLandingPage";

type ChargerStormResponseLandingPageProps = {
  prospect: PublicProspect;
};

export function ChargerStormResponseLandingPage({
  prospect,
}: ChargerStormResponseLandingPageProps) {
  return <RoofingLandingPage prospect={prospect} variant={chargerStormResponseVariant} />;
}
