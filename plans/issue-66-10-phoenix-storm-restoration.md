# Issue 66: Phoenix Storm Restoration Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Phoenix Storm Restoration prospect package for the roofing landing page experiment.

The goal is to turn a Fort Worth location/service-area page into a tighter emergency storm inspection page.

## Source

| Field | Value |
| --- | --- |
| Business | Phoenix Storm Restoration |
| Prospect slug | `phoenix-storm-restoration` |
| Website | https://www.phoenixstormgroup.com/service-areas/tarrant-county/fort-worth |
| City / state | Fort Worth, TX |
| Contact method | Call (945) 308-0425 / schedule inspection CTA |
| Reviews | BBB Accredited noted |
| Page reviewed | Fort Worth service-area page |
| Status | Not contacted |

## Observed Opportunity

The page has strong emergency and storm positioning, but it may be a location template rather than a focused campaign landing page.

## Recommended Demo Direction

Create a Fort Worth emergency storm inspection page that moves 24/7 response, storm repair, and free inspection language into one conversion path.

Primary angle:

```text
Fort Worth emergency storm inspection page for homeowners who need help after severe weather.
```

## Implementation Checklist

- [x] Recheck live page for phone, CTA, BBB proof, 24/7 language, logo, colors, and service claims.
- [x] Create `prospects/phoenix-storm-restoration/` docs.
- [x] Add `lib/prospects/phoenix-storm-restoration.ts`.
- [x] Register `/prospects/phoenix-storm-restoration` and `/phoenix-storm-restoration`.
- [x] Draft email and contact-form outreach.
- [x] Add Supabase row after live verification.
- [x] Keep outreach `not_ready` and unapproved until production deployment is verified.

## Demo Content Requirements

- Fort Worth / Tarrant County framing.
- Emergency response language only if verified.
- Free inspection CTA if verified.
- Storm signs, inspection includes, process, services, FAQs.
- BBB proof only if still visible.

## Outreach Requirements

- Mention strong existing emergency/storm positioning and the opportunity for a tighter campaign page.
- Avoid claiming their current page is weak.
- Do not send until approved.

## Validation Plan

- [x] Build passes.
- [x] Routes return HTTP 200 locally.
- [ ] Routes return HTTP 200 in production after deployment.
- [x] Supabase row remains unapproved.
- [x] Emergency claims and BBB proof are verified.

## Risks

- Emergency wording can sound aggressive if overused.
- Location template content may need careful condensation.
