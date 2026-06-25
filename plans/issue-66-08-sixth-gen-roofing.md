# Issue 66: Sixth Gen Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Sixth Gen Roofing prospect package for the roofing landing page experiment.

The goal is to turn a broad Austin roofing companies page into a dedicated hail and wind inspection page.

## Source

| Field | Value |
| --- | --- |
| Business | Sixth Gen Roofing |
| Prospect slug | `sixth-gen-roofing` |
| Website | https://sixthgenroofing.com/austin-roofing-companies/ |
| City / state | Austin, TX |
| Contact method | Call 512-645-2416 / online scheduling |
| Page reviewed | Austin roofing companies page |
| Status | Not contacted |

## Observed Opportunity

The page is broad and educational; the free inspection CTA may compete with general roofing content.

## Recommended Demo Direction

Create an Austin hail/wind inspection page that uses evidence-based inspection language and HAAG-certified inspector proof only if confirmed live.

Primary angle:

```text
Austin hail and wind inspection page that makes the free evidence-based inspection CTA clearer.
```

## Implementation Checklist

- [x] Recheck live page for phone, scheduling path, proof, logo, colors, and HAAG language.
- [x] Create `prospects/sixth-gen-roofing/` docs if moving forward.
- [x] Add `lib/prospects/sixth-gen-roofing.ts`.
- [x] Register `/prospects/sixth-gen-roofing` and `/sixth-gen-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach approval false.

## Demo Content Requirements

- Austin-specific storm inspection framing.
- Free evidence-based inspection language only if verified.
- Damage signs, inspection includes, process, services, and FAQs.
- Brand-matched palette from live site/logo.

## Outreach Requirements

- Mention broad educational page and opportunity for a dedicated post-storm inspection page.
- Keep message focused on the existing free inspection CTA.
- Do not send without Diego approval.

## Validation Plan

- [x] Build passes.
- [x] Local aliases return HTTP 200.
- [ ] Production aliases return HTTP 200 after deployment.
- [x] Supabase row contains stable URL target and remains unapproved.
- [x] Copy avoids certification overclaims.

## Risks

- Certification or proof language must be verified.
- Page may be competitor-style content rather than service-page content.
