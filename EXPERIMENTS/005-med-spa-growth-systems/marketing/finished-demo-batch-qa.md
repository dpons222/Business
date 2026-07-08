# Finished Demo Batch QA

Issue: https://github.com/dpons222/Business/issues/126  
Plan: `plans/issue-126-med-spa-finished-demo-batching.md`  
Batch: Batch B - Treatment Or Package Decision Page  
Date checked: 2026-07-04

## 2026-07-07 Reset Notice

This QA verdict is superseded by Issue 127. The earlier "Needs minor fixes" rating was too lenient because it validated route health and copy hygiene without checking whether the pages were visibly stronger than each prospect's source site.

Treat the med spa routes from this pass as rebuild inputs only. Do not use them for outreach until they are rebuilt with `prospect-demo-builder`, compared against the source site, and passed through `prospect-demo-qa`.

## 2026-07-07 Full Med Spa QA Pass

Issue: https://github.com/dpons222/Business/issues/127  
Skill: `prospect-demo-qa`  
Scope: all 25 businesses in `plans/med-spa-demo-builds`

### Overall Verdict

Verdict: Needs meaningful fixes before outreach.

The med spa routes now pass route, link, image, and blocked-copy checks after scoped QA fixes. They are still not outreach-ready because exact visual/source parity was not completed in browser tooling, email drafts/contact methods are not verified, and 23 of 25 pages still rely on generated rich sections rather than the hand-authored source-specific depth now used for Lazaderm Chandler and Adam & Eve Medical Aesthetics.

### Fixes Applied During QA

- Replaced broken or unreliable booking CTAs:
  - All About Me now links to `https://allaboutmeaz.com/` instead of a Zenoti URL returning 404 in automated QA.
  - SkinSpirit Paradise Valley and SkinSpirit Scottsdale now link to `https://www.skinspirit.com/book-an-appointment`.
  - It's a Secret Biltmore and Scottsdale now link to their official location pages because the direct Zenoti endpoints were unreliable in automated checks.
  - Lazaderm secondary booking CTA now links to `https://lazaderm.com/schedule`.
  - Bellagio now links to a reachable official Bellagio service page instead of the broken Zenoti services URL.
- Tightened public-copy cleanup so rendered med spa pages no longer expose scanned internal/source terms or awkward source-review phrasing.
- Fixed Supabase-backed dashboard readiness logic so med spa rows reuse local route metadata instead of hardcoding only `lazaderm-chandler` as rebuilt.

### Automated Validation

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local built app served on `http://localhost:3005`.
- 25 of 25 med spa routes returned HTTP 200.
- 25 of 25 source URLs were reachable or intentionally noted as automated-fetch-blocked:
  - `secretmedspa.com/biltmore-phoenix-az/` and `secretmedspa.com/scottsdale-az/` returned 403 to automated fetch but were already known to require browser/manual verification.
- 26 of 26 CTA URLs had no automated hard failure after fixes. Four booking/contact URLs returned 403 to automated fetch and need manual browser verification:
  - Skin Savvy Aesthetics My Aesthetic Record booking
  - Institute of Aesthetics My Aesthetic Record booking
  - It's a Secret Biltmore official location page
  - It's a Secret Scottsdale official location page
- 43 of 43 rendered image URLs responded successfully.
- Blocked-copy scan passed for:
  - `recommendation preview`
  - `internal package`
  - `demo preview`
  - `audit`
  - `source-backed`
  - `source site`
  - `source page`
  - `source pages`
  - `public page`
  - `public site`
  - `observed issue`
  - `we noticed`
  - `i noticed`
  - `needs rebuild`
  - `med spa demo rebuild needed`

### Route QA Summary

