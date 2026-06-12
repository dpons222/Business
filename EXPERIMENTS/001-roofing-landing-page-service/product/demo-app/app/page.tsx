import { RoofingLandingPage } from "../components/RoofingLandingPage";
import { finalCutRoofing } from "../lib/prospects";

export default function Home() {
  return <RoofingLandingPage prospect={finalCutRoofing} />;
}

