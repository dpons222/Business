# Outreach Approval Send Automation

This automation is the planned human-approved send workflow for outbound prospect outreach.

It is not an autonomous cold-email sender. The purpose is to let Codex prepare small batches, let Diego review the exact demos and drafts, and then allow n8n to send only approved records.

## Current Status

- Supabase approval/send fields added to `public.prospects`.
- Workflow contract documented.
- n8n workflow is not built or published yet.
- No emails are sent by this automation yet.

## Intended Operating Model

```text
1. Codex prepares a batch of 3-5 prospects.
2. Codex completes the pre-send checklist for each prospect.
3. Diego reviews the live demo, draft, recipient/contact method, and fit.
4. Diego approves specific rows in Supabase.
5. n8n sends only approved email rows.
6. n8n writes send results and follow-up dates back to Supabase.
```

## Human Approval Boundary

The system must not send outreach until Diego explicitly approves the exact draft and demo link.

Approval is represented in Supabase by:

```text
outreach_approved = true
outreach_send_status = approved
outreach_approved_at is not null
outreach_approved_by is not null
```

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

No autonomous sending. n8n may send only records that pass the approval gate and pre-send checklist.
