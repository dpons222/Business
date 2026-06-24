# Issue 66: Proclaim Roofing Houston Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Proclaim Roofing Houston prospect package for the roofing landing page experiment.

The goal is to turn Proclaim's broad Houston residential roofing page into a tighter storm damage inspection page for search or paid traffic.

## Source

| Field | Value |
| --- | --- |
| Business | Proclaim Roofing Houston |
| Prospect slug | `proclaim-roofing-houston` |
| Website | https://proclaimroof.com/areas-we-serve/residential-roofing-houston/ |
| City / state | Houston, TX |
| Contact method | Website contact / call |
| Page reviewed | Houston residential roofing page |
| Status | Not contacted |

## Observed Opportunity

The page mentions free drone inspections and storm damage, but the city service page may be broader than a focused storm-damage landing page.

## Recommended Demo Direction

Create a Houston storm damage inspection landing page that emphasizes fast first-step assessment, free drone inspection language only if confirmed live, and one clear request path.

Primary angle:

```text
Houston storm damage inspection page for homeowners who need a clear first step after severe weather.
```

## Implementation Checklist

- [ ] Recheck the live page for current copy, phone, email, form path, logo, site colors, and asset references.
- [ ] Decide whether this lead deserves a full demo or a lighter outreach-only draft.
- [ ] Create `prospects/proclaim-roofing-houston/` docs if moving forward.
- [ ] Add `lib/prospects/proclaim-roofing-houston.ts` with brand-matched content.
- [ ] Register `/prospects/proclaim-roofing-houston` and `/proclaim-roofing-houston`.
- [ ] Draft initial outreach email and contact-form version.
- [ ] Add or update Supabase `public.prospects` only after live recheck.
- [ ] Set Supabase to `not_ready` or `ready_for_review`, never approved by default.

## Demo Content Requirements

- Brand tokens from the live logo/site colors.
- Houston service-area framing.
- Free inspection or drone inspection wording only if still present on the live page.
- Storm damage signs, inspection includes, process steps, services, and FAQs.
- Conservative insurance language with no coverage or claim outcome promises.

## Outreach Requirements

- Mention the broad city service page and the opportunity for a dedicated storm damage inspection page.
- Keep the message short and specific.
- Use the stable production alias only after deployment.
- Do not send until Diego approves the exact draft, recipient, and demo URL.

## Validation Plan

- [ ] `npm run build` passes in the demo app.
- [ ] Local `/prospects/proclaim-roofing-houston` returns HTTP 200.
- [ ] Local `/proclaim-roofing-houston` returns HTTP 200.
- [ ] Production stable aliases return HTTP 200 after deploy.
- [ ] Supabase row contains the stable demo URL and remains unapproved.
- [ ] Outreach copy avoids guaranteed leads, rankings, revenue, or claim outcomes.

## Risks

- Live contact details were not captured in the backlog and must be verified.
- The page may be general roofing rather than storm-specific enough for a strong demo.
