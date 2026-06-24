# Issue 66: Arrington Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Arrington Roofing prospect package for the roofing landing page experiment.

The goal is to turn storm damage blog content into a focused inspection landing page with review and trust proof near the CTA.

## Source

| Field | Value |
| --- | --- |
| Business | Arrington Roofing |
| Prospect slug | `arrington-roofing` |
| Website | https://arringtonroofing.com/blog/storm-damage-roof-repair-north-texas |
| City / state | Dallas / North Texas |
| Contact method | Call (214) 698-8443 / website schedule CTA |
| Reviews | BBB A+ / 300+ excellent reviews noted |
| Page reviewed | Storm damage roof repair blog page |
| Status | Not contacted |

## Observed Opportunity

The storm offer appears on a blog-style page and may not be optimized as a standalone inspection request path.

## Recommended Demo Direction

Create a Dallas / North Texas storm inspection page that brings reviews, BBB proof, and inspection CTA above the fold.

Primary angle:

```text
North Texas storm damage inspection page built from Arrington's existing blog content and trust proof.
```

## Implementation Checklist

- [ ] Recheck live page for phone, CTA, logo, colors, review proof, BBB proof, and free inspection language.
- [ ] Create `prospects/arrington-roofing/` docs.
- [ ] Add `lib/prospects/arrington-roofing.ts`.
- [ ] Register `/prospects/arrington-roofing` and `/arrington-roofing`.
- [ ] Draft email and contact-form outreach.
- [ ] Add Supabase row with stable demo URL after deployment.
- [ ] Stage outreach as `ready_for_review` only after pre-send checklist.

## Demo Content Requirements

- North Texas or Dallas-focused headline.
- Review and BBB proof only if still visible live.
- Free storm inspection CTA if verified.
- Storm signs, inspection includes, process, services, FAQs.
- Conservative insurance and repair language.

## Outreach Requirements

- Mention the current storm content is blog-style.
- Pitch a focused inspection page with reviews and CTA above the fold.
- Do not send until Diego approval.

## Validation Plan

- [ ] Build passes.
- [ ] Routes return HTTP 200 locally and in production.
- [ ] Supabase row has stable URL and unapproved outreach.
- [ ] Copy does not overclaim reviews or certifications.

## Risks

- Review proof may have changed and must be confirmed before use.
- Blog content may include insurance language that needs conservative rewriting.
