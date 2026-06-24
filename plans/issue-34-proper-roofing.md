# Issue 34: Proper Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/34

## Objective

Plan a lightweight Proper Roofing prospect demo for the roofing landing page experiment.

The goal is to turn Proper Roofing's broad Greater Houston storm restoration page into a shorter first-step inspection page for homeowners who are not ready to discuss a full restoration project.

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
issue-34-proper-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Proper Roofing |
| Prospect slug | `proper-roofing` |
| Website | https://properroof.com/storm-restoration-greater-houston/ |
| City / state | Greater Houston, TX |
| Page reviewed | Greater Houston storm restoration page |
| Contact | `(832) 554-7830` |
| Priority | Medium |
| Status | `not_contacted` |
| Recommended CTA | Get My Free Inspection Today |

## Observed Opportunity

The page covers a broad restoration journey and may be better suited to a dedicated storm-inspection lead page.

## Recommended Demo Direction

Use a first-step storm inspection landing page that frames the offer around documenting damage and scheduling a free inspection before a full restoration conversation.

Primary angle:

```text
Get a free Greater Houston storm inspection and documentation review.
```

## Scope

### In Scope

- Recheck Proper Roofing's live storm restoration page.
- Create a prospect package if needed.
- Add prospect data to the demo app.
- Register `/prospects/proper-roofing` and `/proper-roofing`.
- Draft outreach copy with cautious insurance/restoration language.
- Update Supabase with final demo URL.
- Validate build and routes.

### Out Of Scope

- Full restoration funnel build.
- Paid ads or campaign launch.
- Sending outreach without approval.
- Guaranteed lead, claim, ranking, revenue, or booked-job promises.

## Planning Checklist

- [x] GitHub Issue #34 created.
- [x] Implementation plan created in `plans/issue-34-proper-roofing.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-34-proper-roofing`.
- [ ] Recheck live Proper Roofing page.
- [ ] Create `prospects/proper-roofing/` docs.
- [ ] Add `lib/prospects/proper-roofing.ts`.
- [ ] Register Proper in `lib/prospects/index.ts`.
- [ ] Update README/navigation files.
- [ ] Draft outreach email and contact form version.
- [ ] Run build validation.
- [ ] Verify routes.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #34.

## Validation Plan

- Build passes.
- Proper Roofing routes return HTTP 200.
- Copy stays focused on first-step inspection and documentation.
- Existing prospect routes still render.

## Risks

- The source page covers broader restoration; the demo must keep the first outreach offer narrow and easy to understand.
