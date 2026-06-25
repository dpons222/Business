# Issue 66: Invictus Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Invictus Roofing prospect package for the roofing landing page experiment.

The goal is to turn a Frisco service-area page into a storm-damage inspection landing page that uses review proof and a simpler request path.

## Source

| Field | Value |
| --- | --- |
| Business | Invictus Roofing |
| Prospect slug | `invictus-roofing` |
| Website | https://www.invictusroofing.com/service-areas/frisco/ |
| City / state | Frisco, TX |
| Contact method | Call 469-649-0288 / free inspection CTA |
| Reviews | Reviews referenced on page |
| Page reviewed | Frisco service-area page |
| Status | Not contacted |

## Observed Opportunity

The service-area page includes free inspection but may be generic for all roofing services.

## Recommended Demo Direction

Create a Frisco storm-damage inspection page that highlights review proof and simplifies the free inspection path.

Primary angle:

```text
Frisco storm damage inspection page that makes the free roof inspection request easier for storm visitors.
```

## Implementation Checklist

- [x] Recheck live page for phone, CTA, reviews, logo, colors, and storm language.
- [x] Create `prospects/invictus-roofing/` docs if moving forward.
- [x] Add `lib/prospects/invictus-roofing.ts`.
- [x] Register `/prospects/invictus-roofing` and `/invictus-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach unapproved.

## Demo Content Requirements

- Frisco-specific storm inspection framing.
- Review proof only if verified live.
- Free roof inspection CTA.
- Damage signs, inspection includes, process, services, FAQs.

## Outreach Requirements

- Mention the service-area page and free inspection CTA.
- Suggest a more focused Frisco storm-damage version.
- No send without checklist and approval.

## Validation Plan

- [x] Build passes.
- [x] Local routes return HTTP 200.
- [ ] Production routes return HTTP 200 after deployment.
- [x] Supabase row has stable URL and remains unapproved.
- [x] Reviews are not overstated.

## Risks

- Reviews are referenced but not quantified in the backlog.
- Service page may already be optimized enough that pitch should be campaign-specific.
