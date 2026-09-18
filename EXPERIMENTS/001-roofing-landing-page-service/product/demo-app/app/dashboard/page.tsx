import { requireDashboardSession } from "@/lib/dashboardAuth";
import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { getDashboardFocusState } from "../../lib/dashboardFocus";
import { getDashboardProspectData } from "../../lib/prospectDrafts";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ logoutError?: string }> }) {
  await requireDashboardSession();
  const { logoutError } = await searchParams;
  const { entries, summaries } = await getDashboardProspectData();
  const focusState = await getDashboardFocusState();

  return (
    <>
    {logoutError ? <p role="alert" className="auth-message auth-message-error">Sign-out could not be confirmed. Please try again; your session has not been cleared.</p> : null}
    <ProspectPreviewDashboard
      entries={entries}
      initialFocusItems={focusState.items}
      initialFocusSource={focusState.source}
      nowIso={new Date().toISOString()}
      prospectDraftSummaries={summaries}
    />
    </>
  );
}
