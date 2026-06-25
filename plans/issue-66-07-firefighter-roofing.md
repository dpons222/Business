# Issue 66: Firefighter Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Firefighter Roofing prospect package for the roofing landing page experiment.

The goal is to convert roof inspection article content into a focused storm-related inspection request page.

## Source

| Field | Value |
| --- | --- |
| Business | Firefighter Roofing |
| Prospect slug | `firefighter-roofing` |
| Website | https://firefighterroofing.com/articles/roof-inspection-in-fort-worth-tx-what-to-expect-and-why-it-matters/ |
| City / state | Fort Worth, TX |
| Contact method | Website contact / inspection CTA |
| Page reviewed | Roof inspection article |
| Status | Not contacted |

## Observed Opportunity

The content is article-style and may not be a focused inspection request landing page.

## Recommended Demo Direction

Create a Fort Worth roof inspection page that turns the article's educational content into a short post-storm action path.

Primary angle:

```text
Fort Worth post-storm roof inspection page built from existing educational inspection content.
```

## Implementation Checklist

- [x] Recheck live article and contact path.
- [x] Verify phone, form, inspection CTA, and use fallback brand treatment where public logo assets are blocked.
- [x] Create `prospects/firefighter-roofing/` docs if moving forward.
- [x] Add `lib/prospects/firefighter-roofing.ts`.
- [x] Register `/prospects/firefighter-roofing` and `/firefighter-roofing`.
- [x] Draft outreach email and contact-form version.
- [x] Add Supabase row only after verification.
- [x] Keep outreach unapproved.

## Demo Content Requirements

- Fort Worth inspection framing.
- Educational content shortened into one action.
- Storm signs, inspection includes, process, services, and FAQs.
- Brand-matched color palette.

## Outreach Requirements

- Mention the article has useful inspection content but could work harder as a focused request page.
- Avoid implying a full audit.
- No send without checklist and approval.

## Validation Plan

- [x] Build passes.
- [x] Local routes return HTTP 200.
- [ ] Production routes return HTTP 200 after deployment.
- [x] Supabase row remains unapproved.
- [x] Outreach copy avoids performance promises.

## Risks

- Live site may not expose enough storm-specific proof.
- Contact method must be verified before outreach.
