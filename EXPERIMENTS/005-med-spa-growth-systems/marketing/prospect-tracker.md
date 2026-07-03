# Prospect Tracker

## Recommendation Categories

```text
treatment_consultation_flow
botox_filler_campaign
laser_body_campaign
package_membership_clarity
consultation_followup
review_testimonial_workflow
proof_organization
lapsed_client_reactivation
gbp_booking_cleanup
seasonal_promo_module
chatbot_ai_intake
ai_phone_followup
```

## Status Values

```text
sourced
researched
qualified
diagnosed
recommendation_created
demo_created
email_drafted
ready_for_review
approved_to_send
sent
followed_up
positive_reply
not_interested
bad_fit
paused
```

## Batch Notes

- `scottsdale-phoenix-batch-001.md`: first 25 qualified med spa / aesthetics prospects and strongest package candidates.

## Supabase Mapping

Local tracker `status = qualified` maps to Supabase `public.prospects.status = not_contacted` until outreach is actually sent.

Supabase batch:

```text
outreach_batch_id = med-spa-scottsdale-phoenix-2026-07-batch-001
vertical = med_spa
outreach_send_status = not_ready
outreach_approved = false
metadata.qualification_status = qualified
metadata.package_status = not_started
metadata.contact_method_verified = false
```
