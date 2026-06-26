# Prospect Tracker

Use this tracker for the first 30 roofing prospects.

## Status Values

```text
Not contacted
Contacted
Delivery issue
Contact form sent
Follow-up 1 sent
Follow-up 2 sent
Positive reply
Neutral reply
Negative reply
Call booked
Paid pilot
Not a fit
```

## Automation Approval Fields

Supabase is the source of truth for approval-gated sending.

The regular `status` field tracks whether the prospect has actually been contacted. The `outreach_send_status` field tracks where that prospect is in the automation approval/send workflow.

Use these fields before any n8n send workflow:

```text
outreach_send_status
outreach_approved
outreach_approved_at
outreach_approved_by
outreach_batch_id
outreach_send_channel
outreach_draft_subject
outreach_draft_body
outreach_draft_path
outreach_pre_send_checked_at
outreach_pre_send_checked_by
outreach_pre_send_checklist
outreach_last_error
```

Draft preparation should set `outreach_send_status = ready_for_review`.

Only Diego approval should set:

```text
outreach_approved = true
outreach_send_status = approved
```

The initial n8n sender should only send approved rows where `outreach_send_channel = email`. Contact-form prospects remain manual until a separate workflow exists.

## Prospects

| # | Business | Website | City/State | Contact Method | Reviews | Page Reviewed | Observed Issue | Outreach Angle | Date Contacted | Follow-Up 1 | Follow-Up 2 | Reply | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Charger Roofing | https://charger-roofing.com/roof-hail-damage-in-san-antonio-texas/ | San Antonio, TX | Website contact form sent; Sales@Charger-Roofing.com had delivery issue | Not captured | San Antonio hail damage page | Has the right free inspection offer, but the request path can be made more focused and easier to act on after a storm. | Sent focused hail inspection landing page demo: https://roof-check-preview.vercel.app/charger-roofing | 2026-06-23 4:53 PM ET via contact form | 2026-06-30 4:53 PM ET | Optional only if still worth pursuing | Email bounced / forwarding blocked; contact form sent | Contact form sent | Initial email produced Gmail 550 5.7.520 forwarding-blocked bounce. Short contact-form message sent afterward through https://charger-roofing.com/contact/. |
| 2 | LOA Construction | https://www.loaconstruction.com/blog/after-the-hail-surge-in-austin-roof-inspections-and-claims/ | Austin, TX | Verified public phone 512-375-3654; contact page phones 855-661-3431 and 512-645-1687; no verified business email | 5.0 stars / 1,000+ reviews shown in footer | Hail storm inspection article | Hail inspection content is blog-style and asks storm visitors to read through many topics before taking action. | Focused Austin hail inspection demo ready for review: https://local-growth-preview.vercel.app/loa-construction |  |  |  |  | Ready for review | Pre-send check completed 2026-06-26. Relationship remains not_contacted until Diego sends manually. Do not use email automation unless an email is verified. |
| 3 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 4 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 5 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 6 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 7 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 8 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 9 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 10 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 11 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 12 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 13 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 14 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 15 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 16 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 17 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 18 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 19 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 20 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 21 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 22 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 23 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 24 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 25 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 26 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 27 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 28 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 29 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
| 30 |  |  |  |  |  |  |  |  |  |  |  |  | Not contacted |  |
