# Workflow Spec

## Purpose

Send outbound email outreach for approved prospects, then update Supabase with send and follow-up tracking.

This workflow should start as a manual-trigger n8n workflow. Scheduled sending can be considered only after the manual approval/send loop has been validated.

## Current n8n Draft

Dry-run workflow:

```text
Name: Approved Outreach Dry Run
Workflow ID: BcSmomoXyNpouHeP
URL: https://digidap.dpons.duckdns.org/workflow/BcSmomoXyNpouHeP
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual dry run only
Last pinned test execution: 677
Last real-data dry-run execution: 679
```

The current workflow does not include Gmail, email-provider, Supabase update, schedule, or publish steps. It only reads candidate Supabase rows, validates guardrails, and returns a dry-run review payload.

Internal Gmail send test workflow:

```text
Name: Approved Outreach Internal Gmail Send Test
Workflow ID: sHtbTyLTxm5nYs8v
URL: https://digidap.dpons.duckdns.org/workflow/sHtbTyLTxm5nYs8v
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual internal-send test only
Pinned test execution: 681
Live internal send execution: 682
Gmail message ID: 19efaf543aae87db
```

The internal send workflow fetches only `prospect_slug = internal-test-digidap-dashboard` and `contact_email = digidaps@gmail.com`, then sends the exact stored subject/body to `digidaps@gmail.com`. It is not a real prospect sender.

Manual approved prospect sender workflow:

```text
Name: Manual Approved Prospect Email Sender
Workflow ID: 5cyJ9A7RaQ1ZGBtJ
URL: https://digidap.dpons.duckdns.org/workflow/5cyJ9A7RaQ1ZGBtJ
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual approved sender only
Default batchLimit: 3
Supports noLimit: true via Sender Config
Pinned success-path test execution: 684
Pinned guardrail-failure test execution: 685
Pinned no-limit branch test execution: 686
```

The manual approved sender has not been executed against live prospect rows. It must be run only after Diego approves rows in Supabase and the dry-run workflow passes.

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

Current dry-run workflow:

```text
Manual Trigger
-> Supabase: fetch approved email outreach rows
-> Code: validate guardrails
-> Set: prepare dry-run review output
```

Current internal Gmail send test workflow:

```text
Manual Trigger
-> Supabase: fetch only internal test outreach row
-> Code: validate internal-only guardrails
-> Gmail: send exact stored subject/body to digidaps@gmail.com
-> Set: prepare internal send result
```

Future sender revision:

```text
Manual Trigger
-> Set: Sender Config
   -> batchLimit = 3 by default
   -> noLimit = false by default
-> IF: Use No Limit?
   -> true: Supabase fetch all approved email rows
   -> false: Supabase fetch approved email rows up to batchLimit
-> Code: validate guardrails
-> IF: guardrails passed?
   -> true: Gmail sends exact approved subject/body
      -> Code: normalize Gmail result
      -> IF: Gmail message ID exists?
         -> true: Supabase marks sent/contacted and sets follow-up dates
         -> false: Supabase marks failed with Gmail error
   -> false: Supabase marks failed with guardrail error
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

The internal Gmail send test adds stricter checks:

```text
prospect_slug is internal-test-digidap-dashboard
contact_email is digidaps@gmail.com
metadata.is_internal_test is true
metadata.do_not_send_real_outreach is true
outreach_pre_send_checklist.internal_test is true
```

If any guardrail fails, do not send that row. Mark it:

```text
outreach_send_status = failed
outreach_last_error = clear reason
```

In the current dry-run workflow, failed guardrails are returned in `guardrail_errors` and no database mutation occurs.

In the approved sender workflow, failed guardrails update the row:

```text
outreach_send_status = failed
outreach_last_error = Guardrail blocked send: ...
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

Start with a batch size of 3 prospects. Do not send larger batches until reply quality, deliverability, and tracking are validated.

The approved sender's `Sender Config` node controls batch size:

```text
batchLimit = 3
noLimit = false
```

To intentionally send every currently approved email row, set:

```text
noLimit = true
```

Use `noLimit = true` only after checking the dry-run output and confirming every approved row should be sent.

## Safety

- Never generate new copy inside n8n.
- Never rewrite approved drafts during send.
- Never send immutable Vercel deployment URLs.
- Never send rows without explicit approval.
- Never send follow-ups without a separate approval rule or follow-up workflow.
