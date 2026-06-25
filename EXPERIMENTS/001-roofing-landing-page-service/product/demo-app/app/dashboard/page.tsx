import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { currentFocusEntry, demoEntries } from "../../lib/demoRegistry";

export const metadata = {
  title: "local-growth-preview Dashboard",
  description: "Internal multi-niche preview dashboard for local growth demo pages.",
};

export default function DashboardPage() {
  return <ProspectPreviewDashboard currentFocus={currentFocusEntry} entries={demoEntries} />;
}
