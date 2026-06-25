# Prospect Tracker

Use `prospect-tracker.csv` for active tracking. This file explains the fields and status values.

## Fields

- `business_name`: restaurant name.
- `website`: main website or Google Business Profile if no site exists.
- `city_state`: restaurant market.
- `cuisine_or_concept`: cuisine, service style, or concept.
- `target_offer`: catering, private dining, events, seasonal reservations, takeout, gift cards, or another focused action.
- `contact_method`: email, contact form, phone, Instagram, or other approved path.
- `current_page_reviewed`: page reviewed before outreach.
- `observed_issue`: specific conversion issue or missed opportunity.
- `personalized_outreach_angle`: one-line reason the page idea fits this restaurant.
- `brand_palette_source`: logo, website CSS, button colors, or screenshot sampling.
- `demo_url`: demo link if one exists.
- `date_contacted`: date first outreach was sent.
- `follow_up_1`: first follow-up date.
- `follow_up_2`: second follow-up date.
- `reply`: reply summary.
- `status`: current outreach status.
- `notes`: extra context.

## Status Values

```text
not_started
researched
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

- a clear high-value action,
- public menu or offer details,
- visible brand colors or logo,
- reachable owner, manager, events, or catering contact,
- weak or unclear current page flow for the target action.

Avoid restaurants where:

- the action is already well presented,
- the contact path is unavailable,
- the owner would need custom platform integration before any page could be useful,
- the opportunity depends on claims we cannot make.
