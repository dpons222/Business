# Issue 66: TSG Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight TSG Roofing prospect package for the roofing landing page experiment.

The goal is to separate storm damage inspection requests from broader roof repair, restoration, and insurance-assistance content.

## Source

| Field | Value |
| --- | --- |
| Business | TSG Roofing |
| Prospect slug | `tsg-roofing` |
| Website | https://tsgroofing.com/roof-repairs-and-restoration/ |
| City / state | Texas |
| Contact method | Book appointment CTA |
| Page reviewed | Roof repairs and restoration page |
| Status | Not contacted |

## Observed Opportunity

Storm damage content exists, but the reviewed page may combine repair, restoration, and insurance assistance into one broad path.

## Recommended Demo Direction

Create a single-purpose storm damage inspection page that helps homeowners book an inspection before choosing repair or restoration next steps.

Primary angle:

```text
Texas storm damage inspection page that separates first-step assessment from broader restoration content.
```

## Implementation Checklist

- [ ] Recheck the live page for current services, CTA, contact path, logo, colors, and storm language.
- [ ] Confirm the most specific service area before writing localized copy.
- [ ] Create `prospects/tsg-roofing/` docs if moving forward.
- [ ] Add `lib/prospects/tsg-roofing.ts`.
- [ ] Register `/prospects/tsg-roofing` and `/tsg-roofing`.
- [ ] Draft email and contact-form outreach.
- [ ] Add or update Supabase only after live recheck.
- [ ] Keep automation fields unapproved until Diego review.

## Demo Content Requirements

- Location wording that does not overstate service area if the live page is broad.
- Clear inspection-first CTA.
- Storm signs, inspection includes, process, services, and FAQs.
- Careful insurance wording focused on documentation and next-step guidance.

## Outreach Requirements

- Mention that the page has storm damage content but combines several related decisions.
- Pitch a focused inspection page, not a full website redesign.
- Do not send without pre-send checklist completion and Diego approval.

## Validation Plan

- [ ] `npm run build` passes.
- [ ] Local `/prospects/tsg-roofing` returns HTTP 200.
- [ ] Local `/tsg-roofing` returns HTTP 200.
- [ ] Production stable aliases return HTTP 200 after deploy.
- [ ] Supabase status remains `not_contacted` until outreach is actually sent.

## Risks

- Service area may be too broad without live confirmation.
- Insurance-related copy must stay conservative.
