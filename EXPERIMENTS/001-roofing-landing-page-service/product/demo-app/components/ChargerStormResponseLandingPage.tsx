import { chargerStormResponseVariant } from "../lib/chargerVariants";
import type { ProspectData } from "../lib/prospects";
import { ChargerVariantSwitcher } from "./ChargerVariantSwitcher";
import { RoofingLandingPage } from "./RoofingLandingPage";

type ChargerStormResponseLandingPageProps = {
  prospect: ProspectData;
};

export function ChargerStormResponseLandingPage({
  prospect,
}: ChargerStormResponseLandingPageProps) {
  return (
    <>
      <ChargerVariantSwitcher activeVariant="storm-response" />
      <RoofingLandingPage prospect={prospect} variant={chargerStormResponseVariant} />
    </>
  );
}
