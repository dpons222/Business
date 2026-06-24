import { chargerRoofing } from "./charger-roofing";
import { finalCutRoofing } from "./final-cut-roofing";
import { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
import { loaConstruction } from "./loa-construction";
import type { ProspectData } from "./types";

export type { ProspectData, ProjectImage } from "./types";
export { chargerRoofing } from "./charger-roofing";
export { finalCutRoofing } from "./final-cut-roofing";
export { integrityFirstRoofingConstruction } from "./integrity-first-roofing-construction";
export { loaConstruction } from "./loa-construction";

export const prospects: ProspectData[] = [
  finalCutRoofing,
  chargerRoofing,
  loaConstruction,
  integrityFirstRoofingConstruction,
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
