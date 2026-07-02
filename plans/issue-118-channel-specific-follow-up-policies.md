# Issue 118 - Channel-Specific Follow-Up Policies

## Goal
Plan a small follow-up enhancement that makes follow-up behavior depend on the original outreach channel, so email prospects can use approval-gated Gmail follow-up sends while contact-form and manual-channel prospects stay reminder/manual-record only.

## Context
- Issue #116 added approval-gated follow-up sending with follow-up-specific approval fields.
- The current follow-up workflow uses shared follow-up rules across `email`, `contact_form`, and `manual` prospects.
- Shared rules were acceptable for the first safe rollout, but the channels are operationally different:
  - Email can be sent and tracked through Gmail with message IDs.
  - Contact-form outreach often lacks a reusable thread, reliable recipient address, or proof that a form submission was delivered.
  - Manual outreach can mean phone, social DM, direct email, referral, or another channel that requires human evidence.

## Approved Direction
Use a channel policy layer, not duplicated workflows.

Keep one prospect record and one dashboard follow-up queue, but make follow-up actions depend on `outreach_send_channel` and, if needed later, `follow_up_send_channel`.

## Explicitly Out of Scope
- Implementing code changes in this planning step.
- Enabling fully automatic follow-up sends without human approval.
- Auto-sending follow-ups for contact-form or manual-channel prospects.
- Gmail/n8n reply classification.
- Changing the already validated email-channel approval-gated follow-up sender beyond adding stricter channel guardrails.
- Creating separate dashboards or separate n8n workflows per channel unless later evidence shows the policy layer is insufficient.

## Proposed Channel Policies

### Email
Email-channel prospects can use the existing approval-gated follow-up sender.

Policy:
- `can_auto_send_followups = true`
- `reminder_only = false`
- `requires_manual_evidence = false`
- Default follow-up timing remains the existing sequence.
- Follow-up sender may send only after dashboard approval.

Expected dashboard behavior:
- Show stored follow-up subject/body.
- Show confirmation checkbox.
- Allow `Approve Follow-up Send` when readiness checks pass.
- Allow revoke while approved and before n8n sends.

Expected n8n behavior:
- Send only when `outreach_send_channel = email`.
- Send only stored Supabase copy.
- Preserve all existing approval and stopped/replied guardrails.
- Store Gmail message ID after send.

### Contact Form
Contact-form prospects should remain reminder/manual-record only.

Policy:
- `can_auto_send_followups = false`
- `reminder_only = true`
- `requires_manual_evidence = true`
- Default follow-up timing can stay shared for now.

Expected dashboard behavior:
- Hide or disable `Approve Follow-up Send`.
- Show `Manual follow-up required`.
- Prefer `Record Manual Follow-up` with a required note/evidence field.
- Prompt Diego to record where the follow-up happened, such as form URL, message summary, or screenshot/reference note.

Expected n8n behavior:
- Include due rows in internal reminder output.
- Do not send prospect-facing email.
- Follow-up sender must block these rows even if approval fields are accidentally set.

### Manual
Manual-channel prospects should remain reminder/manual-record only.

Policy:
- `can_auto_send_followups = false`
- `reminder_only = true`
- `requires_manual_evidence = true`
- Default follow-up timing can stay shared for now.

Expected dashboard behavior:
- Hide or disable `Approve Follow-up Send`.
- Show `Manual follow-up required`.
- Require note/evidence when recording a manual follow-up.
- Allow the note to describe phone, DM, direct email, referral, or other manual channel.

Expected n8n behavior:
- Include due rows in internal reminder output.
- Do not send prospect-facing email.
- Follow-up sender must block these rows even if approval fields are accidentally set.

## Data Design Options

### Option A: Use Existing Fields Only
Use `outreach_send_channel` as the source of truth for follow-up channel policy.

Pros:
- Smallest change.
- No migration needed.
- Easy to add n8n guardrail: `outreach_send_channel = email`.

Cons:
- Less explicit when a future follow-up should intentionally use a different channel from the first outreach.
- Manual evidence may continue living only in freeform `notes`.

Recommendation:
- Use Option A for the first implementation pass unless manual evidence becomes messy.

### Option B: Add Minimal Follow-Up Evidence Fields
Keep `outreach_send_channel` as the default policy source, but add fields for manual follow-up evidence.

Possible fields:
- `follow_up_manual_evidence jsonb`
- `follow_up_manual_sent_at timestamptz`
- `follow_up_manual_sent_by text`

Pros:
- Cleaner audit trail for contact-form/manual follow-ups.
- Avoids overloading `notes`.

Cons:
- Requires migration and UI work.
- May be premature until real manual follow-up volume grows.

Recommendation:
- Defer this unless notes become insufficient.

### Option C: Add `follow_up_send_channel`
Add a channel field specifically for the follow-up action.

Possible values:
- `email`
- `contact_form`
- `phone`
- `facebook`
- `instagram`
- `linkedin`
- `manual`
- `other`

Pros:
- Most flexible long term.
- Allows first outreach by contact form and later follow-up by email if Diego intentionally chooses that.

