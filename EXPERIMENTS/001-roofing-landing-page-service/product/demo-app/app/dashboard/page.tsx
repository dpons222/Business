import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { getDashboardFocusState } from "../../lib/dashboardFocus";
import { getDashboardProspectData } from "../../lib/prospectDrafts";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default async function DashboardPage() {
  const { entries, summaries } = await getDashboardProspectData();
  const focusState = await getDashboardFocusState();

  return (
    <ProspectPreviewDashboard
      entries={entries}
      initialFocusItems={focusState.items}
      initialFocusSource={focusState.source}
      nowIso={new Date().toISOString()}
      prospectDraftSummaries={summaries}
    />
  );
}
