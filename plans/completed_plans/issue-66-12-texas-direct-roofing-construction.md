# Issue 66: Texas Direct Roofing & Construction Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Texas Direct Roofing & Construction prospect package for the roofing landing page experiment.

The goal is to turn broad homepage messaging into a DFW storm damage inspection landing page.

## Source

| Field | Value |
| --- | --- |
| Business | Texas Direct Roofing & Construction |
| Prospect slug | `texas-direct-roofing-construction` |
| Website | https://txdroofing.com/ |
| City / state | Dallas-Fort Worth, TX |
| Contact method | Website contact / call |
| Page reviewed | Homepage |
| Status | Not contacted |

## Observed Opportunity

The homepage is broad; storm damage messaging may not be a single-service landing path.

## Recommended Demo Direction

Create a DFW storm damage inspection page using verified inspection, repair, replacement, and insurance-claims experience as proof.

Primary angle:

```text
DFW storm damage inspection page that gives homeowners one clear next step after hail or wind.
```

## Implementation Checklist

- [x] Recheck homepage for contact details, logo, colors, storm damage language, inspection wording, and claims experience.
- [x] Create `prospects/texas-direct-roofing-construction/` docs if moving forward.
- [x] Add `lib/prospects/texas-direct-roofing-construction.ts`.
- [x] Register `/prospects/texas-direct-roofing-construction` and `/texas-direct-roofing-construction`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach approval false.

## Demo Content Requirements

- DFW storm damage inspection framing.
- Claims/support language only if verified and conservative.
- Damage signs, inspection includes, process, services, and FAQs.
- Brand-matched colors.

## Outreach Requirements

- Mention broad homepage message and propose a dedicated storm damage page.
- Frame this as a focused campaign page, not a replacement site.
- No send without Diego approval.

## Validation Plan

- [x] Build passes.
- [x] Local routes return HTTP 200.
- [ ] Production routes return HTTP 200 after deployment.
- [x] Supabase row remains unapproved.
- [x] Copy avoids insurance outcome guarantees.

## Risks

- Homepage may not provide enough specific storm proof.
- Legal language around claims must stay conservative.
