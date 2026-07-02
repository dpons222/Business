# Issue 101 - Prospect Demo QA Batch

## Context

Run outreach-readiness QA for uncontacted prospects in Supabase, excluding Brotherhood Roofing. The review should confirm stable demo URLs, source/demo availability, customer-facing page copy, contact method state, and whether rows can remain or move toward `ready_for_review`.

Base commit: `2e3d0d0ec5563365c9a1e744588b5dd1fb45505f`
Branch: `develop`

## Scope

In scope:
- Query Supabase for `status = not_contacted` prospects, excluding Brotherhood Roofing.
- Verify the stable demo URL for each selected business.
- Spot-check public copy for internal/demo/audit language.
- Verify source URL availability and compare key business/contact facts where practical.
- Summarize readiness blockers and next actions.

Out of scope:
- Sending outreach.
- Marking any row `contacted`.
- Approving outreach on Diego's behalf.
- Rebuilding page layouts unless explicitly requested after QA.

## Checklist

- [x] Load prospect-demo-qa skill and reference checklists.
- [x] Confirm eligible Supabase prospect count.
- [x] Confirm GitHub issue context and base commit.
- [x] Run automated source/demo URL and copy checks.
- [x] Review high-risk rows manually.
- [x] Produce QA summary with verdicts and blockers.
- [x] Update Supabase/checklist state only where evidence supports it.
- [x] Document validation performed and remaining manual review.

## Eligible Prospects

Count found: 28

- Arrington Roofing
- Cloud Roofing
- Dynasty Roofing
- EDP Roofing
- Elevated Roofing
- Final Cut Roofing
- Firefighter Roofing
- Houston Roofing & Construction
- Integrity First Roofing & Construction
- Invictus Roofing
- LOA Construction
- Matthew Lorand Roofing
- On Point Roofing
- Pappas Roofing and Construction
- Phoenix Storm Restoration
- Pizabella / Pizza Bella
- Proclaim Roofing Houston
- Proper Roofing
- Rescue Roofing Texas
- Rhino Roofers
- Ripple Roofing
- Rivertop Roofing
- StormVets
- Sugar Roofing
- Texas Direct Roofing & Construction
- Texas Star Roofing & Construction
- TSG Roofing
- Veritas Roofing

## QA Results

Date checked: 2026-06-30

Verdict: Needs meaningful fixes as a batch.

Summary:
- All 28 stable demo URLs returned HTTP 200 at `https://local-growth-preview.vercel.app/...`.
- Public rendered demo copy did not match the internal/audit/demo-language scan terms.
- 27 of 28 source URLs returned HTTP 200 through automated fetch. Invictus Roofing returned an automated-fetch 403 bot-check page, so it needs manual source-site verification before approval.
- No rows were marked contacted, approved, or sent.
- No Supabase status changes were made because most rows still have missing draft/contact/readiness evidence.

Ready-for-review rows found:
- LOA Construction: manual channel, draft present, demo URL verified. Minor visual issue: long service-area proof pill is tight/clipped on desktop hero.
- Pizabella / Pizza Bella: manual channel, body present, demo URL verified. Subject is empty, which is acceptable only if the manual channel is not email.
- Rivertop Roofing: email channel, verified email, subject/body/checklist present, demo URL verified.
- StormVets: email channel, verified email, subject/body/checklist present, demo URL verified.

Batch blockers:
- Email channel but no verified email: Arrington Roofing, Elevated Roofing, Firefighter Roofing, Houston Roofing & Construction, Invictus Roofing, On Point Roofing, Pappas Roofing and Construction, Phoenix Storm Restoration, Proclaim Roofing Houston, Rescue Roofing Texas, Texas Direct Roofing & Construction, Veritas Roofing.
- Missing outreach body: Cloud Roofing, EDP Roofing, Elevated Roofing, Final Cut Roofing, Firefighter Roofing, Houston Roofing & Construction, Integrity First Roofing & Construction, Invictus Roofing, Matthew Lorand Roofing, Pappas Roofing and Construction, Proclaim Roofing Houston, Proper Roofing, Rescue Roofing Texas, Rhino Roofers, Ripple Roofing, Sugar Roofing, Texas Direct Roofing & Construction, Texas Star Roofing & Construction, TSG Roofing, Veritas Roofing.
- Missing subject: EDP Roofing, Final Cut Roofing, Integrity First Roofing & Construction, Matthew Lorand Roofing, Pizabella / Pizza Bella, Proper Roofing.
- Missing pre-send checklist: EDP Roofing, Final Cut Roofing, Integrity First Roofing & Construction, Matthew Lorand Roofing, Proper Roofing.
- No contact email or phone stored: Houston Roofing & Construction, Proclaim Roofing Houston, Texas Direct Roofing & Construction.
- Demo visual polish issue: long proof pills can become too tight in the hero on some pages, seen on LOA Construction and StormVets desktop screenshots.
- Brand/source issue: Invictus Roofing source site needs manual verification because automated fetch hit a 403 challenge; the demo also uses an initials-style mark rather than a full source logo.

Validation Evidence:
- Supabase query confirmed 28 eligible `not_contacted` prospects excluding Brotherhood Roofing.
- Automated HTTP/content pass checked all 28 demo URLs and all 28 source URLs.
- Playwright screenshots were captured for LOA Construction, Pizabella, Rivertop Roofing, StormVets, Invictus Roofing, Houston Roofing & Construction, and EDP Roofing at desktop and mobile viewports.
- Browser/source manual follow-up is still needed before approving rows with bot checks, missing contacts, or incomplete drafts.

## Follow-Up Fixes

Date: 2026-06-30

- Fixed the dashboard email draft drawer data path so literal escaped newline sequences from Supabase draft fields, such as `\n` and `\r\n`, are normalized into real line breaks before rendering or copying.
- Scope: `product/demo-app/lib/prospectDrafts.ts`.
- Reason: some Supabase `outreach_draft_body` values contained literal backslash-newline text near the signoff, causing the dashboard body panel and copy action to show `\n\nBest,` instead of a clean blank line before `Best,`.
- Validation: `npm.cmd run build` passed after allowing network access for Next/font Google font fetching; local string normalization check confirmed `instead.\n\nBest,` becomes a real blank line in the returned draft body.
- Supabase outreach statuses were not changed.

## Implementation Update

Date updated: 2026-06-30

Changes made:
- Updated shared roofing demo proof-pill CSS so long service-area/trust proof text wraps with more vertical breathing room instead of clipping in the hero.
- Added a local Invictus Roofing wordmark-style SVG asset and connected it to the Invictus prospect data so the public page no longer uses the generic initials mark.

Verification:
- `npm run build` passed for the demo app.
- Fresh Playwright screenshots were captured for LOA Construction, StormVets, and Invictus Roofing at desktop and mobile viewports.
- The long proof pills now wrap cleanly on sampled desktop/mobile screenshots.
- Invictus renders with the local wordmark-style logo asset.

Still not changed:
- Supabase outreach statuses, approval fields, and relationship statuses were not changed.
- Outreach drafts and missing contact-method blockers remain unresolved for rows listed above.
- Invictus source-site manual verification is still recommended because automated fetch continues to hit a bot-check.
