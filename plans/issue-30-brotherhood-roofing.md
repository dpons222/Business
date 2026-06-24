# Issue 30: Brotherhood Roofing Prospect Demo

GitHub Issue: https://github.com/dpons222/Business/issues/30

## Objective

Plan a lightweight Brotherhood Roofing prospect demo for the roofing landing page experiment.

The goal is to condense the existing hail and storm damage content into a focused DFW inspection page with proof and CTA closer together.

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
issue-30-brotherhood-roofing
```

## Supabase Prospect Source

| Field | Value |
| --- | --- |
| Business | Brotherhood Roofing |
| Prospect slug | `brotherhood-roofing` |
| Website | https://brotherhoodroofing.com/services/hail-and-storm-damage/ |
| City / state | Dallas / Frisco / DFW, TX |
| Page reviewed | Hail and storm damage page |
| Contact | `972-742-5332`, `info@brotherhoodroofing.com` |
| Priority | Medium-High |
| Status | `not_contacted` |
| Recommended CTA | Schedule Free Inspection |

## Observed Opportunity

The page is highly educational and long; the inspection CTA and trust proof are separated by a lot of reading.

## Recommended Demo Direction

Use a compact educational-to-action landing page that preserves Brotherhood's helpful storm content but leads with scheduling.

Primary angle:

```text
DFW hail and storm damage assessment page with faster free-inspection path.
```

## Scope

### In Scope

- Recheck Brotherhood's live page and contact details.
- Create a prospect package if needed.
- Add Brotherhood prospect data to the demo app.
- Register `/prospects/brotherhood-roofing` and `/brotherhood-roofing`.
- Update outreach copy with email/contact form options.
- Update Supabase with final demo URL.
- Validate build and routes.

### Out Of Scope

- Full website redesign.
- Copying extensive educational content into the demo.
- Sending outreach without approval.
- Guaranteed lead or claim outcome language.

## Planning Checklist

- [x] GitHub Issue #30 created.
- [x] Implementation plan created in `plans/issue-30-brotherhood-roofing.md`.
- [x] Post session-start comment when implementation begins.

## Future Implementation Checklist

- [x] Create/switch to branch `issue-30-brotherhood-roofing`.
- [x] Recheck live Brotherhood page.
- [x] Create `prospects/brotherhood-roofing/` docs.
- [x] Add `lib/prospects/brotherhood-roofing.ts`.
- [x] Register Brotherhood in `lib/prospects/index.ts`.
- [x] Update app/product README files.
- [x] Draft outreach email and contact form version.
- [x] Run build validation.
- [x] Verify local and preview routes.
- [x] Update Supabase `public.prospects`.
- [x] Commit, push, open PR, and link Issue #30.

## Validation Plan

- [x] Build passes with `npm run build`.
- [x] `/prospects/brotherhood-roofing` returns HTTP 200 locally.
- [x] `/brotherhood-roofing` returns HTTP 200 locally.
- [x] Existing prospect routes still return HTTP 200 locally.
- [x] Preview `/prospects/brotherhood-roofing` returns HTTP 200.
- [x] Preview `/brotherhood-roofing` returns HTTP 200.
- [x] Supabase `public.prospects` has the Brotherhood preview URL while status remains `not_contacted`.
- [x] Outreach copy stays respectful and specific.

## Preview URL

```text
https://roof-check-preview-6m7uadf9j-dpons222-9388s-projects.vercel.app/brotherhood-roofing
```

## Risks

- The page may contain detailed claims-related education; copy must stay cautious and not imply insurance outcomes.
