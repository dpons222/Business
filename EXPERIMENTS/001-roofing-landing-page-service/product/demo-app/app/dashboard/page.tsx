import { ProspectPreviewDashboard } from "../../components/ProspectPreviewDashboard";
import { activeProspectSlug, getProspectBySlug, prospects } from "../../lib/prospects";

export const metadata = {
  title: "Roof Check Preview Dashboard",
  description: "Internal preview dashboard for prospect demo pages.",
};

export default function DashboardPage() {
  const activeProspect = getProspectBySlug(activeProspectSlug) ?? prospects[0];

  return <ProspectPreviewDashboard activeProspect={activeProspect} prospects={prospects} />;
}
