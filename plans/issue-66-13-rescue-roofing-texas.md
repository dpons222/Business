# Issue 66: Rescue Roofing Texas Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Rescue Roofing Texas prospect package for the roofing landing page experiment.

The goal is to turn a Dallas County location page into a narrower storm-damage inspection page.

## Source

| Field | Value |
| --- | --- |
| Business | Rescue Roofing Texas |
| Prospect slug | `rescue-roofing-texas` |
| Website | https://rescueroofingtexas.com/roofing-contractor-in-dallas-county-texas/ |
| City / state | Dallas County / DFW, TX |
| Contact method | Website contact / free inspection CTA |
| Page reviewed | Dallas County roofing contractor page |
| Status | Not contacted |

## Observed Opportunity

The location page mentions many services; it could use a narrower storm inspection conversion page.

## Recommended Demo Direction

Create a Dallas County storm-damage inspection page with one request-inspection CTA.

Primary angle:

```text
Dallas County storm damage inspection page focused on free roof checks after storm, tornado, or hail damage.
```

## Implementation Checklist

- [ ] Recheck live page for phone, form, logo, colors, free inspection language, and storm/tornado/hail claims.
- [ ] Create `prospects/rescue-roofing-texas/` docs if moving forward.
- [ ] Add `lib/prospects/rescue-roofing-texas.ts`.
- [ ] Register `/prospects/rescue-roofing-texas` and `/rescue-roofing-texas`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase row after live verification.
- [ ] Keep outreach unapproved.

## Demo Content Requirements

- Dallas County / DFW framing.
- Storm, tornado, and hail wording only if verified.
- Free inspection CTA if verified.
- Damage signs, inspection includes, process, services, FAQs.

## Outreach Requirements

- Mention that the current page covers many services and a narrower inspection page could reduce friction.
- Avoid implying the current page is poor.
- Do not send without checklist and Diego approval.

## Validation Plan

- [ ] Build passes.
- [ ] Local and production routes return HTTP 200.
- [ ] Supabase row remains unapproved.
- [ ] Copy avoids broad disaster claims that are not verified.

## Risks

- Service and storm claims need live confirmation.
- Contact method is not captured in enough detail yet.
