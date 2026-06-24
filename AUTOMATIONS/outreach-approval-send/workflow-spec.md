# Workflow Spec

## Purpose

Send outbound email outreach for approved prospects, then update Supabase with send and follow-up tracking.

This workflow should start as a manual-trigger n8n workflow. Scheduled sending can be considered only after the manual approval/send loop has been validated.

## Trigger

Recommended first trigger:

```text
Manual Trigger
```

Optional later trigger:

```text
Schedule Trigger
```

The scheduled trigger must still query only approved rows.

## Source Table

```text
public.prospects
```

## Query Criteria

n8n should send only rows matching:

```sql
select *
from public.prospects
where outreach_approved = true
  and outreach_send_status = 'approved'
  and outreach_send_channel = 'email'
  and contact_email is not null
  and outreach_draft_subject is not null
  and outreach_draft_body is not null
  and demo_url like 'https://roof-check-preview.vercel.app/%'
order by outreach_approved_at asc
limit 5;
```

## Node Outline

```text
Manual Trigger
-> Supabase: fetch approved prospect rows
-> IF: no rows found
   -> Stop / return "No approved outreach rows"
-> Split In Batches
-> Code: validate guardrails
-> Gmail or email provider: send exact approved subject/body
-> Supabase: mark sent or failed
-> Optional notification to Diego with send summary
```

## Guardrail Validation

Before sending each row, n8n must verify:

```text
outreach_approved is true
outreach_send_status is approved
outreach_send_channel is email
contact_email is present
outreach_draft_subject is present
outreach_draft_body is present
demo_url starts with https://roof-check-preview.vercel.app/
outreach_pre_send_checked_at is present
outreach_pre_send_checklist.copy_reviewed is true
outreach_pre_send_checklist.demo_url_verified is true
outreach_pre_send_checklist.contact_method_verified is true
```

If any guardrail fails, do not send that row. Mark it:

```text
outreach_send_status = failed
outreach_last_error = clear reason
```

## Success Update

After a successful email send, update:

```text
status = contacted
date_contacted = now()
last_contacted_at = now()
follow_up_1_due_at = now() + interval '5 days'
next_follow_up_at = now() + interval '5 days'
outreach_send_status = sent
outreach_last_error = null
```

Append or preserve notes with:

```text
Sent approved outreach email through n8n.
```

## Failure Update

If send fails, update:

```text
outreach_send_status = failed
outreach_last_error = error message
```

Do not change `status` to `contacted` unless the email provider confirms send success.

## Contact Form Prospects

Prospects with:

```text
outreach_send_channel = contact_form
```

should not go through this email sender. A later workflow can create manual tasks or browser-assisted form submission steps, but those need separate approval and validation.

## Rate Limit

Start with a batch size of 3-5 prospects. Do not send larger batches until reply quality, deliverability, and tracking are validated.

## Safety

- Never generate new copy inside n8n.
- Never rewrite approved drafts during send.
- Never send immutable Vercel deployment URLs.
- Never send rows without explicit approval.
- Never send follow-ups without a separate approval rule or follow-up workflow.
