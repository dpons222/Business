import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { currentFocusEntry } from "../../lib/demoRegistry";
import { getDashboardProspectData } from "../../lib/prospectDrafts";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default async function DashboardPage() {
  const { entries, summaries } = await getDashboardProspectData();
  const currentFocus =
    entries.find((entry) => entry.slug === currentFocusEntry.slug) ?? currentFocusEntry;

  return (
    <ProspectPreviewDashboard
      currentFocus={currentFocus}
      entries={entries}
      nowIso={new Date().toISOString()}
      prospectDraftSummaries={summaries}
    />
  );
}
