# Supabase Schema

## Table

```text
public.prospects
```

## Migration

Applied migration:

```text
add_prospect_outreach_approval_fields
```

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

`outreach_send_status`:

```text
not_ready
ready_for_review
approved
queued
sent
failed
skipped
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
  and demo_url like 'https://roof-check-preview.vercel.app/%';
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
