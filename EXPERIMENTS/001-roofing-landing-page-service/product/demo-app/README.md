# Roofing Landing Page Demo App

Reusable local demo app for the roofing landing page experiment.

## Purpose

This app renders a personalized storm damage / roof inspection landing page from a reusable component and prospect data object.

Current demo:

```text
Final Cut Roofing
```

## Design Branches

Compare alternate UI/UX directions at:

```text
http://localhost:3000/variants
http://localhost:3000/variants/storm-response
http://localhost:3000/variants/trust-first
http://localhost:3000/variants/premium-local
http://localhost:3000/variants/compact-conversion
```

## Structure

```text
app/
components/
lib/
```

- `app/page.tsx`: renders the current prospect demo.
- `components/RoofingLandingPage.tsx`: reusable landing page component.
- `components/VariantLandingPage.tsx`: alternate design branch renderer.
- `lib/prospects.ts`: prospect data objects.
- `lib/designVariants.ts`: design branch configuration.
- `app/globals.css`: visual styling.
- `public/final-cut/`: local-only public brand references used for the private demo.

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
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
- Keep prospect-specific data in `lib/prospects.ts` so future demos can reuse the same page component.
