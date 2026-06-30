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
```

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

## Status Values

`status`:

```text
not_contacted = no outbound outreach has been sent yet
contacted = an outbound email or contact form message was actually sent
do_not_contact = internal decision not to pursue before outreach
not_interested = prospect indicated no interest after outreach
```

`outreach_send_status`:

```text
not_ready = draft, demo, contact method, or checklist evidence is incomplete
ready_for_review = Codex prepared the draft/demo and Diego needs to review it
approved = Diego approved the exact draft and demo URL for n8n sending
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
  "reviewed_by": "Diego",
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
    outreach_approved_by = 'Diego',
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

## Supabase Column Comments

Supabase column comments are the in-database reference for these fields:

```sql
comment on column public.prospects.status is
  'Relationship/contact lifecycle for the prospect: not_contacted = eligible and unsent; contacted = outbound message sent; do_not_contact = internal decision not to pursue; not_interested = prospect indicated no interest; other values track follow-up and pipeline outcomes.';

comment on column public.prospects.outreach_send_status is
  'Approval-gated automation lifecycle for outbound outreach: not_ready = draft/demo/contact details are incomplete; ready_for_review = prepared for Diego review; approved = exact draft and demo URL approved for n8n when outreach_approved is true; queued = picked up by automation; sent = provider confirmed send; failed = send attempt failed; skipped = intentionally skipped by guardrail or operator decision.';

comment on column public.prospects.outreach_approved is
  'Human approval gate for automated outreach. Must be true, alongside outreach_send_status = approved and completed pre-send evidence, before n8n may send an email.';
```
