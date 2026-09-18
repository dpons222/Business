import "server-only";
import { cloudRoofing } from "./cloud-roofing";
import { pappasRoofingAndConstruction } from "./pappas-roofing-and-construction";
import { rippleRoofing } from "./ripple-roofing";
import { invictusRoofing } from "./invictus-roofing";
import { texasStarRoofingConstruction } from "./texas-star-roofing-construction";
import { rhinoRoofers } from "./rhino-roofers";
import { rescueRoofingTexas } from "./rescue-roofing-texas";
import { texasDirectRoofingConstruction } from "./texas-direct-roofing-construction";
import { sugarRoofing } from "./sugar-roofing";
import { firefighterRoofing } from "./firefighter-roofing";
import { elevatedRoofing } from "./elevated-roofing";
import { houstonRoofingConstruction } from "./houston-roofing-construction";
import { veritasRoofing } from "./veritas-roofing";
import { tsgRoofing } from "./tsg-roofing";
import { proclaimRoofingHouston } from "./proclaim-roofing-houston";
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
export { cloudRoofing } from "./cloud-roofing";
export { dynastyRoofing } from "./dynasty-roofing";
export { edpRoofing } from "./edp-roofing";
export { elevatedRoofing } from "./elevated-roofing";
export { firefighterRoofing } from "./firefighter-roofing";
export { finalCutRoofing } from "./final-cut-roofing";
export { houstonRoofingConstruction } from "./houston-roofing-construction";
export { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
export { invictusRoofing } from "./invictus-roofing";
export { loaConstruction } from "./loa-construction";
export { matthewLorandRoofing } from "./matthew-lorand-roofing";
export { onPointRoofing } from "./on-point-roofing";
export { pappasRoofingAndConstruction } from "./pappas-roofing-and-construction";
export { phoenixStormRestoration } from "./phoenix-storm-restoration";
export { proclaimRoofingHouston } from "./proclaim-roofing-houston";
export { properRoofing } from "./proper-roofing";
export { rescueRoofingTexas } from "./rescue-roofing-texas";
export { rhinoRoofers } from "./rhino-roofers";
export { rippleRoofing } from "./ripple-roofing";
export { rivertopRoofing } from "./rivertop-roofing";
export { sixthGenRoofing } from "./sixth-gen-roofing";
export { stormvets } from "./stormvets";
export { sugarRoofing } from "./sugar-roofing";
export { texasDirectRoofingConstruction } from "./texas-direct-roofing-construction";
export { texasStarRoofingConstruction } from "./texas-star-roofing-construction";
export { tsgRoofing } from "./tsg-roofing";
export { veritasRoofing } from "./veritas-roofing";

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
  proclaimRoofingHouston,
  tsgRoofing,
  veritasRoofing,
  houstonRoofingConstruction,
  elevatedRoofing,
  firefighterRoofing,
  sugarRoofing,
  texasDirectRoofingConstruction,
  rescueRoofingTexas,
  rhinoRoofers,
  texasStarRoofingConstruction,
  invictusRoofing,
  rippleRoofing,
  pappasRoofingAndConstruction,
  cloudRoofing,
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
