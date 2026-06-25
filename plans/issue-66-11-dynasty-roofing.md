# Issue 66: Dynasty Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Dynasty Roofing prospect package for the roofing landing page experiment.

The goal is to turn a post-storm roof inspection article into a focused booking page.

## Source

| Field | Value |
| --- | --- |
| Business | Dynasty Roofing |
| Prospect slug | `dynasty-roofing` |
| Website | https://dynastyroofs.com/houston-residents-are-getting-post-storm-roof-inspections/ |
| City / state | Houston, TX |
| Contact method | Website contact / inspection CTA |
| Reviews | A+ BBB noted |
| Page reviewed | Post-storm roof inspections article |
| Status | Not contacted |

## Observed Opportunity

The article content may educate but not convert as directly as a landing page.

## Recommended Demo Direction

Create a Houston post-storm roof inspection page that turns article content into a booking path with trust proof near the CTA.

Primary angle:

```text
Houston post-storm inspection page for homeowners who need a free inspection after severe weather.
```

## Implementation Checklist

- [x] Recheck live article for current contact details, CTA, logo, colors, free inspection wording, and BBB proof.
- [x] Create `prospects/dynasty-roofing/` docs.
- [x] Add `lib/prospects/dynasty-roofing.ts`.
- [x] Register `/prospects/dynasty-roofing` and `/dynasty-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row after verification.
- [x] Keep outreach unapproved.

## Demo Content Requirements

- Houston post-storm inspection framing.
- Free inspection and estimate wording only if live.
- BBB proof only if still present.
- Damage signs, inspection includes, process, services, FAQs.
- Conservative insurance assistance wording.

## Outreach Requirements

- Mention the article is useful but could be converted into a focused booking page.
- Keep the message specific to post-storm inspection.
- Do not send without checklist and approval.

## Validation Plan

- [x] Build passes.
- [x] Local aliases return HTTP 200.
- [ ] Production aliases return HTTP 200 after deployment.
- [x] Supabase row contains stable URL target and remains unapproved.
- [x] Copy avoids claim outcome promises.

## Risks

- BBB proof and free inspection language must be reverified.
- Article may be dated or changed.
