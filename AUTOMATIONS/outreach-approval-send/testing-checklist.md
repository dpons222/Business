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
- [x] Guardrail node accepts only `https://local-growth-preview.vercel.app/...` demo URLs for new outreach.
- [x] Workflow can run in test mode without sending.

Dry-run evidence:

```text
Workflow: Approved Outreach Dry Run
Workflow ID: BcSmomoXyNpouHeP
Pinned test execution: 677
Local-growth-preview guardrail retest execution: 692
Result: success
```

## Send Test

- [x] Use one internal/test recipient first.
- [x] Confirm exact approved subject is sent.
- [x] Confirm exact approved body is sent.
- [x] Confirm demo URL is the stable production alias.
- [x] Confirm Supabase status updates only after send success.
- [x] Confirm failed sends write `outreach_last_error`.

Internal send evidence:

```text
Workflow: Approved Outreach Internal Gmail Send Test
Workflow ID: sHtbTyLTxm5nYs8v
Pinned test execution: 681
Live internal send execution: 682
Pinned local-growth-preview guardrail retest execution: 694
Recipient: digidaps@gmail.com
Subject: Internal test: Roof Check dashboard dry run
Gmail message ID: 19efaf543aae87db
Result: success
```

Approved sender evidence:

```text
Workflow: Manual Approved Prospect Email Sender
Workflow ID: 5cyJ9A7RaQ1ZGBtJ
Pinned success-path test execution: 684
Pinned guardrail-failure test execution: 685
Pinned no-limit branch test execution: 686
Pinned local-growth-preview guardrail retest execution: 693
Default batchLimit: 3
noLimit supported: true
Result: success
Live prospect emails sent: 0
```

June 26, 2026 guardrail retest:

```text
Dry run execution 692:
- accepted https://local-growth-preview.vercel.app/test-business
- blocked https://roof-check-preview.vercel.app/test-business

Manual approved sender execution 693:
- routed https://local-growth-preview.vercel.app/test-business through the pinned Gmail success path
- blocked generated deployment URL https://local-growth-preview-abcd1234-dpons222-9388s-projects.vercel.app/test-business
- Gmail and Supabase action nodes were pinned, so no real email or database mutation occurred

Internal Gmail test execution 694:
- accepted https://local-growth-preview.vercel.app/dashboard with pinned Gmail output
- Gmail action node was pinned, so no email was sent

Supabase safety check:
- approved rows: 0
- outreach_send_status = approved rows: 0
- eligible unsent/unapproved old-domain rows: 0
- unsent/not-ready or ready-for-review rows on local-growth-preview: 30
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
- [ ] The workflow sends old `roof-check-preview.vercel.app` URLs for new outreach.
- [ ] Contact-form prospects are treated as email sends.
- [ ] Supabase send status is not updated reliably.
