import { RoofingLandingPage } from "../components/RoofingLandingPage";
import { defaultProspect } from "../lib/prospects";

export default function Home() {
  return <RoofingLandingPage prospect={defaultProspect} />;
}
