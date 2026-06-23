# Issue 25: LOA Construction Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/25

## Objective

Prepare LOA Construction as the next high-priority roofing outreach prospect by adding a lightweight, prospect-facing demo page to the existing reusable roofing landing page demo app.

The goal is to create enough personalization to support outreach without overbuilding an unpaid custom site. LOA should reuse the established prospect data + shared landing page system unless implementation review shows a small LOA-specific adjustment is clearly needed.

## Base Commit

```text
aadcbc710e9af0a532daffbb07f137d0fb3e8b27
```

## Branch

```text
issue-25-loa-construction-demo
```

## Milestone

```text
Prototype Phase D - Functional Prototype
```

## Scope

### In Scope

- Recheck LOA public page details before locking copy.
- Add LOA Construction as a reusable prospect data object in the demo app.
- Register LOA in the existing prospect registry so route generation works.
- Render LOA at `/prospects/loa-construction`.
- Confirm whether the existing clean URL route also renders `/loa-construction`.
- Keep LOA copy focused on Austin hail inspection and free roof inspection requests.
- Avoid guaranteed leads, rankings, revenue, insurance claim outcomes, or booked-job promises.
- Update relevant demo app, experiment, prospect, and outreach docs with the LOA demo route or final URL.
- Update Supabase `public.prospects` with LOA demo URL/status notes if the final public demo URL is established.
- Validate build and local preview.
- Post GitHub Issue progress and session-end updates.

### Out Of Scope

- Building a separate app for LOA.
- Creating a heavy custom LOA design before interest.
- Launching paid ads or campaign traffic.
- Sending outreach without explicit approval after the demo is ready.
- Reworking the broader roofing offer or all first-batch prospects.

## Implementation Checklist

- [x] Create GitHub Issue #25.
- [x] Assign Issue #25 to `Prototype Phase D - Functional Prototype`.
- [x] Create branch `issue-25-loa-construction-demo`.
- [x] Create this implementation plan.
- [x] Post Issue #25 session-start comment with base commit, branch, and plan.
- [x] Inspect current demo app prospect architecture.
- [x] Recheck LOA public page details needed for copy, phone, offer, proof, and assets.
- [x] Decide whether the shared `RoofingLandingPage` component is sufficient.
- [x] Add `lib/prospects/loa-construction.ts`.
- [x] Register LOA in `lib/prospects/index.ts`.
- [x] Verify generated static params include `loa-construction`.
- [x] Update app/demo README files and experiment navigation as needed.
- [x] Update LOA outreach email with the selected demo route or final URL.
- [x] Update local tracker docs if status/demo route changes.
- [x] Update Supabase `public.prospects` if a public demo URL is finalized.
- [x] Run build validation.
- [x] Start local preview and verify `/prospects/loa-construction`.
- [x] Verify `/loa-construction` if supported by the existing clean URL route.
- [x] Check that existing Final Cut and Charger routes still render.
- [x] Fix any mobile/layout/text overflow issues found during preview.
- [x] Commit implementation changes with Issue #25 reference.
- [ ] Push branch and prepare PR if requested by the workflow/user.
- [ ] Post Issue #25 progress/session-end update with evidence.

## Working Assumptions

- LOA should receive a light personalized demo, not a bespoke custom build.
- The first demo direction should convert the existing Austin hail article into a clearer inspection-request landing page.
- The strongest first route is likely `/prospects/loa-construction`, with `/loa-construction` used only if the existing clean slug route supports it safely.
- If no reliable public LOA image/logo asset is available, the page should still look polished using the shared system, brand colors, and carefully selected public details rather than inventing assets.

## Validation Plan

- Run `npm run build` in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Confirm Next generates or serves:
  - `/prospects/loa-construction`
  - `/loa-construction`, if supported
  - `/prospects/final-cut-roofing`
  - `/prospects/charger-roofing`
- Start local preview and confirm the LOA page returns HTTP 200.
- Visually inspect desktop and mobile layouts for:
  - no text overlap,
  - no button overflow,
  - readable form area,
  - correct LOA-specific copy,
  - no internal-only variant controls on prospect-facing pages.

## Validation Results

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Next generated both LOA routes:
  - `/prospects/loa-construction`
  - `/loa-construction`
- Existing routes continued to generate:
  - `/prospects/final-cut-roofing`
  - `/prospects/charger-roofing`
  - `/prospects/charger-roofing/assessment`
  - `/prospects/charger-roofing/storm-response`
- Local production preview ran at `http://127.0.0.1:3000`.
- HTTP 200 checks passed for:
  - `http://127.0.0.1:3000/prospects/loa-construction`
  - `http://127.0.0.1:3000/loa-construction`
  - `http://127.0.0.1:3000/prospects/final-cut-roofing`
  - `http://127.0.0.1:3000/prospects/charger-roofing`
- `agent-browser` was unavailable in this shell, so visual verification used headless Edge screenshots.
- Desktop and mobile first-viewport screenshots were reviewed. LOA branding, headline, CTA, proof row, and form rendered coherently.
- Edge printed a Chromium task-manager warning during screenshot capture; no Next runtime errors appeared in the app log.
- Vercel preview deployed successfully:
  - `https://roof-check-preview-le93cf61o-dpons222-9388s-projects.vercel.app`
  - Deployment ID: `dpl_texziqvNuLKNZP8g7K7zKwmxFSAo`
- Preview HTTP 200 checks passed for:
  - `https://roof-check-preview-le93cf61o-dpons222-9388s-projects.vercel.app/prospects/loa-construction`
  - `https://roof-check-preview-le93cf61o-dpons222-9388s-projects.vercel.app/loa-construction`
- Vercel build completed successfully but reported an existing config warning: `outputFileTracingRoot` and `turbopack.root` are both set and should have the same value.
- Supabase `public.prospects` was updated for `loa-construction` with the preview demo URL while keeping status as `not_contacted`.

## Risk Notes

- Public LOA assets may not be easy to reuse cleanly. Keep the demo light if asset quality is low.
- If a live page changed since the first outreach batch, update copy and docs to match current public information.
- If build failures are unrelated to LOA changes, document them separately and avoid masking unrelated issues.
