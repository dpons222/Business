import type { Metadata } from "next";
import { PizabellaCustomerPreview } from "../../components/PizabellaCustomerPreview";

export const metadata: Metadata = {
  title: "Pizza Bella Woodstock | Pizza, Pasta, Subs & Wings",
  description:
    "Pizza Bella restaurant page for pizza, pasta, subs, wings, pickup, and delivery in Woodstock, Virginia.",
};

export default function PizabellaPage() {
  return <PizabellaCustomerPreview />;
}
