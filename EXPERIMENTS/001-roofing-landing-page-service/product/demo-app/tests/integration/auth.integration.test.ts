import { afterAll, beforeAll, beforeEach, expect, it, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync, unlinkSync, rmdirSync, existsSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
// @ts-expect-error operator script is shared with the tested CLI
import { provisionOperator, createRecoveryCode } from "../../scripts/manage-dashboard-operator.mjs";

const jar = vi.hoisted(() => new Map<string, string>());
vi.mock("next/headers", () => ({ cookies: async () => ({
  get: (key: string) => jar.has(key) ? { value: jar.get(key) } : undefined,
  set: (key: string, value: string) => jar.set(key, value), delete: (key: string) => jar.delete(key),
}) }));
import { getDashboardAccess, signInDashboard, clearDashboardSession, recoverDashboardPassword } from "../../lib/dashboardAuth";
import { GET as draftGet } from "../../app/api/prospect-drafts/[slug]/route";
import { GET as focusGet, PATCH as focusPatch } from "../../app/api/dashboard-focus/route";

const url = process.env.SUPABASE_URL!;
if (url !== "http://127.0.0.1:54321") throw new Error("Refusing nonlocal integration target.");
const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, options);
const publicClient = () => createClient(url, process.env.SUPABASE_PUBLISHABLE_KEY!, options);
const email = `issue129-${randomUUID()}@example.test`;
const password = `Local-only-${randomUUID()}!`;
let operatorId = "";
const otherUsers: string[] = [];
function sql(query: string) {
  return execFileSync("docker", ["exec", "-i", "supabase_db_demo-app", "psql", "-U", "postgres", "-d", "postgres", "-v", "ON_ERROR_STOP=1", "-q", "-t", "-A"], { input: query, encoding: "utf8", windowsHide: true });
}

beforeAll(async () => {
  operatorId = await provisionOperator(admin, email);
  process.env.DASHBOARD_OPERATOR_ID = operatorId;
  sql(readFileSync("tests/fixtures/research.sql", "utf8"));
  sql(`create table if not exists public.dashboard_focus_items(prospect_slug text primary key, added_at timestamptz not null, added_by text);
    alter table public.dashboard_focus_items enable row level security;
    revoke all on public.dashboard_focus_items from anon, authenticated;
    grant all on public.dashboard_focus_items to service_role;
    notify pgrst, 'reload schema';`);
  // Fresh setup uses an actual one-time Supabase reset, never a default password.
  const code = await createRecoveryCode(admin, operatorId);
  expect(await recoverDashboardPassword(code, password)).toBe(true);
});
beforeEach(() => { jar.clear(); sql("delete from dashboard_private.login_budget;"); });
afterAll(async () => {
  for (const id of [operatorId, ...otherUsers].filter(Boolean)) await admin.auth.admin.deleteUser(id);
  sql("delete from public.dashboard_focus_items where prospect_slug='charger-roofing'; delete from public.prospects where prospect_slug in ('charger-roofing','research-private-fixture'); delete from dashboard_private.login_budget;");
});

it("signs in the provisioned operator, reads a draft, writes and reads the focus list", async () => {
  expect(await signInDashboard(email, password)).toBe(true);
  expect((await getDashboardAccess()).session?.userId).toBe(operatorId);
  const draft = await draftGet(new Request("http://127.0.0.1:3000/api/prospect-drafts/charger-roofing"), { params: Promise.resolve({ slug: "charger-roofing" }) });
  expect(draft.status).toBe(200);
  expect(await draft.json()).toMatchObject({ businessName: "Charger Test Fixture", body: "PRIVATE_OUTREACH_SENTINEL_129", source: "supabase" });
  const response = await focusPatch(new Request("http://127.0.0.1:3000/api/dashboard-focus", {
    method: "PATCH", headers: { origin: "http://127.0.0.1:3000", "content-type": "application/json" }, body: JSON.stringify({ action: "add", slug: "charger-roofing" }),
  }), {});
  expect(response.status).toBe(200);
  expect((await response.json()).items).toContainEqual(expect.objectContaining({ slug: "charger-roofing" }));
  expect((await focusGet(new Request("http://127.0.0.1:3000/api/dashboard-focus"), {})).status).toBe(200);
});

it("keeps email login enabled while disabling public sign-ups", async () => {
  const { error } = await publicClient().auth.signUp({ email: `uninvited-${randomUUID()}@example.test`, password });
  expect(error?.code).toBe("signup_disabled");
});

