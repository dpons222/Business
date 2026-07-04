# Finished Demo Batch QA

Issue: https://github.com/dpons222/Business/issues/126  
Plan: `plans/issue-126-med-spa-finished-demo-batching.md`  
Batch: Batch B - Treatment Or Package Decision Page  
Date checked: 2026-07-04

## Scope

Initial QA for the first five finished med spa treatment-consultation demos:

- Adam & Eve Medical Aesthetics
- SkinSpirit Paradise Valley
- It's a Secret Med Spa Scottsdale
- DS Skin & Lips Medical Spa
- Phoenix Medspa

These are local finished-demo routes, not yet dashboard-wired production outreach URLs.

## Overall Verdict

Verdict: Needs minor fixes before outreach.

The five pages now exist as customer-facing treatment-consultation paths and local route checks pass. Dashboard local metadata is wired for the five routes. They are not outreach-ready yet because Supabase/tracker `demo_url` updates, production deployment verification, and exact outreach draft review still need to happen.

## Verification Completed

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local production server route checks returned `200 OK` for all five demo routes.
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
| Adam & Eve Medical Aesthetics | `http://localhost:3005/med-spa/adam-eve-medical-aesthetics` | 200 OK | Passed | Needs minor fixes |
| SkinSpirit Paradise Valley | `http://localhost:3005/med-spa/skinspirit-paradise-valley` | 200 OK | Passed | Needs minor fixes |
| It's a Secret Med Spa Scottsdale | `http://localhost:3005/med-spa/it-s-a-secret-med-spa-scottsdale` | 200 OK | Passed | Needs minor fixes |
| DS Skin & Lips Medical Spa | `http://localhost:3005/med-spa/ds-skin-lips-medical-spa` | 200 OK | Passed | Needs minor fixes |
| Phoenix Medspa | `http://localhost:3005/med-spa/phoenix-medspa` | 200 OK | Passed | Needs minor fixes |

## Source Checks

| Prospect | Source URL | Check result | Notes |
| --- | --- | --- | --- |
| Adam & Eve Medical Aesthetics | `https://www.adamandevemedspa.com/` | 200 OK | Metadata confirms Scottsdale med spa, injectables, fillers, facial treatments, and aesthetic services. |
| SkinSpirit Paradise Valley | `https://www.skinspirit.com/locations/paradise-valley` | 200 OK | Metadata confirms Botox, fillers, facials, Phoenix / Paradise Valley location, and complimentary consultation language. |
| It's a Secret Med Spa Scottsdale | `https://secretmedspa.com/scottsdale-az/` | Browser retrieval succeeded; command-line HEAD returned 403 | Browser content confirms Book Now, free consultation, Scottsdale address/phone, injectables, laser treatments, skin rejuvenation, body services, wellness, pricing, and memberships. Recheck in browser before sending. |
| DS Skin & Lips Medical Spa | `https://www.dsskinandlips.com/botox/` | 200 OK | Metadata confirms Botox injections in Scottsdale and appointment-oriented copy. |
| Phoenix Medspa | `https://phxmedspa.com/` | 200 OK | Metadata/title scan confirms Botox, Dysport, fillers, PRP therapy, and microneedling. |

## Findings

- [Medium] Production URLs are not verified yet.
  Evidence: Checks ran against `localhost:3005`.
  Risk: External image, route, and cache behavior may differ after deploy.
  Recommended change: Deploy only after the approved first-batch slice, then verify `https://local-growth-preview.vercel.app/med-spa/<slug>`.

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
