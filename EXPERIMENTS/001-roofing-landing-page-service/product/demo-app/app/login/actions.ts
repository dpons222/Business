"use server";

import {
  authenticateDashboardUser,
  clearDashboardSession,
  normalizeDashboardNextPath,
  setDashboardSession,
} from "@/lib/dashboardAuth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = normalizeDashboardNextPath(formData.get("next"));
  const user = authenticateDashboardUser(username, password);

  if (!user) {
    redirect(`/login?error=invalid&next=${encodeURIComponent(nextPath)}`);
  }

  await setDashboardSession(user);
  redirect(nextPath);
}

export async function logoutAction() {
  await clearDashboardSession();
  redirect("/login?loggedOut=1");
}
