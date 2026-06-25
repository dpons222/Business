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

- [x] Recheck the live page for current copy, phone, email, form path, logo, site colors, and asset references.
- [x] Decide whether this lead deserves a full demo or a lighter outreach-only draft.
- [x] Create `prospects/proclaim-roofing-houston/` docs if moving forward.
- [x] Add `lib/prospects/proclaim-roofing-houston.ts` with brand-matched content.
- [x] Register `/prospects/proclaim-roofing-houston` and `/proclaim-roofing-houston`.
- [x] Draft initial outreach email and contact-form version.
- [x] Add or update Supabase `public.prospects` only after live recheck.
- [x] Set Supabase to `not_ready`, never approved by default.

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

- [x] `npm run build` passes in the demo app.
- [x] Local `/prospects/proclaim-roofing-houston` returns HTTP 200.
- [x] Local `/proclaim-roofing-houston` returns HTTP 200.
- [ ] Production stable aliases return HTTP 200 after deploy.
- [x] Supabase row contains the stable demo URL and remains unapproved.
- [x] Outreach copy avoids guaranteed leads, rankings, revenue, or claim outcomes.

## Risks

- Live contact details were not captured in the backlog and must be verified.
- The page may be general roofing rather than storm-specific enough for a strong demo.
