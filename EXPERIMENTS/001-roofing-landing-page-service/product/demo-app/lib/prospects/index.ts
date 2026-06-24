import { arringtonRoofing } from "./arrington-roofing";
import { brotherhoodRoofing } from "./brotherhood-roofing";
import { chargerRoofing } from "./charger-roofing";
import { dynastyRoofing } from "./dynasty-roofing";
import { edpRoofing } from "./edp-roofing";
import { finalCutRoofing } from "./final-cut-roofing";
import { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
import { loaConstruction } from "./loa-construction";
import { matthewLorandRoofing } from "./matthew-lorand-roofing";
import { onPointRoofing } from "./on-point-roofing";
import { phoenixStormRestoration } from "./phoenix-storm-restoration";
import { properRoofing } from "./proper-roofing";
import { rivertopRoofing } from "./rivertop-roofing";
import { sixthGenRoofing } from "./sixth-gen-roofing";
import { stormvets } from "./stormvets";
import type { ProspectData } from "./types";

export type { ProspectData, ProjectImage } from "./types";
export { arringtonRoofing } from "./arrington-roofing";
export { brotherhoodRoofing } from "./brotherhood-roofing";
export { chargerRoofing } from "./charger-roofing";
export { dynastyRoofing } from "./dynasty-roofing";
export { edpRoofing } from "./edp-roofing";
export { finalCutRoofing } from "./final-cut-roofing";
export { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
export { loaConstruction } from "./loa-construction";
export { matthewLorandRoofing } from "./matthew-lorand-roofing";
export { onPointRoofing } from "./on-point-roofing";
export { phoenixStormRestoration } from "./phoenix-storm-restoration";
export { properRoofing } from "./proper-roofing";
export { rivertopRoofing } from "./rivertop-roofing";
export { sixthGenRoofing } from "./sixth-gen-roofing";
export { stormvets } from "./stormvets";

export const prospects: ProspectData[] = [
  finalCutRoofing,
  chargerRoofing,
  loaConstruction,
  rivertopRoofing,
  stormvets,
  brotherhoodRoofing,
  matthewLorandRoofing,
  integrityFirstRoofingConstruction,
  edpRoofing,
  properRoofing,
  arringtonRoofing,
  phoenixStormRestoration,
  dynastyRoofing,
  sixthGenRoofing,
  onPointRoofing,
];

export const defaultProspect = finalCutRoofing;
export const activeProspectSlug = chargerRoofing.slug;

export function getProspectBySlug(slug: string): ProspectData | undefined {
  return prospects.find((prospect) => prospect.slug === slug);
}

export function getProspectStaticParams() {
  return prospects.map((prospect) => ({
    slug: prospect.slug,
  }));
}
