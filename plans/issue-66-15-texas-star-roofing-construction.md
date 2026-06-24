# Issue 66: Texas Star Roofing & Construction Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Texas Star Roofing & Construction prospect package for the roofing landing page experiment.

The goal is to separate storm wear and emergency roof inspection traffic from broad homepage service messaging.

## Source

| Field | Value |
| --- | --- |
| Business | Texas Star Roofing & Construction |
| Prospect slug | `texas-star-roofing-construction` |
| Website | https://tsrcinc.com/ |
| City / state | San Antonio, TX |
| Contact method | Website roof inspection / emergency repair CTA |
| Page reviewed | Homepage |
| Status | Not contacted |

## Observed Opportunity

The homepage covers multiple services; storm inspection and emergency repair may need separate campaign pages.

## Recommended Demo Direction

Create a San Antonio storm wear or emergency inspection page with a clear roof inspection CTA.

Primary angle:

```text
San Antonio emergency storm inspection page for homeowners seeing roof wear or damage after severe weather.
```

## Implementation Checklist

- [ ] Recheck homepage for phone, CTA, logo, colors, storm wear wording, emergency repair language, and free inspection details.
- [ ] Create `prospects/texas-star-roofing-construction/` docs if moving forward.
- [ ] Add `lib/prospects/texas-star-roofing-construction.ts`.
- [ ] Register `/prospects/texas-star-roofing-construction` and `/texas-star-roofing-construction`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase row after live verification.
- [ ] Keep outreach unapproved.

## Demo Content Requirements

- San Antonio-specific storm inspection framing.
- Emergency wording only if verified.
- Damage signs, inspection includes, process, services, FAQs.
- Conservative urgency language that does not overstate risk.

## Outreach Requirements

- Mention broad homepage service coverage and propose a dedicated storm/emergency inspection page.
- Avoid sounding alarmist.
- Do not send without Diego approval.

## Validation Plan

- [ ] Build passes.
- [ ] Routes return HTTP 200 locally and in production.
- [ ] Supabase remains unapproved.
- [ ] Emergency and inspection claims are verified.

## Risks

- Emergency wording must be accurate and measured.
- Homepage may need deeper live review to find the strongest proof.
