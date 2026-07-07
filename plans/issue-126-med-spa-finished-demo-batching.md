# Issue 126 - Med Spa Finished Demo Batching Plan

## Objective

Create a diagnosis-first implementation plan for turning the 25 med spa recommendation packages into finished customer-facing demo pages in reusable batches.

The goal is not to handcraft 25 unrelated pages. The goal is to inspect the current prospect set, group med spas by repeated customer-action friction, create a small set of reusable solution patterns, personalize each prospect within those patterns, and run `prospect-demo-qa` before any outreach.

## Scope

In scope:

- Inventory the 25 med spa prospects from the dashboard/Supabase/tracker/repo state.
- Refresh each prospect's public source-site notes before build work.
- Classify prospects by desired customer action, visible friction, and best-fit solution module.
- Batch prospects by reusable solution pattern rather than business name or city.
- Define reusable med spa demo templates/components before implementation.
- Sequence build, QA, dashboard, Supabase/tracker, commit, sync, and deploy work.

Out of scope for this plan-only issue:

- Building finished demo pages.
- Running live source-site inspection for all 25 prospects.
- Running `prospect-demo-qa` on finished demos.
- Updating Supabase `demo_url` values or outreach readiness.
- Sending outreach.

## Base State

- Base commit: `68c4ebf4e60a415b282cfa65e100c7d13445d1b5`
- Branch: `develop`
- Issue: https://github.com/dpons222/Business/issues/126
- Current known state: med spa prospects have recommendation/package data, but an internal recommendation preview is not a finished customer-facing demo.

## Reasoning Framework

Use diagnosis-first batching.

For each prospect, classify the business by:

1. Desired customer action: what should a patient do next?
2. Visible friction: what makes that action harder on the current site?
3. Solution module: what repeatable demo pattern best removes that friction?
4. Leverage: how many prospects can share this pattern with light personalization?
5. Sendability: can the finished page read like something the med spa could actually use with patients?

Do not batch by location first. Location supports personalization, but the build pattern should be driven by the business problem.

## Skill Ownership

- `niche-growth-system-builder` owns diagnosis, module selection, and the implementation brief.
- `prospect-demo-builder` owns creating the finished business-specific customer-facing demo pages/flows.
- `prospect-demo-qa` owns the final pre-send quality gate after a finished demo exists.
- If a page only shows an internal recommendation/package summary, it is not ready for outreach.

## Proposed Classification Table

Use this table shape during the inventory and classification phase:

| Prospect | Slug | City | Website | Source checked | Desired action | Visible friction | Primary module | Supporting module | Priority | Source facts needed | Demo route | QA status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | Not checked | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Not started |

## Expected Solution Batches

### Batch A - Booking Path Cleanup

Use when the med spa has visible booking/consultation intent but the path is buried, confusing, duplicated, or interrupted.

Likely demo pattern:

- Focused first-visit page.
- Clear treatment/consultation choice.
- One primary `Book consultation` or `Request appointment` CTA.
- Source-backed trust and contact details near the CTA.

### Batch B - Treatment Or Package Decision Page

Use when high-value treatments, packages, memberships, or prices are visible but patients may not know which option fits them.

Likely demo pattern:

- Treatment category landing page.
- Simple decision path.
- Package highlights using only source-backed details.
- Consultation CTA for uncertain visitors.

### Batch C - Consultation-First Trust Page

Use when the service is high-ticket or medically sensitive and the main friction is trust before booking.

Likely demo pattern:

- Provider/clinic trust section.
- Treatment expectations.
- Safety/consultation framing.
- No invented claims, guarantees, or medical outcomes.

### Batch D - Promo Or Offer Landing Page

Use when a promo, event, seasonal offer, first-time offer, or special is visible but not presented as a focused conversion path.

Likely demo pattern:

- Offer-specific landing page.
- Terms copied only from public source.
- Clear CTA and expiration/status if source-backed.
- Fallback to consultation CTA if details are incomplete.

