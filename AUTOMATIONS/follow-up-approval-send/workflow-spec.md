# Workflow Spec

## Purpose

Send dashboard-approved follow-up emails using exact stored Supabase copy, then update follow-up sequence state.

## Current n8n Workflow

```text
Name: Manual Approved Follow-Up Email Sender
Workflow ID: 2OqY9oFJIOutbiX8
URL: https://digidap.dpons.duckdns.org/workflow/2OqY9oFJIOutbiX8
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: manual inactive follow-up sender
```

## Prerequisite

Apply:

```text
AUTOMATIONS/outreach-approval-send/add-follow-up-approval-fields.sql
```

Migration applied in Supabase as `20260702163026_add_follow_up_approval_fields` on 2026-07-02.

## Trigger

Current trigger:

```text
Manual Trigger
```

No schedule is enabled for the sender.

## Source Table

```text
public.prospects
```

## Query Criteria

The Supabase node fetches up to three rows with:

```text
follow_up_approved = true
follow_up_send_status = approved
next_follow_up_at <= now()
order by follow_up_approved_at asc
limit 3
```

The Code node then applies the guardrails below.

## Guardrails

Rows are blocked when any condition fails:

```text
follow_up_approved is true
follow_up_send_status is approved
follow_up_step is follow_up_1 or follow_up_2
outreach_send_status is sent
outreach_send_channel is email
contact_email is present
follow_up_draft_subject is present
follow_up_draft_body is present
demo_url starts with https://local-growth-preview.vercel.app/
next_follow_up_at is due
status is not terminal or stopped
reply_status is not terminal
follow_up_pre_send_checked_at is present
follow_up_pre_send_checklist.copy_reviewed is true
follow_up_pre_send_checklist.demo_url_verified is true
follow_up_pre_send_checklist.recipient_verified is true
follow_up_pre_send_checklist.follow_up_step_verified is true
follow_up_1 has not already been sent when follow_up_step = follow_up_1
follow_up_1 has been sent and follow_up_2 has not already been sent when follow_up_step = follow_up_2
```

Before the Gmail node sends, the Code node normalizes stored subject/body copy into:

```text
followUpEmailSubject
followUpEmailBody
```

This converts escaped newline text such as `\n`, `\r\n`, and `\r` into real line breaks so SQL-seeded or imported draft copy does not leak literal escape characters into Gmail.

Blocked rows are not emailed. They are updated with:

```text
follow_up_send_status = failed
follow_up_last_error = Guardrail blocked follow-up send: <reason>
```

## Node Outline

```text
Manual Trigger
-> Supabase: fetch approved follow-up rows
-> Code: validate follow-up send guardrails
-> IF: sendAllowed?
   -> true: Gmail sends stored follow-up copy
      -> Supabase marks follow-up sent and clears approval fields
   -> false: Supabase marks follow-up guardrail failure
```

## Success Updates

For `follow_up_1`:

```text
status = follow_up_1_sent
last_contacted_at = now()
follow_up_1_sent_at = now()
follow_up_2_due_at = now() + 7 days
next_follow_up_at = now() + 7 days
follow_up_send_status = not_ready
follow_up approval/checklist/current draft fields cleared
follow_up_last_message_id = Gmail message ID
notes appended with send evidence
```

For `follow_up_2`:

```text
status = follow_up_2_sent
last_contacted_at = now()
follow_up_2_sent_at = now()
next_follow_up_at = null
follow_up_send_status = not_ready
follow_up approval/checklist/current draft fields cleared
follow_up_last_message_id = Gmail message ID
notes appended with send evidence
```

## Validation Notes

- n8n node configs validated successfully.
- Full n8n Workflow SDK code validated successfully.
- Workflow creation succeeded in the personal n8n project.
- Live execution `729` succeeded on 2026-07-02.
- Execution `729` fetched approved row `internal-test-follow-up-reminder`, passed guardrails with `sendAllowed = true`, sent Gmail message `19f23abf832dc6dd`, marked `follow_up_1_sent_at`, cleared follow-up approval fields, and scheduled follow-up 2 for 2026-07-09.
- Pinned execution `730` validated escaped-newline normalization without sending email or updating Supabase.
- Live execution `731` succeeded on 2026-07-02.
- Execution `731` fetched approved row `internal-test-follow-up-reminder`, passed guardrails with `sendAllowed = true`, sent Gmail message `19f23c3c6de92594`, marked `follow_up_2_sent_at`, cleared `next_follow_up_at`, and cleared follow-up approval fields.
- Pinned execution `732` validated the channel guardrail without sending email or updating Supabase: an email-channel row returned `sendAllowed = true`; a contact-form row returned `sendAllowed = false` and `guardrailError = outreach_send_channel must be email`.
- Pinned execution `733` validated the channel guardrail without sending email or updating Supabase: a manual-channel row returned `sendAllowed = false` and `guardrailError = outreach_send_channel must be email`.
- Local dashboard API validation on 2026-07-02 staged `internal-test-follow-up-reminder` as contact-form, manual, and missing-channel follow-up rows. Each local `approve_follow_up_send` PATCH returned HTTP 422 and the row was restored to completed email-channel state afterward.
- Local dashboard API approval and revoke actions were validated after `.env.local` received a non-empty `SUPABASE_SERVICE_ROLE_KEY`.
