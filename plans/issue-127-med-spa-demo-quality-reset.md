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
