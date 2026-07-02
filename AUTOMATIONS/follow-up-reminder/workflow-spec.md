# Workflow Spec

## Purpose

Identify due follow-up candidates and send Diego an internal reminder when candidates exist. This workflow does not send prospect-facing emails, create prospect drafts, or update Supabase.

## Current n8n Workflow

```text
Name: Due Follow-Up Internal Reminder
Workflow ID: dLb7yaXxVUeoPOoc
URL: https://digidap.dpons.duckdns.org/workflow/dLb7yaXxVUeoPOoc
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: manual internal reminder only
Latest verified execution: 719
Latest live no-due execution: 720
Latest pinned positive-path execution: 721
Internal test row setup execution: 725
Latest live positive-row execution: 727
```

## Trigger

Current trigger:

```text
Manual Trigger
```

Optional later trigger after activation:

```text
Schedule Trigger, daily morning
```

Do not enable scheduling until Diego confirms recurring internal reminder emails should start.

## Source Table

```text
public.prospects
```

## Initial Query Criteria

The Supabase node fetches likely due rows with:

```text
outreach_send_status = sent
next_follow_up_at <= now()
order by next_follow_up_at asc
limit 10
```

The Code node then applies the terminal/reply guardrails below.

## Guardrails

Rows are excluded from the review output when:

```text
status is do_not_contact
status is not_interested
status is positive_reply
status is negative_reply
status is won
status is lost
status is not_fit
reply_status is positive_reply
reply_status is negative_reply
reply_status is not_interested
next_follow_up_at is missing
next_follow_up_at is in the future
outreach_send_status is not sent
```

## Node Outline

```text
Manual Trigger
-> Supabase: fetch due follow-up candidates
-> Code: filter terminal/replied rows and prepare dry-run review output
-> IF: candidateCount > 0?
   -> true: Gmail sends internal reminder to digidaps@gmail.com
      -> Set: prepare reminder send result
   -> false: Set: prepare no-due result
```

There is one Gmail node. It is internal-only and sends to `digidaps@gmail.com`. There are no prospect-facing send nodes.

## Review Payload

The Code node returns one dry-run item:

```json
{
  "dryRun": true,
  "sendsEmail": false,
  "candidateCount": 0,
  "generatedAt": "ISO timestamp",
  "reviewInstructions": "Check the dashboard follow-up queue, send any follow-up manually if appropriate, then use Record Follow-up in the dashboard after it is sent.",
  "candidates": [
    {
      "prospect_slug": "example-roofing",
      "business_name": "Example Roofing",
      "contact_email": "owner@example.com",
      "status": "contacted",
      "date_contacted": "ISO timestamp",
      "last_contacted_at": "ISO timestamp",
      "next_follow_up_at": "ISO timestamp",
      "follow_up_1_due_at": "ISO timestamp",
      "follow_up_1_sent_at": null,
      "follow_up_2_due_at": null,
      "follow_up_2_sent_at": null,
      "demo_url": "https://local-growth-preview.vercel.app/example-roofing",
      "notes": "Initial outreach sent.",
      "reply_status": null
    }
  ]
}
```

## Internal Reminder Email

When `candidateCount > 0`, the Gmail node sends one plain-text email:

```text
To: digidaps@gmail.com
Subject: Due follow-up reminder: <count> prospect(s)
Body: review instructions plus each candidate's business name, slug, email, status, due date, last contacted date, demo URL, reply status, and notes.
```

The workflow does not email any candidate address.

## Internal Test Row

The row below was created in `public.prospects` on 2026-07-02 by temporary helper workflow `KHtaaBOEi4ap7RWR`, execution `725`. The helper workflow was archived after the row was created.

```text
prospect_slug: internal-test-follow-up-reminder
business_name: Internal Test Follow-Up Reminder
contact_email: digidaps@gmail.com
status: contacted
outreach_send_status: sent
outreach_send_channel: email
next_follow_up_at: 2026-07-02T14:13:39.815+00:00
follow_up_1_due_at: 2026-07-02T14:13:39.812+00:00
reply_status: null
metadata.is_internal_test: true
metadata.do_not_send_real_outreach: true
```

Expected result when running `Due Follow-Up Internal Reminder` manually with this row still due:

```text
candidateCount >= 1
candidates includes internal-test-follow-up-reminder
reminderStatus = sent_to_diego
emailSent = true
sentTo = digidaps@gmail.com
```

Live execution `727` confirmed this expected result on 2026-07-02.

## Validation Notes

- n8n node configs validated successfully.
- Full n8n Workflow SDK code validated successfully.
- Workflow creation succeeded in the personal n8n project.
- Manual execution `718` succeeded but Supabase returned zero rows, so the downstream Code node did not run.
- The Supabase node was updated with `alwaysOutputData = true` so zero-row runs still produce an empty review payload.
- Manual execution `719` succeeded and returned:

```json
{
  "dryRun": true,
  "sendsEmail": false,
  "candidateCount": 0,
  "candidates": []
}
```
- Workflow renamed to `Due Follow-Up Internal Reminder`.
- Manual execution `720` succeeded with no due candidates and returned `reminderStatus = no_due_follow_ups`, `emailSent = false`.
- Pinned positive-path execution `721` succeeded with one candidate and returned `reminderStatus = sent_to_diego`, `emailSent = true`, `sentTo = digidaps@gmail.com`, and pinned Gmail message ID `pinned-gmail-message-id`.
- Temporary helper execution `725` created internal Supabase test row `internal-test-follow-up-reminder` and confirmed it is due for follow-up reminder testing.
- Live execution `727` succeeded with `candidateCount = 1`, included `internal-test-follow-up-reminder`, sent the internal Gmail reminder to `digidaps@gmail.com`, and returned Gmail message ID `19f237422bb8c987`.
- The reminder email copy was updated after execution `727` to remove the sentence `This workflow does not send prospect-facing email.` and clarify that `Record Follow-up` is used after Diego sends a follow-up manually.

## Next Validation Step

Compare the returned candidate against the dashboard follow-up queue, then decide whether Phase 2 is ready for a weekday schedule or should remain manual-only.
