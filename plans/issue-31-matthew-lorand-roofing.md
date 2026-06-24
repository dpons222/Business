# Issue 31: Matthew Lorand Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/31

## Objective

Plan a lightweight Matthew Lorand Roofing prospect demo for the roofing landing page experiment.

The goal is to make the Austin storm damage page easier to act on by focusing the visitor on one free storm damage inspection request.

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
issue-31-matthew-lorand-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Matthew Lorand Roofing |
| Prospect slug | `matthew-lorand-roofing` |
| Website | https://matthewlorandroofing.com/storm-damage-roof-repair-austin/ |
| City / state | Austin, TX |
| Page reviewed | Austin storm damage roof repair page |
| Contact | `(512) 808-0403` |
| Priority | Medium-High |
| Status | `not_contacted` |
| Recommended CTA | Book Complimentary Storm Damage Inspection |

## Observed Opportunity

The page is very long and covers many related ideas before pushing one inspection request CTA.

## Recommended Demo Direction

Use a tighter Austin storm damage inspection landing page that reduces cognitive load and makes the next step clear.

Primary angle:

```text
Book a complimentary Austin storm damage inspection after hail, wind, leaks, or fallen branches.
```

## Scope

### In Scope

- Recheck the live Matthew Lorand page before implementation.
- Create a prospect package if needed.
- Add prospect data to the demo app.
- Register `/prospects/matthew-lorand-roofing` and `/matthew-lorand-roofing`.
- Draft/update outreach copy.
- Update Supabase with final demo URL.
- Validate build and routes.

### Out Of Scope

- Full custom website rebuild.
- Broad insurance or hurricane-season educational rewrite.
- Outreach send without approval.
- Guaranteed outcomes.

## Planning Checklist

- [x] GitHub Issue #31 created.
- [x] Implementation plan created in `plans/issue-31-matthew-lorand-roofing.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-31-matthew-lorand-roofing`.
- [ ] Recheck live page and contact path.
- [ ] Create `prospects/matthew-lorand-roofing/` docs.
- [ ] Add `lib/prospects/matthew-lorand-roofing.ts`.
- [ ] Register prospect in `lib/prospects/index.ts`.
- [ ] Update README/navigation files.
- [ ] Draft outreach email and contact form version.
- [ ] Run build validation.
- [ ] Verify local and preview routes.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #31.

## Validation Plan

- Build passes.
- Matthew Lorand routes return HTTP 200.
- Mobile copy and CTA are readable.
- Existing prospect routes still render.

## Risks

- The source page covers many topics; the demo must stay narrow and not over-explain storm/insurance content.
