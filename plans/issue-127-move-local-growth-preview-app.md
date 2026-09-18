# Issue 127 - Move local-growth-preview App to apps/local-growth-preview

Planning status (2026-09-17): superseded by [issue #142's shared-platform portability plan](issue-128-business-research-platform-audit/issue-142-shared-platform-portability.md). The #127 label in this legacy filename/title is incorrect: actual GitHub issue #127 covers med-spa quality work and explicitly excludes the app move. Preserve this document as prior planning context; use #142 and its checklist for implementation.

## Objective
Move the shared `local-growth-preview` Next.js app out of the original roofing experiment folder and into `apps/local-growth-preview` so the project structure matches how the app is now used across roofing, restaurants, med spas, and future niches.

Current app path:

`EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`

Target app path:

`apps/local-growth-preview`

This is a structural move only. The public routes, Vercel production domain, dashboard behavior, demo content, and outreach URLs should remain unchanged.

## Timing
- [ ] Finish the active med spa demo builds first.
- [ ] Run `prospect-demo-qa` on the completed med spa demos.
- [ ] Commit, sync, and deploy the med spa work before starting this move.
- [ ] Start this app move from a clean working tree.

## Scope
In scope:
- [ ] Move the shared Next.js app to `apps/local-growth-preview`.
- [ ] Preserve git history with `git mv` where practical.
- [ ] Keep generated folders out of the move, including `.next`, `node_modules`, and other local build output.
- [ ] Update docs and command references that point to the old app path.
- [ ] Update Vercel project configuration/root-directory assumptions if needed.
- [ ] Update local development, build, deploy, and QA instructions.
- [ ] Leave a clear pointer from the old experiment area to the new shared app location.
- [ ] Verify dashboard, roofing demos, restaurant demos, and med spa demos still work.

Out of scope:
- [ ] No route redesign.
- [ ] No public URL changes.
- [ ] No prospect copy rewrites.
- [ ] No med spa demo content changes.
- [ ] No Supabase schema changes unless the move exposes an existing path/config issue.

## Preflight Checklist
- [ ] Confirm current branch is `develop`.
- [ ] Confirm working tree is clean after med spa work is committed.
- [ ] Record the base commit with `git rev-parse HEAD`.
- [ ] Confirm whether Vercel deploys from the current app root directory or from repo root settings.
- [ ] Confirm production alias remains `https://local-growth-preview.vercel.app`.
- [ ] Inventory local env files and make sure secrets are not moved into committed files.
- [ ] Search for old path references:

```powershell
rg -n --glob '!node_modules' --glob '!.next' "EXPERIMENTS/001-roofing-landing-page-service/product/demo-app|product/demo-app|local-growth-preview" .
```

## Implementation Phases

### Phase 1 - Inventory Existing App Ownership
- [ ] List the files currently under `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- [ ] Identify app-local config files, including `package.json`, lockfiles, `next.config.*`, `tsconfig.json`, `postcss.config.*`, `eslint.config.*`, `vercel.json`, and README files.
- [ ] Identify environment files and document which should remain local-only.
- [ ] Identify scripts or docs that run commands from the old app path.
- [ ] Identify Vercel settings or deployment scripts that assume the old root directory.

### Phase 2 - Move the App
- [ ] Create `apps/` if it does not already exist.
- [ ] Move the app directory to `apps/local-growth-preview` using `git mv` where possible.
- [ ] Do not move generated folders such as `.next` or `node_modules`.
- [ ] Keep a README pointer in the old experiment product area explaining that the shared app moved to `apps/local-growth-preview`.
- [ ] Confirm package metadata still uses the shared app name, not a roofing-specific name.

### Phase 3 - Update References
- [ ] Update root or experiment README files that point to the old app path.
- [ ] Update plan files only when they describe current workflow, not historical completed work.
- [ ] Update automation docs if they mention local build or app paths.
- [ ] Update med spa batching/build docs to reference `apps/local-growth-preview`.
- [ ] Update any scripts, package commands, or deployment notes that `cd` into the old path.
- [ ] Keep public demo URLs as `https://local-growth-preview.vercel.app/...`.

### Phase 4 - Vercel and Environment Configuration
- [ ] Confirm the Vercel project root directory points to `apps/local-growth-preview`.
- [ ] Confirm the build command still works from the new app root.
- [ ] Confirm Production and Preview environment variables are still available to the moved app.
- [ ] Confirm Supabase dashboard/focus-list settings still resolve correctly.
- [ ] Confirm any local `.env.local` migration is documented and secrets are not committed.

### Phase 5 - Validation
- [ ] Install dependencies from the new app path if needed.

```powershell
cd apps/local-growth-preview
npm install
npm run build
```

- [ ] Start a local dev server from the new app path.

```powershell
npm run dev -- --port 3004
```

- [ ] Browser-check key routes on desktop and mobile:
  - [ ] `/dashboard`
  - [ ] `/med-spa/adam-eve-medical-aesthetics`
  - [ ] `/med-spa/chandler-med-spa`
  - [ ] `/pizabella`
  - [ ] at least one roofing route, such as `/charger-roofing`
- [ ] Check for console errors.
- [ ] Check for horizontal overflow on mobile.
- [ ] Check that preview/source/email/focus actions still work where applicable.
- [ ] Confirm dashboard auth still works in the deployed environment.

### Phase 6 - Deploy and Confirm
- [ ] Deploy from the new app root.
- [ ] Confirm the production alias still resolves to `https://local-growth-preview.vercel.app`.
- [ ] Confirm dashboard loads in production.
- [ ] Confirm at least one roofing, restaurant, and med spa public demo loads in production.
- [ ] Confirm outreach guardrails still require `https://local-growth-preview.vercel.app/...` URLs.
- [ ] Commit and sync the move after validation.

## Acceptance Criteria
- [ ] The shared app lives at `apps/local-growth-preview`.
- [ ] The old roofing experiment no longer owns the shared app implementation.
- [ ] Public routes and stable production URLs remain unchanged.
- [ ] Local build passes from `apps/local-growth-preview`.
- [ ] Local browser smoke checks pass for dashboard, roofing, restaurant, and med spa routes.
- [ ] Production deploy succeeds from the new app root.
- [ ] Relevant docs and workflow references point to the new app path.
- [ ] No secrets, `.next`, or `node_modules` are committed.

## Risks and Mitigations
- Vercel root directory could still point at the old path.
  - Mitigation: confirm project settings before and after deploy.
- Local env files could be missed during the move.
  - Mitigation: inventory env files first and document local-only migration.
- Historical docs may contain old paths intentionally.
  - Mitigation: update active workflow docs, but avoid rewriting completed plan history unless it would confuse current work.
- Active med spa changes could be mixed with the move.
  - Mitigation: complete, QA, commit, sync, and deploy med spa work before starting this plan.

## Notes
- This plan intentionally does not move code yet.
- The move should happen after the current med spa demo build sequence so implementation paths do not change mid-batch.
