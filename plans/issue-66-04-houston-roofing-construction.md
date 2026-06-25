# Issue 66: Houston Roofing & Construction Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Houston Roofing & Construction prospect package for the roofing landing page experiment.

The goal is to adapt a general free roof inspection page into a storm-specific inspection page for severe-weather traffic.

## Source

| Field | Value |
| --- | --- |
| Business | Houston Roofing & Construction |
| Prospect slug | `houston-roofing-construction` |
| Website | https://houstonroofingonline.com/residential-roofing/free-roof-inspection/ |
| City / state | Houston, TX |
| Contact method | Website contact / call |
| Page reviewed | Free roof inspection page |
| Status | Not contacted |

## Observed Opportunity

The inspection page is relevant but may be framed as general inspection rather than storm-specific lead capture.

## Recommended Demo Direction

Create a Houston storm-damage inspection page that keeps the free inspection offer but narrows the context to hail, wind, and severe-weather concerns.

Primary angle:

```text
Houston storm inspection page for homeowners who need a no-cost first look after hail, wind, or heavy weather.
```

## Implementation Checklist

- [x] Recheck live page for current contact method, phone, logo, colors, and inspection language.
- [x] Create `prospects/houston-roofing-construction/` docs if moving forward.
- [x] Add `lib/prospects/houston-roofing-construction.ts`.
- [x] Register `/prospects/houston-roofing-construction` and `/houston-roofing-construction`.
- [x] Draft outreach email and contact-form version.
- [x] Add or update Supabase with verified details.
- [x] Keep status unapproved until Diego review.

## Demo Content Requirements

- Houston-specific storm framing.
- Free inspection wording only if still present.
- Damage signs, inspection includes, process, services, and FAQs.
- Clear phone/form CTA.
- Conservative storm and insurance language.

## Outreach Requirements

- Mention the general inspection page and propose a storm-specific version.
- Keep the value proposition focused on clarity for severe-weather visitors.
- Do not send without checklist and approval.

## Validation Plan

- [x] Build passes.
- [x] Local routes return HTTP 200.
- [ ] Production routes return HTTP 200 after deployment.
- [x] Stable demo URL is used in drafts and Supabase.
- [x] Supabase remains unapproved before send.

## Risks

- Contact details were not captured in the backlog.
- Page content may already be strong enough that outreach should frame this as a campaign variant.
