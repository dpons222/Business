import { finalCutRoofing } from "./final-cut-roofing";
import type { ProspectData } from "./types";

export type { ProspectData, ProjectImage } from "./types";
export { finalCutRoofing } from "./final-cut-roofing";

export const prospects: ProspectData[] = [finalCutRoofing];

export const defaultProspect = finalCutRoofing;

export function getProspectBySlug(slug: string): ProspectData | undefined {
  return prospects.find((prospect) => prospect.slug === slug);
}

export function getProspectStaticParams() {
  return prospects.map((prospect) => ({
    slug: prospect.slug,
  }));
}
