import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { currentFocusEntry, demoEntries } from "../../lib/demoRegistry";
import { getProspectDraftSummaries } from "../../lib/prospectDrafts";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default async function DashboardPage() {
  const prospectDraftSummaries = await getProspectDraftSummaries(
    demoEntries.map((entry) => entry.slug),
  );

  return (
    <ProspectPreviewDashboard
      currentFocus={currentFocusEntry}
      entries={demoEntries}
      prospectDraftSummaries={prospectDraftSummaries}
    />
  );
}
