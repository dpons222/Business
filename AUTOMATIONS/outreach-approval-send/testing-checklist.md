# Testing Checklist

Use this checklist before publishing any n8n sender workflow.

## Pre-Build

- [ ] Manual outreach process has been run successfully for at least one prospect.
- [ ] Supabase `public.prospects` has approval/send fields.
- [ ] A batch of 3-5 prospects has been prepared.
- [ ] Each prospect has a stable production demo URL.
- [ ] Each draft has been reviewed by Diego.
- [ ] Each row has explicit approval fields set.

## n8n Dry Run

- [x] Query configured to return only approved rows.
- [x] Query configured to exclude unapproved rows.
- [x] Query configured to exclude contact-form-only rows from email sending.
- [x] Guardrail node blocks rows with missing subject/body/email.
- [x] Guardrail node blocks immutable Vercel deployment URLs.
- [x] Workflow can run in test mode without sending.

Dry-run evidence:

```text
Workflow: Approved Outreach Dry Run
Workflow ID: BcSmomoXyNpouHeP
Pinned test execution: 677
Result: success
```

## Send Test

- [x] Use one internal/test recipient first.
- [x] Confirm exact approved subject is sent.
- [x] Confirm exact approved body is sent.
- [x] Confirm demo URL is the stable production alias.
- [ ] Confirm Supabase status updates only after send success.
- [ ] Confirm failed sends write `outreach_last_error`.

Internal send evidence:

```text
Workflow: Approved Outreach Internal Gmail Send Test
Workflow ID: sHtbTyLTxm5nYs8v
Pinned test execution: 681
Live internal send execution: 682
Recipient: digidaps@gmail.com
Subject: Internal test: Roof Check dashboard dry run
Gmail message ID: 19efaf543aae87db
Result: success
```

## Production Pilot

- [ ] Send no more than 3-5 prospects in the first batch.
- [ ] Confirm Gmail/email provider deliverability.
- [ ] Confirm Supabase status and follow-up dates.
- [ ] Confirm prospect tracker is updated or intentionally replaced by Supabase.
- [ ] Review replies before enabling follow-up automation.

## Do Not Publish If

- [ ] Any unapproved row can be sent.
- [ ] n8n can generate or rewrite copy during send.
- [ ] The workflow sends old immutable Vercel deployment URLs.
- [ ] Contact-form prospects are treated as email sends.
- [ ] Supabase send status is not updated reliably.
