# Med Spa Finished Demo Batching

Issue: https://github.com/dpons222/Business/issues/126  
Plan: `plans/issue-126-med-spa-finished-demo-batching.md`  
Refresh date: 2026-07-04

## Purpose

Group the 25 med spa recommendation packages into reusable finished-demo build batches. The finished demos should be customer-facing pages or flows that a prospect could imagine using with patients, not internal recommendation summaries.

## Source Refresh Summary

- Inventory source: `marketing/prospect-tracker.csv`.
- Package source: `prospects/<slug>/` and `product/personalized-demos/<slug>-recommendation.md`.
- Live refresh method: current source URL status/title/keyword scan, plus browser retrieval for pages that blocked direct script fetch.
- Direct fetch succeeded for 23 of 25 source URLs.
- `https://secretmedspa.com/scottsdale-az/` and `https://secretmedspa.com/biltmore-phoenix-az/` blocked simple script fetch with `403`, but browser retrieval confirmed the pages are live and contain treatment menus, `BOOK NOW`, `Book a free consultation`, location details, pricing/membership links, and Zenoti booking links.
- Contact methods remain unverified unless later verified manually.

## Batch Priority

1. **Batch B - Treatment Or Package Decision Page**
   - Largest group and closest to consultation/bookings.
   - Strong repeatability across Botox, fillers, laser, skincare, weight loss, and body services.
   - Good first reusable component candidate because the page can guide one high-intent treatment path before the booking click.

2. **Batch E - Membership Or Repeat-Treatment Page**
   - Strong fit for med spas with visible memberships, packages, or broad service menus.
   - Useful second template because it can turn scattered package/service information into a clearer repeat-care path.

3. **Batch C - Consultation-First Trust Page**
   - Fits prospects where the main gap is explaining what happens after a consultation request.
   - Useful after Batch B because it can share CTA, trust, and next-step components.

4. **Batch F - Proof And Reputation Page**
   - Smaller group with proof/review placement as the primary opportunity.
   - Should reuse trust/proof sections from earlier templates.

5. **Batch A - Booking Path Cleanup**
   - Currently one primary prospect, Chandler Med Spa.
   - Important but less repeatable as a standalone first template; should reuse Batch B/C components.

No primary **Batch D - Promo Or Offer Landing Page** prospects were found in this inventory. Several sites mention specials/offers, but the current recommendation packages do not make promo/offer the primary problem.

## First Build Batch

Start with **Batch B - Treatment Or Package Decision Page**.

Why:

- It covers 12 of 25 prospects.
- It is close to revenue-driving actions: consultations, bookings, treatment selection, and package interest.
- It can be demonstrated without backend access.
- It gives outreach a clear one-sentence observation: the prospect already has treatment interest and booking paths, but a focused treatment-specific page can reduce scanning before the visitor clicks to book or request a consultation.

Recommended first implementation slice:

- Build one shared treatment-consultation demo pattern.
- Personalize the first 3-5 Batch B prospects first.
- Use `prospect-demo-builder` to turn each recommendation into a finished business-specific customer-facing page.
- Run `prospect-demo-qa` on those before rolling the same pattern across the rest of Batch B.

## Classification Table

