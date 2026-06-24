import { chargerRoofing } from "./charger-roofing";
import { finalCutRoofing } from "./final-cut-roofing";
import { loaConstruction } from "./loa-construction";
import { rivertopRoofing } from "./rivertop-roofing";
import type { ProspectData } from "./types";

export type { ProspectData, ProjectImage } from "./types";
export { chargerRoofing } from "./charger-roofing";
export { finalCutRoofing } from "./final-cut-roofing";
export { loaConstruction } from "./loa-construction";
export { rivertopRoofing } from "./rivertop-roofing";

export const prospects: ProspectData[] = [
  finalCutRoofing,
  chargerRoofing,
  loaConstruction,
  rivertopRoofing,
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
