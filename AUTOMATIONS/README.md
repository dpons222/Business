# AUTOMATIONS

Use this directory for automation plans, workflow specs, and operational automation notes.

## What Belongs Here

- n8n workflow plans
- Zapier workflow notes
- CRM automation specs
- Reporting automation specs
- Outreach automation plans
- Internal operations workflows

## Current Automations

- [DigiDap lead capture](digidap-lead-capture/README.md) - website form to n8n, Supabase, and email notification.
- [Follow-up approval send](follow-up-approval-send/README.md) - manual approved follow-up email sender using follow-up-specific Supabase approval fields.
- [Follow-up reminder](follow-up-reminder/README.md) - manual dry-run n8n workflow that surfaces due follow-up candidates without sending emails.
- [Lead growth pipeline](lead-growth-pipeline/README.md) - draft-only lead sourcing, qualification, diagnosis, prospect package, and Gmail draft handoff scaffold.
- [Outreach approval send](outreach-approval-send/README.md) - planned human-approved prospect outreach sender using Supabase and n8n.

## Rule

Do not automate a process until the manual version has been validated or clearly defined.

For outreach, do not automate sending without an explicit approval gate. Codex may prepare drafts and checklist evidence, but n8n should send only rows that Diego has approved.
