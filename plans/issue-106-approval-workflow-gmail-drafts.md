# Issue 106 - Approval Workflow For Gmail Draft Outreach

## Context

Add an approval-gated dashboard workflow for prospects whose outreach should be prepared as Gmail drafts by n8n. The dashboard should sync approval state to Supabase, but it must not send outreach, mark rows contacted, or let a casual toggle queue real messages.

Base commit: `1c396662f17873293be4a873e76d0786ede65023`
Branch: `develop-2`

## Scope

In scope:
- Extend Supabase `public.prospects.outreach_send_status` to include explicit Gmail draft lifecycle states.
- Update app types, labels, and dashboard copy for the new statuses.
- Add an approval action for Gmail drafts with a review/confirmation step.
- Add a revoke action for approved draft rows before n8n creates a draft.
- Validate server-side that required fields exist before approval.

Out of scope:
- Sending emails.
- Creating Gmail drafts in n8n.
- Marking relationship `status` as `contacted`.
- Approving prospects with incomplete recipient, subject, body, or stable demo URL evidence.

## Checklist

- [x] Create GitHub issue and branch.
- [x] Inspect current dashboard/Supabase draft flow.
- [x] Add Supabase status migration.
- [x] Add server-side approval/revoke API.
- [x] Add dashboard approval UI and status labels.
- [x] Validate build and focused API behavior.
- [x] Update issue and plan with final results.

## Validation

- `npm.cmd run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local API smoke test on port `3106` returned `200` for draft GET and `401` for PATCH without a dashboard session.

## Intended Status Model

- `ready_for_review`: prepared but not approved.
- `approved_for_draft`: Diego approved exact recipient, subject, body, and stable demo URL for Gmail draft creation.
- `draft_created`: n8n created the Gmail draft, but no outreach was sent yet.
- `approved`: reserved for future direct-send approval, not used by this first Gmail draft workflow.
- `sent`: actual outbound message was sent.

## Guardrails

- Approval must require `status = not_contacted`.
- Approval must require `contact_email`, `outreach_draft_subject`, `outreach_draft_body`, and `demo_url`.
- Approval must require the demo URL to use `https://local-growth-preview.vercel.app/`.
- Approval must set `outreach_approved = true`, `outreach_send_status = approved_for_draft`, approval timestamp/operator, and email channel.
- Revoke must only apply before send/draft completion and must not change relationship status.
