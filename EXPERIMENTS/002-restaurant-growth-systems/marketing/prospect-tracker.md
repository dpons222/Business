# Prospect Tracker

Use `prospect-tracker.csv` for active tracking. This file explains the fields and status values.

## Fields

- `business_name`: restaurant name.
- `website`: main website or Google Business Profile if no site exists.
- `city_state`: restaurant market.
- `cuisine_or_concept`: cuisine, service style, or concept.
- `recommendation_category`: best-fit diagnostic category.
- `contact_method`: email, contact form, phone, Instagram, or other approved path.
- `current_flow_reviewed`: website, Google profile, menu, order path, reservation path, review profile, social links, or email/SMS evidence reviewed before outreach.
- `observed_issue`: specific customer journey issue or missed opportunity.
- `recommended_solution`: one-sentence recommendation.
- `personalized_outreach_angle`: one-line reason the recommendation fits this restaurant.
- `brand_palette_source`: logo, website CSS, button colors, or screenshot sampling.
- `demo_or_recommendation_url`: demo or recommendation link if one exists.
- `date_contacted`: date first outreach was sent.
- `follow_up_1`: first follow-up date.
- `follow_up_2`: second follow-up date.
- `reply`: reply summary.
- `status`: current outreach status.
- `notes`: extra context.

## Recommendation Categories

```text
catering_private_dining
email_sms_promo
gbp_menu_order_cleanup
online_ordering_audit
event_lead_tracking
review_response_workflow
weekly_specials_content
birthday_loyalty_reactivation
website_menu_cleanup
landing_campaign_page
```

## Status Values

```text
not_started
researched
recommendation_selected
draft_ready
ready_for_review
sent
follow_up_1_due
follow_up_1_sent
follow_up_2_due
follow_up_2_sent
positive_reply
not_interested
bad_fit
paid_pilot
archived
```

## Qualification Notes

Prioritize restaurants with:

- a clear visible customer journey issue,
- public menu or offer details,
- visible brand colors or logo,
- reachable owner, manager, events, catering, or marketing contact,
- enough public information to make a specific recommendation.

Avoid restaurants where:

- the recommended area is already strong,
- the contact path is unavailable,
- the likely fix requires deep custom integration before any pilot could be useful,
- the opportunity depends on claims we cannot make.
