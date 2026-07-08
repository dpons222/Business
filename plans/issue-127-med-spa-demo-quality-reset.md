# Issue 127 - Med Spa Demo Quality Reset

GitHub issue: https://github.com/dpons222/Business/issues/127

## Goal

Reset the med spa demo work so the current generic previews are not treated as outreach candidates, strengthen `prospect-demo-builder`, and rebuild Lazaderm Chandler as the first finished customer-facing med spa demo.

## Why

The current med spa pages are too close to internal recommendation summaries. They do not match the source-site quality bar, do not use enough source-backed brand/asset/service context, and do not show a concrete improved patient journey.

## Scope

- Mark the existing med spa preview batch as rebuild-needed and not outreach-ready.
- Update `prospect-demo-builder` so finished demos require business-specific source parity, visible source-backed personalization, real customer-facing conversion paths, and a stronger-than-generic quality check.
- Rebuild `/med-spa/lazaderm-chandler` as the exemplar med spa page.
- Verify the Lazaderm route locally on desktop and mobile.

## Out Of Scope

- Rebuilding all 25 med spa demos.
- Sending outreach or approving outreach.
- Moving the shared app from the old roofing experiment folder.

## Checklist

- [x] Record issue/session context.
- [x] Update `prospect-demo-builder` finished-demo standard.
- [x] Mark med spa batch as needing rebuild, not minor polish.
- [x] Update app/dashboard metadata so existing med spa demos are not presented as ready for outreach.
- [x] Rebuild Lazaderm Chandler source-backed page content and visual presentation.
- [x] Preserve dashboard demo/source link separation.
- [x] Run build/type validation.
- [x] Run desktop/mobile visual checks for Lazaderm.
- [x] Update this checklist with completed work and remaining gaps.

## Validation Notes

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local route checked at `http://localhost:3004/med-spa/lazaderm-chandler`.
- Desktop `1366x900` and mobile `390x844` browser checks passed with no console errors, no broken images, no horizontal overflow, and no internal/demo wording on the Lazaderm page.
- Lazaderm is marked `QA needed`; the remaining med spa batch is marked `Needs rebuild`.

## Acceptance Criteria

- Current med spa batch docs/data clearly say the existing pages need rebuild and should not be used for outreach.
- `prospect-demo-builder` prevents the same failure mode: generic strategy page, dashboard-style colors, missing source assets, and no visible customer-facing solution.
- Lazaderm Chandler reads as a real Lazaderm-specific customer-facing page, using source-backed services, CTA, location, trust context, and brand direction.
- `/med-spa/lazaderm-chandler` remains the demo URL, while `https://lazaderm.com/locations/chandler-az` remains the source URL.
- Build and visual checks pass, or any remaining issue is documented.

## Follow-Up QA Pass - July 7, 2026

Scope: all 25 businesses in `plans/med-spa-demo-builds`.

Checklist:

- [x] Run `prospect-demo-qa` references and full pre-send checklist.
- [x] Check all 25 local med spa routes from built app output.
- [x] Fix hard CTA failures found during QA.
- [x] Fix Supabase-backed dashboard state mismatch for rebuilt med spa rows.
- [x] Re-run build after fixes.
- [x] Re-run route, source, CTA, image, and blocked-copy checks.
- [x] Update `EXPERIMENTS/005-med-spa-growth-systems/marketing/finished-demo-batch-qa.md`.
- [ ] Run visual browser QA for desktop/mobile on all 25 routes.
- [ ] Verify exact outreach drafts and contact methods.
- [ ] Decide whether 23 remaining generated-section pages need another hand-authored builder pass before outreach.

QA result:

- Automated route/copy/link/image checks pass after fixes.
- Overall outreach verdict remains `Needs meaningful fixes before outreach` because visual review, contact method verification, and exact email draft review are incomplete.
- Lazaderm and Adam & Eve now have hand-authored, source-specific rich sections. The other 23 pages are improved but still rely on generated rich sections rather than prospect-specific hand-authored sections.

## Adam & Eve Builder Pass - July 8, 2026

Scope: `plans/med-spa-demo-builds/adam-eve-medical-aesthetics.md`.

Checklist:

- [x] Rechecked Adam & Eve public homepage, contact, about, and services pages.
- [x] Rebuilt `/med-spa/adam-eve-medical-aesthetics` with hand-authored services, consultation choices, source imagery, provider context, address, hours, phone, and CTA links.
- [x] Preserved source URL as `https://www.adamandevemedspa.com/`.
- [x] Ran `npm run build`.
- [x] Checked local route, blocked public-copy terms, required content, CTA targets, and image URLs.
- [ ] Run `prospect-demo-qa` on the rebuilt Adam & Eve page before outreach.
