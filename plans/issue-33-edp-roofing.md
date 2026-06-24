# Issue 33: EDP Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/33

## Objective

Plan a lightweight EDP Roofing prospect demo for the roofing landing page experiment.

The goal is to simplify a dense Dallas storm damage page into an inspection-first path with one clear CTA.

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
issue-33-edp-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | EDP Roofing |
| Prospect slug | `edp-roofing` |
| Website | https://edproofing.com/storm-damage-roof-repair-dallas/ |
| City / state | Dallas / DFW, TX |
| Page reviewed | Dallas storm damage roof repair page |
| Contact | `(972) 274-5277` |
| Priority | Medium |
| Status | `not_contacted` |
| Recommended CTA | Talk To A Roofer |

## Observed Opportunity

The page has several competing CTAs and a lot of dense service content.

## Recommended Demo Direction

Use a simplified inspection-first landing page that keeps proof badges and emergency/storm relevance but removes competing actions.

Primary angle:

```text
Talk to a Dallas roofer after hail, leak, or storm damage.
```

## Scope

### In Scope

- Recheck EDP's live storm page and contact path.
- Create a prospect package if needed.
- Add prospect data to the demo app.
- Register `/prospects/edp-roofing` and `/edp-roofing`.
- Draft outreach copy with cautious insurance wording.
- Update Supabase with final demo URL.
- Validate build and routes.

### Out Of Scope

- Reusing aggressive insurance wording.
- Full redesign.
- Sending outreach without approval.
- Guaranteed claim, lead, ranking, revenue, or booked-job promises.

## Planning Checklist

- [x] GitHub Issue #33 created.
- [x] Implementation plan created in `plans/issue-33-edp-roofing.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-33-edp-roofing`.
- [ ] Recheck live EDP page.
- [ ] Create `prospects/edp-roofing/` docs.
- [ ] Add `lib/prospects/edp-roofing.ts`.
- [ ] Register EDP in `lib/prospects/index.ts`.
- [ ] Update README/navigation files.
- [ ] Draft outreach email and contact form version.
- [ ] Run build validation.
- [ ] Verify routes.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #33.

## Validation Plan

- Build passes.
- EDP routes return HTTP 200.
- CTA hierarchy is simple and not crowded.
- Existing prospect routes still render.

## Risks

- Insurance-related copy needs extra care; keep claims conservative and avoid implying outcomes.
