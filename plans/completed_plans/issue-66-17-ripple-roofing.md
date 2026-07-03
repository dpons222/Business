# Issue 66: Ripple Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Ripple Roofing prospect package for the roofing landing page experiment.

The goal is to turn a Waco location page into a focused storm damage emergency inspection page.

## Source

| Field | Value |
| --- | --- |
| Business | Ripple Roofing |
| Prospect slug | `ripple-roofing` |
| Website | https://rippleroofs.com/locations/waco |
| City / state | Waco, TX |
| Contact method | Website free inspection / emergency CTA |
| Page reviewed | Waco location page |
| Status | Not contacted |

## Observed Opportunity

The location page includes storm and emergency messaging but may be broader than a tight lead-capture page.

## Recommended Demo Direction

Create a Waco storm damage emergency inspection page that gives homeowners one clear path after damage.

Primary angle:

```text
Waco storm damage inspection page for homeowners needing emergency roofing help after severe weather.
```

## Implementation Checklist

- [x] Recheck live location page for contact details, emergency CTA, free inspection wording, logo, colors, and proof.
- [x] Create `prospects/ripple-roofing/` docs if moving forward.
- [x] Add `lib/prospects/ripple-roofing.ts`.
- [x] Register `/prospects/ripple-roofing` and `/ripple-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach approval false.

## Demo Content Requirements

- Waco-specific storm/emergency framing.
- 24/7 emergency wording only if verified.
- Free inspection CTA if verified.
- Damage signs, inspection includes, process, services, FAQs.

## Outreach Requirements

- Mention the location page has storm/emergency messaging and propose a tighter lead-capture version.
- Avoid alarmist language.
- Do not send without approval.

## Validation Plan

- [x] Build passes.
- [x] Local aliases return HTTP 200.
- [ ] Production aliases return HTTP 200 after deployment.
- [x] Supabase row remains unapproved.
- [x] Emergency claims are verified.

## Risks

- Emergency service language requires exact live verification.
- Waco page may be a template and need personalization restraint.