### Batch E - Membership Or Repeat-Treatment Page

Use when membership, loyalty, recurring care, or treatment plans are visible but not explained in a way that supports repeat bookings.

Likely demo pattern:

- Membership value explanation.
- Repeat-care path.
- Member/non-member comparison only if source-backed.
- CTA to ask about membership or book consultation.

### Batch F - Proof And Reputation Page

Use when the med spa has visible reviews, transformations, awards, provider proof, or social proof that is disconnected from the booking action.

Likely demo pattern:

- Trust-forward landing page.
- Proof close to CTA.
- Service-area and provider context.
- No copied unsupported review counts unless current source confirms them.

## Prioritization Criteria

Score each prospect or batch from 1 to 5:

- Revenue proximity: how close the fix is to consultations, bookings, packages, or repeat care.
- Visible urgency: how obvious the current friction is from the public journey.
- Demo clarity: how easily the solution can be shown without backend access.
- Repeatability: how many prospects can share the same module.
- Outreach clarity: how naturally the observed issue can be explained in one sentence.
- QA risk: how likely unsupported claims, medical language, outdated offers, or weak source facts could block readiness.

Start with the batch that has the best combination of repeatability, revenue proximity, and low QA risk.

## Implementation Phases

### Phase 0 - Planning Setup

- [x] Create GitHub issue.
- [x] Post session-start comment.
- [x] Read project issue and business-lab guidance.
- [x] Read `niche-growth-system-builder` guidance.
- [x] Create/update `prospect-demo-builder` skill ownership for finished demo implementation.
- [x] Create this implementation plan.

### Phase 1 - Inventory

- [x] Pull all 25 med spa prospects from dashboard/Supabase/tracker/repo state.
- [x] Record slug, city, website, recommendation, observed issue, package status, contact status, email draft status, and current preview/demo URL.
- [x] Identify prospects already in current focus vs. available prospect list.
- [x] Confirm no prospect has already been contacted unless the future work is explicitly a follow-up.

### Phase 2 - Source Refresh

- [x] Recheck each source website before assigning the final build pattern.
- [x] Capture current booking/contact path.
- [x] Capture public treatment/package/membership/offer facts.
- [ ] Capture brand signals: logo, colors, tone, imagery, and location.
- [x] Mark contact method as unverified unless directly verified.
- [x] Separate source-backed facts from assumptions.

### Phase 3 - Batch Assignment

- [x] Assign each prospect to exactly one primary solution batch.
- [x] Assign optional supporting module only when it improves outreach or demo clarity.
- [x] Score each batch using the prioritization criteria.
- [x] Select the first build batch.
- [x] Document why the first batch should be built first.

### Phase 4 - Reusable Template Design

- [x] Define shared med spa demo component structure.
- [x] Define data fields required per prospect.
- [x] Define route convention for finished demos.
- [x] Define dashboard preview behavior so the orange action opens the finished demo, not the source site.
- [x] Define Supabase/tracker `demo_url` update requirements.
- [x] Define fallback behavior for prospects that remain package-only.

### Phase 5 - Batch Build

- [x] Build the first reusable solution template.
- [x] Personalize the first five Batch B prospects using source-backed facts.
- [x] Personalize the remaining med spa prospects through the shared finished-demo renderer using existing source-backed facts.
- [x] Keep internal diagnosis, package labels, pricing notes, and developer notes out of public pages.
- [x] Ensure each page has one primary customer action.
- [x] Run local build/checks.

### Phase 6 - QA Gate

- [x] Run `prospect-demo-qa` for every finished demo in the first five-page slice.
- [x] Verify source accuracy, public copy, CTA path, links, and route status.
- [x] Verify mobile layout and desktop layout visually before outreach readiness.
- [ ] Verify exact email draft accuracy for each prospect before outreach readiness.
- [x] Fix QA blockers before marking a prospect ready.
- [x] Record verdict: Ready, Needs minor fixes, Needs meaningful fixes, or Not ready.

