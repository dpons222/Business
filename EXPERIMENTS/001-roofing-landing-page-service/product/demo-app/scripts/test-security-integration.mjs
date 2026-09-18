import { execFileSync, spawnSync } from "node:child_process";
const command = process.platform === "win32" ? "cmd.exe" : "npx";
const args = process.platform === "win32" ? ["/d", "/s", "/c", "npx supabase status -o json"] : ["supabase", "status", "-o", "json"];
const config = JSON.parse(execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], windowsHide: true }));
if (config.API_URL !== "http://127.0.0.1:54321") throw new Error("Tests require the dedicated local Supabase instance.");
const result = spawnSync(process.execPath, ["node_modules/vitest/vitest.mjs", "run", "tests/integration"], {
  stdio: "inherit", windowsHide: true,
  env: { ...process.env, SECURITY_INTEGRATION: "1", SUPABASE_URL: config.API_URL,
    SUPABASE_PUBLISHABLE_KEY: config.PUBLISHABLE_KEY || config.ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: config.SECRET_KEY || config.SERVICE_ROLE_KEY,
    VERCEL_ENV: "", DASHBOARD_OPERATOR_ID: "", DASHBOARD_APP_ORIGIN: "http://127.0.0.1:3000" },
});
process.exitCode = result.status ?? 1;
