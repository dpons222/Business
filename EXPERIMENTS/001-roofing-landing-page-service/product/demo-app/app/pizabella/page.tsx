import type { Metadata } from "next";
import { PizabellaCustomerPreview } from "../../components/PizabellaCustomerPreview";

export const metadata: Metadata = {
  title: "Pizza Bella Woodstock | Pizza, Pasta, Subs & Wings",
  description:
    "Customer-facing restaurant preview for Pizza Bella in Woodstock, Virginia.",
};

export default function PizabellaPage() {
  return <PizabellaCustomerPreview />;
}
