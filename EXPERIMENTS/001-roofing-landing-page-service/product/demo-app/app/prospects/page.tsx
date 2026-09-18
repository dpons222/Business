import { redirect } from "next/navigation";
import { requireDashboardSession } from "@/lib/dashboardAuth";
export default async function ProspectsIndexPage() {
  await requireDashboardSession();
  redirect("/dashboard");
}
