# Issue 2: Charger Roofing Prospect Package And Assessment Demo

GitHub Issue: https://github.com/dpons222/Business/issues/2

## Objective

Prepare Charger Roofing as the next high-priority outreach prospect for the roofing landing page experiment, with a more distinctive assessment-style demo rather than another generic landing page.

## Scope

- Create a Charger Roofing prospect package.
- Add a lightweight Charger-specific demo brief.
- Add Charger as a reusable demo-app prospect data object.
- Add shadcn/ui foundations where they improve form/control quality.
- Create a storm damage assessment interaction model for Charger.
- Make the Charger demo feel more like a practical inspection intake tool than a brochure page.
- Update relevant navigation and tracker files.
- Validate the app build and local preview if possible.

## Checklist

- [x] Inspect the live Charger Roofing hail page.
- [x] Create GitHub Issue #2 and branch `issue-2-charger-roofing`.
- [x] Create `prospects/charger-roofing/` docs.
- [x] Create Charger personalized demo brief.
- [x] Add Charger Roofing prospect data to the demo app.
- [x] Remove shared demo hardcoding that would make non-Final Cut prospects inaccurate.
- [x] Update README/navigation files.
- [x] Run build or validation checks.
- [x] Start local preview and verify the Charger page.
- [x] Post Issue #2 progress/closeout update.
- [x] Initialize or add shadcn/ui foundations safely.
- [x] Add reusable assessment-flow component for storm damage intake.
- [x] Build Charger assessment-style demo route/view.
- [x] Keep the existing reusable prospect data model compatible with Final Cut.
- [x] Update docs to describe the new assessment-style convention.
- [x] Run final build and visual verification after the redesign.
- [x] Post updated Issue #2 progress summary.

## Source Notes

Checked June 16, 2026:

- Charger page reviewed: https://charger-roofing.com/roof-hail-damage-in-san-antonio-texas/
- The page has a clear free inspection / roof checkup offer.
- The form asks for name, email, phone, address, and message.
- Contact details are visible: `(210) 305-ROOF` and `Sales@Charger-Roofing.com`.

## Working Assumption

Charger should be positioned as a stronger first outreach target than Final Cut because the site has a visible offer but a more basic conversion presentation. The pitch should not criticize the website. It should say the existing hail page has the right offer, and a more focused campaign page could make the free inspection easier to act on after a storm.

## Validation

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Next generated `/prospects/charger-roofing` as a static prospect route.
- Next also continued generating `/prospects/final-cut-roofing`, preserving the original comparison demo.
- Local preview responded with HTTP 200 at `http://127.0.0.1:3000/prospects/charger-roofing`.
- Visual fallback check used headless Edge screenshots because in-app Browser control tools were not exposed in this session.
- Desktop and mobile screenshots were reviewed; a mobile overflow issue with the long CTA/form area was found and fixed.
- Final production preview is running with `next start` at `http://127.0.0.1:3000/prospects/charger-roofing`.

## Scope Expansion

Updated June 16, 2026:

- Issue #1 was merged and closed via PR #3 before continuing.
- Charger should no longer be just another hero/form/cards landing page.
- The Charger route now uses a shadcn-powered storm damage assessment / inspection intake flow.
- Final Cut remains on the original reusable landing page component for comparison.
- shadcn/ui was added as a controlled component foundation, not as a requirement that every prospect page follow the same layout.
