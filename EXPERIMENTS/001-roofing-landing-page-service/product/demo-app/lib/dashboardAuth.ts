import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthClient, createServiceClient, getAuthConfig, isUuid, type AuthConfig } from "./auth/supabase";

export const DASHBOARD_SESSION_COOKIE = "dashboard_access_v2";
const LEGACY_COOKIE = "local_growth_preview_dashboard_session";
const MAX_SESSION_SECONDS = 3600;

export type DashboardSession = { userId: string; username: string; role: "admin"; expiresAt: number };
export class DashboardAccessError extends Error {
  constructor(public status: 401 | 403 | 503) { super("Dashboard access denied"); }
}

type Access = { session: DashboardSession; status?: never } | { session: null; status: 401 | 403 | 503 };

// Decode only to locate the session AFTER getUser has verified the token with Auth.
function tokenClaims(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || token.length > 8192) return null;
    const claims = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    if (!isUuid(claims.session_id) || !isUuid(claims.sub) || !Number.isFinite(claims.exp) || !Number.isFinite(claims.iat)) return null;
    if (claims.exp * 1000 <= Date.now() || claims.iat * 1000 > Date.now() + 30_000 ||
        (claims.iat + MAX_SESSION_SECONDS) * 1000 <= Date.now()) return null;
    return claims as { session_id: string; sub: string; exp: number; iat: number };
  } catch { return null; }
}

export async function verifyDashboardToken(token: string, config: AuthConfig): Promise<Access> {
  if (!token || token.length > 8192) return { session: null, status: 401 };
  try {
    const { data, error } = await createAuthClient(config).auth.getUser(token);
    if (error || !data.user) return { session: null, status: 401 };
    const user = data.user;
    const claims = tokenClaims(token);
    if (!claims || claims.sub !== user.id) return { session: null, status: 401 };
    if (user.id !== config.operatorId || user.app_metadata.dashboard_role !== "admin" ||
        user.app_metadata.dashboard_disabled === true || !user.email_confirmed_at) {
      return { session: null, status: 403 };
    }
    // JWTs survive logout until expiry. Check the live user AND auth.sessions on every access.
    const { data: active, error: sessionError } = await createServiceClient(config).rpc("dashboard_session_active", {
      p_user_id: user.id, p_session_id: claims.session_id,
    });
    if (sessionError) return { session: null, status: 503 };
    if (active !== true) return { session: null, status: 403 };
    return { session: {
      userId: user.id, username: user.email ?? user.id, role: "admin",
      expiresAt: Math.min(claims.exp, claims.iat + MAX_SESSION_SECONDS) * 1000,
    } };
  } catch { return { session: null, status: 503 }; }
}

export async function getDashboardAccess(): Promise<Access> {
  const token = (await cookies()).get(DASHBOARD_SESSION_COOKIE)?.value;
  if (!token) return { session: null, status: 401 };
  const config = getAuthConfig();
  if (!config) return { session: null, status: 503 };
  return verifyDashboardToken(token, config);
}

export async function getDashboardSession() { return (await getDashboardAccess()).session; }

// No cross-request cache: every data entry point rechecks live authorization before reading/writing.
export async function assertDashboardAdmin() {
  const access = await getDashboardAccess();
  if (!access.session) throw new DashboardAccessError(access.status);
  return access.session;
}

export function normalizeDashboardNextPath(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string" || /[\\\u0000-\u001f]/.test(value)) return "/dashboard";
  try {
    const parsed = new URL(value, "https://dashboard.invalid");
    if (parsed.origin === "https://dashboard.invalid" && value.startsWith("/") &&
        (parsed.pathname === "/dashboard" || parsed.pathname.startsWith("/dashboard/"))) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch { /* use the safe landing page */ }
  return "/dashboard";
}

export async function requireDashboardSession(nextPath = "/dashboard") {
  const session = await getDashboardSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(normalizeDashboardNextPath(nextPath))}`);
  return session;
}

async function takeLoginAttempt(config: AuthConfig) {
  const { data, error } = await createServiceClient(config).rpc("dashboard_take_login_attempt");
  return !error && data === true;
}

export async function signInDashboard(email: string, password: string) {
  const config = getAuthConfig();
  if (!config || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 1024) return false;
  try {
    if (!(await takeLoginAttempt(config))) return false;
    const { data, error } = await createAuthClient(config).auth.signInWithPassword({ email, password });
    if (error || !data.session) return false;
    const access = await verifyDashboardToken(data.session.access_token, config);
    if (!access.session) {
      await createServiceClient(config).auth.admin.signOut(data.session.access_token, "local");
      return false;
    }
    const cookieStore = await cookies();
    cookieStore.delete(LEGACY_COOKIE);
    cookieStore.set(DASHBOARD_SESSION_COOKIE, data.session.access_token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL_ENV),
      sameSite: "strict", path: "/",
      maxAge: Math.max(0, Math.floor((access.session.expiresAt - Date.now()) / 1000)),
    });
    return true;
  } catch { return false; }
}

export async function clearDashboardSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
  const config = getAuthConfig();
  if (token) {
    if (!config) return false;
    try {
      const { error } = await createServiceClient(config).auth.admin.signOut(token, "global");
      // Expired/deleted sessions already cannot authorize; service failures must remain visible.
      if (error && ![401, 403, 404].includes(error.status ?? 0)) return false;
    } catch { return false; }
  }
  cookieStore.delete(DASHBOARD_SESSION_COOKIE);
  cookieStore.delete(LEGACY_COOKIE);
  return true;
}

export async function recoverDashboardPassword(recoveryCode: string, password: string) {
  const config = getAuthConfig();
  if (!config || !/^[a-f0-9]{40,128}$/i.test(recoveryCode) || password.length < 14 || password.length > 128) return false;
  try {
    if (!(await takeLoginAttempt(config))) return false;
    const client = createAuthClient(config);
    const { data, error } = await client.auth.verifyOtp({ token_hash: recoveryCode, type: "recovery" });
    if (error || !data.session) return false;
    const token = data.session.access_token;
    const access = await verifyDashboardToken(token, config);
    if (!access.session) {
      await createServiceClient(config).auth.admin.signOut(token, "local");
      return false;
    }
    const { error: updateError } = await client.auth.updateUser({ password });
    const { error: revokeError } = await createServiceClient(config).auth.admin.signOut(token, "global");
    return !updateError && !revokeError;
  } catch { return false; }
}
