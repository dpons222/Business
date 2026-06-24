# Issue 55 - n8n Approved Outreach Sender

## Context

Build the first n8n automation step for approved outbound outreach. The immediate goal is not autonomous sending; it is a manual dry-run workflow that reads only explicitly approved Supabase prospect rows and validates the pre-send guardrails before a future sender revision exists.

## Scope

In scope:

- Create a manual n8n workflow draft for approved outreach rows.
- Read from `public.prospects` using the approval/send fields.
- Validate demo URL, recipient, approved draft, send channel, status, and pre-send checklist.
- Keep the workflow dry-run only with no Gmail/email send node.
- Document workflow ID, safety status, and next steps.

Out of scope:

- Sending real prospect emails.
- Publishing or scheduling the workflow.
- Writing send/failure status updates back to Supabase.
- Automating follow-ups.

## Checklist

- [x] Confirm issue branch and base workflow context.
- [x] Read n8n SDK reference and node configuration requirements.
- [x] Confirm available Supabase credential and `prospects` table fields.
- [x] Validate n8n node configs before creating workflow.
- [x] Validate full n8n workflow code.
- [x] Create n8n workflow draft.
- [x] Run pinned dry-run test without sending email.
- [x] Update automation docs with workflow ID and status.
- [ ] Commit and push branch.
- [ ] Post issue closeout after validation and commit.

## n8n Workflow

```text
Name: Approved Outreach Dry Run
Workflow ID: BcSmomoXyNpouHeP
URL: https://digidap.dpons.duckdns.org/workflow/BcSmomoXyNpouHeP
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual dry run only
Pinned test execution: 677
```

## Validation

- `validate_node_config`: passed for Manual Trigger, Supabase getAll, Code, and Set nodes.
- `validate_workflow`: passed with 5 canvas items.
- `test_workflow`: passed with pinned data; no live Supabase call and no email send.

## Next Step

Run the workflow against real approved Supabase rows after Diego reviews and approves a small batch. Only after that should a separate sender revision add an internal-test Gmail send path.
