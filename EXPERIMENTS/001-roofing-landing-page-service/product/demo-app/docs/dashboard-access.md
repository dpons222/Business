# Dashboard operator access (#129)

The dashboard uses Supabase Auth. Only the UUID in `DASHBOARD_OPERATOR_ID`, with current `app_metadata.dashboard_role = "admin"`, a confirmed email, an enabled account and an active Supabase session can access private data. Role values in `user_metadata` or a browser cookie never authorize access.

## Configuration

Use Node.js 22.18+ and the committed npm lockfile. Configure these **server-only** values separately for local, Preview and Production:

| Name | Purpose |
| --- | --- |
| `SUPABASE_URL` | The intended Supabase project's base URL. |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key (legacy anon key also works) from that project. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server secret or legacy service-role key; never prefix with `NEXT_PUBLIC_`. |
| `DASHBOARD_OPERATOR_ID` | One verified Supabase Auth user UUID. |
| `DASHBOARD_APP_ORIGIN` | Exact dashboard origin, e.g. `https://local-growth-preview.vercel.app`; Preview uses its own actual origin. No path or wildcard. |

Missing/invalid configuration or an unavailable authorization function denies private access. Public demos remain available. HTTPS is required for deployed configurations. Loopback HTTP is accepted for explicit local tests/development, including testing the production build locally. No fallback account or signing secret exists.

`DASHBOARD_AUTH_SECRET`, `DASHBOARD_USERS_JSON` and `local_growth_preview_dashboard_session` are retired and ignored. Remove their values during cutover. `Manage-DashboardUsers.ps1` now stops with a migration pointer rather than writing insecure passwords.

## Session and request rules

- The server validates the access token with Supabase `getUser`, then checks current `auth.users` and `auth.sessions` through a service-only RPC. The session must belong to the same user, remain unexpired, and be no more than one hour old. No refresh token is stored in the browser; sign in again when the session expires.
- `dashboard_access_v2` is HTTP-only, SameSite=Strict, Secure in production, and expires within one hour. Successful sign-in deletes the old cookie. Logout revokes all of this user's Supabase sessions before clearing the cookie; a failed revocation is shown as a failure.
- Every private server data entry point rechecks authorization. Private APIs return 401/403 (or 503 when configuration/service is unavailable) with `private, no-store`. Unauthorized pages redirect before reading data. Checks are not cached between requests.
- Mutations require JSON and an Origin equal to `DASHBOARD_APP_ORIGIN`, reject cross-site fetches, and accept at most 16 KiB. Next.js enforces its own origin checks on server actions.
- A single database row atomically permits ten combined login/recovery attempts per five minutes across instances. The counter is bounded and rotates automatically. Supabase's own Auth limits also apply. This is intentionally conservative for one operator; a hostile request burst can temporarily deny login. Existing valid sessions are unaffected. Adjust only after measuring use; provider/firewall protection is an additional release option.

## Fresh setup and recovery