it("runs operator provisioning/recovery/disable without printing codes and protects the recovery file", async () => {
  const directory = mkdtempSync(join(tmpdir(), "business129-cli-"));
  const initialFile = join(directory, "initial.txt"), recoveryFile = join(directory, "recovery.txt");
  const env = { ...process.env, DASHBOARD_OPERATOR_ID: "" };
  const cli = (args: string[]) => execFileSync(process.execPath, ["scripts/manage-dashboard-operator.mjs", ...args], { env, encoding: "utf8", windowsHide: true });
  let id = "";
  try {
    const output = cli(["provision", "--email", `cli-${randomUUID()}@example.test`, "--output", initialFile]);
    id = output.match(/DASHBOARD_OPERATOR_ID=([a-f0-9-]+)/)![1];
    const code = readFileSync(initialFile, "utf8").trim();
    expect(/^[a-f0-9]{40,128}$/i.test(code)).toBe(true);
    expect(output.includes(code)).toBe(false);
    if (process.platform === "win32") {
      const acl = execFileSync("icacls", [initialFile], { encoding: "utf8", windowsHide: true });
      expect(acl.includes("(I)")).toBe(false);
      expect(acl.includes("(F)")).toBe(true);
    } else { expect(statSync(initialFile).mode & 0o777).toBe(0o600); }
    env.DASHBOARD_OPERATOR_ID = id;
    const recovered = cli(["recover", "--output", recoveryFile]);
    const nextCode = readFileSync(recoveryFile, "utf8").trim();
    expect(recovered.includes(nextCode)).toBe(false);
    cli(["disable"]);
    expect((await admin.auth.admin.getUserById(id)).data.user?.app_metadata.dashboard_disabled).toBe(true);
  } finally {
    if (id) await admin.auth.admin.deleteUser(id);
    for (const file of [initialFile, recoveryFile]) if (existsSync(file)) unlinkSync(file);
    rmdirSync(directory);
  }
});

it("enforces an atomic ten-attempt budget across concurrent clients", async () => {
  const responses = await Promise.all(Array.from({ length: 20 }, () => admin.rpc("dashboard_take_login_attempt")));
  expect(responses.filter(r => r.data === true)).toHaveLength(10);
  expect(responses.every(r => !r.error)).toBe(true);
  expect(sql("select count(*) from dashboard_private.login_budget;").trim()).toBe("1");
  expect(await signInDashboard(email, password)).toBe(false);
  sql("update dashboard_private.login_budget set window_started_at=now()-interval '6 minutes';");
  expect(await signInDashboard(email, password)).toBe(true);
});

it("revokes a real access token on logout, including a replayed cookie", async () => {
  expect(await signInDashboard(email, password)).toBe(true);
  const token = jar.get("dashboard_access_v2")!;
  expect(await clearDashboardSession()).toBe(true);
  jar.set("dashboard_access_v2", token);
  expect((await getDashboardAccess()).session).toBeNull();
});

it("rejects changed role and disabled/banned operator without waiting for JWT expiry", async () => {
  expect(await signInDashboard(email, password)).toBe(true);
  await admin.auth.admin.updateUserById(operatorId, { app_metadata: { dashboard_role: "viewer" } });
  expect((await getDashboardAccess()).session).toBeNull();
  await admin.auth.admin.updateUserById(operatorId, { app_metadata: { dashboard_role: "admin", dashboard_disabled: true } });
  expect((await getDashboardAccess()).session).toBeNull();
  await admin.auth.admin.updateUserById(operatorId, { app_metadata: { dashboard_disabled: false }, ban_duration: "1h" });
  expect((await getDashboardAccess()).session).toBeNull();
  await admin.auth.admin.updateUserById(operatorId, { ban_duration: "none" });
});

it("blocks provider-authenticated non-admins and user-editable role impersonation", async () => {
  const created = await admin.auth.admin.createUser({ email: `viewer-${randomUUID()}@example.test`, password, email_confirm: true, user_metadata: { dashboard_role: "admin" } });
  const id = created.data.user!.id; otherUsers.push(id);
  const signed = await publicClient().auth.signInWithPassword({ email: created.data.user!.email!, password });
  const token = signed.data.session!.access_token;
  jar.set("dashboard_access_v2", token);
  expect((await getDashboardAccess()).status).toBe(403);
  // Even another real administrator is not the allowlisted operator.
  await admin.auth.admin.updateUserById(id, { app_metadata: { dashboard_role: "admin" } });
  expect((await getDashboardAccess()).status).toBe(403);
  await admin.auth.admin.deleteUser(id);
  expect((await getDashboardAccess()).session).toBeNull();
});

it("denies public and ordinary authenticated access to session RPCs and private storage", async () => {
  expect((await publicClient().rpc("dashboard_session_active", { p_user_id: operatorId, p_session_id: randomUUID() })).error).toBeTruthy();
  expect((await publicClient().rpc("dashboard_take_login_attempt")).error).toBeTruthy();
  const ordinary=publicClient(); await ordinary.auth.signInWithPassword({ email, password });
  expect((await ordinary.rpc("dashboard_take_login_attempt")).error).toBeTruthy();
  expect((await ordinary.from("dashboard_focus_items").select()).error).toBeTruthy();
});

it("recovers the operator with a one-use code and revokes existing sessions", async () => {
  expect(await signInDashboard(email, password)).toBe(true);
  const token=jar.get("dashboard_access_v2")!;
  const code=await createRecoveryCode(admin, operatorId);
  const nextPassword=`Replacement-${randomUUID()}!`;
  expect(await recoverDashboardPassword(code, nextPassword)).toBe(true);
  expect(await recoverDashboardPassword(code, nextPassword)).toBe(false);
  jar.set("dashboard_access_v2", token); expect((await getDashboardAccess()).session).toBeNull();
  expect(await signInDashboard(email, password)).toBe(false);
  expect(await signInDashboard(email, nextPassword)).toBe(true);
});
