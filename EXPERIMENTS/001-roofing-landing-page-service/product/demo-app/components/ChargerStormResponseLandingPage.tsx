import { chargerStormResponseVariant } from "../lib/chargerVariants";
import type { ProspectData } from "../lib/prospects";
import { RoofingLandingPage } from "./RoofingLandingPage";

type ChargerStormResponseLandingPageProps = {
  prospect: ProspectData;
};

export function ChargerStormResponseLandingPage({
  prospect,
}: ChargerStormResponseLandingPageProps) {
  return <RoofingLandingPage prospect={prospect} variant={chargerStormResponseVariant} />;
}