| Prospect | Route | Automated QA | Outreach readiness |
| --- | --- | --- | --- |
| Adam & Eve Medical Aesthetics | `/med-spa/adam-eve-medical-aesthetics` | Passes rebuilt route/copy/link/image checks | Needs manual review - hand-authored rich sections added; prospect-demo-qa, draft, and contact method still need verification |
| All About Me Medical Aesthetics | `/med-spa/all-about-me-medical-aesthetics` | Passes after CTA fallback | Not ready - booking path now safe but less direct; draft/contact not verified |
| Arcadia Wellness Center | `/med-spa/arcadia-wellness-center` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Arizona Medical Medspa | `/med-spa/arizona-medical-medspa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Beautify Spa | `/med-spa/beautify-spa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Bellagio Med Spa - Arcadia | `/med-spa/bellagio-med-spa-arcadia` | Passes after CTA replacement | Not ready - CTA is safe but should be manually confirmed against desired booking path |
| Body + Health Restoration Center Paradise Valley | `/med-spa/body-health-restoration-center-paradise-valley` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Chandler Med Spa | `/med-spa/chandler-med-spa` | Passes route/copy/link checks | Not ready - no verified logo/hero image in local data; draft/contact not verified |
| DS Skin & Lips Medical Spa | `/med-spa/ds-skin-lips-medical-spa` | Passes route/copy/link checks | Not ready - no verified logo/hero image in local data; draft/contact not verified |
| Elixir Medical Spa | `/med-spa/elixir-medical-spa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Flawless Faces Medspa | `/med-spa/flawless-faces-medspa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Inside Out Aesthetics | `/med-spa/inside-out-aesthetics` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Institute of Aesthetics | `/med-spa/institute-of-aesthetics` | Passes route/copy/image checks; CTA blocks automated fetch | Not ready - booking link needs manual browser verification |
| It's a Secret Med Spa Biltmore | `/med-spa/it-s-a-secret-med-spa-biltmore` | Passes route/copy checks; source/CTA block automated fetch | Not ready - manual browser verification required |
| It's a Secret Med Spa Scottsdale | `/med-spa/it-s-a-secret-med-spa-scottsdale` | Passes route/copy checks; source/CTA block automated fetch | Not ready - manual browser verification required |
| Lazaderm Chandler | `/med-spa/lazaderm-chandler` | Passes route/copy/link/image checks | Needs manual review - strongest current exemplar but outreach draft/contact not verified |
| Moderne Medical Aesthetics | `/med-spa/moderne-medical-aesthetics` | Passes route/copy/image checks; CTA blocks automated fetch | Not ready - booking link needs manual browser verification |
| Paradise Medspa | `/med-spa/paradise-medspa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Phoenix Medspa | `/med-spa/phoenix-medspa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Regency Specialties - Matisse Medspa | `/med-spa/regency-specialties-matisse-medspa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Sculpt AZ Med Spa | `/med-spa/sculpt-az-med-spa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |
| Skin Savvy Aesthetics | `/med-spa/skin-savvy-aesthetics` | Passes route/copy/image checks; CTA blocks automated fetch | Not ready - booking link needs manual browser verification |
| SkinSpirit Paradise Valley | `/med-spa/skinspirit-paradise-valley` | Passes after CTA replacement | Not ready - generated rich sections and draft/contact not verified |
| SkinSpirit Scottsdale | `/med-spa/skinspirit-scottsdale` | Passes after CTA replacement | Not ready - generated rich sections and draft/contact not verified |
| Zensken Med Spa | `/med-spa/zensken-med-spa` | Passes route/copy/link/image checks | Not ready - generated rich sections and draft/contact not verified |

### Remaining Blockers Before Outreach

- Run visual browser review on desktop and mobile for each route; the current shell environment could not use `agent-browser` or Playwright.
- Manually verify booking/contact path behavior for all prospects, especially the four automated-fetch-blocked CTAs.
- Create and review prospect-specific outreach drafts for the med spa prospects.
- Verify recipient/contact method in Supabase/tracker before any approval.
- Decide whether to invest another builder pass to hand-author richer sections for the 23 remaining generated-section demos before outreach.

## Scope

Initial QA for the first five finished med spa treatment-consultation demos:

- Adam & Eve Medical Aesthetics
- SkinSpirit Paradise Valley
- It's a Secret Med Spa Scottsdale
- DS Skin & Lips Medical Spa
- Phoenix Medspa

These are local finished-demo routes, not yet dashboard-wired production outreach URLs.

## Overall Verdict

Verdict: Superseded - needs finished-demo rebuild before outreach.

The five pages now exist as customer-facing treatment-consultation paths and local route checks pass. Dashboard local metadata is wired for the five routes. They are not outreach-ready yet because Supabase/tracker `demo_url` updates, production deployment verification, and exact outreach draft review still need to happen.

