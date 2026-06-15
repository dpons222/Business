# Roofing Landing Page Demo App

Reusable local demo app for the roofing landing page experiment.

## Purpose

This app renders a personalized storm damage / roof inspection landing page from a reusable component and prospect data object.

Current demo:

```text
Final Cut Roofing
```

The root route now uses a brand-led version of the page that mirrors key Final Cut Roofing site elements: project photography, black/blue branding, estimate/inspection language, process sections, insurance-claim assistance, review proof, and photo gallery content.

## Multi-Prospect Demo System

The app should work like:

```text
page template + prospect data = personalized demo page
```

The reusable page structure should live in components, such as:

```text
components/RoofingLandingPage.tsx
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

public/prospects/
  final-cut-roofing/
  charger-roofing/
  loa-construction/
```

Each prospect can then have its own page:

```text
/prospects/final-cut-roofing
/prospects/charger-roofing
/prospects/loa-construction
```

This keeps each company's copy, images, colors, and contact information separate while allowing the shared design system to improve over time.

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

- `app/page.tsx`: renders the current prospect demo.
- `app/prospects/page.tsx`: lists prospect-specific demo pages.
- `app/prospects/[slug]/page.tsx`: renders a prospect-specific demo by slug.
- `components/RoofingLandingPage.tsx`: reusable landing page component.
- `components/VariantLandingPage.tsx`: alternate design branch renderer.
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
http://localhost:3000/prospects
http://localhost:3000/prospects/final-cut-roofing
```

## Build

```bash
npm run build
```

## Notes

- This is a demo, not a live client page.
- This local demo uses public Final Cut Roofing logo/photo references for private visualization only.
- Do not publish personalized demos publicly without permission.
- Do not reuse logos, images, reviews, certifications, or claims in a public/client deliverable without approval.
- Keep prospect-specific data in `lib/prospects/` so future demos can reuse the same page component.
