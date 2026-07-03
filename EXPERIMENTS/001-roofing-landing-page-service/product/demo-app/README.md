# local-growth-preview Demo App

Reusable local growth preview hub for roofing, restaurants, and future niche demo experiments.

## Purpose

This app renders personalized prospect demos from reusable components, prospect data objects, Supabase prospect records, and local demo metadata.

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
Location
  Country > State / region > City drill-down
```

Dashboard prospect rows come from Supabase `public.prospects` first. Local coded demos are registered in:

```text
lib/demoRegistry.ts
```

The local registry stores optional route and asset metadata for demos that have code in this app:

```text
public preview URL
source URL
contact email
summary copy
```

New prospects should be added to Supabase first. Add or update `lib/demoRegistry.ts` only when a
prospect has a coded local demo route, logo/asset references, or must remain visible as a local
fallback if Supabase is unavailable.

The dashboard Focus list can hold multiple businesses at once. It is global for the dashboard and is
stored in Supabase `public.dashboard_focus_items` when server-side Supabase credentials are
available. The browser mirrors the same list in `localStorage` under
`local-growth-preview-focus-list` and falls back to that local copy if Supabase is unavailable. The
old single-focus key `local-growth-preview-current-focus` is migrated into the new list shape.

Dashboard card actions:

```text
Preview = public customer-facing demo URL
Source = original company/source page reviewed for the recommendation
Email Draft = read-only drawer with contact email, subject, body, source URL, demo URL, and status
```

The `Email Draft` drawer reads Supabase when server-side env vars are configured. If Supabase is not
configured, it falls back to local registry/draft data where available.

The dashboard is protected by the app login at `/login`. Public prospect/demo routes stay open.

Default local credential for now:

```text
username: digidap
password: password
```

Rotate this before treating the dashboard as private beyond lightweight validation.

Current generic route examples:

```text
/login
/dashboard
/charger-roofing
/pizabella
/prospects
```

Vercel project/domain rename note:

```text
The deployed Vercel project and canonical public domain are local-growth-preview. The old roof-check-preview.vercel.app domain redirects to local-growth-preview.vercel.app so older Charger links still land on the current app.
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
scripts/
```

- `app/page.tsx`: renders the neutral preview-link-required page.
- `app/login/page.tsx`: renders the dashboard login form.
- `app/login/actions.ts`: handles dashboard login/logout server actions.
- `app/api/dashboard-focus/route.ts`: reads and writes the shared dashboard Focus list.
- `app/api/prospect-drafts/[slug]/route.ts`: returns read-only outreach draft data for the dashboard drawer.
- `app/dashboard/layout.tsx`: requires a dashboard session for all dashboard routes.
- `app/dashboard/page.tsx`: renders the internal multi-niche preview dashboard with filtering and sorting.
- `app/[slug]/page.tsx`: renders clean client-facing prospect URLs.
- `app/pizabella/page.tsx`: renders the first customer-facing restaurant demo route.
- `app/prospects/page.tsx`: lists Supabase-first prospect rows, enriched with local demo routes/assets.
- `app/prospects/[slug]/page.tsx`: renders a prospect-specific demo by slug.
- `app/prospects/[slug]/assessment/page.tsx`: renders the secondary Charger assessment flow variant.
- `app/prospects/[slug]/storm-response/page.tsx`: legacy direct URL for the Charger storm response landing page variant.
- `components/RoofingLandingPage.tsx`: reusable landing page component.
- `components/StormAssessmentDemo.tsx`: shadcn-powered assessment / intake demo for prospects where a tool-like flow is stronger.
- `components/VariantLandingPage.tsx`: alternate design branch renderer.
- `components/ui/`: shadcn/ui primitives owned by this repo.
- `lib/prospects/`: prospect types, registry, and one data file per prospect.
- `lib/demoRegistry.ts`: local demo route/asset metadata, statuses, filters, and current focus.
- `lib/prospectDrafts.ts`: server-side Supabase prospect/draft lookup with local fallback draft data.
- `lib/dashboardFocus.ts`: server-side Supabase Focus list helpers.
- `lib/dashboardAuth.ts`: signed-cookie dashboard authentication helpers.
- `lib/designVariants.ts`: template/variant configuration for internal comparison.
- `app/globals.css`: visual styling.
- `public/prospects/`: local-only public brand and project image references grouped by prospect.
- `scripts/Manage-DashboardUsers.ps1`: add, remove, list, and update dashboard users in `.env.local`.

## Dashboard Login Configuration

The dashboard auth layer uses:

```text
DASHBOARD_AUTH_SECRET
DASHBOARD_USERS_JSON
```

`DASHBOARD_AUTH_SECRET` signs the HTTP-only dashboard session cookie.
`DASHBOARD_USERS_JSON` stores dashboard users as JSON:

```json
[{"username":"digidap","role":"admin","passwordHash":"sha256:..."}]
```

Local setup:

```powershell
Copy-Item .env.example .env.local
.\scripts\Manage-DashboardUsers.ps1 -Action upsert -Username digidap -Password password -Role admin
```

Add or update a user:

```powershell
.\scripts\Manage-DashboardUsers.ps1 -Action upsert -Username newadmin -Password "new-password" -Role admin
```

Remove a user:

```powershell
.\scripts\Manage-DashboardUsers.ps1 -Action remove -Username newadmin
```

List configured users:

```powershell
.\scripts\Manage-DashboardUsers.ps1 -Action list
```

For Vercel, copy the resulting `DASHBOARD_AUTH_SECRET` and `DASHBOARD_USERS_JSON` values into the
`local-growth-preview` project environment variables for Production and Preview.

## Dashboard Draft Data Configuration

The dashboard email draft drawer and approval actions read/write Supabase `public.prospects` through
the app's server-side API route:

```text
SUPABASE_URL=https://uwukaydnmwiwggqoemtc.supabase.co
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Use `SUPABASE_SERVICE_ROLE_KEY` only as a server-side Vercel/local environment variable. Do not expose
it with a `NEXT_PUBLIC_` prefix. Legacy JWT service-role keys can use `SUPABASE_PUBLISHABLE_KEY` as
the REST `apikey`; newer `sb_secret_...` keys are used server-side as the REST `apikey` and are not
sent as bearer JWTs. The app has a local fallback for selected prospects, but Supabase is required for
approval, revoke, manual-contact, manual-follow-up, and shared Focus list write actions.

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
http://localhost:3000/login
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