### Phase 7 - Dashboard, Tracker, And Deploy

- [x] Update dashboard metadata so `Preview` opens the finished demo routes for all med spa prospects.
- [x] Keep `Source` pointing to the original business website.
- [ ] Update Supabase/tracker `demo_url` and readiness fields only after QA supports the change.
- [x] Commit and push scoped changes.
- [x] Deploy to Vercel.
- [x] Verify production demo routes.
- [ ] Verify dashboard links in authenticated production dashboard.
- [ ] Post issue progress update with files, validation, deploy URL, and remaining batches.

### Phase 8 - Repeat Batches

- [ ] Repeat phases 5 through 7 for each remaining batch.
- [ ] Reuse components where possible.
- [ ] Avoid new one-off page patterns unless the source-site diagnosis clearly requires it.
- [ ] Close the implementation issue only when all selected batch acceptance criteria are met.

## Implementation Update - Remaining Builder Pass

Date: July 7, 2026

- Ran `prospect-demo-builder` for the remaining 24 implementation plans in `plans/med-spa-demo-builds`, excluding `lazaderm-chandler` which was already rebuilt.
- Converted the shared med spa renderer so every med spa route uses the full customer-facing landing/booking-path layout instead of falling back to compact recommendation-summary sections.
- Dashboard metadata now marks med spa entries as `QA needed`, with preview routes preserved at `/med-spa/{slug}` and source URLs preserved separately.
- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local route scan passed for the 24 rebuilt routes: each returned HTTP 200 and did not include the scanned internal terms `recommendation preview`, `internal package`, `demo preview`, `audit`, `source-backed`, `source site`, `source page`, `source pages`, `public page`, `visible on the source`, or `Needs rebuild`.
- Rendered image check passed for all 43 image URLs found across the 25 med spa routes after HTML entity decoding.
- Browser/visual automation was attempted, but `agent-browser` and Playwright are not installed in the local app environment, so visual QA still needs to be handled by manual review and/or `prospect-demo-qa`.
- All rebuilt med spa pages still require `prospect-demo-qa` before outreach readiness.

## Definition Of Ready For A Prospect Build

A prospect is ready to build when:

- Current source site has been refreshed.
- Desired customer action is identified.
- Visible friction is documented.
- Primary solution batch is assigned.
- Required source facts are listed.
- Contact/booking path is known or clearly marked unverified.
- Public-page claims can be supported by source evidence.

## Definition Of Done For A Finished Demo

A finished med spa demo is done when:

- It is a customer-facing preview, not an internal recommendation summary.
- It uses source-backed brand, location, service, offer, and CTA details.
- It has one clear primary action.
- It avoids guarantees around medical outcomes, bookings, revenue, reviews, rankings, or ad results.
- `prospect-demo-qa` has passed or only minor documented residual risk remains.
- Dashboard `Preview` opens the finished demo.
- Dashboard `Source` opens the original website.
- Supabase/tracker/demo metadata is updated when applicable.
- Production route is verified after deployment.

## Risks And Guardrails

- Do not invent prices, offers, review counts, provider credentials, medical claims, or before/after claims.
- Do not imply the business approved the demo.
- Do not send outreach from this implementation plan.
- Do not update outreach status to contacted unless Diego actually sends a message.
- Do not treat package/recommendation preview pages as finished demos.
- Prefer reusable med spa modules over 25 unrelated implementations.
- Finished demo pages must be built through the `prospect-demo-builder` standard before `prospect-demo-qa`.

## Acceptance Criteria For This Plan-Only Issue

- [x] Plan file exists at `plans/issue-126-med-spa-finished-demo-batching.md`.
- [x] Plan uses diagnosis-first batching logic.
- [x] Plan defines expected med spa solution batches.
- [x] Plan separates classification/planning from demo implementation.
- [x] Plan includes validation, dashboard, Supabase/tracker, and deployment expectations for future build phases.
