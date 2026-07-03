# Supabase Schema

## Table

```text
public.prospects
```

## Migration

Applied migration:

```text
add_prospect_outreach_approval_fields
create_prospect_email_drafts_view
add_urls_to_prospect_email_drafts_view
add_contact_status_to_prospect_email_drafts_view
add_prospect_relationship_outcome_statuses
add_follow_up_approval_fields
add_dashboard_focus_items
```

## Dashboard Focus List

`public.dashboard_focus_items` stores the shared dashboard Focus list. It is intentionally global, not per user, and is managed through trusted dashboard API routes with localStorage fallback in the dashboard UI.

| Column | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `prospect_slug` | `text` | yes |  | Dashboard entry slug currently in focus. May reference a Supabase prospect row or a local-only demo entry. |
| `added_at` | `timestamptz` | yes | `now()` | Timestamp used for newest-first Focus list ordering. |
| `added_by` | `text` | no |  | Dashboard username or operator who added the prospect. |

## Views

`public.prospect_email_drafts` is a review-only helper view for the Supabase Table Editor.

| View Column | Source Column | Purpose |
| --- | --- | --- |
| `business_name` | `prospects.business_name` | Prospect business name |
| `business_email` | `prospects.contact_email` | Public business email / outreach target |
| `website` | `prospects.website` | Prospect's current website |
| `demo_url` | `prospects.demo_url` | DigiDap demo preview page |
| `email_draft_subject` | `prospects.outreach_draft_subject` | Stored email draft subject |
| `email_draft_body` | `prospects.outreach_draft_body` | Stored email draft body |
| `contact_status` | `prospects.status` | Relationship/contact lifecycle, such as `not_contacted` or `contacted` |

## Added Columns

| Column | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `outreach_send_status` | `text` | yes | `not_ready` | n8n send readiness/status |
| `outreach_approved` | `boolean` | yes | `false` | explicit human approval gate |
| `outreach_approved_at` | `timestamptz` | no |  | approval timestamp |
| `outreach_approved_by` | `text` | no |  | approver/operator |
| `outreach_batch_id` | `text` | no |  | grouped review batch ID |
| `outreach_send_channel` | `text` | no |  | `email`, `contact_form`, or `manual` |
| `outreach_draft_subject` | `text` | no |  | exact approved email subject |
| `outreach_draft_body` | `text` | no |  | exact approved email/contact message |
| `outreach_draft_path` | `text` | no |  | repo path to source draft |
| `outreach_pre_send_checked_at` | `timestamptz` | no |  | checklist completion timestamp |
| `outreach_pre_send_checked_by` | `text` | no |  | checklist operator |
| `outreach_pre_send_checklist` | `jsonb` | yes | `{}` | structured checklist evidence |
| `outreach_last_error` | `text` | no |  | latest send/guardrail error |

## Follow-Up Approval Columns

These fields are intentionally separate from `outreach_*` so first outreach approval/sending cannot be confused with follow-up approval/sending.

| Column | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `follow_up_send_status` | `text` | yes | `not_ready` | follow-up n8n send readiness/status |
| `follow_up_approved` | `boolean` | yes | `false` | explicit human approval gate for follow-up sends |
| `follow_up_approved_at` | `timestamptz` | no |  | follow-up approval timestamp |
| `follow_up_approved_by` | `text` | no |  | approver/operator |
| `follow_up_step` | `text` | no |  | `follow_up_1` or `follow_up_2` |
| `follow_up_draft_subject` | `text` | no |  | exact approved follow-up subject |
| `follow_up_draft_body` | `text` | no |  | exact approved follow-up body |
| `follow_up_pre_send_checked_at` | `timestamptz` | no |  | follow-up checklist completion timestamp |
| `follow_up_pre_send_checked_by` | `text` | no |  | checklist operator |
| `follow_up_pre_send_checklist` | `jsonb` | yes | `{}` | structured follow-up pre-send checklist evidence |
| `follow_up_last_error` | `text` | no |  | latest follow-up send/guardrail error |
| `follow_up_last_message_id` | `text` | no |  | latest follow-up Gmail message ID |