## Verification Completed

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local production server route checks returned `200 OK` for all five demo routes.
- Production deployment succeeded and is aliased to `https://local-growth-preview.vercel.app`.
- Stable production route checks returned `200 OK` for all five demo routes.
- Production blocked-term scan found no internal/source-review terms on the five route HTML responses.
- Chrome desktop/mobile checks passed at `1366x900` and `390x844`.
- Chrome checks found no horizontal overflow, no broken images, no collapsed mobile buttons, and no relevant console errors.
- Final focused mobile regression on Adam & Eve confirmed hero buttons render at full width, with no overflow, no broken images, and no console errors.
- Blocked-term scan found no visible instances of:
  - `recommendation preview`
  - `internal package`
  - `observed issue`
  - `source site`
  - `source page`
  - `public page`
  - `public site`
  - `audit preview`
  - `this demo`
  - `we noticed`
  - `I noticed`
- Source image checks returned `200 OK` for Adam & Eve and SkinSpirit Paradise Valley hero images.
- DS Skin & Lips was switched to the resilient treatment-path visual panel after its remote hero image failed in Chrome despite responding to command-line checks.
- A missing app icon was added after Chrome surfaced a favicon 404 on one route.

## Route Results

| Prospect | Local demo URL | Status | Public-copy scan | Verdict |
| --- | --- | --- | --- | --- |
| Adam & Eve Medical Aesthetics | `https://local-growth-preview.vercel.app/med-spa/adam-eve-medical-aesthetics` | 200 OK | Passed | Needs minor fixes |
| SkinSpirit Paradise Valley | `https://local-growth-preview.vercel.app/med-spa/skinspirit-paradise-valley` | 200 OK | Passed | Needs minor fixes |
| It's a Secret Med Spa Scottsdale | `https://local-growth-preview.vercel.app/med-spa/it-s-a-secret-med-spa-scottsdale` | 200 OK | Passed | Needs minor fixes |
| DS Skin & Lips Medical Spa | `https://local-growth-preview.vercel.app/med-spa/ds-skin-lips-medical-spa` | 200 OK | Passed | Needs minor fixes |
| Phoenix Medspa | `https://local-growth-preview.vercel.app/med-spa/phoenix-medspa` | 200 OK | Passed | Needs minor fixes |

## Source Checks

| Prospect | Source URL | Check result | Notes |
| --- | --- | --- | --- |
| Adam & Eve Medical Aesthetics | `https://www.adamandevemedspa.com/` | 200 OK | Metadata confirms Scottsdale med spa, injectables, fillers, facial treatments, and aesthetic services. |
| SkinSpirit Paradise Valley | `https://www.skinspirit.com/locations/paradise-valley` | 200 OK | Metadata confirms Botox, fillers, facials, Phoenix / Paradise Valley location, and complimentary consultation language. |
| It's a Secret Med Spa Scottsdale | `https://secretmedspa.com/scottsdale-az/` | Browser retrieval succeeded; command-line HEAD returned 403 | Browser content confirms Book Now, free consultation, Scottsdale address/phone, injectables, laser treatments, skin rejuvenation, body services, wellness, pricing, and memberships. Recheck in browser before sending. |
| DS Skin & Lips Medical Spa | `https://www.dsskinandlips.com/botox/` | 200 OK | Metadata confirms Botox injections in Scottsdale and appointment-oriented copy. |
| Phoenix Medspa | `https://phxmedspa.com/` | 200 OK | Metadata/title scan confirms Botox, Dysport, fillers, PRP therapy, and microneedling. |

## Findings

- [Medium] Outreach readiness is incomplete.
  Evidence: Contact methods remain unverified and exact outreach drafts were not reviewed in this QA pass.
  Risk: Demo page could be polished but still not ready to send.
  Recommended change: Review draft subject/body and contact method for each prospect before changing outreach readiness.

- [Low] It's a Secret source URL blocks command-line verification.
  Evidence: Browser retrieval worked, direct command-line HEAD returned 403.
  Risk: Automated checks may falsely report the source link as broken.
  Recommended change: Confirm the link in a real browser before outreach.

## Outreach Readiness

- Outreach readiness: Not ready.
- Contact method state: Unverified.
- Stable URL state: Local routes exist; production routes not deployed/verified.
- Dashboard state: Local metadata points `Preview` to `/med-spa/<slug>` for this five-page slice while `Source` remains the original website.
- Tracker/Supabase state: Still `recommendation_created`; no Supabase/tracker `demo_url` update performed.
- Draft subject/body state: Not reviewed in this pass.
- Already-contacted/follow-up state: No sent outreach confirmed during this work.
