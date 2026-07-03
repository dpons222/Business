import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { currentFocusEntry, demoEntries } from "../../lib/demoRegistry";
import { getProspectDraftSummaries, getSupabaseDashboardEntries } from "../../lib/prospectDrafts";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default async function DashboardPage() {
  const staticSlugs = demoEntries.map((entry) => entry.slug);
  const [staticProspectDraftSummaries, supabaseDashboardEntries] = await Promise.all([
    getProspectDraftSummaries(staticSlugs),
    getSupabaseDashboardEntries(staticSlugs),
  ]);
  const entries = [...supabaseDashboardEntries.entries, ...demoEntries];
  const prospectDraftSummaries = {
    ...staticProspectDraftSummaries,
    ...supabaseDashboardEntries.summaries,
  };

  return (
    <ProspectPreviewDashboard
      currentFocus={currentFocusEntry}
      entries={entries}
      nowIso={new Date().toISOString()}
      prospectDraftSummaries={prospectDraftSummaries}
    />
  );
}
