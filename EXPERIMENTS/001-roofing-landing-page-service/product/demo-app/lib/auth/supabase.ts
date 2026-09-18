import "server-only";
import { createClient } from "@supabase/supabase-js";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isUuid = (value: unknown): value is string => typeof value === "string" && uuid.test(value);

export function getAuthConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const operatorId = process.env.DASHBOARD_OPERATOR_ID?.trim();
  const appOrigin = process.env.DASHBOARD_APP_ORIGIN?.trim();
  if (!url || !publishableKey || !serviceKey || !isUuid(operatorId) || !appOrigin) return null;
  try {
    for (const value of [url, appOrigin]) {
      const parsed = new URL(value);
      const local = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
      if ((parsed.protocol !== "https:" && !(local && parsed.protocol === "http:" && !process.env.VERCEL_ENV)) ||
          parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/") return null;
    }
  } catch { return null; }
  return { url: url.replace(/\/$/, ""), publishableKey, serviceKey, operatorId, appOrigin: new URL(appOrigin).origin };
}

export type AuthConfig = NonNullable<ReturnType<typeof getAuthConfig>>;

function client(config: AuthConfig, key: string) {
  return createClient(config.url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store", signal: AbortSignal.timeout(10_000) }),
    },
  });
}

export const createAuthClient = (config: AuthConfig) => client(config, config.publishableKey);
export const createServiceClient = (config: AuthConfig) => client(config, config.serviceKey);
