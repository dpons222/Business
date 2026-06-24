# Issue 66: Rhino Roofers Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Rhino Roofers prospect package for the roofing landing page experiment.

The goal is to isolate a San Antonio storm damage inspection page around Rhino Roofers' free inspection process.

## Source

| Field | Value |
| --- | --- |
| Business | Rhino Roofers |
| Prospect slug | `rhino-roofers` |
| Website | https://rhinoroofers.com/ |
| City / state | San Antonio, TX |
| Contact method | Website assessment CTA |
| Page reviewed | Homepage |
| Status | Not contacted |

## Observed Opportunity

The homepage has a strong inspection process but may not isolate hail/storm inspection traffic.

## Recommended Demo Direction

Create a San Antonio storm damage inspection page around the free 37-point inspection if that language is still present live.

Primary angle:

```text
San Antonio storm damage inspection page built around a clear assessment request after hail or wind.
```

## Implementation Checklist

- [ ] Recheck homepage for phone, assessment CTA, 37-point inspection wording, logo, colors, and proof.
- [ ] Create `prospects/rhino-roofers/` docs if moving forward.
- [ ] Add `lib/prospects/rhino-roofers.ts`.
- [ ] Register `/prospects/rhino-roofers` and `/rhino-roofers`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase row after live verification.
- [ ] Keep outreach approval false.

## Demo Content Requirements

- San Antonio storm inspection framing.
- Free 37-point inspection wording only if verified.
- Damage signs, inspection includes, process, services, and FAQs.
- Strong brand color matching, since the brand is likely visually distinctive.

## Outreach Requirements

- Mention their inspection process and propose a storm-specific version.
- Keep the message focused on one campaign page.
- Do not send without approval.

## Validation Plan

- [ ] Build passes.
- [ ] Local and production aliases return HTTP 200.
- [ ] Supabase row contains stable URL and remains unapproved.
- [ ] Inspection claims are accurate and verified.

## Risks

- Rhino may already have a strong conversion system, so the pitch should be campaign-specific.
- Must verify inspection language before using it.
