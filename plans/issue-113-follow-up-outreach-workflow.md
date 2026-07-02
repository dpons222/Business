# Issue 113 - Approval-Gated Follow-Up Outreach Workflow

## Goal
Plan a conservative follow-up workflow for contacted prospects that helps Diego track and prepare follow-ups without enabling fully automatic follow-up sending.

## Approved Scope
- Phase 1: Manual follow-up tracking in Supabase/dashboard.
- Phase 2: n8n reminder workflow for due follow-ups.
- Phase 3: Dashboard approval path for follow-up sends.

## Explicitly Out of Scope
- Fully automatic follow-up sending without human approval.
- Implementing code, migrations, or n8n workflows in this planning step.
- Changing the existing first-email approval sender behavior.
- Sending follow-ups to prospects marked `do_not_contact`, `not_interested`, `positive_reply`, `negative_reply`, or any terminal/non-eligible status.

## Current System Context
- First outreach is sent only from approved rows where `outreach_approved = true`, `outreach_send_status = approved`, and `outreach_send_channel = email`.
- After a successful first send, n8n should set `status = contacted`, `outreach_send_status = sent`, `date_contacted = now()`, `last_contacted_at = now()`, and follow-up due fields.
- Manual contacts recorded in the dashboard also set the prospect to contacted/sent and assign a follow-up date.
- Existing follow-up-related fields include:
  - `date_contacted`
  - `last_contacted_at`
  - `follow_up_1_due_at`
  - `follow_up_1_sent_at`
  - `follow_up_2_due_at`
  - `follow_up_2_sent_at`
  - `next_follow_up_at`
  - `reply_status`
  - `reply_summary`
- Existing relationship/status values include:
  - `contacted`
  - `follow_up_1_due`
  - `follow_up_1_sent`
  - `follow_up_2_due`
  - `follow_up_2_sent`
  - `positive_reply`
  - `neutral_reply`
  - `negative_reply`
  - `do_not_contact`
  - `not_interested`

## Phase 1 - Manual Follow-Up Tracking

### Objective
Make contacted prospects easier to manage manually before any follow-up automation sends or drafts anything.

### Proposed Behavior
- Dashboard shows a clear follow-up queue for contacted prospects with `next_follow_up_at <= now()`.
- Dashboard separates:
  - Due now
  - Upcoming
  - Already followed up
  - Replied or stopped
- Dashboard lets Diego update follow-up state manually after he sends a follow-up outside n8n.
- Manual follow-up recording should update:
  - `last_contacted_at`
  - the relevant `follow_up_1_sent_at` or `follow_up_2_sent_at`
  - `next_follow_up_at`
  - `status`, such as `follow_up_1_sent` or `follow_up_2_sent`
  - `notes`

### Phase 1 Implementation Decisions
- `next_follow_up_at` is the dashboard queue source of truth.
- `follow_up_1_due_at` and `follow_up_2_due_at` remain the step-specific due-date audit fields.
- The dashboard labels follow-up rows as `Due now`, `Upcoming`, `Already followed up`, and `Replied or stopped`.
- Manual follow-up recording requires explicit checkbox confirmation that the follow-up was already sent outside n8n.
- Recording follow-up 1 sets `follow_up_1_sent_at`, `status = follow_up_1_sent`, schedules `follow_up_2_due_at`, and moves `next_follow_up_at`.
- Recording follow-up 2 sets `follow_up_2_sent_at`, `status = follow_up_2_sent`, and clears `next_follow_up_at`.
- A third follow-up is intentionally unsupported for now.

### Checklist
- [x] Confirm which existing fields should be used as the source of truth for follow-up due dates.
- [x] Define dashboard filter/view labels for due, upcoming, replied, and stopped follow-ups.
- [x] Define manual follow-up record action and required confirmation copy.
- [x] Define how `follow_up_1` and `follow_up_2` move forward after a manual update.
- [x] Decide whether a third follow-up is intentionally unsupported for now.

### Validation
- [x] Contacted prospect with due date appears in the follow-up queue.
- [x] Prospect with `not_interested`, `do_not_contact`, or negative reply is excluded.
- [x] Manual follow-up update prevents the same prospect from staying due immediately.
- [x] Notes clearly show when and how the follow-up was recorded.

## Phase 2 - n8n Follow-Up Reminder Workflow

### Objective
Use n8n to identify due follow-ups and notify Diego or prepare a review list, without sending emails.

### Proposed Behavior
- n8n runs on a schedule or manual trigger.
- It fetches due follow-up candidates where:
  - `status` indicates the prospect was contacted or is due for follow-up.
  - `next_follow_up_at <= now()`.
  - `reply_status` is null or not terminal.
  - `outreach_send_status = sent`.
  - prospect is not `do_not_contact`, `not_interested`, `positive_reply`, `negative_reply`, or otherwise stopped.
- n8n sends Diego a summary or writes a review queue output.
- n8n does not send any prospect-facing emails in this phase.

