# Issue 53: Outreach Approval Automation Foundation

GitHub Issue: https://github.com/dpons222/Business/issues/53

## Objective

Create the foundation for a human-approved outreach automation workflow.

The target operating model is:

```text
Codex prepares a batch -> Diego reviews demos and drafts -> approved rows are marked in Supabase -> n8n sends approved email outreach -> Supabase/tracker records the send and follow-up dates
```

This issue intentionally stops before building or publishing the actual n8n sender workflow.

## Branch

```text
issue-53-outreach-approval-automation
```

## Base Commit

```text
28999ff
```

## Scope

### In Scope

- Add approval/send tracking fields to `public.prospects`.
- Document the approval-gated n8n workflow contract.
- Add automation docs under `AUTOMATIONS/outreach-approval-send/`.
- Update marketing docs with batch preparation and approval rules.
- Keep email sending manual/disabled until a later n8n implementation issue.

### Out Of Scope

- Sending outreach.
- Publishing an n8n sender workflow.
- Auto-sending without Diego approval.
- Changing prospect demo pages.
- Rewriting all outreach copy.

## Checklist

- [x] GitHub Issue #53 created.
- [x] Branch `issue-53-outreach-approval-automation` created.
- [x] Session-start comment posted.
- [x] Supabase `public.prospects` inspected before schema change.
- [x] Supabase migration applied for approval/send fields.
- [x] Supabase migration verified.
- [x] Automation docs added.
- [x] Marketing docs updated.
- [x] Schema docs updated.
- [x] Validation completed.
- [ ] Commit and push.
- [ ] Open PR.
- [ ] Merge to `main`.
- [ ] Close Issue #53.

## Supabase Fields Added

The migration `add_prospect_outreach_approval_fields` added:

```text
outreach_send_status
outreach_approved
outreach_approved_at
outreach_approved_by
outreach_batch_id
outreach_send_channel
outreach_draft_subject
outreach_draft_body
outreach_draft_path
outreach_pre_send_checked_at
outreach_pre_send_checked_by
outreach_pre_send_checklist
outreach_last_error
```

Allowed `outreach_send_status` values:

```text
not_ready
ready_for_review
approved
queued
sent
failed
skipped
```

Allowed `outreach_send_channel` values:

```text
email
contact_form
manual
```

## Approval Gate

n8n must only send records where all are true:

```text
outreach_approved = true
outreach_send_status = approved
outreach_send_channel = email
contact_email is not null
outreach_draft_subject is not null
outreach_draft_body is not null
demo_url starts with https://roof-check-preview.vercel.app/
```

Contact form prospects should not be sent by email automation. They should be converted into manual tasks or handled by a separate browser/manual workflow.

## Validation Plan

- Verify Supabase columns exist.
- Verify docs contain the approval gate and status definitions.
- Search for accidental auto-send language.
- Confirm no outreach has been sent.
- `git diff --check`.
