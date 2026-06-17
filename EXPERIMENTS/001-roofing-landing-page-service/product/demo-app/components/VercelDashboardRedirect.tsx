"use client";

import { useEffect } from "react";

export function VercelDashboardRedirect() {
  useEffect(() => {
    if (!document.referrer) {
      return;
    }

    let referrerHost = "";

    try {
      referrerHost = new URL(document.referrer).hostname;
    } catch {
      return;
    }

    if (referrerHost === "vercel.com" || referrerHost.endsWith(".vercel.com")) {
      window.location.replace("/dashboard");
    }
  }, []);

  return null;
}
