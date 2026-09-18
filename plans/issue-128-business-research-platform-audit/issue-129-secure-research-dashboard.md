# Issue 129 — Secure dashboard authentication and private research routes

Issue: [#129](https://github.com/dpons222/Business/issues/129)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Local implementation verified — hosted identity/configuration and release pending\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Make internal prospect data private and make missing or invalid authentication configuration deny access, while preserving customer-facing demo URLs.

## Dependencies and prior work

No blocking implementation prerequisite. Coordinate test interfaces with [the verification plan](issue-131-restore-project-verification.md); urgent access repairs may add their own focused regression coverage.

Prior work to inspect and preserve: [#105](https://github.com/dpons222/Business/issues/105), [#127](https://github.com/dpons222/Business/issues/127). These are context, not instructions to rerun completed work.

Audit coverage: F1, F2. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Protect draft reads, prospect indexes, internal recommendation pages, and mutation endpoints.
- Replace unsafe password/session defaults with maintained authentication; enforce a single-operator admin policy and session revocation.
- Separate public asset output from private data access; introduce regression coverage.

Out of scope:

- Research features, app relocation, public demo redesign, prospect outreach, or expanding access to more users.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- APP/lib/dashboardAuth.ts; APP/app/login/actions.ts; APP/app/login/page.tsx; APP/scripts/Manage-DashboardUsers.ps1
- APP/app/api/prospect-drafts/[slug]/route.ts; APP/app/api/dashboard-focus/route.ts; APP/app/dashboard/layout.tsx
- APP/app/prospects/page.tsx; APP/app/prospects/[slug]/page.tsx; APP/lib/prospectDrafts.ts
- APP/README.md; tracked environment example; targeted auth/API tests

## Implementation decisions

- Prefer the existing Supabase project's maintained Auth service after read-only configuration inspection; document an alternative only if it cannot meet the admin-only access/revocation contract. Do not assume Supabase sign-up settings or RLS are safe.
- Reject missing signing/auth configuration in every deployed environment. Permit explicit isolated test fixtures, never implicit accounts or fixed secrets.
- Move internal summaries under authenticated dashboard routes. Public prospect routes render an allowlisted public asset or 404; a neutral root page is not access control.
- Recheck user authorization on privileged actions; removed users and changed roles must lose write access. A role cookie alone is insufficient.

## Implementation checklist

- [x] 1. Inventory all server reads/writes and classify public asset fields versus private research/contact fields; record the current public-route manifest.
- [x] 2. Add targeted tests for anonymous reads/writes and current configured-user access; coordinate test conventions with the verification plan without delaying the security fix.
- [x] 3. Implement shared server-side authorization on every internal route and data entry point. Return 401/403 for APIs and safe login redirects for pages.
- [x] 4a. Implement and test maintained operator provisioning, password reset, session handling, and recovery using isolated identities.
- [ ] 4b. Migrate the actual operator identity after confirming the administrator email and target project.
- [x] 5. Add bounded login throttling, input validation, session expiry/revocation, server-only data modules, and explicit admin enforcement.
- [ ] 6. Stage deployment configuration, verify the legitimate operator can sign in, invalidate old custom cookies, and perform the public/private route regression checks.
- [x] 7a. Update setup, access, route/data classification and recovery documentation.
- [ ] 7b. Inspect production route responses during the authorized release and record results without exporting private contents.

## Acceptance and verification

The following code acceptance criteria passed in isolated local environments, including the production build with Production/Preview settings. They do **not** claim a hosted release; steps 4b, 6 and 7b remain open. Evidence is recorded below.

- [x] Anonymous draft GET/PATCH, focus APIs, prospect index, and internal recommendation requests disclose no private data; authenticated admin behavior passes.
- [x] Production and preview missing-auth configurations deny access; legacy default credentials and legacy cookies no longer grant access.
- [x] Removed/disabled operators and non-admin accounts cannot perform writes; session expiry and invalid signatures/tokens are rejected.
- [x] Existing roofing, restaurant, and med-spa public aliases continue to serve only customer-facing asset data.
- [x] Fresh-environment auth setup and operator recovery are documented and tested using test identities; logs contain no passwords/tokens.

## Migration and compatibility

- Inspect current auth configuration and back up metadata without printing secrets. Add the maintained-auth integration before retiring the custom cookie.
- Invalidate legacy sessions at cutover; give the existing operator a tested recovery route. New environment values belong in ignored environment files and a sanitized example.

## Rollback and recovery

- If access breaks, keep private endpoints denied while restoring verified operator configuration. Do not restore hardcoded accounts, secrets, or unauthenticated reads.
- Public assets may be reverted independently from private dashboard access.

## Risks and decision checkpoints

- A sudden authentication cutover can lock out Diego; use a staging login test and verified recovery identity.
- Public/private data currently share modules, so route testing must inspect response fields as well as status codes.

## Handoff and completion record

- Authorization helper, route classification, public asset manifest, operator setup/recovery procedure, and regression tests.

- [ ] Required checks pass, with material limitations recorded.
- [x] Relevant README, contract, and operating instructions describe the delivered behavior.
- [x] Delivery state recorded: local working-tree changes on `develop`; no commit, PR, push or hosted deployment created in this run.
- [x] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
- 2026-09-17: Execution authorized by Diego. Base `1b566a69eeddcc64cca409eb3a8c5ed6053e4503`, branch `develop`. Preserve pre-existing AGENTS/issue-guide, root README, audit plans, and med-spa edits. Current scope is #129; production release remains separate. Supabase project URL confirmed; two read-only SQL inventory attempts timed out, so use an isolated local Supabase instance for implementation verification and retain remote inventory as a release gate.

## Implementation and verification evidence — 2026-09-17

Shared app: `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.

- [Access/setup/recovery contract](../../EXPERIMENTS/001-roofing-landing-page-service/product/demo-app/docs/dashboard-access.md).
- [Public business-route manifest](../../EXPERIMENTS/001-roofing-landing-page-service/product/demo-app/tests/public-routes.json): 88 existing aliases; the six template variants were additionally verified from the built route manifest.
- [Additive migration](../../EXPERIMENTS/001-roofing-landing-page-service/product/demo-app/supabase/migrations/20260918022929_dashboard_operator_access.sql) and [read-only hosted preflight](../../EXPERIMENTS/001-roofing-landing-page-service/product/demo-app/supabase/inspect-dashboard-access.sql).

| Check | Environment and actual result |
| --- | --- |
| Focused authorization/API tests | `npm run test:security`: 43 passed. Includes all 14 private data entry points, every current API method, missing config, former defaults, claim/session expiry, role checks, CSRF and public field projection. |
| Real Auth/DB integration | `npm run test:security:integration`: 9 passed against isolated local Supabase/Postgres. Fresh operator setup and one-use reset, actual draft read/focus write, atomic concurrency limit, logout replay, current role/ban/deletion, RPC permissions, disabled public sign-up, actual CLI private-file permissions/recovery/disable. |
| Production build / types | `npm run build` passed on Next.js 16.3.5; `npx tsc --noEmit --incremental false` passed after the final test changes. |
| HTTP flow | `npm run test:security:http` passed with exit 0. Anonymous pages/APIs, legacy cookie/default rejection, 88 business aliases plus six variants, private synthetic markers visible only to the admin, real login/logout server actions, persisted Focus write, CSRF/size limits, role revocation and replay rejection. Separate Preview/Production configurations missing auth deny access. |
| Browser | agent-browser against local production server: email/password sign-in, dashboard with Supabase state, private recommendation, logout, anonymous dashboard redirect, recovery form; no browser errors. Screenshot visually inspected. Temporary browser identity/server removed. |
| Database security | `supabase db advisors --local --type security --fail-on error`: no issues. Private definer helpers have fixed search paths and service-only grants; public wrappers use invoker rights. |
| Existing lint | `npm run lint` still fails because `next lint` is retired. This was present before #129 and remains #131; no lint success claimed. |
| Hosted environment | Two MCP SQL timeouts; direct Auth health/settings inspection fails DNS with `ENOTFOUND` for the configured project. Hosted RLS, identities, Auth settings, staged login and production behavior remain unverified. No hosted mutations or email sends. |

The HTTP test initially caught a legitimate-origin mismatch caused by Next's internal hostname; explicit `DASHBOARD_APP_ORIGIN` fixed it and the rerun passed. A local restart test caught the CLI's email-provider switch disabling login; the provider now stays enabled while global registration is disabled, with a regression test. Test-server cleanup was repaired and verified with exit 0. No application bypasses were added for tests.

Necessary prerequisites included: remove the deprecated TypeScript `baseUrl` to allow build verification; pin Next.js 16.3.5 after inspecting current upstream critical advisories. Existing unrelated dependency audit findings and the lint repair are handed to #131. The app's other prospect-operation behavior is preserved for #132/#133.

## Remaining release work / next action

- [ ] Confirm the sole administrator email (asked during this run; no answer received yet).
- [ ] Restore access to, or identify the correct replacement for, the configured Supabase project. Inspect hosted Auth settings, table/view grants and existing identity metadata; do not guess a project or assume RLS is safe.
- [ ] Apply the reviewed migration and configuration to staging, provision/recover the actual operator and verify their sign-in. Retire the legacy values at cutover; new empty values were added to ignored local configuration without overwriting the previous hosted values.
- [ ] Obtain production-release authorization, perform the reviewed cutover and verify public/private responses on the deployed build. The execution skill explicitly states: “Implementation authority does not by itself authorize production promotion or deployment.”
- [ ] Record release evidence and close #129 only after those gates pass. Do not archive the initiative or mark its #129 master checkbox complete yet.

- 2026-09-18: User authorized Git commit/synchronization. Local implementation committed as [cf64f3b](https://github.com/dpons222/Business/commit/cf64f3b). Hosted configuration, administrator setup, and release gates remain pending; Git synchronization does not complete them.
