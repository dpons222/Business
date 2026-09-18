import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { writeFile, unlink, chmod } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function provisionOperator(client, email) {
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Valid operator email required.");
  const { data, error } = await client.auth.admin.createUser({
    email, password: randomBytes(48).toString("base64url"), email_confirm: true,
    app_metadata: { dashboard_role: "admin", dashboard_disabled: false },
  });
  if (error || !data.user) throw new Error("Operator creation failed; check the Auth console. No credentials were printed.");
  return data.user.id;
}

export async function createRecoveryCode(client, operatorId) {
  const { data, error } = await client.auth.admin.getUserById(operatorId);
  if (error || !data.user?.email || data.user.app_metadata.dashboard_role !== "admin" || data.user.app_metadata.dashboard_disabled === true) {
    throw new Error("The configured operator is missing or disabled. Review the Auth console before recovery.");
  }
  const result = await client.auth.admin.generateLink({ type: "recovery", email: data.user.email });
  if (result.error || result.data.user.id !== operatorId) throw new Error("Recovery generation failed.");
  return result.data.properties.hashed_token;
}

async function writePrivateCode(path, code) {
  // Create empty first, restrict permissions, THEN write the sensitive contents. Never overwrite a file.
  await writeFile(path, "", { flag: "wx", mode: 0o600 });
  try {
    if (process.platform === "win32") {
      const identity = execFileSync("whoami", [], { encoding: "utf8", windowsHide: true }).trim();
      execFileSync("icacls", [path, "/inheritance:r", "/grant:r", `${identity}:(F)`], { stdio: "ignore", windowsHide: true });
    } else { await chmod(path, 0o600); }
    await writeFile(path, code + "\n", { mode: 0o600 });
  } catch {
    await unlink(path).catch(() => {});
    throw new Error("Could not protect the recovery file. No recovery code was written.");
  }
}

async function main() {
  const [action, ...args] = process.argv.slice(2);
  if (!action || action === "--help") {
    console.log("Operator administration (no email is sent):\n  provision --email EMAIL --output PRIVATE_FILE\n  recover --output PRIVATE_FILE\n  disable\n\nLoads .env.local; provision requires an empty DASHBOARD_OPERATOR_ID. Recovery and disable use only the configured operator ID. Recovery files contain a one-time secret: keep them outside the repository.");
    return;
  }
  if (!["provision", "recover", "disable"].includes(action)) throw new Error("Unknown action. Use --help.");
  try { process.loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw new Error("Cannot read local configuration."); }
  const options = Object.fromEntries(Array.from({ length: Math.ceil(args.length / 2) }, (_, i) => [args[i * 2], args[i * 2 + 1]]));
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const id = process.env.DASHBOARD_OPERATOR_ID;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  if (action === "disable") {
    if (!id) throw new Error("DASHBOARD_OPERATOR_ID is required.");
    const { error } = await client.auth.admin.updateUserById(id, { app_metadata: { dashboard_role: "disabled", dashboard_disabled: true }, ban_duration: "876000h" });
    if (error) throw new Error("Disabling the operator failed.");
    console.log("Operator disabled. Live authorization checks deny existing dashboard sessions immediately.");
    return;
  }
  if (!options["--output"]) throw new Error("--output PRIVATE_FILE is required; no code is printed or emailed.");
  if (action === "provision" && id) throw new Error("An operator is already configured. Use recover or review an explicit identity replacement.");
  if (action === "recover" && !id) throw new Error("DASHBOARD_OPERATOR_ID is required.");
  const operatorId = action === "provision" ? await provisionOperator(client, options["--email"]) : id;
  // ID is not a credential. Preserve it for recovery even if writing the code subsequently fails.
  if (action === "provision") console.log(`Set DASHBOARD_OPERATOR_ID=${operatorId} in the intended environment.`);
  const code = await createRecoveryCode(client, operatorId);
  await writePrivateCode(resolve(options["--output"]), code);
  console.log("One-time code written to the requested private file. Use /login/recover, then delete the file.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
