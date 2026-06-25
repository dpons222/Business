import type { Metadata } from "next";
import { PizabellaAuditPreview } from "../../components/PizabellaAuditPreview";

export const metadata: Metadata = {
  title: "Pizza Bella Customer Journey Audit Preview",
  description:
    "Restaurant customer journey cleanup preview for Pizza Bella in Woodstock, Virginia.",
};

export default function PizabellaPage() {
  return <PizabellaAuditPreview />;
}
