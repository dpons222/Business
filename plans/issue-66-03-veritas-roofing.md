# Issue 66: Veritas Roofing Demo And Outreach Plan

GitHub Issue: https://github.com/dpons222/Business/issues/66

## Objective

Plan a lightweight Veritas Roofing prospect package for the roofing landing page experiment.

The goal is to test whether a dedicated storm inspection page could sharpen a broad multi-location homepage message.

## Source

| Field | Value |
| --- | --- |
| Business | Veritas Roofing |
| Prospect slug | `veritas-roofing` |
| Website | https://www.veritasroofingtx.com/ |
| City / state | Fort Worth / Round Rock / College Station, TX |
| Contact method | Call (817) 455-0117 / website inspection CTA |
| Page reviewed | Homepage |
| Status | Not contacted |

## Observed Opportunity

The homepage has broad multi-location messaging and needs live review to confirm whether storm inspection has a dedicated conversion path.

## Recommended Demo Direction

Create a focused storm inspection page for one primary market, preferably Fort Worth unless live review shows another market is stronger.

Primary angle:

```text
Fort Worth storm inspection landing page built from Veritas' free inspection and warranty/trust positioning.
```

## Implementation Checklist

- [ ] Recheck the live site and choose the strongest city focus.
- [ ] Verify phone, form path, logo, colors, trust proof, and inspection wording.
- [ ] Create `prospects/veritas-roofing/` docs if moving forward.
- [ ] Add `lib/prospects/veritas-roofing.ts`.
- [ ] Register `/prospects/veritas-roofing` and `/veritas-roofing`.
- [ ] Draft outreach email and contact-form version.
- [ ] Add Supabase prospect row only after confirming current contact details.
- [ ] Keep outreach approval false.

## Demo Content Requirements

- One city focus, not all service areas at once.
- Brand-matched colors and logo.
- Free inspection / quote language only if verified.
- Storm signs, inspection includes, process, services, and FAQs.
- Trust proof near CTA if live page supports it.

## Outreach Requirements

- Mention broad multi-location messaging and propose a focused local storm inspection page.
- Avoid criticizing the homepage.
- Do not send until Diego approves exact copy and URL.

## Validation Plan

- [ ] `npm run build` passes.
- [ ] Local and production routes return HTTP 200.
- [ ] Supabase row has stable demo URL and unapproved outreach status.
- [ ] Copy does not overstate warranty, insurance, or service-area claims.

## Risks

- Multi-location positioning may make the first demo angle ambiguous.
- Live assets and claims need careful verification before use.
