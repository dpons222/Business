import { ProspectPreviewDashboard } from "../components/ProspectPreviewDashboard";
import { activeProspectSlug, getProspectBySlug, prospects } from "../lib/prospects";

export default function Home() {
  const activeProspect = getProspectBySlug(activeProspectSlug) ?? prospects[0];

  return <ProspectPreviewDashboard activeProspect={activeProspect} prospects={prospects} />;
}
