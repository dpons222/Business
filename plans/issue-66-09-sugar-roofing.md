# Issue 66: Sugar Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Sugar Roofing prospect package for the roofing landing page experiment.

The goal is to turn a Houston service-area page with several offers into a clearer storm inspection request page.

## Source

| Field | Value |
| --- | --- |
| Business | Sugar Roofing |
| Prospect slug | `sugar-roofing` |
| Website | https://www.sugarroofs.com/service-areas/houston-tx |
| City / state | Houston, TX |
| Contact method | Website estimator / inspection CTA |
| Page reviewed | Houston service-area page |
| Status | Not contacted |

## Observed Opportunity

The service page has multiple offers including financing and estimator language; storm inspection CTA may need sharper focus.

## Recommended Demo Direction

Create a Houston storm damage inspection page that separates urgent inspection requests from estimator, financing, and broad service content.

Primary angle:

```text
Houston storm damage inspection page with one clear first-step request path.
```

## Implementation Checklist

- [x] Recheck live page for contact path, estimator, phone, logo, colors, storm wording, and financing claims.
- [x] Create `prospects/sugar-roofing/` docs if moving forward.
- [x] Add `lib/prospects/sugar-roofing.ts`.
- [x] Register `/prospects/sugar-roofing` and `/sugar-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach unapproved.

## Demo Content Requirements

- Houston storm inspection framing.
- Separate inspection CTA from financing/estimator language.
- Damage signs, inspection includes, process, services, and FAQs.
- Careful insurance language.

## Outreach Requirements

- Mention the page has several offers and propose a sharper storm inspection version.
- Do not criticize the existing page.
- No send without approval.

## Validation Plan

- [x] Build passes.
- [x] Local routes return HTTP 200.
- [ ] Production routes return HTTP 200 after deployment.
- [x] Supabase row remains unapproved.
- [x] Copy does not overstate financing, insurance, or pricing.

## Risks

- Multiple offers may dilute the outreach angle if not framed carefully.
- Financing copy should be omitted unless confirmed and necessary.
