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
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-29-stormvets`.
- [ ] Recheck live StormVets page.
- [ ] Create `prospects/stormvets/` docs.
- [ ] Add `lib/prospects/stormvets.ts`.
- [ ] Register StormVets in `lib/prospects/index.ts`.
- [ ] Update demo app docs.
- [ ] Draft outreach email and contact form version.
- [ ] Run build validation.
- [ ] Verify local and preview routes.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #29.

## Validation Plan

- Build passes.
- StormVets route and clean alias return HTTP 200.
- Mobile layout keeps CTA/form accessible.
- Copy avoids guaranteed leads, rankings, revenue, claim outcomes, or booked jobs.

## Risks

- Phone/contact information was not captured in Supabase; live review must confirm the best contact method.
- The page may have multiple service-area elements that should not be copied wholesale into the demo.
