# Outreach Approval Send Automation

This automation is the human-approved n8n email send workflow for outbound prospect outreach.

It is not an autonomous cold-email sender. The purpose is to let Codex prepare small batches, let the dashboard user review the exact demos and drafts, and then allow the manual n8n sender to send only approved records.

## Current Status

- Supabase approval/send fields added to `public.prospects`.
- Workflow contract documented.
- n8n dry-run workflow created: `Approved Outreach Dry Run`.
- Workflow ID: `BcSmomoXyNpouHeP`.
- Workflow URL: `https://digidap.dpons.duckdns.org/workflow/BcSmomoXyNpouHeP`.
- Workflow project: `Diego digidaps@gmail.com <digidaps@gmail.com>` personal project.
- Internal Gmail send test workflow created: `Approved Outreach Internal Gmail Send Test`.
- Internal send workflow ID: `sHtbTyLTxm5nYs8v`.
- Internal send workflow URL: `https://digidap.dpons.duckdns.org/workflow/sHtbTyLTxm5nYs8v`.
- Internal test execution `682` sent one email to `digidaps@gmail.com` using the stored internal test row.
- Manual approved prospect sender workflow created: `Manual Approved Prospect Email Sender`.
- Approved sender workflow ID: `5cyJ9A7RaQ1ZGBtJ`.
- Approved sender workflow URL: `https://digidap.dpons.duckdns.org/workflow/5cyJ9A7RaQ1ZGBtJ`.
- Sender default batch limit is `3`; set `noLimit = true` in `Sender Config` only for an intentional all-approved-row run.
- Sender guardrails now require `https://local-growth-preview.vercel.app/...` demo URLs and were retested with pinned data on June 26, 2026.
- All workflows are manual-trigger only and are not published or scheduled.
- Real prospect emails are sent only when the manual approved sender workflow is run against dashboard-approved rows.

## Intended Operating Model

```text
1. Codex prepares a batch of 3-5 prospects.
2. Codex completes the pre-send checklist for each prospect.
3. The dashboard user reviews the live demo, draft, recipient/contact method, and fit.
4. The dashboard user clicks `Approve for n8n Send`, which approves specific rows in Supabase.
5. n8n validates only approved email rows and sends the email.
6. After a real outbound send, n8n updates Supabase to `status = contacted` and `outreach_send_status = sent`.
```

## Human Approval Boundary

The system must not send an email until a dashboard user explicitly approves the exact draft and demo link. n8n workflows remain manual-trigger only unless the operating model is intentionally changed.

Approval is represented in Supabase by:

```text
outreach_approved = true
outreach_send_status = approved
outreach_send_channel = email
outreach_approved_at is not null
outreach_approved_by is not null
```

The dashboard records the logged-in username in `outreach_approved_by`.

## Status Field Meanings

`public.prospects.status` tracks the relationship/contact lifecycle:

```text
not_contacted = no outbound outreach has been sent yet
contacted = an outbound email or contact form message was actually sent
```

`public.prospects.outreach_send_status` tracks the automation approval/send lifecycle:

```text
not_ready = draft, demo, contact method, or checklist evidence is incomplete
ready_for_review = Codex prepared the draft/demo and a dashboard user needs to review it
approved = dashboard user approved the exact draft and demo URL for n8n email sending
approved_for_draft = legacy/reserved state for a draft-only Gmail workflow
draft_created = legacy/reserved state for a draft-only Gmail workflow
queued = n8n picked up the row and is preparing or attempting the send
sent = the email provider confirmed the message was sent
failed = n8n or the email provider failed the send attempt
skipped = n8n or the operator intentionally skipped the row
```

Rule of thumb: `status` answers whether the prospect has been contacted; `outreach_send_status` answers where the row is in the approval/send workflow.

## Files

- `workflow-spec.md`: n8n workflow stages, inputs, output updates, and guardrails.
- `supabase-schema.md`: fields added to `public.prospects` for approval-gated sending.
- `testing-checklist.md`: checks required before a sender workflow can be published.
- `add-prospect-outreach-approval-fields.sql`: SQL migration applied to Supabase.

## Related Docs

- `EXPERIMENTS/001-roofing-landing-page-service/marketing/README.md`
- `EXPERIMENTS/001-roofing-landing-page-service/marketing/outreach-script.md`
- `AUTOMATIONS/digidap-lead-capture/README.md`

## Rule

No autonomous sending. The manual n8n sender may send email only for records that pass the approval gate and pre-send checklist.
