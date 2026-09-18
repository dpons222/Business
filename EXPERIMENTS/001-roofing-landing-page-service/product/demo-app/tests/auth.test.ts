import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  cookie: undefined as string | undefined,
  getUser: vi.fn(), rpc: vi.fn(), signInWithPassword: vi.fn(), signOut: vi.fn(), verifyOtp: vi.fn(), updateUser: vi.fn(),
  set: vi.fn(), delete: vi.fn(),
}));
vi.mock("next/headers", () => ({ cookies: async () => ({ get: (key: string) => key === "dashboard_access_v2" && state.cookie ? { value: state.cookie } : undefined, set: state.set, delete: state.delete }) }));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({ auth: {
  getUser: state.getUser, signInWithPassword: state.signInWithPassword, verifyOtp: state.verifyOtp, updateUser: state.updateUser,
  admin: { signOut: state.signOut },
}, rpc: state.rpc }) }));

import { getAuthConfig } from "../lib/auth/supabase";
import { getDashboardAccess, assertDashboardAdmin, signInDashboard, clearDashboardSession, normalizeDashboardNextPath, recoverDashboardPassword } from "../lib/dashboardAuth";

const operator = "11111111-1111-4111-8111-111111111111";
const sessionId = "22222222-2222-4222-8222-222222222222";
const user = () => ({ id: operator, email: "operator@example.test", email_confirmed_at: "2026-01-01", app_metadata: { dashboard_role: "admin" } });
const token = (changes = {}) => `header.${Buffer.from(JSON.stringify({ sub: operator, session_id: sessionId, exp: Date.now() / 1000 + 3600, iat: Date.now() / 1000, ...changes })).toString("base64url")}.signature`;

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("SUPABASE_URL", "https://test.supabase.co");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "test-public-key");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-key");
  vi.stubEnv("DASHBOARD_OPERATOR_ID", operator);
  vi.stubEnv("DASHBOARD_APP_ORIGIN", "https://app.example");
  state.cookie = token();
  state.getUser.mockResolvedValue({ data: { user: user() }, error: null });
  state.rpc.mockResolvedValue({ data: true, error: null });
  state.signOut.mockResolvedValue({ error: null });
  state.signInWithPassword.mockResolvedValue({ data: { session: { access_token: state.cookie } }, error: null });
});
afterEach(() => vi.unstubAllEnvs());

