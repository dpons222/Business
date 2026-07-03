# Issue 79 - Pizabella Audit Preview

## Goal

Create a lightweight, review-ready visual audit preview for Pizabella that uses the restaurant's public logo, color scheme, and relevant public photos while staying focused on a practical customer journey cleanup.

## Scope

In scope:

- Build a standalone visual/audit preview artifact.
- Use current Pizabella public brand assets and observed colors.
- Show before/after recommendations for Home/About, ordering clarity, menu merchandising, specials workflow, public links, and pilot offer.
- Link the preview from the Pizabella prospect package and outreach draft.
- Validate language for no guaranteed orders, revenue, rankings, leads, reviews, or ad outcomes.

Out of scope:

- Sending outreach.
- Building a production restaurant website replacement.
- Deep ArrowPOS/POS integration.
- Copying a restaurant website layout one-to-one.

## Checklist

- [x] Create GitHub issue and branch.
- [x] Re-check public Pizabella site, order page, colors, logo, photos, hours, address, phone, categories, and active special.
- [x] Create standalone visual audit preview.
- [x] Update Pizabella README/navigation links.
- [x] Update outreach draft to reference the preview as pending review, not ready to send.
- [x] Run validation checks.
- [x] Commit and push branch.
- [x] Post issue progress/closeout update.

## Validation

- `git diff --check` passed.
- Rendered desktop screenshot with Playwright at `1440x1200`.
- Rendered mobile screenshot with Playwright at `390x1200`.
- Reviewed changed preview/outreach/plan language for guarantee claims; remaining guarantee-related language is explicit guardrail language.

## Evidence To Use

- Public home page: `https://landing.arrowpos.com/home/pizzabella`
- Public order page: `https://onboarding.arrowpos.com/pizzabella_woodstock`
- Logo: `https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-01-30+at+12.12.03+PM.png`
- Public homepage food photo: `https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-02-28+at+12.15.56+PM.png`
- Brand colors observed: `#A13D31`, `#000000`, `#FFFFFF`, `#e6a756`, `#FCE7CF`
- Address: `1013 S Main St., Woodstock, VA 22664`
- Phone: `540-459-5363`
- Pickup/delivery hours observed: Sunday-Thursday `11:00 AM-10:00 PM`, Friday-Saturday `11:00 AM-11:00 PM`
- Active special observed: Spaghetti with meatballs or meat sauce, salad, garlic knots, and drink for `$12.99`

## Preview Structure

1. Hero summary with Pizabella branding.
2. Current customer journey snapshot.
3. Before/after homepage and About copy.
4. Order path clarity recommendations.
5. Menu cleanup examples.
6. Specials workflow example.
7. Public link cleanup checklist.
8. Pilot offer and next review step.
