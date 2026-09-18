import "server-only";
import { getProspectBySlug, prospects, type ProspectData } from "./prospects";

// Explicit public projection: additions to the internal record never become public by default.
const publicKeys = [
  "slug", "companyName", "shortName", "city", "serviceArea", "phone", "phoneHref",
  "primaryService", "recommendedCta", "secondaryCta", "rating", "reviewCount", "reviewQuote",
  "trustSignal", "logoUrl", "heroImageUrl", "projectImages", "brand", "headline", "subheadline",
  "trustLine", "formReassurance", "galleryEyebrow", "galleryHeading", "pageAngle", "damageSigns",
  "inspectionIncludes", "process", "services", "faqs",
] as const satisfies readonly (keyof ProspectData)[];

export type PublicProspect = Pick<ProspectData, typeof publicKeys[number]>;

export function toPublicProspect(prospect: ProspectData): PublicProspect {
  return Object.fromEntries(publicKeys.map(key => [key, prospect[key]])) as PublicProspect;
}

export function getPublicProspectBySlug(slug: string) {
  const prospect = getProspectBySlug(slug);
  return prospect ? toPublicProspect(prospect) : undefined;
}

export function getPublicProspectStaticParams() { return prospects.map(({ slug }) => ({ slug })); }
