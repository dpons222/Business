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
- Register the prospect with a clean public route.
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
- [x] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [x] Create/switch to branch `issue-32-integrity-first-roofing-construction`.
- [x] Recheck live page and proof details.
- [x] Create `prospects/integrity-first-roofing-construction/` docs.
- [x] Add `lib/prospects/integrity-first-roofing-construction.ts`.
- [x] Register prospect in `lib/prospects/index.ts`.
- [x] Update README/navigation files.
- [x] Draft outreach email and contact form version.
- [x] Run build validation.
- [x] Verify routes.
- [x] Update Supabase `public.prospects`.
- [x] Commit, push, open PR, and link Issue #32.

## Validation Plan

- [x] Build passes with `npm run build`.
- [x] `/prospects/integrity-first` returns HTTP 200 locally.
- [x] `/integrity-first` returns HTTP 200 locally.
- [x] Existing prospect routes still return HTTP 200 locally.
- [x] Proof claims match the live page at time of implementation.
- [x] Production `/prospects/integrity-first` returns HTTP 200.
- [x] Production `/integrity-first` returns HTTP 200.
- [x] Existing production Final Cut, Charger, and LOA routes still return HTTP 200.
- [x] Supabase `public.prospects` has the Integrity First production URL while status remains `not_contacted`.

## Deployment URL

```text
https://roof-check-preview.vercel.app/integrity-first
```

The Vercel preview deployment returned HTTP 401, so this prospect uses the public production URL and a shorter public slug: `integrity-first`.

## Risks

- Since the page is already strong, the pitch must be about campaign focus, not site weakness.
