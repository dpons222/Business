# Issue 66: Elevated Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Elevated Roofing prospect package for the roofing landing page experiment.

The goal is to turn a Fort Worth service-area page with a free assessment offer into a dedicated storm inspection landing page.

## Source

| Field | Value |
| --- | --- |
| Business | Elevated Roofing |
| Prospect slug | `elevated-roofing` |
| Website | https://elevatedroofing.com/service-areas/fort-worth/ |
| City / state | Fort Worth, TX |
| Contact method | Website contact / inspection CTA |
| Page reviewed | Fort Worth service-area page |
| Status | Not contacted |

## Observed Opportunity

The service-area page includes free assessment language but may not isolate storm damage or inspection traffic.

## Recommended Demo Direction

Create a Fort Worth storm inspection page centered on a free no-obligation assessment and photo/report proof if verified live.

Primary angle:

```text
Fort Worth storm inspection page for homeowners who need a free assessment after hail or wind.
```

## Implementation Checklist

- [ ] Recheck page, phone, form, logo, colors, proof, and assessment wording.
- [ ] Create `prospects/elevated-roofing/` docs if moving forward.
- [ ] Add `lib/prospects/elevated-roofing.ts`.
- [ ] Register `/prospects/elevated-roofing` and `/elevated-roofing`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase row after live verification.
- [ ] Keep outreach unapproved.

## Demo Content Requirements

- Fort Worth service-area framing.
- Free assessment and photo-report language only if verified.
- Damage signs, inspection includes, process, services, and FAQs.
- Brand-matched design based on live logo/site colors.

## Outreach Requirements

- Mention the free assessment already exists but could be isolated for storm visitors.
- Position the demo as a focused campaign page.
- No send without Diego approval.

## Validation Plan

- [ ] Build passes.
- [ ] Local and production aliases return HTTP 200.
- [ ] Supabase status remains not approved.
- [ ] Outreach copy avoids guaranteed outcomes.

## Risks

- Live proof details need confirmation.
- Service-area page may not provide enough unique storm proof without additional live review.
