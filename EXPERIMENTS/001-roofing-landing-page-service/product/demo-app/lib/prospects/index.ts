import { chargerRoofing } from "./charger-roofing";
import { edpRoofing } from "./edp-roofing";
import { finalCutRoofing } from "./final-cut-roofing";
import { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
import { loaConstruction } from "./loa-construction";
import { properRoofing } from "./proper-roofing";
import { rivertopRoofing } from "./rivertop-roofing";
import type { ProspectData } from "./types";

export type { ProspectData, ProjectImage } from "./types";
export { chargerRoofing } from "./charger-roofing";
export { edpRoofing } from "./edp-roofing";
export { finalCutRoofing } from "./final-cut-roofing";
export { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
export { loaConstruction } from "./loa-construction";
export { properRoofing } from "./proper-roofing";
export { rivertopRoofing } from "./rivertop-roofing";

export const prospects: ProspectData[] = [
  finalCutRoofing,
  chargerRoofing,
  loaConstruction,
  rivertopRoofing,
  integrityFirstRoofingConstruction,
  edpRoofing,
  properRoofing,
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
