# Issue 32: Integrity First Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/32

## Objective

Plan a lightweight Integrity First Roofing & Construction prospect demo for the roofing landing page experiment.

The goal is to create a compact campaign-style storm page that uses the already-strong proof and free inspection CTA more directly.

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
issue-32-integrity-first-roofing-construction
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Integrity First Roofing & Construction |
| Prospect slug | `integrity-first-roofing-construction` |
| Website | https://constructionwithintegrity.com/storm-damage-repair-frisco/ |
| City / state | Frisco / North Texas / Central Texas |
| Page reviewed | Frisco storm damage repair page |
| Contact | `(972) 836-9196` |
| Priority | Medium |
| Status | `not_contacted` |
| Recommended CTA | Schedule Your Free Roof Inspection |

## Observed Opportunity

The page is already strong, so the opportunity is a compact paid-traffic version with proof, storm services, and inspection flow.

## Recommended Demo Direction

Use a proof-first campaign landing page rather than a "fix your weak page" angle.

Primary angle:

```text
Compact storm-damage campaign page for Frisco homeowners after hail or wind.
```

## Scope

### In Scope

- Recheck live page and proof claims before implementation.
- Create a prospect package if needed.
- Add prospect data to the demo app.
- Register `/prospects/integrity-first-roofing-construction` and clean alias if supported.
- Update Supabase with final demo URL.
- Validate build and routes.

### Out Of Scope

- Criticizing the current site.
- Rebuilding the current strong page.
- Outreach without approval.
- Guaranteed lead or revenue claims.

## Planning Checklist

- [x] GitHub Issue #32 created.
- [x] Implementation plan created in `plans/issue-32-integrity-first-roofing-construction.md`.
- [ ] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [ ] Create/switch to branch `issue-32-integrity-first-roofing-construction`.
- [ ] Recheck live page and proof details.
- [ ] Create `prospects/integrity-first-roofing-construction/` docs.
- [ ] Add `lib/prospects/integrity-first-roofing-construction.ts`.
- [ ] Register prospect in `lib/prospects/index.ts`.
- [ ] Update README/navigation files.
- [ ] Draft outreach email and contact form version.
- [ ] Run build validation.
- [ ] Verify routes.
- [ ] Update Supabase `public.prospects`.
- [ ] Commit, push, open PR, and link Issue #32.

## Validation Plan

- Build passes.
- Integrity First routes return HTTP 200.
- Proof claims match the live page at time of implementation.
- Existing prospect routes still render.

## Risks

- Since the page is already strong, the pitch must be about campaign focus, not site weakness.