| Prospect | Slug | City | Source refresh | Desired action | Visible friction | Primary module | Supporting module | Priority | Source facts needed before build | Demo route target | QA status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Adam & Eve Medical Aesthetics | `adam-eve-medical-aesthetics` | Scottsdale, AZ | 200, title confirms Scottsdale med spa | Request a consultation for a specific treatment | Consultation CTA exists, but one treatment path can be easier to request from first visit | Batch B - Treatment Or Package Decision Page | Batch C - Consultation trust | High | Confirm primary treatment focus, consultation CTA URL, logo/colors | `/med-spa/adam-eve-medical-aesthetics` | Not started |
| SkinSpirit Scottsdale | `skinspirit-scottsdale` | Scottsdale, AZ | 200, title confirms Botox/fillers/facials location page | Book a consultation with local proof nearby | Strong booking path exists, but proof can sit closer to the consult action | Batch F - Proof And Reputation Page | Batch B - Treatment path | Medium | Confirm provider/proof details, booking CTA, location-specific copy | `/med-spa/skinspirit-scottsdale` | Not started |
| SkinSpirit Paradise Valley | `skinspirit-paradise-valley` | Phoenix / Paradise Valley, AZ | 200, title confirms Botox/fillers/facials in Phoenix | Choose a Botox/filler consult path | Free consultation path exists, but visitors comparing Botox/fillers need a tighter treatment path | Batch B - Treatment Or Package Decision Page | Batch F - Proof | High | Confirm Botox/filler services, provider proof, consultation CTA | `/med-spa/skinspirit-paradise-valley` | Not started |
| It's a Secret Med Spa Scottsdale | `it-s-a-secret-med-spa-scottsdale` | Scottsdale, AZ | Browser refresh confirmed page, Book Now, free consultation, treatment menus | Book or request a free consultation for one high-intent treatment | Many treatment sections and booking CTAs; one service path should be clearer before booking | Batch B - Treatment Or Package Decision Page | Batch E - Membership/pricing links | High | Confirm Zenoti booking URL, selected treatment category, location details | `/med-spa/it-s-a-secret-med-spa-scottsdale` | Not started |
| It's a Secret Med Spa Biltmore | `it-s-a-secret-med-spa-biltmore` | Phoenix / Biltmore, AZ | Browser refresh confirmed page, Book Now, free consultation, Biltmore location | Understand what happens after consultation request | Consultation path exists, but post-request next steps can be clearer | Batch C - Consultation-First Trust Page | Batch B - Treatment path | Medium | Confirm booking URL, consultation wording, location phone/address | `/med-spa/it-s-a-secret-med-spa-biltmore` | Not started |
| All About Me Medical Aesthetics | `all-about-me-medical-aesthetics` | Phoenix, AZ | 200, title confirms aesthetic and wellness treatments | Move from broad service interest to consult request | Many services and proof are visible; one service path should reduce scanning | Batch B - Treatment Or Package Decision Page | Batch F - Proof | High | Confirm top treatment category, testimonials/proof, consult CTA | `/med-spa/all-about-me-medical-aesthetics` | Not started |
| Body + Health Restoration Center Paradise Valley | `body-health-restoration-center-paradise-valley` | Paradise Valley, AZ | 200, title confirms Botox/fillers/med spa location | Pick the right aesthetic consult path | Aesthetics and wellness/longevity services are combined; aesthetic visitors need a clearer first path | Batch E - Membership Or Repeat-Treatment Page | Batch B - Treatment path | Medium | Confirm aesthetic service subset, consultation CTA, same-day/booking proof | `/med-spa/body-health-restoration-center-paradise-valley` | Not started |
| DS Skin & Lips Medical Spa | `ds-skin-lips-medical-spa` | Scottsdale, AZ | 200, title confirms Botox page | Book a Botox or filler consult | Botox page exists; opportunity is a focused campaign page before appointment request | Batch B - Treatment Or Package Decision Page | Batch C - Consultation trust | High | Confirm Botox/filler wording, appointment/contact CTA, brand colors | `/med-spa/ds-skin-lips-medical-spa` | Not started |
| Moderne Medical Aesthetics | `moderne-medical-aesthetics` | Scottsdale, AZ | 200, title confirms Scottsdale med spa | Choose a treatment and book | Booking and service signals exist; opportunity is one polished treatment path | Batch B - Treatment Or Package Decision Page | Batch E - Membership if source-backed | High | Confirm service categories, booking CTA, brand tone | `/med-spa/moderne-medical-aesthetics` | Not started |
| Arizona Medical Medspa | `arizona-medical-medspa` | Scottsdale, AZ | 200, title currently reads Arizona Mobile Medicine | Understand consultation follow-up | Consultation/appointment options exist; next-step expectations need clarity | Batch C - Consultation-First Trust Page | Batch B - Treatment path | Medium | Confirm exact brand naming, consult/appointment path, service language | `/med-spa/arizona-medical-medspa` | Not started |
| Elixir Medical Spa | `elixir-medical-spa` | Scottsdale, AZ | 200, title confirms Elixir Medical Spa | Understand package/treatment path before booking | High-ticket package/service visibility exists; explanation can be clearer before booking | Batch E - Membership Or Repeat-Treatment Page | Batch B - Treatment path | High | Confirm package details, booking CTA, service focus | `/med-spa/elixir-medical-spa` | Not started |
| Skin Savvy Aesthetics | `skin-savvy-aesthetics` | Scottsdale, AZ | 200, title confirms Botox/filler/laser/facials | Understand membership/package value | Consultation and membership signals exist; repeat-treatment value can be clearer | Batch E - Membership Or Repeat-Treatment Page | Batch B - Treatment path | High | Confirm membership details, treatment categories, Square/booking path | `/med-spa/skin-savvy-aesthetics` | Not started |
| Beautify Spa | `beautify-spa` | Scottsdale, AZ | 200, title confirms Scottsdale medspa and review claim | Choose membership/package or treatment path | Membership and service volume are visible; repeat-care path can be clearer | Batch E - Membership Or Repeat-Treatment Page | Batch F - Proof | High | Confirm membership/program details, review/proof wording, booking CTA | `/med-spa/beautify-spa` | Not started |
| Institute of Aesthetics | `institute-of-aesthetics` | Scottsdale, AZ | 200, title confirms luxury boutique aesthetics/wellness | Request a consult for one service category | Broad boutique/wellness positioning; one service path should be easier to act on | Batch B - Treatment Or Package Decision Page | Batch C - Consultation trust | Medium | Confirm service category, consultation CTA, brand tone | `/med-spa/institute-of-aesthetics` | Not started |
| Inside Out Aesthetics | `inside-out-aesthetics` | Scottsdale, AZ | 200, title confirms Botox/HydraFacial Scottsdale | Know what happens after booking/consultation | Booking/consultation options exist; next-step expectations should be clearer | Batch C - Consultation-First Trust Page | Batch B - Treatment path | Medium | Confirm consultation or booking URL, primary service, trust proof | `/med-spa/inside-out-aesthetics` | Not started |
| Paradise Medspa | `paradise-medspa` | Phoenix, AZ | 200, title confirms Paradise Medspa | Trust the clinic and request consult/appointment | Proof and consultation path can be organized closer to action | Batch F - Proof And Reputation Page | Batch C - Consultation trust | Medium | Confirm proof details, appointment path, service area | `/med-spa/paradise-medspa` | Not started |
| Phoenix Medspa | `phoenix-medspa` | Phoenix, AZ | 200, title confirms Botox, Dysport, fillers, PRP, microneedling | Move from Botox/filler pricing interest to booking | Pricing/treatment information exists; consult/booking path can be more focused | Batch B - Treatment Or Package Decision Page | Batch D - Offer/pricing if source-backed | High | Confirm Botox/filler pricing facts, booking request path, brand colors | `/med-spa/phoenix-medspa` | Not started |
| Sculpt AZ Med Spa | `sculpt-az-med-spa` | Phoenix / Biltmore and Ahwatukee, AZ | 200, title confirms Sculpt AZ Med Spa Phoenix | Choose a treatment consultation path | Multiple locations/services; one treatment path should reduce scanning | Batch B - Treatment Or Package Decision Page | Batch C - Consultation trust | High | Confirm selected location, treatment category, appointment CTA | `/med-spa/sculpt-az-med-spa` | Not started |
| Zensken Med Spa | `zensken-med-spa` | Phoenix / Arcadia, AZ | 200, title confirms top-rated med spa/lip fillers | Move lip filler or treatment interest to contact/booking | Source text is narrower in fetch; build needs careful service confirmation | Batch B - Treatment Or Package Decision Page | Batch F - Proof if source-backed | Medium | Confirm live treatment list, booking/contact path, proof claims | `/med-spa/zensken-med-spa` | Not started |
| Regency Specialties - Matisse Medspa | `regency-specialties-matisse-medspa` | Phoenix, AZ | 200, title confirms medspa in Phoenix | Understand consult/booking next step | Medspa is nested inside broader specialty practice; consultation path needs clearer framing | Batch C - Consultation-First Trust Page | Batch F - Proof | Medium | Confirm Matisse-specific service list, consult CTA, practice trust details | `/med-spa/regency-specialties-matisse-medspa` | Not started |
| Arcadia Wellness Center | `arcadia-wellness-center` | Phoenix / Arcadia, AZ | 200, title confirms health and aesthetics | Pick the right service path | Health and aesthetics are combined; aesthetic visitor path needs clearer segmentation | Batch E - Membership Or Repeat-Treatment Page | Batch B - Treatment path | Medium | Confirm aesthetic service subset, appointment/request path, brand tone | `/med-spa/arcadia-wellness-center` | Not started |
| Bellagio Med Spa - Arcadia | `bellagio-med-spa-arcadia` | Phoenix / Arcadia, AZ | 200, title confirms Bellagio Med Spa | Understand program/consultation path | Program and consultation options exist; page can make the best next step clearer | Batch E - Membership Or Repeat-Treatment Page | Batch C - Consultation trust | High | Confirm program/package details, consultation CTA, pricing facts if used | `/med-spa/bellagio-med-spa-arcadia` | Not started |
| Flawless Faces Medspa | `flawless-faces-medspa` | Chandler, AZ | 200, title confirms Botox, lip fillers, laser | Move Botox/filler interest to booking | Booking link is visible; one Botox/filler path can be more specific before Square booking | Batch B - Treatment Or Package Decision Page | Batch D - Pricing if source-backed | High | Confirm Botox/filler services, pricing if used, booking path | `/med-spa/flawless-faces-medspa` | Not started |
| Lazaderm Chandler | `lazaderm-chandler` | Chandler, AZ | 200, title confirms Botox/filler/laser medspa services | Choose one high-intent service before free consultation | Detailed treatment sections exist; one service path should be prioritized before consult click | Batch B - Treatment Or Package Decision Page | Batch F - Provider/proof | High | Confirm free consultation CTA, treatment list, provider/testimonial facts | `/med-spa/lazaderm-chandler` | Not started |
| Chandler Med Spa | `chandler-med-spa` | Chandler, AZ | 200, title confirms beauty/wellness destination | Reach the right booking/consultation path faster | Repeated page/account/navigation elements and visible booking path create first-page friction | Batch A - Booking Path Cleanup | Batch B - Treatment path | High | Confirm booking URL, treatment list, contact path, logo/colors | `/med-spa/chandler-med-spa` | Not started |

