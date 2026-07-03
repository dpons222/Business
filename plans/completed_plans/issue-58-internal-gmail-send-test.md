# Issue 58 - Internal Gmail Send Test

## Context

The approved outreach dry-run workflow passed. Before any real prospect sender exists, the automation needs a controlled internal Gmail send test that proves n8n can send the exact stored subject/body from Supabase while enforcing strict internal-only guardrails.

## Scope

In scope:

- Create a separate manual n8n internal Gmail send test workflow.
- Fetch only the internal Supabase test prospect row.
- Validate strict internal-only guardrails before Gmail runs.
- Send one email to `digidaps@gmail.com` using the stored subject/body.
- Document workflow ID, execution ID, and safety status.

Out of scope:

- Sending real prospect emails.
- Publishing or scheduling the workflow.
- Updating real prospect send statuses.
- Rewriting or generating outreach copy inside n8n.

## Checklist

- [x] Create Issue #58 and branch `issue-58-internal-gmail-send-test`.
- [x] Read n8n SDK reference and workflow guidance.
- [x] Confirm Supabase and Gmail credentials are available.
- [x] Ground Supabase table and column resources.
- [x] Validate node configs.
- [x] Validate full workflow code.
- [x] Create n8n internal Gmail send test workflow.
- [x] Run pinned test without sending email.
- [x] Execute one live internal send to `digidaps@gmail.com`.
- [x] Update automation docs with workflow and execution evidence.
- [ ] Commit and push branch.
- [ ] Open, merge, and close Issue #58.

## n8n Workflow

```text
Name: Approved Outreach Internal Gmail Send Test
Workflow ID: sHtbTyLTxm5nYs8v
URL: https://digidap.dpons.duckdns.org/workflow/sHtbTyLTxm5nYs8v
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual internal-send test only
Pinned test execution: 681
Live internal send execution: 682
Gmail message ID: 19efaf543aae87db
```

## Validation

- `validate_node_config`: passed for Manual Trigger, Supabase getAll, Code, Gmail send, and Set nodes.
- `validate_workflow`: passed with 6 canvas items.
- `test_workflow`: execution `681` passed with Gmail pinned/simulated.
- `execute_workflow`: execution `682` succeeded and sent one email to `digidaps@gmail.com`.
- No real prospect email path was enabled.

## Next Step

Have Diego confirm the email arrived in Gmail. After that, prepare a 3-5 prospect review batch and keep rows in `ready_for_review` until Diego approves them.
