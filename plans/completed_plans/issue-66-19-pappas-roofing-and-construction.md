# Issue 66: Pappas Roofing And Construction Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Pappas Roofing and Construction prospect package for the roofing landing page experiment.

The goal is to turn homepage inspection messaging into a dedicated Plano storm inspection page.

## Source

| Field | Value |
| --- | --- |
| Business | Pappas Roofing and Construction |
| Prospect slug | `pappas-roofing-and-construction` |
| Website | https://www.pappasroofingandconstruction.com/ |
| City / state | Plano, TX |
| Contact method | Call 972-806-9791 / schedule CTA |
| Page reviewed | Homepage |
| Status | Not contacted |

## Observed Opportunity

The homepage has an inspection CTA, but it needs live review for a dedicated storm/hail path and trust proof placement.

## Recommended Demo Direction

Create a Plano storm inspection page focused on calls and scheduled inspections after hail or wind.

Primary angle:

```text
Plano storm inspection page that turns homepage inspection interest into a scheduled roof check.
```

## Implementation Checklist

- [x] Recheck live homepage for phone, schedule path, logo, colors, inspection CTA, and storm/hail proof.
- [x] Create `prospects/pappas-roofing-and-construction/` docs if moving forward.
- [x] Add `lib/prospects/pappas-roofing-and-construction.ts`.
- [x] Register `/prospects/pappas-roofing-and-construction` and `/pappas-roofing-and-construction`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after live verification.
- [x] Keep outreach approval false.

## Demo Content Requirements

- Plano-specific storm inspection framing.
- Schedule inspection CTA.
- Damage signs, inspection includes, process, services, FAQs.
- Brand-matched colors and logo.

## Outreach Requirements

- Mention the homepage inspection CTA and propose a dedicated storm/hail path.
- Keep it framed as a focused page test.
- No send without Diego approval.

## Validation Plan

- [x] Build passes.
- [x] Local aliases return HTTP 200.
- [ ] Production aliases return HTTP 200 after deployment.
- [x] Supabase row remains unapproved.
- [x] Copy does not invent trust proof.

## Risks

- Homepage may not contain enough storm-specific language.
- Contact form path must be verified before drafting.
