# Issue 27: Final Cut Roofing Prospect Follow-Through

GitHub Issue: https://github.com/dpons222/Business/issues/27

## Objective

Plan the remaining Final Cut Roofing work so the existing prospect demo and outreach package can be reviewed, completed, and tracked without starting new implementation in this planning task.

Final Cut already has prospect docs and demo-app support, but it does not have its own implementation plan file. This plan defines the future follow-through work needed before outreach.

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
issue-27-final-cut-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Final Cut Roofing |
| Prospect slug | `final-cut-roofing` |
| Website | https://finalcutroofing.com/free-roof-inspection/ |
| City / state | Frisco / DFW, TX |
| Page reviewed | Free roof inspection page |
| Priority | High |
| Status | `not_contacted` |
| Recommended CTA | Schedule Free Roof Inspection |

## Observed Opportunity

The form asks storm visitors to make several choices before submitting, including emergency status, referral source, full address, story count, service interests, details, and CAPTCHA.

## Recommended Demo Direction

Use a focused proof-first inspection landing page that keeps the existing Final Cut demo direction but verifies the route, copy, deployed URL, and outreach package before sending anything.

This should be a review/finalization task, not a rebuild from scratch.

## Scope

### In Scope

- Recheck the live Final Cut page before outreach.
- Verify the existing Final Cut demo route and clean alias.
- Confirm the current demo URL to use in outreach.
- Review the prospect package for consistency with current demo copy.
- Update Supabase `public.prospects` with the final demo URL if needed.
- Update tracker docs if outreach status or route changes.
- Validate build and local preview.

### Out Of Scope

- Rebuilding the Final Cut demo from scratch.
- Sending outreach without explicit approval.
- Paid ads, campaign launch, or guaranteed lead claims.

## Planning Checklist

- [x] GitHub Issue #27 created.
- [x] Implementation plan created in `plans/issue-27-final-cut-roofing.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-27-final-cut-roofing`.
- [ ] Recheck Final Cut public page and note any changes.
- [ ] Audit existing `prospects/final-cut-roofing/` docs.
- [ ] Verify existing demo-app data and routes.
- [ ] Decide whether any light copy/data adjustment is needed.
- [ ] Run `npm run build` in the demo app.
- [ ] Verify `/prospects/final-cut-roofing` and `/final-cut-roofing`.
- [ ] Update outreach email with final URL.
- [ ] Update Supabase `public.prospects` with demo URL and notes.
- [ ] Commit, push, open PR, and link Issue #27.

## Validation Plan

- Build passes.
- Final Cut route and clean alias return HTTP 200.
- Existing Charger and LOA routes still render.
- Outreach copy avoids guaranteed leads, rankings, revenue, insurance claim outcomes, or booked jobs.

## Risks

- Existing Final Cut demo may be stale compared with the live public page.
- Demo URL may need production promotion before outreach.