## Reusable Demo Template Contract

The first reusable med spa demo should support these fields:

- `slug`
- `businessName`
- `shortName`
- `city`
- `sourceUrl`
- `batch`
- `heroTreatmentFocus`
- `primaryAudienceAction`
- `observedFriction`
- `recommendedPath`
- `ctaLabel`
- `ctaHref`
- `secondaryCtaLabel`
- `secondaryCtaHref`
- `trustSignals`
- `serviceHighlights`
- `consultationSteps`
- `sourceFacts`
- `qaNotes`

## Route Convention

Use customer-facing finished demos at:

```text
/med-spa/<prospect-slug>
```

Dashboard behavior after QA:

- `Preview` should open `/med-spa/<prospect-slug>` for prospects with a finished demo.
- `Source` should continue opening the original source website.
- Prospects without finished demos should remain package-only and must not be marked ready for outreach.

## First Batch Build Notes

For Batch B, use a treatment-consultation page pattern:

1. Hero: business name, city, one treatment focus, one CTA.
2. Service path: help visitors choose the relevant treatment/consult path.
3. Why consult first: source-backed explanation, no medical guarantees.
4. What to expect: simple 3-step consultation/booking path.
5. Trust/proof: only source-backed provider, location, review, or service facts.
6. Final CTA: original booking/consult/contact path.

## Guardrails

- Do not invent medical outcomes, prices, memberships, review counts, certifications, or provider credentials.
- Do not imply the med spa approved the page.
- Do not copy internal audit language onto public demos.
- Do not update Supabase `demo_url` until the finished demo is built and QA supports the update.
- Use `prospect-demo-builder` for finished demo creation; use `prospect-demo-qa` as the pre-send quality gate.
- Run `prospect-demo-qa` before marking any demo ready for outreach.