Cons:
- More UI and validation complexity.
- Easy to overbuild before real usage patterns exist.

Recommendation:
- Defer until there is evidence that follow-up channel often differs from original outreach channel.

## Recommended First Implementation
Use Option A plus stricter UI/n8n policy.

Implementation summary:
- Add a small channel policy helper in dashboard code.
- Use `outreach_send_channel` to decide whether the follow-up panel is approval-send or manual-record only.
- Add n8n sender guardrail requiring `outreach_send_channel = email`.
- Keep current reminder workflow behavior: all due eligible prospects can appear in Diego's reminder, regardless of channel.
- Use existing manual follow-up recording and `notes` for contact-form/manual evidence in the first pass.

## Proposed Implementation Phases

### Phase 1 - Policy Definition In Code
Objective: Centralize channel-specific behavior so dashboard and API checks use the same rules.

Tasks:
- [ ] Add or define a `followUpChannelPolicies` map.
- [ ] Support at least `email`, `contact_form`, and `manual`.
- [ ] Default unknown or missing channel to safest behavior: reminder/manual-record only.
- [ ] Keep email-channel behavior compatible with Issue #116.

Validation:
- [ ] Email-channel draft reports approval-send eligible when all other checks pass.
- [ ] Contact-form-channel draft reports manual-record only.
- [ ] Manual-channel draft reports manual-record only.
- [ ] Missing channel does not allow automated follow-up send.

### Phase 2 - Dashboard Behavior
Objective: Make the follow-up panel clearly show the right action for each channel.

Tasks:
- [ ] For `email`, keep `Approve Follow-up Send`.
- [ ] For `contact_form`, disable/hide approval and show manual follow-up required.
- [ ] For `manual`, disable/hide approval and show manual follow-up required.
- [ ] Ensure copy is operational and not over-explaining implementation details.
- [ ] Preserve `Record Follow-up` behavior for manual completion.

Validation:
- [ ] Email row shows approval controls.
- [ ] Contact-form row does not show an active automated send approval button.
- [ ] Manual row does not show an active automated send approval button.
- [ ] Text fits and does not overlap in desktop/mobile dashboard views.

### Phase 3 - API And n8n Guardrails
Objective: Prevent accidental automated sends for non-email channels even if UI or data is wrong.

Tasks:
- [ ] Update dashboard/API approval blockers so `approve_follow_up_send` requires `outreach_send_channel = email`.
- [ ] Update `Manual Approved Follow-Up Email Sender` n8n Code node to require `outreach_send_channel = email`.
- [ ] Update workflow docs with the channel guardrail.

Validation:
- [ ] API rejects approval for contact-form rows.
- [ ] API rejects approval for manual rows.
- [ ] n8n sender blocks contact-form rows even if approval fields are manually set.
- [ ] n8n sender blocks manual rows even if approval fields are manually set.
- [ ] n8n sender still sends approved email-channel internal test row.

### Phase 4 - Internal Test Rows
Objective: Validate behavior safely without prospect-facing mistakes.

Tasks:
- [ ] Prepare or create internal email-channel due follow-up test row.
- [ ] Prepare or create internal contact-form-channel due follow-up test row.
- [ ] Prepare or create internal manual-channel due follow-up test row.
- [ ] Restore internal rows after tests so no accidental sends remain queued.

Validation:
- [ ] Email test row can be approved and sent only after dashboard approval.
- [ ] Contact-form test row appears in reminder/manual queue but cannot be approved for n8n send.
- [ ] Manual test row appears in reminder/manual queue but cannot be approved for n8n send.
- [ ] No non-email prospect-facing send occurs.

## Proposed n8n Guardrail Addition
Add this guardrail to `Manual Approved Follow-Up Email Sender`:

```text
outreach_send_channel must equal email
```

Blocked rows should be updated with:

```text
follow_up_send_status = failed
follow_up_last_error = Guardrail blocked follow-up send: outreach_send_channel must be email
```

## Proposed Dashboard Rule
When `outreach_send_channel !== "email"`:

```text
Approve Follow-up Send is unavailable.
Use Record Follow-up after sending manually through the original or chosen manual channel.
```

The UI should avoid making this feel like an error. It is an intentional safety policy.

## Open Decisions
- [ ] Should missing `outreach_send_channel` default to manual-only, or should those rows be treated as needing data cleanup?
- [ ] Should manual evidence stay in `notes` for now, or should a small `follow_up_manual_evidence` field be added immediately?
- [ ] Should contact-form/manual follow-up timing stay at the same 7-day cadence as email follow-ups?
- [ ] Should the internal reminder email label contact-form/manual rows differently from email rows?

## Acceptance Criteria
- [ ] Plan reviewed and approved before implementation.
- [ ] No implementation changes are made as part of this planning step.
- [ ] Issue #118 is used for future implementation tracking.
- [ ] Implementation can be split into small code/n8n changes with safe internal validation.

## Safety Notes
- The default for unknown or non-email channels should be no automated prospect-facing send.
- The reminder workflow can still include all due eligible channels because it emails Diego only.
- The sender workflow must be stricter than the dashboard UI.
- Internal test rows must be restored after validation.