## Status Values

`status`:

```text
not_contacted = no outbound outreach has been sent yet
contacted = an outbound email or contact form message was actually sent
do_not_contact = internal decision not to pursue before outreach
not_interested = prospect indicated no interest after outreach
follow_up_1_due = first follow-up is due
follow_up_1_sent = first follow-up was sent or manually recorded
follow_up_2_due = second follow-up is due
follow_up_2_sent = second follow-up was sent or manually recorded
positive_reply = prospect replied with positive interest
neutral_reply = prospect replied but needs review before more outreach
negative_reply = prospect replied negatively
```

`outreach_send_status`:

```text
not_ready = draft, demo, contact method, or checklist evidence is incomplete
ready_for_review = Codex prepared the draft/demo and the dashboard user needs to review it
approved = dashboard user approved the exact draft and demo URL for n8n sending
queued = n8n picked up the row and is preparing or attempting the send
sent = the email provider confirmed the message was sent
failed = n8n or the email provider failed the send attempt
skipped = n8n or the operator intentionally skipped the row
```

`outreach_send_channel`:

```text
email
contact_form
manual
```

`follow_up_send_status`:

```text
not_ready = follow-up draft, contact details, demo URL, or checklist evidence is incomplete
ready_for_review = exact follow-up draft is stored and ready for dashboard review
approved = dashboard user approved the exact follow-up copy/demo/recipient for n8n sending
queued = n8n picked up the row and is preparing or attempting the follow-up send
sent = provider confirmed the follow-up message was sent
failed = n8n or the provider failed the follow-up send attempt
skipped = n8n or the operator intentionally skipped the follow-up row
```

`follow_up_step`:

```text
follow_up_1
follow_up_2
```

## Checklist JSON Shape

Recommended `outreach_pre_send_checklist`:

```json
{
  "copy_reviewed": true,
  "demo_url_verified": true,
  "stable_demo_url": true,
  "current_page_verified": true,
  "contact_method_verified": true,
  "brand_colors_verified": true,
  "supabase_update_ready": true,
  "reviewed_by": "dashboard user",
  "reviewed_at": "2026-06-24T00:00:00Z"
}
```

## Approval Query

Rows are eligible for email sending only when:

```sql
select *
from public.prospects
where outreach_approved = true
  and outreach_send_status = 'approved'
  and outreach_send_channel = 'email'
  and contact_email is not null
  and outreach_draft_subject is not null
  and outreach_draft_body is not null
  and demo_url like 'https://local-growth-preview.vercel.app/%';
```

## Example Approval Update

```sql
update public.prospects
set outreach_send_status = 'approved',
    outreach_approved = true,
    outreach_approved_at = now(),
    outreach_approved_by = '<logged-in dashboard username>',
    outreach_batch_id = 'roofing-2026-06-batch-01',
    outreach_send_channel = 'email',
    outreach_pre_send_checked_at = now(),
    outreach_pre_send_checked_by = 'Codex',
    outreach_pre_send_checklist = jsonb_build_object(
      'copy_reviewed', true,
      'demo_url_verified', true,
      'stable_demo_url', true,
      'current_page_verified', true,
      'contact_method_verified', true,
      'brand_colors_verified', true,
      'supabase_update_ready', true
    )
where prospect_slug = 'example-roofing';
```

Do not approve records with missing emails or contact-form-only outreach unless the workflow is designed for that channel.

## Follow-Up Approval Query

Rows are eligible for follow-up email sending only when:

```sql
select *
from public.prospects
where follow_up_approved = true
  and follow_up_send_status = 'approved'
  and follow_up_step in ('follow_up_1', 'follow_up_2')
  and outreach_send_status = 'sent'
  and contact_email is not null
  and follow_up_draft_subject is not null
  and follow_up_draft_body is not null
  and demo_url like 'https://local-growth-preview.vercel.app/%'
  and next_follow_up_at <= now()
  and status not in ('do_not_contact', 'not_interested', 'positive_reply', 'negative_reply', 'won', 'lost', 'not_fit')
  and (reply_status is null or reply_status not in ('positive_reply', 'negative_reply', 'not_interested'));
```

