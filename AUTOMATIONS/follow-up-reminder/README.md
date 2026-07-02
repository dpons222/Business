# Follow-Up Reminder Automation

This automation surfaces due follow-up candidates for Diego review. It does not send prospect-facing emails.

## Current Status

- n8n workflow created: `Due Follow-Up Internal Reminder`.
- Workflow ID: `dLb7yaXxVUeoPOoc`.
- Workflow URL: `https://digidap.dpons.duckdns.org/workflow/dLb7yaXxVUeoPOoc`.
- Workflow project: `Diego digidaps@gmail.com <digidaps@gmail.com>` personal project.
- Trigger: manual only.
- Reminder destination: internal Gmail reminder to `digidaps@gmail.com` when due candidates exist, plus n8n execution output.
- Email/Gmail/send nodes: one Gmail node that sends only to Diego.
- Prospect-facing email/send nodes: none.
- Schedule decision: daily reminders after activation; not enabled yet.
- Manual execution `719` completed successfully and returned `candidateCount: 0` with `sendsEmail: false`.
- Manual execution `720` completed successfully and returned `candidateCount: 0`, `reminderStatus = no_due_follow_ups`, and `emailSent = false`.
- Pinned positive-path execution `721` completed successfully and routed one candidate to the internal Gmail reminder branch with `sentTo = digidaps@gmail.com`.
- Internal Supabase test row `internal-test-follow-up-reminder` was created on 2026-07-02 for live reminder testing.
- Live manual execution `727` completed successfully, found `internal-test-follow-up-reminder`, and sent the internal reminder to `digidaps@gmail.com`.
- Reminder email copy now tells Diego to check the dashboard queue, send any follow-up manually if appropriate, and use `Record Follow-up` after sending.

## Purpose

The workflow helps identify contacted prospects whose follow-up date is due, then reminds Diego internally with enough context to decide the next manual action.

## Source of Truth

`public.prospects.next_follow_up_at` is the due-date source of truth for reminder eligibility.

## Internal Test Row

Use this Supabase row for live manual reminder testing:

```text
prospect_slug: internal-test-follow-up-reminder
business_name: Internal Test Follow-Up Reminder
contact_email: digidaps@gmail.com
status: contacted
outreach_send_status: sent
next_follow_up_at: due in the past
reply_status: null
```

Running the workflow manually while this row remains due should send one internal reminder to `digidaps@gmail.com`. It must not send email to any prospect address.

Step-specific audit fields remain:

```text
date_contacted
last_contacted_at
follow_up_1_due_at
follow_up_1_sent_at
follow_up_2_due_at
follow_up_2_sent_at
reply_status
notes
```

## Safety Boundary

- This workflow may send an internal reminder only to `digidaps@gmail.com`.
- It must not include Gmail, email, SMTP, webhook-to-prospect, or other send nodes that contact prospects.
- It must not update Supabase rows.
- Diego should review the dashboard follow-up queue before sending a manual follow-up, then use `Record Follow-up` after the follow-up is sent outside n8n.

## Files

- `workflow-spec.md`: n8n workflow design, query criteria, payload shape, and validation notes.
