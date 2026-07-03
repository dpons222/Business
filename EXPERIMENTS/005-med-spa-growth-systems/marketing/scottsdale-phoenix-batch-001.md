# Scottsdale / Phoenix Prospect Batch 001

## Batch Goal

Source and qualify the first 25 med spa / aesthetics prospects for the Scottsdale / Phoenix market test.

## Qualification Rules Used

- Active med spa, medical aesthetics, or aesthetics-adjacent wellness business.
- Located in Scottsdale, Phoenix, Paradise Valley, Arcadia/Biltmore, Chandler, Gilbert, or nearby first-market subareas.
- Public website available.
- Visible treatment, booking, consultation, call, or contact path.
- At least one visible opportunity that can be described from public evidence.

## Result

```text
Prospects sourced: 25
Prospects qualified: 25
Tracker updated: marketing/prospect-tracker.csv
Supabase table: public.prospects
Supabase batch ID: med-spa-scottsdale-phoenix-2026-07-batch-001
Supabase sync: complete
Outreach sent: 0
Packages created: 3
```

## Supabase Status

The 25 qualified prospects were upserted into `public.prospects` with:

- `vertical = med_spa`
- `status = not_contacted`
- `outreach_send_status = not_ready`
- `outreach_approved = false`
- `metadata.qualification_status = qualified`
- `metadata.package_status = not_started`
- `metadata.contact_method_verified = false`

No outreach has been approved or sent.

## Recommendation Packages Created

Outreach remains not drafted and not sent for all three packages.

| Prospect | Package Folder | Recommendation Brief | Status |
| --- | --- | --- | --- |
| Chandler Med Spa | `../prospects/chandler-med-spa/` | `../product/personalized-demos/chandler-med-spa-recommendation.md` | recommendation_created |
| Elixir Medical Spa | `../prospects/elixir-medical-spa/` | `../product/personalized-demos/elixir-medical-spa-recommendation.md` | recommendation_created |
| Skin Savvy Aesthetics | `../prospects/skin-savvy-aesthetics/` | `../product/personalized-demos/skin-savvy-aesthetics-recommendation.md` | recommendation_created |

## Strongest Package Candidates

These are the best first 5 prospects for lightweight recommendation packages because the observed opportunity is visible, easy to explain, and close to a revenue action.

| Rank | Prospect | Why It Ranks High | Primary Recommendation |
| ---: | --- | --- | --- |
| 1 | Chandler Med Spa | Public page shows visible first-page and booking-flow friction; easy to explain without private data. | Booking and page-flow cleanup |
| 2 | Elixir Medical Spa | A specific cheeks/lips/tox package is visible, making the recommendation concrete and close to purchase intent. | Package explanation module |
| 3 | Skin Savvy Aesthetics | Consultation and membership paths are both visible; strong fit for membership clarity and repeat-client value. | Membership/package clarity module |
| 4 | Phoenix Medspa | Pricing is very visible, which creates a clear opportunity to guide price shoppers into a consult path. | Botox/filler campaign page |
| 5 | Bellagio Med Spa - Arcadia | A public first-time promo form is visible; good fit for promo path and follow-up expectation cleanup. | Seasonal promo module |

## Backup Candidates

- Moderne Medical Aesthetics: visible service-card and appointment-path opportunity.
- All About Me Medical Aesthetics: broad high-value service menu plus testimonials and booking.
- Beautify Spa: strong Tox Club angle, but more established and likely needs a more careful pitch.
- Institute of Aesthetics: premium Scottsdale positioning and clear consult CTA.
- Sculpt AZ Med Spa: visible treatment-specific Radiesse path and multi-location booking.

## Common Visible Gaps

- Broad service menus without a clear first treatment path.
- Booking CTAs that are present but not always connected to treatment-specific questions.
- Membership or package offers that could be clearer before booking.
- Proof and reviews not always placed next to the booking action.
- Promo or first-time offer forms that could explain what happens after submission.

## Recommended Next Step

Create lightweight recommendation packages for the top 3 first:

1. Chandler Med Spa.
2. Elixir Medical Spa.
3. Skin Savvy Aesthetics.

Then run `prospect-demo-qa` before any outreach draft is reviewed or sent.
