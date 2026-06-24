# Roofing Landing Page Demo App

Reusable local demo app for the roofing landing page experiment.

## Purpose

This app renders personalized storm damage / roof inspection demos from reusable components and prospect data objects.

Current demos:

```text
Final Cut Roofing
Charger Roofing
LOA Construction
Matthew Lorand Roofing
```

The root route now renders a neutral preview-link-required page so a prospect cannot remove their slug and see the internal selector. The internal preview dashboard lives at `/dashboard`. Prospect-specific routes render each company from separate data objects.

Charger Roofing now has two internal demo directions:

```text
/prospects/charger-roofing
/prospects/charger-roofing/assessment
```

The primary Charger direction is the traditional urgent storm response landing page. The secondary Charger direction is the storm damage assessment / inspection intake flow for internal comparison.

## Multi-Prospect Demo System

The app should work like:

```text
page template + prospect data = personalized demo page
```

The reusable page structure should live in components, such as:

```text
components/RoofingLandingPage.tsx
components/StormAssessmentDemo.tsx
```

That component controls the shared landing page layout:

```text
hero
form
services
process
gallery
reviews
FAQ
CTA buttons
```

Prospect-specific details should live in prospect data objects:

```text
company name
phone number
city
logo
colors
photos
headline
services
FAQ
CTA text
```

Conceptually:

```text
RoofingLandingPage(finalCutRoofing)
RoofingLandingPage(chargerRoofing)
RoofingLandingPage(loaConstruction)
```

This avoids creating a separate app for every business. The demo app is the reusable system, and each business gets its own data, assets, and route.

Prospect data and assets are split into prospect-specific files and folders:

```text
lib/prospects/
  types.ts
  index.ts
  final-cut-roofing.ts
  charger-roofing.ts
  loa-construction.ts
  matthew-lorand-roofing.ts

public/prospects/
  final-cut-roofing/
  charger-roofing/
  loa-construction/
  matthew-lorand-roofing/
```

Each prospect can then have its own page:

```text
/prospects/final-cut-roofing
/prospects/charger-roofing
/prospects/charger-roofing/assessment
/prospects/loa-construction
/prospects/matthew-lorand-roofing
```

Client-facing share URLs should use the clean root-level alias routes:

```text
/final-cut-roofing
/charger-roofing
/loa-construction
/matthew-lorand-roofing
```

For Charger Roofing outreach, use:

```text
https://roof-check-preview.vercel.app/charger-roofing
```

For LOA Construction review, use:

```text
/prospects/loa-construction
/loa-construction
```

This keeps each company's copy, images, colors, and contact information separate while allowing the shared design system to improve over time.

## UI Convention

Use the prospect's conversion problem to choose the demo format:

```text
Weak or broad page -> focused landing page
Educational hail/storm content -> assessment or intake flow
Strong trust proof but scattered CTA -> proof-first conversion page
Urgent repair/emergency offer -> dispatch-style page
```

Do not default every prospect to the same hero/form/cards/FAQ structure.

shadcn/ui is installed for accessible, reusable controls:

```text
Button
Card
Input
Textarea
Label
Badge
RadioGroup
Checkbox
Accordion
Progress
Separator
```

Use shadcn for controls and stateful UI. Keep prospect-specific visual branding in prospect data and page-level CSS variables.

## Design Branches

Use design branches internally to compare template/variant options before sending one best-fit demo to a prospect.

```text
Template = page strategy / structure
Variant = visual style for that template
```

Current internal set:

```text
Brand-Led Conversion
- photo-hero
- split-hero

Urgent Storm Response
- dark-emergency
- bright-direct

Trust & Proof Local
- reviews-first
- process-first
```

Each variant route should render a complete polished landing page, not a simplified preview. The `brand-photo-hero` variant is the baseline quality bar because it uses the same full-page structure as the main Final Cut Roofing prospect demo.

Compare the variants at:

```text
http://localhost:3000/variants
http://localhost:3000/variants/brand-photo-hero
http://localhost:3000/variants/brand-split-hero
http://localhost:3000/variants/storm-dark-emergency
http://localhost:3000/variants/storm-bright-direct
http://localhost:3000/variants/trust-reviews-first
http://localhost:3000/variants/trust-process-first
```

Do not send every variant to a cold prospect. Pick one internally, personalize it, and send only that strongest demo link.

## Structure

```text
app/
components/
lib/
public/
```

- `app/page.tsx`: renders the neutral preview-link-required page.
- `app/dashboard/page.tsx`: renders the internal preview dashboard with prospect sorting.
- `app/[slug]/page.tsx`: renders clean client-facing prospect URLs.
- `app/prospects/page.tsx`: lists prospect-specific demo pages.
- `app/prospects/[slug]/page.tsx`: renders a prospect-specific demo by slug.
- `app/prospects/[slug]/assessment/page.tsx`: renders the secondary Charger assessment flow variant.
- `app/prospects/[slug]/storm-response/page.tsx`: legacy direct URL for the Charger storm response landing page variant.
- `components/RoofingLandingPage.tsx`: reusable landing page component.
- `components/StormAssessmentDemo.tsx`: shadcn-powered assessment / intake demo for prospects where a tool-like flow is stronger.
- `components/VariantLandingPage.tsx`: alternate design branch renderer.
- `components/ui/`: shadcn/ui primitives owned by this repo.
- `lib/prospects/`: prospect types, registry, and one data file per prospect.
- `lib/designVariants.ts`: template/variant configuration for internal comparison.
- `app/globals.css`: visual styling.
- `public/prospects/`: local-only public brand and project image references grouped by prospect.

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
http://localhost:3000/dashboard
http://localhost:3000/prospects
http://localhost:3000/prospects/final-cut-roofing
http://localhost:3000/prospects/charger-roofing
http://localhost:3000/prospects/loa-construction
http://localhost:3000/prospects/matthew-lorand-roofing
http://localhost:3000/charger-roofing
http://localhost:3000/loa-construction
http://localhost:3000/matthew-lorand-roofing
http://localhost:3000/prospects/charger-roofing/assessment
```

## Build

```bash
npm run build
```

## Notes

- This is a demo, not a live client page.
- This local demo uses public Final Cut Roofing, Charger Roofing, LOA Construction, and Matthew Lorand Roofing logo/photo references for private visualization only.
- Do not publish personalized demos publicly without permission.
- Do not reuse logos, images, reviews, certifications, or claims in a public/client deliverable without approval.
- Keep prospect-specific data in `lib/prospects/` so future demos can reuse the same page component.
- shadcn components are source files in this repo; adjust them deliberately rather than treating them as a black-box package.
- Do not show internal variant switchers on client-facing prospect demo pages. Use direct internal URLs to compare alternates.
