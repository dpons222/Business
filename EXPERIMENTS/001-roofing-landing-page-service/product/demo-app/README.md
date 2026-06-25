# local-growth-preview Demo App

Reusable local growth preview hub for roofing, restaurants, and future niche demo experiments.

## Purpose

This app renders personalized prospect demos from reusable components, prospect data objects, and a multi-niche demo registry.

The app still lives inside the original roofing experiment folder for now, but the UI and package name are now generic. Use `local-growth-preview` as the product/project name for the dashboard and future docs.

## Multi-Niche Dashboard

The internal preview dashboard lives at `/dashboard` and supports:

```text
All
Roofing
Restaurants
HVAC
Plumbing
Other / Testing
```

Dashboard entries are registered in:

```text
lib/demoRegistry.ts
```

The registry stores:

```text
niche
status
default current focus
public preview URL
internal route
summary copy
```

The dashboard can change the current focus from the browser UI. The selected business is stored in
browser `localStorage` under `local-growth-preview-current-focus`, so it persists for the same browser
without changing the source-controlled registry default. If the saved slug no longer exists, the
dashboard falls back to the registry default in `lib/demoRegistry.ts`.

Current generic route examples:

```text
/dashboard
/charger-roofing
/pizabella
/prospects
```

Vercel project/domain rename note:

```text
The deployed Vercel project is named local-growth-preview, but the current public production domain is still roof-check-preview.vercel.app. The clean local-growth-preview.vercel.app alias is behind Vercel Authentication until issue #91 is resolved. Keep `/charger-roofing` working because Charger Roofing was the first contacted prospect.
```

Current demos:

```text
Pizabella / Pizza Bella
Final Cut Roofing
Charger Roofing
LOA Construction
Rivertop Roofing
StormVets
Brotherhood Roofing
Matthew Lorand Roofing
Integrity First Roofing & Construction
EDP Roofing
Proper Roofing
Arrington Roofing
Phoenix Storm Restoration
Dynasty Roofing
Sixth Gen Roofing
On Point Roofing
Proclaim Roofing Houston
TSG Roofing
Veritas Roofing
Houston Roofing & Construction
Elevated Roofing
Firefighter Roofing
Sugar Roofing
Texas Direct Roofing & Construction
Rescue Roofing Texas
Rhino Roofers
Texas Star Roofing & Construction
Invictus Roofing
Ripple Roofing
Pappas Roofing and Construction
Cloud Roofing
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

This avoids creating a separate app for every business. The demo app is the reusable system, and each business gets its own data, assets, route, niche metadata, and status metadata.

Prospect data and assets are split into prospect-specific files and folders:

```text
lib/prospects/
  types.ts
  index.ts
  final-cut-roofing.ts
  charger-roofing.ts
  loa-construction.ts
  rivertop-roofing.ts
  stormvets.ts
  brotherhood-roofing.ts
  matthew-lorand-roofing.ts
  integrity-first-roofing-construction.ts
  edp-roofing.ts
  proper-roofing.ts
  arrington-roofing.ts
  phoenix-storm-restoration.ts
  dynasty-roofing.ts
  sixth-gen-roofing.ts
  on-point-roofing.ts
  proclaim-roofing-houston.ts
  tsg-roofing.ts
  veritas-roofing.ts
  houston-roofing-construction.ts
  elevated-roofing.ts
  firefighter-roofing.ts
  sugar-roofing.ts
  texas-direct-roofing-construction.ts
  rescue-roofing-texas.ts
  rhino-roofers.ts
  texas-star-roofing-construction.ts
  invictus-roofing.ts
  ripple-roofing.ts
  pappas-roofing-and-construction.ts
  cloud-roofing.ts

public/prospects/
  final-cut-roofing/
  charger-roofing/
  loa-construction/
  rivertop-roofing/
  stormvets/
  brotherhood-roofing/
  matthew-lorand-roofing/
  integrity-first-roofing-construction/
  edp-roofing/
  proper-roofing/
  arrington-roofing/
  phoenix-storm-restoration/
  dynasty-roofing/
  sixth-gen-roofing/
  on-point-roofing/