Additional n8n guardrails:

```text
follow_up_step = follow_up_1 requires follow_up_1_sent_at is null
follow_up_step = follow_up_2 requires follow_up_1_sent_at is not null and follow_up_2_sent_at is null
follow_up_pre_send_checked_at is present
follow_up_pre_send_checklist.copy_reviewed is true
follow_up_pre_send_checklist.demo_url_verified is true
follow_up_pre_send_checklist.recipient_verified is true
follow_up_pre_send_checklist.follow_up_step_verified is true
```

## Example Follow-Up Approval Update

```sql
update public.prospects
set follow_up_send_status = 'approved',
    follow_up_approved = true,
    follow_up_approved_at = now(),
    follow_up_approved_by = '<logged-in dashboard username>',
    follow_up_step = 'follow_up_1',
    follow_up_pre_send_checked_at = now(),
    follow_up_pre_send_checked_by = '<logged-in dashboard username>',
    follow_up_pre_send_checklist = jsonb_build_object(
      'copy_reviewed', true,
      'demo_url_verified', true,
      'recipient_verified', true,
      'follow_up_step_verified', true,
      'manual_reply_check_complete', true,
      'approved_from_dashboard', true
    ),
    follow_up_last_error = null
where prospect_slug = 'example-roofing';
```

Follow-up copy should be stored in `follow_up_draft_subject` and `follow_up_draft_body` before approval. Codex may help draft or QA copy, but n8n must send only the exact stored Supabase copy.

## Manual Follow-Up Fields

The dashboard follow-up queue uses `next_follow_up_at` as the source of truth for whether a contacted prospect is due or upcoming. Step-specific audit fields remain:

```text
follow_up_1_due_at
follow_up_1_sent_at
follow_up_2_due_at
follow_up_2_sent_at
last_contacted_at
reply_status
```

Manual follow-up recording updates the relevant sent timestamp, `last_contacted_at`, `status`, `next_follow_up_at`, and `notes`. Recording follow-up 2 clears `next_follow_up_at`; a third follow-up is not supported in the dashboard workflow.

## Supabase Column Comments

Supabase column comments are the in-database reference for these fields:

```sql
comment on column public.prospects.status is
  'Relationship/contact lifecycle for the prospect: not_contacted = eligible and unsent; contacted = outbound message sent; do_not_contact = internal decision not to pursue; not_interested = prospect indicated no interest; other values track follow-up and pipeline outcomes.';

comment on column public.prospects.outreach_send_status is
  'Approval-gated automation lifecycle for outbound outreach: not_ready = draft/demo/contact details are incomplete; ready_for_review = prepared for dashboard review; approved = exact draft and demo URL approved for n8n when outreach_approved is true; queued = picked up by automation; sent = provider confirmed send; failed = send attempt failed; skipped = intentionally skipped by guardrail or operator decision.';

comment on column public.prospects.outreach_approved is
  'Human approval gate for automated outreach. Must be true, alongside outreach_send_status = approved and completed pre-send evidence, before n8n may send an email.';

comment on column public.prospects.follow_up_send_status is
  'Approval-gated automation lifecycle for follow-up outreach: not_ready = draft/checklist incomplete; ready_for_review = stored draft ready for dashboard review; approved = exact follow-up approved for n8n send; queued = picked up by automation; sent = provider confirmed send; failed = send attempt failed; skipped = intentionally skipped.';

comment on column public.prospects.follow_up_approved is
  'Human approval gate for automated follow-up outreach. Must be true, alongside follow_up_send_status = approved and completed follow-up pre-send evidence, before n8n may send a follow-up email.';

comment on column public.prospects.follow_up_step is
  'The follow-up step currently being reviewed or sent: follow_up_1 or follow_up_2.';
```