1. Inspect the target project's Auth settings and run the read-only [preflight SQL](../supabase/inspect-dashboard-access.sql). Disable public sign-up and anonymous sign-in, enable email/password login, use an access-token lifetime no greater than one hour, and restrict Auth redirect URLs to actual application URLs. Do not assume the hosted RLS or view grants match local fixtures: inspect `prospects`, `dashboard_focus_items` and `prospect_email_drafts` before exposing Auth accounts. Public/ordinary authenticated clients must not read internal records through the Data API.
2. Apply only the reviewed [#129 migration](../supabase/migrations/20260918022929_dashboard_operator_access.sql) to a staging environment first. This additive migration creates a private schema, two private helpers and two service-only invoker RPCs. It does not create an operator, alter prospect data, or change hosted Auth settings. This directory is **not** a complete baseline of the existing production schema; never run a blind `db push` or a hosted reset.
3. Set `.env.local` to the intended staging project, leaving `DASHBOARD_OPERATOR_ID` empty for initial provisioning. Review the project URL and exact operator email before running:

   ```powershell
   npm run auth:operator -- provision --email operator@example.com --output C:\private\dashboard-recovery.txt
   ```

   Replace the example email/path. The containing private directory must exist. The command creates a confirmed, owner-reviewed identity with an unguessable throwaway password, sets server-controlled admin metadata, and generates a one-use reset code. It **does not send an email** or import a legacy password. The operator UUID is printed; the code is written only after restricting the file's permissions. No password/code is printed. Existing files are not overwritten.
4. Set the returned `DASHBOARD_OPERATOR_ID`, both keys, project URL and exact application origin in the intended runtime. Restart locally or stage the configured build. Open `/login/recover`, paste the private file's code, and choose a password of at least 14 characters. Recovery revokes existing sessions; sign in normally afterward. Delete the private file promptly. Codes expire according to the project's Auth OTP expiry (local default: one hour), are single-use, and never appear in query strings.
5. For a forgotten password, retain the configured UUID and run `npm run auth:operator -- recover --output C:\private\new-recovery.txt`, then repeat step 4. If the user is disabled or missing, first review the identity in the Supabase Auth console. Do not automatically re-enable/recreate it or assign admin to an arbitrary email.
6. For immediate access removal, run `npm run auth:operator -- disable`. Current server-side checks deny existing sessions immediately. Re-enabling is an explicit owner action in Auth metadata and ban settings; restoration is not part of recovery. For identity replacement, disable the old operator, provision/review the new one and change the configured UUID before admitting it.

Operator CLI access requires the Supabase server key; protect that key and the owning Supabase account as recovery credentials. Do not put real passwords, cookies or reset codes in shell arguments, logs, issues, screenshots or Git.

## Public/private route contract

| Route/data | Access and behavior |
| --- | --- |
| `/`, `/login`, `/login/recover` | Public neutral/access UI; no research contents. |
| `/dashboard`, `/dashboard/prospects/[slug]` | Approved operator only, including server reads. Recommendations use generic metadata until authorized rendering. |
| `/prospects`, `/variants` | Login required; the legacy prospects index redirects to `/dashboard`. The variants catalogue contains internal selection instructions. |
| `/api/prospect-drafts/[slug]`, `/api/dashboard-focus` (GET/PATCH) | Approved operator only, live authorization checks and no-store responses. |
| `/[roofing-slug]`, `/prospects/[roofing-slug]` | Existing 30 coded roofing pages, with an explicit public-field projection. Unknown/uncoded recommendation slugs return 404, without a database lookup. |
| `/prospects/charger-roofing/assessment`, `/prospects/charger-roofing/storm-response` | Existing Charger aliases, with public fields only. |
| `/pizabella`, `/med-spa/[slug]`, `/variants/[variant]` | Existing coded public assets. Med-spa and template data remain static server inputs. |
| `lib/prospectDrafts.ts`, `lib/dashboardFocus.ts`, `lib/demoRegistry.ts`, prospect registries | Server-only modules. Private data methods authorize independently of the page/layout. Client-safe labels live in separate modules; type imports carry no runtime data. |

[Public URL manifest](../tests/public-routes.json): 88 business aliases (60 roofing, 25 med-spa, one restaurant, two Charger secondary routes). The six coded template variants remain public too. Public roofing output includes customer copy, public phone/branding/photos/services; it excludes `observedIssue`, `sourceWebsite`, contact-email research fields, creation dates and future internal fields. There is no public database-backed fallback. Dashboard frames may embed same-origin internal pages; outside framing is prohibited. Access pages disallow framing.

## Reproducible verification

Use a dedicated local Docker/Supabase instance. The checked-in config disables global sign-ups and unrelated services. Its email provider remains enabled (`[auth.email].enable_signup=true`) because disabling that CLI switch also disables password login; `[auth].enable_signup=false` rejects public registration. Tests refuse a hosted API URL; they create and remove synthetic identities/data only. Do not run integration and HTTP suites concurrently because they share the local throttle/fixture rows.

```powershell
npm ci
npx supabase start
npm run test:security
npm run test:security:integration
npm run build
npm run test:security:http
npx supabase db advisors --local --type security --fail-on error
```

The HTTP suite starts and stops its own production server on `127.0.0.1:3129`, supplies isolated environment values without overwriting `.env.local`, and checks both HTML and serialized page data. `tests/fixtures/research.sql` is a synthetic test schema, **not** a production migration. The supplied tests clean up their users and rows in normal completion/failure paths; an interrupted test may require removing the named synthetic records in the local instance.

## Release and rollback gate

Local verification does not change the hosted application. Before releasing:

- Confirm the intended hosted project is reachable and the sole operator email is correct. Inspect current Auth settings, private-table/view grants and operator metadata without exporting secrets or customer records. Run security advisors after applying the migration.
- Stage the migration/configuration first; verify operator setup, recovery, actual sign-in, anonymous denials, role/session removal, and public aliases on the staged build. Confirm the configured origin matches the URL used for testing.
- With production-release authorization, repeat the reviewed configuration/migration on the intended production project, deploy the tested app, verify legitimate access and private/public response status/field boundaries, and retire legacy environment values. Record the deployment and actual results in #129.
- If sign-in fails, preserve the private deny path and repair configuration/identity. Never roll back to a hardcoded account or unauthenticated route. Public assets may be restored separately. The additive database helpers may remain unused during recovery; their grant restrictions must remain intact.

## Current evidence and limits (2026-09-17)

43 focused tests, nine real local Supabase integration tests, production build/type check, and the HTTP flow passed. The HTTP checks covered all 88 business aliases and six template variants, actual login/logout server actions, private API/page contents, a persisted focus write, CSRF/body limits and replay after revocation. Browser checks cover email login, dashboard rendering, internal recommendation, logout/redirect and recovery form. Local database security advisors reported no issues. See the [implementation plan](../../../../../plans/issue-128-business-research-platform-audit/issue-129-secure-research-dashboard.md) for final verification status.

Hosted SQL inspection timed out twice; the configured hosted Auth hostname then failed DNS resolution (`ENOTFOUND`). Hosted configuration, current RLS, actual operator identity, staging login and production behavior have **not** been verified or changed. #129 remains open until those release checks are complete.

Necessary prerequisites delivered with this repair: Next.js pinned to 16.3.5 to include [upstream security fixes](https://nextjs.org/blog/august-2026-security-release), and the deprecated TypeScript `baseUrl` removed so the security build can be checked. The existing `next lint` command and unrelated dependency audit findings remain tracked under #131; they are not reported as passing.
