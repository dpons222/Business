# Follow-Up Approval Send Automation

This automation sends prospect-facing follow-up emails only after Diego approves the exact stored follow-up copy in the dashboard.

## Current Status

- n8n workflow created: `Manual Approved Follow-Up Email Sender`.
- Workflow ID: `2OqY9oFJIOutbiX8`.
- Workflow URL: `https://digidap.dpons.duckdns.org/workflow/2OqY9oFJIOutbiX8`.
- Workflow project: `Diego digidaps@gmail.com <digidaps@gmail.com>` personal project.
- Trigger: manual only.
- Schedule: not enabled.
- Batch limit: 3 approved follow-up rows per manual run.
- Database migration applied: `20260702163026_add_follow_up_approval_fields`.
- Live internal validation: execution `729` sent follow-up 1 for `internal-test-follow-up-reminder` to `digidaps@gmail.com` and stored Gmail message ID `19f23abf832dc6dd`.
- Live internal validation: execution `731` sent follow-up 2 for `internal-test-follow-up-reminder` to `digidaps@gmail.com`, stored Gmail message ID `19f23c3c6de92594`, and cleared `next_follow_up_at`.
- Local dashboard API approval and revoke validation passed with `SUPABASE_SERVICE_ROLE_KEY` populated in `.env.local`.

## Safety Boundary

- n8n sends only rows where `follow_up_approved = true` and `follow_up_send_status = approved`.
- n8n sends only stored Supabase copy from `follow_up_draft_subject` and `follow_up_draft_body`.
- n8n must not generate or rewrite follow-up copy.
- n8n normalizes escaped newline sequences in stored copy before Gmail sends.
- Replied, stopped, terminal, already-followed-up, or missing-checklist rows are blocked.
- The workflow remains manual; scheduling or production activation should wait until Diego explicitly approves recurring follow-up sending.

## Files

- `workflow-spec.md`: workflow design, guardrails, and post-send updates.
