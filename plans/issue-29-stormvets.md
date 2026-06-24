# Issue 29: StormVets Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/29

## Objective

Plan a lightweight StormVets prospect demo for the roofing landing page experiment.

The goal is to turn the Frisco free roof inspection page into a shorter, clearer storm-inspection request path that uses the veteran-owned trust angle carefully.

## Current Planning Branch

```text
issue-25-loa-construction-demo
```

## Planning Base Commit

```text
ef1dab8dea292120504a4aab1e752016460ba7f5
```

This file was created on the LOA planning branch because the user explicitly requested these planning artifacts stay on that branch. Future implementation should use a dedicated branch:

```text
issue-29-stormvets
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | StormVets |
| Prospect slug | `stormvets` |
| Website | https://stormvets.com/free-roof-inspection-frisco-tx/ |
| City / state | Frisco / North Texas, TX |
| Page reviewed | Frisco free roof inspection page |
| Priority | Medium-High |
| Status | `not_contacted` |
| Recommended CTA | Request Free Roof Inspection |

## Observed Opportunity

The form appears after a lot of navigation and service-area content.

## Recommended Demo Direction

Use a trust-led focused landing page that moves the inspection request and veteran-owned reassurance closer to the top.

Primary angle:

```text
Veteran-owned Frisco roof inspection page for hail, wind, and storm concerns.
```

## Scope

### In Scope

- Recheck StormVets live page for current contact path, proof, logo, and assets.
- Create a prospect package if needed.
- Add StormVets prospect data to the demo app.
- Register `/prospects/stormvets` and `/stormvets`.
- Update Supabase with final demo URL after deployment.
- Validate build and routes.

### Out Of Scope

- Separate app creation.
- Overusing veteran-owned messaging beyond public proof.
- Outreach send without explicit approval.
- Guaranteed performance claims.

## Planning Checklist

- [x] GitHub Issue #29 created.
- [x] Implementation plan created in `plans/issue-29-stormvets.md`.
- [x] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [x] Create/switch to branch `issue-29-stormvets`.
- [x] Recheck live StormVets page.
- [x] Create `prospects/stormvets/` docs.
- [x] Add `lib/prospects/stormvets.ts`.
- [x] Register StormVets in `lib/prospects/index.ts`.
- [x] Update demo app docs.
- [x] Draft outreach email and contact form version.
- [x] Run build validation.
- [x] Verify local and preview routes.
- [x] Update Supabase `public.prospects`.
- [x] Commit, push, open PR, and link Issue #29.

## Validation Plan

- [x] Build passes with `npm run build`.
- [x] `/prospects/stormvets` returns HTTP 200 locally.
- [x] `/stormvets` returns HTTP 200 locally.
- [x] Existing prospect routes still return HTTP 200 locally.
- [x] Preview `/prospects/stormvets` returns HTTP 200.
- [x] Preview `/stormvets` returns HTTP 200.
- [x] Supabase `public.prospects` has the StormVets preview URL while status remains `not_contacted`.
- [x] Copy avoids guaranteed leads, rankings, revenue, claim outcomes, or booked jobs.

## Preview URL

```text
https://roof-check-preview-90aw59lu3-dpons222-9388s-projects.vercel.app/stormvets
```

## Risks

- Phone/contact information was not captured in Supabase; live review must confirm the best contact method.
- The page may have multiple service-area elements that should not be copied wholesale into the demo.
