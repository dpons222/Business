# Issue 28: Rivertop Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/28

## Objective

Plan a lightweight Rivertop Roofing prospect demo for the roofing landing page experiment.

The goal is to turn Rivertop's broad Plano roof inspection page into a sharper storm-specific inspection request path without overbuilding an unpaid custom demo.

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
issue-28-rivertop-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Rivertop Roofing |
| Prospect slug | `rivertop-roofing` |
| Website | https://www.rivertoproofing.com/plano-tx-roof-inspection |
| City / state | Plano, TX |
| Page reviewed | Plano roof inspection page |
| Priority | High |
| Status | `not_contacted` |
| Recommended CTA | Book Free Plano Roof Inspection |

## Observed Opportunity

The page covers storm inspection, real estate inspection, buyer/seller use cases, and insurance restoration before the CTA.

## Recommended Demo Direction

Create a storm-specific Plano inspection landing page using the existing reusable `RoofingLandingPage` pattern unless live review shows that an assessment/intake flow would be stronger.

Primary angle:

```text
Free Plano roof inspection after hail, wind, or storm damage.
```

## Scope

### In Scope

- Recheck Rivertop's live page for current copy, phone, proof, logo, and images.
- Create a prospect package if one does not already exist.
- Add Rivertop prospect data to the demo app.
- Register `/prospects/rivertop-roofing` and `/rivertop-roofing`.
- Update Supabase with final demo URL after deployment.
- Validate build and local/preview routes.

### Out Of Scope

- Separate app creation.
- Heavy custom design before prospect interest.
- Sending outreach without explicit approval.
- Guaranteed lead, ranking, revenue, or claim outcome language.

## Planning Checklist

- [x] GitHub Issue #28 created.
- [x] Implementation plan created in `plans/issue-28-rivertop-roofing.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-28-rivertop-roofing`.
- [ ] Recheck live Rivertop page.
- [ ] Create `prospects/rivertop-roofing/` docs.
- [ ] Add `lib/prospects/rivertop-roofing.ts`.
- [ ] Register Rivertop in `lib/prospects/index.ts`.
- [ ] Update demo app README and product README.
- [ ] Create/update outreach email with selected demo URL.
- [ ] Run `npm run build`.
- [ ] Verify local routes and existing prospect routes.
- [ ] Deploy preview if needed.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #28.

## Validation Plan

- Build passes.
- `/prospects/rivertop-roofing` returns HTTP 200.
- `/rivertop-roofing` returns HTTP 200 if the clean alias route supports it.
- Demo copy stays storm-inspection-specific and conservative.

## Risks

- Rivertop's existing page may already be strong enough that the demo needs a more nuanced conversion optimization angle.
- Public assets may need careful handling; do not reuse logos/images in a public client deliverable without approval.
