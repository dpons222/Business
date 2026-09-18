import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const command = process.platform === "win32" ? "cmd.exe" : "npx";
const args = process.platform === "win32" ? ["/d", "/s", "/c", "npx supabase status -o json"] : ["supabase", "status", "-o", "json"];
const config=JSON.parse(execFileSync(command,args,{encoding:"utf8",stdio:["ignore","pipe","ignore"],windowsHide:true}));
assert.equal(config.API_URL,"http://127.0.0.1:54321","Refusing nonlocal Supabase target");
const admin=createClient(config.API_URL,config.SECRET_KEY || config.SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const email=`http-${randomUUID()}@example.test`, password=`Http-only-${randomUUID()}!`;
let operatorId, server;
let logs="";
const base="http://127.0.0.1:3129";
function sql(query) { return execFileSync("docker",["exec","-i","supabase_db_demo-app","psql","-U","postgres","-d","postgres","-q","-v","ON_ERROR_STOP=1"],{input:query,stdio:["pipe","pipe","pipe"],windowsHide:true}); }
const request=(path,options={})=>fetch(base+path,{redirect:"manual",...options});
function actionForm(html, values) {
  const id=html.match(/name="(\$ACTION_ID_[^"]+)"/);
  assert.ok(id,"Server action form exists");
  const form=new FormData(); form.set(id[1],"");
  for(const [key,value] of Object.entries(values)) form.set(key,value);
  return form;
}
async function startServer(overrides = {}) {
  server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname","127.0.0.1","--port","3129"],{
    windowsHide:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NODE_ENV:"production",VERCEL_ENV:"",
      SUPABASE_URL:config.API_URL,SUPABASE_PUBLISHABLE_KEY:config.PUBLISHABLE_KEY||config.ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY:config.SECRET_KEY||config.SERVICE_ROLE_KEY,DASHBOARD_OPERATOR_ID:operatorId,DASHBOARD_APP_ORIGIN:base,...overrides},
  });
  server.stdout.on("data",chunk=>{logs=(logs+chunk).slice(-20_000);}); server.stderr.on("data",chunk=>{logs=(logs+chunk).slice(-20_000);});
  for(let attempt=0;attempt<60;attempt++) {
    try { if((await request("/login")).ok) return; } catch { /* wait for this process */ }
    assert.equal(server.exitCode,null,"Application exited during startup");
    await new Promise(resolve=>setTimeout(resolve,500));
  }
  throw new Error("Application did not become ready");
}
async function stopServer() {
  const running = server;
  server = undefined;
  if (!running || running.exitCode !== null || running.signalCode !== null) return;
  await new Promise(resolve=>{running.once("close",resolve);running.kill();});
}
try {
  sql(readFileSync("tests/fixtures/research.sql","utf8"));
  sql("delete from dashboard_private.login_budget;");
  const created=await admin.auth.admin.createUser({email,password,email_confirm:true,app_metadata:{dashboard_role:"admin"}});
  assert.ifError(created.error); operatorId=created.data.user.id;
  await startServer();
  for(const path of ["/dashboard","/dashboard/prospects/research-private-fixture","/prospects","/variants"]) {
    const result=await request(path); const body=await result.text();
    assert.ok([307,303].includes(result.status),`Private page ${path} redirects`);
    assert.match(result.headers.get("location"),/^\/login/);
    assert.ok(!body.includes("PRIVATE_RESEARCH_SENTINEL_129"));
  }
  for(const path of ["/api/dashboard-focus","/api/prospect-drafts/charger-roofing"]) for(const method of ["GET","PATCH"]) {
    const result=await request(path,{method}); assert.equal(result.status,401,path);
    assert.deepEqual(Object.keys(await result.json()),["error"]); assert.match(result.headers.get("cache-control"),/no-store/);
  }
  const legacy=await request("/api/prospect-drafts/charger-roofing",{headers:{cookie:"local_growth_preview_dashboard_session=legacy.signed.cookie"}});
  assert.equal(legacy.status,401);
  for(const path of ["/prospects/research-private-fixture","/research-private-fixture","/prospects/unknown"]) {
    const result=await request(path); assert.equal(result.status,404,path); assert.ok(!(await result.text()).includes("PRIVATE_RESEARCH_SENTINEL_129"));
  }
  const publicRoutes=JSON.parse(readFileSync("tests/public-routes.json","utf8"));
  const variants=Object.keys(JSON.parse(readFileSync(".next/prerender-manifest.json","utf8")).routes).filter(path=>path.startsWith("/variants/"));
  assert.equal(variants.length,6);
  for(const path of [...publicRoutes,...variants]) {
    const result=await request(path); assert.equal(result.status,200,path);
    const html=await result.text();
    assert.ok(!/PRIVATE_(RESEARCH|OUTREACH)_SENTINEL_129|observedIssue|outreach_draft_body|contactEmail/.test(html),`No private payload in ${path}`);
  }
  console.log(`PASS: ${publicRoutes.length} public business aliases, six template variants and anonymous private-route/legacy-cookie checks.`);
  const login=await (await request("/login")).text();
  const signed=await request("/login",{method:"POST",headers:{origin:base},body:actionForm(login,{email,password,next:"/dashboard"})});
  assert.equal(signed.status,303); assert.equal(signed.headers.get("location"),"/dashboard");
  const setCookie=signed.headers.getSetCookie().find(value=>value.startsWith("dashboard_access_v2="));
  assert.ok(setCookie); assert.match(setCookie,/HttpOnly/i); assert.match(setCookie,/Secure/i); assert.match(setCookie,/SameSite=strict/i);
  const cookie=setCookie.split(";")[0];
  const dashboard=await request("/dashboard",{headers:{cookie}}); assert.equal(dashboard.status,200);
  const dashboardHtml=await dashboard.text(); assert.ok(dashboardHtml.includes("Private Research Fixture"));
  const internal=await request("/dashboard/prospects/research-private-fixture",{headers:{cookie}}); assert.equal(internal.status,200);
  assert.match(internal.headers.get("content-security-policy"),/frame-ancestors 'self'/);
  assert.ok((await internal.text()).includes("PRIVATE_RESEARCH_SENTINEL_129"));
  const draft=await request("/api/prospect-drafts/charger-roofing",{headers:{cookie}}); assert.equal(draft.status,200);
  assert.equal((await draft.json()).body,"PRIVATE_OUTREACH_SENTINEL_129");
  const csrf=await request("/api/dashboard-focus",{method:"PATCH",headers:{cookie,origin:"https://evil.test","content-type":"application/json"},body:JSON.stringify({action:"clear"})}); assert.equal(csrf.status,403);
  const large=await request("/api/dashboard-focus",{method:"PATCH",headers:{cookie,origin:base,"content-type":"application/json"},body:JSON.stringify({note:"x".repeat(17000)})}); assert.equal(large.status,413);
  const focus=await request("/api/dashboard-focus",{method:"PATCH",headers:{cookie,origin:base,"content-type":"application/json"},body:JSON.stringify({action:"add",slug:"charger-roofing"})}); assert.equal(focus.status,200);
  await admin.auth.admin.updateUserById(operatorId,{app_metadata:{dashboard_role:"viewer"}});
  assert.equal((await request("/api/dashboard-focus",{headers:{cookie}})).status,403);
  await admin.auth.admin.updateUserById(operatorId,{app_metadata:{dashboard_role:"admin"}});
  const signedOut=await request("/dashboard",{method:"POST",headers:{cookie,origin:base},body:actionForm(dashboardHtml,{})}); assert.equal(signedOut.status,303);
  assert.equal(signedOut.headers.get("location"),"/login?loggedOut=1");
  assert.ok([401,403].includes((await request("/api/dashboard-focus",{headers:{cookie}})).status));
  assert.ok(!logs.includes(password) && !logs.includes(cookie.split("=")[1]) && !logs.includes("PRIVATE_OUTREACH_SENTINEL_129"),"No credentials or draft contents in server logs");
  console.log("PASS: production-build login action, private rendering/data, admin write, CSRF/body limits, role revocation, logout and token replay.");
  await stopServer();
  for(const environment of ["preview","production"]) {
    await startServer({VERCEL_ENV:environment,DASHBOARD_OPERATOR_ID:"",SUPABASE_PUBLISHABLE_KEY:""});
    const denied=await request("/api/prospect-drafts/charger-roofing",{headers:{cookie}});
    assert.equal(denied.status,503); assert.deepEqual(Object.keys(await denied.json()),["error"]);
    const html=await (await request("/login")).text();
    const legacyAttempt=await request("/login",{method:"POST",headers:{origin:base},body:actionForm(html,{email:"digidap",password:"password",next:"/dashboard"})});
    assert.equal(legacyAttempt.status,303); assert.match(legacyAttempt.headers.get("location"),/^\/login\?error=invalid/);
    assert.ok(!legacyAttempt.headers.getSetCookie().some(value=>value.startsWith("dashboard_access_v2=")));
    await stopServer();
  }
  console.log("PASS: missing-auth Preview/Production runtime configurations deny access and reject legacy defaults.");
} finally {
  await stopServer();
  if(operatorId) await admin.auth.admin.deleteUser(operatorId);
  sql("delete from public.dashboard_focus_items where prospect_slug='charger-roofing'; delete from public.prospects where prospect_slug in ('charger-roofing','research-private-fixture'); delete from dashboard_private.login_budget;");
}