### Phase 2 Implementation Decisions
- Reminder destination is an internal Gmail reminder to `digidaps@gmail.com` when due candidates exist, plus n8n execution output.
- Trigger is manual-only at first; weekday morning scheduling is intentionally deferred until dry-run output is reviewed.
- Candidate guardrails exclude stopped, terminal, and replied prospects.
- The workflow uses a Supabase fetch node plus a Code node for final guardrail filtering and review-payload formatting.
- One Gmail node is included for internal reminders only; no prospect-facing send node is included.
- Workflow created: `Due Follow-Up Internal Reminder`.
- Workflow ID: `dLb7yaXxVUeoPOoc`.
- Workflow URL: `https://digidap.dpons.duckdns.org/workflow/dLb7yaXxVUeoPOoc`.
- Workflow project: `Diego digidaps@gmail.com <digidaps@gmail.com>` personal project.
- Verified execution `719` returned an empty review payload with `candidateCount = 0` and `sendsEmail = false`.
- Verified execution `720` returned no due follow-ups with `emailSent = false`.
- Pinned positive-path execution `721` routed one candidate to the internal Gmail reminder branch with `sentTo = digidaps@gmail.com`.
- Internal Supabase test row `internal-test-follow-up-reminder` was created on 2026-07-02 for live reminder testing.
- Live execution `727` found `internal-test-follow-up-reminder` and sent the internal reminder to `digidaps@gmail.com`.
- Reminder email copy now directs Diego to check the dashboard queue, send any follow-up manually if appropriate, and use `Record Follow-up` after sending.

### Candidate Query Shape
```sql
select *
from public.prospects
where outreach_send_status = 'sent'
  and next_follow_up_at <= now()
  and status not in ('do_not_contact', 'not_interested', 'positive_reply', 'negative_reply')
  and (reply_status is null or reply_status not in ('positive_reply', 'negative_reply', 'not_interested'))
order by next_follow_up_at asc
limit 10;
```

### Checklist
- [x] Decide reminder destination: email to Diego, n8n execution output, dashboard queue, or all of these.
- [x] Define reminder schedule, such as daily weekday morning.
- [x] Define candidate guardrails and terminal statuses.
- [x] Define reminder payload fields: business name, original send date, follow-up due date, draft link, demo URL, notes, reply status.
- [x] Add dry-run mode before enabling scheduled reminders.

### Validation
- [x] Dry-run returns only due contacted prospects.
- [ ] Dry-run excludes stopped or replied prospects.
- [x] Reminder output includes enough context to decide what to do next.
- [x] No prospect-facing Gmail/send node exists in this workflow.

Validation note: n8n node configs and full Workflow SDK code validated successfully, and the workflow was created. Manual execution `720` succeeded with no due candidates and no email. Pinned positive-path execution `721` confirmed the internal reminder branch. Live execution `727` confirmed the internal reminder email path against Supabase test row `internal-test-follow-up-reminder`.

## Phase 3 - Dashboard Approval Path For Follow-Up Sends

### Objective
Allow Diego to review a prepared follow-up and explicitly approve n8n to send it, similar to the first-email approval flow.

### Proposed Behavior
- Dashboard shows a follow-up draft section for due contacted prospects.
- Follow-up draft must be reviewed before approval.
- Approval should require a confirmation checkbox that the exact recipient, subject, body, and demo URL were reviewed.
- Approval should set a follow-up-specific approval state, not reuse first-email approval ambiguously.
- n8n sends only follow-up rows that are explicitly approved for follow-up send.
- After successful send, n8n updates the relevant sent timestamp and next follow-up state.

### Data Design Options To Decide
Option A: Reuse existing `outreach_*` fields with a new `outreach_send_status` lifecycle for follow-ups.
- Simpler schema.
- Risk: first outreach and follow-up approval states can become ambiguous.

Option B: Add follow-up-specific fields.
- Clearer and safer for approval gating.
- Possible fields:
  - `follow_up_send_status`
  - `follow_up_approved`
  - `follow_up_approved_at`
  - `follow_up_approved_by`
  - `follow_up_draft_subject`
  - `follow_up_draft_body`
  - `follow_up_last_error`
- Recommendation: prefer Option B if we implement approval-gated sending.