```

Each prospect can then have its own page:

```text
/prospects/final-cut-roofing
/prospects/charger-roofing
/prospects/charger-roofing/assessment
/prospects/loa-construction
/prospects/rivertop-roofing
/prospects/stormvets
/prospects/brotherhood-roofing
/prospects/matthew-lorand-roofing
/prospects/integrity-first
/prospects/edp-roofing
/prospects/proper-roofing
```

Client-facing share URLs should use the clean root-level alias routes:

```text
/final-cut-roofing
/charger-roofing
/loa-construction
/rivertop-roofing
/stormvets
/brotherhood-roofing
/matthew-lorand-roofing
/integrity-first
/edp-roofing
/proper-roofing
/arrington-roofing
/phoenix-storm-restoration
/dynasty-roofing
/sixth-gen-roofing
/on-point-roofing
/proclaim-roofing-houston
/tsg-roofing
/veritas-roofing
/houston-roofing-construction
/elevated-roofing
/firefighter-roofing
/sugar-roofing
/texas-direct-roofing-construction
/rescue-roofing-texas
/rhino-roofers
/texas-star-roofing-construction
/invictus-roofing
/ripple-roofing
/pappas-roofing-and-construction
/cloud-roofing
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

## Brand Palette Rule

Before adding or updating a prospect demo, inspect the prospect's live site and logo colors. Prefer direct evidence from logo SVG/image colors and live site CSS, then visible button/header/link colors.

Store the matched colors in the prospect data object's `brand` tokens:

```text
primary
primaryDark
accent
accentSoft
```

Do not use a generic roofing palette when the prospect has clear brand colors. If the colors cannot be recovered quickly for a lightweight validation demo, use a restrained neutral palette and note that brand matching is pending.

## Public Demo Copy Rule

Public prospect routes should read like customer-facing pages for the business being previewed.

Use public routes for:

```text
Customer-facing headline and offer
Business-branded navigation and CTAs
Guest/homeowner/patient/client-facing service copy
Menu/service/product highlights
FAQs and next steps written for the business's customer
```

Keep these in internal docs, not public demo page copy:

```text
Audit notes
Pricing strategy
Developer instructions
Implementation tasks
Observed issue counts
Before/after critique labels
"Preview", "demo", or "not a full rebuild" disclaimers
Internal recommendation category names
```

