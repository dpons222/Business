"use server";

import {
  signInDashboard,
  clearDashboardSession,
  normalizeDashboardNextPath,
  recoverDashboardPassword,
} from "@/lib/dashboardAuth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = normalizeDashboardNextPath(formData.get("next"));
  const signedIn = await signInDashboard(email, password);

  if (!signedIn) {
    redirect(`/login?error=invalid&next=${encodeURIComponent(nextPath)}`);
  }

  redirect(nextPath);
}

export async function logoutAction() {
  if (!(await clearDashboardSession())) redirect("/dashboard?logoutError=1");
  redirect("/login?loggedOut=1");
}

export async function recoverPasswordAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (password !== confirmation || !(await recoverDashboardPassword(code, password))) {
    redirect("/login/recover?error=invalid");
  }
  await clearDashboardSession();
  redirect("/login?recovered=1");
}
