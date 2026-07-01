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

### Checklist
- [ ] Confirm which existing fields should be used as the source of truth for follow-up due dates.
- [ ] Define dashboard filter/view labels for due, upcoming, replied, and stopped follow-ups.
- [ ] Define manual follow-up record action and required confirmation copy.
- [ ] Define how `follow_up_1` and `follow_up_2` move forward after a manual update.
- [ ] Decide whether a third follow-up is intentionally unsupported for now.

### Validation
- [ ] Contacted prospect with due date appears in the follow-up queue.
- [ ] Prospect with `not_interested`, `do_not_contact`, or negative reply is excluded.
- [ ] Manual follow-up update prevents the same prospect from staying due immediately.
- [ ] Notes clearly show when and how the follow-up was recorded.

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
- [ ] Decide reminder destination: email to Diego, n8n execution output, dashboard queue, or all of these.
- [ ] Define reminder schedule, such as daily weekday morning.
- [ ] Define candidate guardrails and terminal statuses.
- [ ] Define reminder payload fields: business name, original send date, follow-up due date, draft link, demo URL, notes, reply status.
- [ ] Add dry-run mode before enabling scheduled reminders.

### Validation
- [ ] Dry-run returns only due contacted prospects.
- [ ] Dry-run excludes stopped or replied prospects.
- [ ] Reminder output includes enough context to decide what to do next.
- [ ] No Gmail/send node exists in this workflow.

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

### Checklist
- [ ] Decide whether follow-up approvals use new follow-up-specific fields.
- [ ] Define follow-up draft template rules.
- [ ] Define approval button label, likely `Approve Follow-up Send`.
- [ ] Define revoke behavior before n8n sends.
- [ ] Define n8n guardrails for follow-up send eligibility.
- [ ] Define post-send updates for first and second follow-up.
- [ ] Define how replies stop the follow-up sequence.

### Validation
- [ ] Follow-up cannot be approved without a recipient, subject, body, and stable demo URL.
- [ ] Follow-up cannot be approved for stopped/replied prospects.
- [ ] n8n can only send explicitly approved follow-up rows.
- [ ] Successful first follow-up updates `follow_up_1_sent_at` and either schedules `follow_up_2_due_at` or stops if the sequence is complete.
- [ ] Successful second follow-up updates `follow_up_2_sent_at` and clears `next_follow_up_at`.

## Recommended Implementation Order
1. Build Phase 1 first so follow-ups are visible and manually manageable.
2. Add Phase 2 reminder workflow after the manual queue is reliable.
3. Add Phase 3 approval-gated sending only after due/reminder accuracy is proven.

## Open Decisions
- Should follow-up reminders be daily, weekday-only, or manual-triggered at first?
- Should follow-ups be limited to two touches after the first email?
- Should reply detection be manual-only for now, or should Gmail/n8n help classify replies later?
- Should contact-form/manual-channel prospects have separate follow-up rules from email prospects?
- Should follow-up copy be generated by Codex during QA or stored as templates in Supabase?

## Issue Checklist
- [x] Create one implementation plan covering the three approved recommendations.
- [x] Include database/status assumptions and open decisions.
- [x] Include phased checklist and validation criteria.
- [x] Explicitly mark fully automatic follow-up sending as out of scope.
- [ ] Use this plan to create scoped implementation issues when Diego approves the next phase.