### Phase 3 Implementation Decisions
- Use Option B: add follow-up-specific approval/send fields instead of reusing first-outreach approval state.
- Store the exact follow-up subject/body in Supabase before approval. Codex may draft or QA copy, but Supabase is the source of truth for what gets approved and sent.
- Approval button label: `Approve Follow-up Send`.
- Revoke behavior: allow revoking only while `follow_up_send_status = approved`; revocation returns the row to `ready_for_review` and clears approval metadata without changing sent timestamps.
- n8n guardrails: send only rows with `follow_up_approved = true`, `follow_up_send_status = approved`, valid follow-up step, stored subject/body, stable demo URL, non-terminal status, no reply status, and no existing sent timestamp for that step.
- Post-send behavior: follow-up 1 sets `follow_up_1_sent_at`, `status = follow_up_1_sent`, schedules `follow_up_2_due_at`, moves `next_follow_up_at`, and clears follow-up approval fields. Follow-up 2 sets `follow_up_2_sent_at`, `status = follow_up_2_sent`, clears `next_follow_up_at`, and clears follow-up approval fields.
- Replies stop the follow-up sequence manually for now: dashboard outcome actions or future reply-status controls should clear `next_follow_up_at` and clear follow-up approval fields.
- Follow-up reminders should run daily after manual validation.
- Limit the sequence to two follow-up touches after the first email.
- Use shared follow-up rules for email, manual, and contact-form prospects for now; channel-specific rules can be revisited after real response data exists.
- Later Gmail/n8n reply classification can read inbox replies, match by recipient/thread, classify sentiment, and update `reply_status`, but that is out of scope for this phase.
- New migration file: `AUTOMATIONS/outreach-approval-send/add-follow-up-approval-fields.sql`.
- Dashboard/API implementation reads and writes follow-up-specific approval fields with a compatibility fallback before the migration is applied.
- Workflow created: `Manual Approved Follow-Up Email Sender`.
- Workflow ID: `2OqY9oFJIOutbiX8`.
- Workflow URL: `https://digidap.dpons.duckdns.org/workflow/2OqY9oFJIOutbiX8`.
- Workflow status: manual/inactive; live internal follow-up 1 validation has passed.
- Supabase migration `20260702163026_add_follow_up_approval_fields` applied on 2026-07-02.
- Internal approved follow-up test row: `internal-test-follow-up-reminder`.
- Live execution `729` sent follow-up 1 to `digidaps@gmail.com`, stored Gmail message ID `19f23abf832dc6dd`, set `status = follow_up_1_sent`, and scheduled follow-up 2 for 2026-07-09.
- Live execution `731` sent follow-up 2 to `digidaps@gmail.com`, stored Gmail message ID `19f23c3c6de92594`, set `status = follow_up_2_sent`, cleared `next_follow_up_at`, and cleared follow-up approval/draft fields.
- Local dashboard API approval and revoke validation passed after `SUPABASE_SERVICE_ROLE_KEY` was populated in `.env.local`.

### Checklist
- [x] Decide whether follow-up approvals use new follow-up-specific fields.
- [x] Define follow-up draft template rules.
- [x] Define approval button label, likely `Approve Follow-up Send`.
- [x] Define revoke behavior before n8n sends.
- [x] Define n8n guardrails for follow-up send eligibility.
- [x] Define post-send updates for first and second follow-up.
- [x] Define how replies stop the follow-up sequence.

### Validation
- [x] Follow-up cannot be approved without a recipient, subject, body, and stable demo URL.
- [x] Follow-up cannot be approved for stopped/replied prospects.
- [x] n8n can only send explicitly approved follow-up rows.
- [x] Successful first follow-up updates `follow_up_1_sent_at` and either schedules `follow_up_2_due_at` or stops if the sequence is complete.
- [x] Successful second follow-up updates `follow_up_2_sent_at` and clears `next_follow_up_at`.
- [x] Dashboard API approval action writes follow-up approval metadata to Supabase.
- [x] Dashboard API revoke action clears follow-up approval metadata before n8n sends.

Validation note: Dashboard/API build passes and n8n workflow validation passes. Supabase migration `20260702163026_add_follow_up_approval_fields` is applied. Live executions `729` and `731` validated the approved follow-up 1 and follow-up 2 send paths against internal row `internal-test-follow-up-reminder`. Local dashboard API approval and revoke actions were validated after `SUPABASE_SERVICE_ROLE_KEY` was populated locally; the internal row was restored to completed `follow_up_2_sent` state afterward.

## Recommended Implementation Order
1. Build Phase 1 first so follow-ups are visible and manually manageable.
2. Add Phase 2 reminder workflow after the manual queue is reliable.
3. Add Phase 3 approval-gated sending only after due/reminder accuracy is proven.

## Open Decisions
- [x] Follow-up reminders should be daily after manual validation.
- [x] Follow-ups are limited to two touches after the first email.
- [x] Reply detection is manual-only for now; Gmail/n8n classification is a later enhancement.
- [x] Contact-form/manual-channel prospects use the same follow-up rules as email prospects for now.
- [x] Follow-up copy should be stored in Supabase, with Codex used only to draft or QA copy before approval.

## Issue Checklist
- [x] Create one implementation plan covering the three approved recommendations.
- [x] Include database/status assumptions and open decisions.
- [x] Include phased checklist and validation criteria.
- [x] Explicitly mark fully automatic follow-up sending as out of scope.
- [x] Use this plan to create scoped implementation issues when Diego approves the next phase.

## Implementation Issues
- Phase 1: GitHub Issue #114 - Add manual follow-up tracking dashboard workflow.
- Phase 2: GitHub Issue #115 - Add n8n due follow-up reminder dry run.
