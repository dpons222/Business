import { afterEach, beforeEach, expect, it, vi } from "vitest";
const auth = vi.hoisted(() => ({ access: vi.fn(), session: vi.fn() }));
vi.mock("../lib/dashboardAuth", () => ({
  assertDashboardAdmin: auth.access, requireDashboardSession: auth.session,
  DashboardAccessError: class extends Error { constructor(public status: number) { super("denied"); } },
}));
import { DashboardAccessError } from "../lib/dashboardAuth";
import { GET as draftGet, PATCH as draftPatch } from "../app/api/prospect-drafts/[slug]/route";
import { GET as focusGet, PATCH as focusPatch } from "../app/api/dashboard-focus/route";
import * as drafts from "../lib/prospectDrafts";
import * as focus from "../lib/dashboardFocus";
import { toPublicProspect } from "../lib/publicProspects";
import { prospects } from "../lib/prospects";
import { privateApi } from "../lib/privateApi";
import { readFileSync, readdirSync } from "node:fs";

beforeEach(() => {
  vi.resetAllMocks(); auth.access.mockRejectedValue(new DashboardAccessError(401));
  vi.stubEnv("SUPABASE_URL", "https://fixture.supabase.co");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "fixture-public");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "fixture-private");
  vi.stubEnv("DASHBOARD_OPERATOR_ID", "11111111-1111-4111-8111-111111111111");
  vi.stubEnv("DASHBOARD_APP_ORIGIN", "https://app.example");
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
const context = () => ({ params: Promise.resolve({ slug: "charger-roofing" }) });

it.each([401, 403, 503] as const)("returns %s with no private payload for every API method", async status => {
  auth.access.mockRejectedValue(new DashboardAccessError(status));
  const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
  for (const [handler, method, path] of [[draftGet, "GET", "prospect-drafts/charger-roofing"], [draftPatch, "PATCH", "prospect-drafts/charger-roofing"], [focusGet, "GET", "dashboard-focus"], [focusPatch, "PATCH", "dashboard-focus"]] as const) {
    const response = await handler(new Request(`https://app.example/api/${path}`, { method }), context());
    expect(response.status).toBe(status);
    expect(Object.keys(await response.json())).toEqual(["error"]);
    expect(response.headers.get("cache-control")).toContain("no-store");
  }
  expect(fetcher).not.toHaveBeenCalled();
});

it("all private data entry points reject direct calls before reads or writes", async () => {
  const fetcher=vi.fn(); vi.stubGlobal("fetch", fetcher);
  const calls = [
    () => drafts.getDashboardProspectData(), () => drafts.getProspectDraft("charger-roofing"),
    () => drafts.getRecommendationPreviewEntry("private"), () => drafts.getProspectDraftSummaries(["private"]),
    () => drafts.getSupabaseDashboardEntries(), () => drafts.updateProspectDraftApproval("private", "approve_for_send", "operator"),
    () => drafts.updateProspectFollowUpApproval("private", "approve_follow_up_send", "operator"),
    () => drafts.updateProspectManualContact("private", { method: "email", note: "test" }),
    () => drafts.updateProspectManualFollowUp("private", { note: "test" }),
    () => drafts.updateProspectRelationshipStatus("private", "mark_do_not_contact"),
    () => focus.getDashboardFocusState(), () => focus.addDashboardFocusItem("private", "operator"),
    () => focus.removeDashboardFocusItem("private"), () => focus.replaceDashboardFocusItems([], "operator"),
  ];
  for (const call of calls) await expect(call()).rejects.toMatchObject({ status: 401 });
  expect(fetcher).not.toHaveBeenCalled();
});

it.each([undefined, "https://evil.test"])("rejects mutation origin %s", async origin => {
  auth.access.mockResolvedValue({ userId: "admin", username: "operator", role: "admin" });
  const operation=vi.fn(async () => new Response("ok"));
  const headers: Record<string,string> = { "content-type": "application/json" }; if(origin) headers.origin=origin;
  const response=await privateApi(operation)(new Request("https://app.example/api/test", { method: "PATCH", headers, body: "{}" }), {});
  expect(response.status).toBe(403); expect(operation).not.toHaveBeenCalled();
});

it("allows same-origin admin JSON mutations", async () => {
  auth.access.mockResolvedValue({ username: "operator", role: "admin" });
  const operation=vi.fn(async () => new Response("ok"));
  const response=await privateApi(operation)(new Request("https://app.example/api/test", { method: "PATCH", headers: { origin: "https://app.example", "content-type": "application/json" }, body: "{}" }), {});
  expect(response.status).toBe(200); expect(operation).toHaveBeenCalledOnce();
});

it("public projection drops private and newly added fields for every roofing asset", () => {
  for(const prospect of prospects) {
    const projected=toPublicProspect({ ...prospect, futurePrivateField: "private sentinel" } as typeof prospect);
    expect(projected.companyName).toBe(prospect.companyName);
    for(const field of ["observedIssue", "sourceWebsite", "contactEmail", "createdAt", "futurePrivateField"]) expect(projected).not.toHaveProperty(field);
  }
});

it("public prospect alias cannot fetch recommendation data even for metadata", () => {
  const alias = readFileSync("app/prospects/[slug]/page.tsx", "utf8");
  const publicPage = readFileSync("app/[slug]/page.tsx", "utf8");
  expect(alias).toContain('from "../../[slug]/page"');
  expect(publicPage).not.toMatch(/prospectDrafts|demoRegistry|Recommendation/);
});

it("every current API route is covered by the authorization wrapper", () => {
  const routes=readdirSync("app/api",{recursive:true}).map(String).filter(path=>path.endsWith("route.ts"));
  expect(routes).toHaveLength(2);
  for(const path of routes) expect(readFileSync(`app/api/${path}`,"utf8")).toContain("privateApi(");
});
