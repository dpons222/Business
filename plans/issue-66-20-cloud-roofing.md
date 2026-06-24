# Issue 66: Cloud Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Cloud Roofing prospect package for the roofing landing page experiment.

The goal is to turn an emergency roof repair page into a storm/emergency inspection page with a clearer first-step request path.

## Source

| Field | Value |
| --- | --- |
| Business | Cloud Roofing |
| Prospect slug | `cloud-roofing` |
| Website | https://www.cloudroofing.com/emergency-roof-repair |
| City / state | San Antonio, TX |
| Contact method | Call 210-864-9221 / free quote CTA |
| Page reviewed | Emergency roof repair page |
| Status | Not contacted |

## Observed Opportunity

The emergency repair page has free quote language but may not be framed around storm inspection lead capture.

## Recommended Demo Direction

Create a San Antonio storm/emergency inspection page that separates urgent repair traffic from general quote requests.

Primary angle:

```text
San Antonio emergency storm inspection page for homeowners deciding whether roof repair is needed after damage.
```

## Implementation Checklist

- [ ] Recheck live page for phone, free quote CTA, logo, colors, emergency repair wording, and inspection language.
- [ ] Create `prospects/cloud-roofing/` docs if moving forward.
- [ ] Add `lib/prospects/cloud-roofing.ts`.
- [ ] Register `/prospects/cloud-roofing` and `/cloud-roofing`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase row after live verification.
- [ ] Keep outreach unapproved.

## Demo Content Requirements

- San Antonio storm/emergency framing.
- Free quote or inspection wording only if verified.
- Damage signs, inspection includes, process, services, FAQs.
- Careful urgency language with no fear-based exaggeration.

## Outreach Requirements

- Mention the emergency repair page and the opportunity to separate inspection-first visitors from general quote requests.
- Keep the message short and specific.
- Do not send until Diego approves exact draft, recipient, and URL.

## Validation Plan

- [ ] Build passes.
- [ ] Local and production routes return HTTP 200.
- [ ] Supabase row contains stable URL and remains unapproved.
- [ ] Copy avoids guaranteed repair, response-time, insurance, or revenue claims.

## Risks

- Emergency claims require exact live verification.
- Page may not use inspection wording, in which case demo should be framed as quote-to-inspection clarification.