describe("operator authorization", () => {
  it("admits the configured verified admin and checks the live session", async () => {
    expect((await assertDashboardAdmin()).userId).toBe(operator);
    expect(state.rpc).toHaveBeenCalledWith("dashboard_session_active", { p_user_id: operator, p_session_id: sessionId });
  });
  it("ignores legacy cookies and rejects anonymous access without fetching data", async () => {
    state.cookie = undefined;
    expect(await getDashboardAccess()).toEqual({ session: null, status: 401 });
    expect(state.getUser).not.toHaveBeenCalled();
  });
  it.each(["production", "preview"])("fails closed with missing configuration in %s", async (environment) => {
    vi.stubEnv("VERCEL_ENV", environment);
    for (const key of ["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY", "SUPABASE_SERVICE_ROLE_KEY", "DASHBOARD_OPERATOR_ID", "DASHBOARD_APP_ORIGIN"]) {
      const old = process.env[key]; vi.stubEnv(key, "");
      expect(await getDashboardAccess()).toEqual({ session: null, status: 503 });
      vi.stubEnv(key, old);
    }
  });
  it("rejects malformed config and deployed cleartext URLs", () => {
    vi.stubEnv("DASHBOARD_OPERATOR_ID", "not-a-uuid"); expect(getAuthConfig()).toBeNull();
    vi.stubEnv("DASHBOARD_OPERATOR_ID", operator); vi.stubEnv("SUPABASE_URL", "http://remote.example.com"); expect(getAuthConfig()).toBeNull();
    vi.stubEnv("SUPABASE_URL", "http://127.0.0.1:54321"); vi.stubEnv("VERCEL_ENV", "preview"); expect(getAuthConfig()).toBeNull();
  });
  it.each(["viewer", "removed-role", "different-operator", "disabled", "unconfirmed"])("denies %s", async kind => {
    const current: any = user();
    if (kind === "viewer") current.app_metadata.dashboard_role = "user";
    if (kind === "removed-role") current.app_metadata = {};
    if (kind === "different-operator") vi.stubEnv("DASHBOARD_OPERATOR_ID", sessionId);
    if (kind === "disabled") current.app_metadata.dashboard_disabled = true;
    if (kind === "unconfirmed") current.email_confirmed_at = null;
    current.user_metadata = { dashboard_role: "admin" };
    state.getUser.mockResolvedValue({ data: { user: current }, error: null });
    expect((await getDashboardAccess()).status).toBe(403);
    expect(state.rpc).not.toHaveBeenCalled();
  });
  it.each(["deleted", "invalid-signature"])("rejects provider rejection: %s", async () => {
    state.getUser.mockResolvedValue({ data: { user: null }, error: { status: 401 } });
    expect((await getDashboardAccess()).status).toBe(401);
  });
  it.each([{ exp: 1 }, { iat: 1 }, { iat: Date.now() / 1000 + 3600 }, { session_id: "bad" }, { exp: "tomorrow" }, { sub: sessionId }])("rejects expired/malformed claims %j", async claims => {
    state.cookie = token(claims); expect((await getDashboardAccess()).status).toBe(401);
    expect(state.rpc).not.toHaveBeenCalled();
  });
  it("denies revoked sessions and unavailable session checks", async () => {
    state.rpc.mockResolvedValue({ data: false, error: null }); expect((await getDashboardAccess()).status).toBe(403);
    state.rpc.mockResolvedValue({ data: null, error: {} }); expect((await getDashboardAccess()).status).toBe(503);
  });
  it("does not reuse authorization after a role change", async () => {
    await assertDashboardAdmin(); state.rpc.mockResolvedValue({ data: false, error: null });
    await expect(assertDashboardAdmin()).rejects.toMatchObject({ status: 403 });
  });
});

describe("sign in, recovery and logout", () => {
  it("never accepts the old default account", async () => {
    expect(await signInDashboard("digidap", "password")).toBe(false);
    expect(state.signInWithPassword).not.toHaveBeenCalled();
  });
  it("limits attempts before sending a password to Auth", async () => {
    state.rpc.mockResolvedValue({ data: false, error: null });
    expect(await signInDashboard("operator@example.test", "long-enough-password")).toBe(false);
    expect(state.signInWithPassword).not.toHaveBeenCalled();
  });
  it("issues a bounded secure HTTP-only cookie and removes the legacy cookie", async () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(await signInDashboard("operator@example.test", "long-enough-password")).toBe(true);
    expect(state.set).toHaveBeenCalledWith("dashboard_access_v2", state.cookie, expect.objectContaining({ httpOnly: true, secure: true, sameSite: "strict", path: "/" }));
    expect(state.set.mock.calls[0][2].maxAge).toBeLessThanOrEqual(3600);
    expect(state.delete).toHaveBeenCalledWith("local_growth_preview_dashboard_session");
  });
  it("revokes all sessions before clearing cookies", async () => {
    expect(await clearDashboardSession()).toBe(true);
    expect(state.signOut).toHaveBeenCalledWith(state.cookie, "global");
    expect(state.delete).toHaveBeenCalledWith("dashboard_access_v2");
  });
  it("does not falsely report logout when revocation fails", async () => {
    state.signOut.mockResolvedValue({ error: { status: 500 } });
    expect(await clearDashboardSession()).toBe(false); expect(state.delete).not.toHaveBeenCalled();
  });
  it("requires bounded recovery input before contacting Auth", async () => {
    expect(await recoverDashboardPassword("invalid", "short")).toBe(false);
    expect(state.verifyOtp).not.toHaveBeenCalled();
  });
  it.each(["https://evil.test", "//evil.test", "/dashboard/../../outside", "/dashboard\\evil", "/dashboard-other", "/dashboard/\nsecret"])("rejects unsafe redirect %s", value => {
    expect(normalizeDashboardNextPath(value)).toBe("/dashboard");
  });
  it("preserves internal recommendation destinations", () => expect(normalizeDashboardNextPath("/dashboard/prospects/test")).toBe("/dashboard/prospects/test"));
});