If a prospect-facing explanation is needed, put it in `client-summary.md`, `recommendation.md`, or the outreach draft instead of the public route.

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
- `app/dashboard/page.tsx`: renders the internal multi-niche preview dashboard with filtering and sorting.
- `app/[slug]/page.tsx`: renders clean client-facing prospect URLs.
- `app/pizabella/page.tsx`: renders the first customer-facing restaurant demo route.
- `app/prospects/page.tsx`: lists prospect-specific demo pages.
- `app/prospects/[slug]/page.tsx`: renders a prospect-specific demo by slug.
- `app/prospects/[slug]/assessment/page.tsx`: renders the secondary Charger assessment flow variant.
- `app/prospects/[slug]/storm-response/page.tsx`: legacy direct URL for the Charger storm response landing page variant.
- `components/RoofingLandingPage.tsx`: reusable landing page component.
- `components/StormAssessmentDemo.tsx`: shadcn-powered assessment / intake demo for prospects where a tool-like flow is stronger.
- `components/VariantLandingPage.tsx`: alternate design branch renderer.
- `components/ui/`: shadcn/ui primitives owned by this repo.
- `lib/prospects/`: prospect types, registry, and one data file per prospect.
- `lib/demoRegistry.ts`: multi-niche demo registry, statuses, filters, and current focus.
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
http://localhost:3000/prospects/rivertop-roofing
http://localhost:3000/prospects/stormvets
http://localhost:3000/prospects/brotherhood-roofing
http://localhost:3000/prospects/matthew-lorand-roofing
http://localhost:3000/prospects/integrity-first
http://localhost:3000/prospects/edp-roofing
http://localhost:3000/prospects/proper-roofing
http://localhost:3000/prospects/arrington-roofing
http://localhost:3000/prospects/phoenix-storm-restoration
http://localhost:3000/prospects/dynasty-roofing
http://localhost:3000/prospects/sixth-gen-roofing
http://localhost:3000/prospects/on-point-roofing
http://localhost:3000/charger-roofing
http://localhost:3000/loa-construction
http://localhost:3000/rivertop-roofing
http://localhost:3000/stormvets
http://localhost:3000/brotherhood-roofing
http://localhost:3000/matthew-lorand-roofing
http://localhost:3000/integrity-first
http://localhost:3000/edp-roofing
http://localhost:3000/proper-roofing
http://localhost:3000/arrington-roofing
http://localhost:3000/phoenix-storm-restoration
http://localhost:3000/dynasty-roofing
http://localhost:3000/sixth-gen-roofing
http://localhost:3000/on-point-roofing
http://localhost:3000/prospects/proclaim-roofing-houston
http://localhost:3000/proclaim-roofing-houston
http://localhost:3000/prospects/tsg-roofing
http://localhost:3000/tsg-roofing
http://localhost:3000/prospects/veritas-roofing
http://localhost:3000/veritas-roofing
http://localhost:3000/prospects/houston-roofing-construction
http://localhost:3000/houston-roofing-construction
http://localhost:3000/prospects/elevated-roofing
http://localhost:3000/elevated-roofing
http://localhost:3000/prospects/firefighter-roofing
http://localhost:3000/firefighter-roofing
http://localhost:3000/prospects/sugar-roofing
http://localhost:3000/sugar-roofing
http://localhost:3000/prospects/texas-direct-roofing-construction
http://localhost:3000/texas-direct-roofing-construction
http://localhost:3000/prospects/rescue-roofing-texas
http://localhost:3000/rescue-roofing-texas
http://localhost:3000/prospects/rhino-roofers
http://localhost:3000/rhino-roofers
http://localhost:3000/prospects/texas-star-roofing-construction
http://localhost:3000/texas-star-roofing-construction
http://localhost:3000/prospects/invictus-roofing
http://localhost:3000/invictus-roofing
http://localhost:3000/prospects/ripple-roofing
http://localhost:3000/ripple-roofing
http://localhost:3000/prospects/pappas-roofing-and-construction
http://localhost:3000/pappas-roofing-and-construction
http://localhost:3000/prospects/cloud-roofing
http://localhost:3000/cloud-roofing
http://localhost:3000/prospects/charger-roofing/assessment
```

## Build

```bash
npm run build
```

## Notes

- This is a demo, not a live client page.
- This local demo uses public Final Cut Roofing, Charger Roofing, LOA Construction, Rivertop Roofing, StormVets, Brotherhood Roofing, Matthew Lorand Roofing, Integrity First Roofing & Construction, EDP Roofing, Proper Roofing, Arrington Roofing, Phoenix Storm Restoration, Dynasty Roofing, Sixth Gen Roofing, On Point Roofing, Proclaim Roofing Houston, TSG Roofing, Veritas Roofing, Houston Roofing & Construction, Elevated Roofing, Firefighter Roofing, Sugar Roofing, Texas Direct Roofing & Construction, Rescue Roofing Texas, Rhino Roofers, Texas Star Roofing & Construction, Invictus Roofing, Ripple Roofing, Pappas Roofing and Construction, Cloud Roofing, and related logo/photo references for private visualization only.
- Do not publish personalized demos publicly without permission.
- Do not reuse logos, images, reviews, certifications, or claims in a public/client deliverable without approval.
- Keep prospect-specific data in `lib/prospects/` so future demos can reuse the same page component.
- shadcn components are source files in this repo; adjust them deliberately rather than treating them as a black-box package.
- Do not show internal variant switchers on client-facing prospect demo pages. Use direct internal URLs to compare alternates.
