# Issue 60 - Manual Approved Prospect Sender

## Context

The approved outreach dry-run workflow and internal Gmail send test are complete. This issue creates the real manual approved sender workflow for prospect emails, while keeping it unpublishable by default and validated only with pinned data until Diego approves a live batch.

## Scope

In scope:

- Create a separate manual approved prospect sender workflow in n8n.
- Add a visible `Sender Config` node with `batchLimit` and `noLimit`.
- Fetch only approved email rows from `public.prospects`.
- Validate recipient, exact draft, stable demo URL, approval fields, and pre-send checklist.
- Send exact stored subject/body through Gmail after guardrails pass.
- Mark Supabase rows `sent/contacted` after Gmail success.
- Mark Supabase rows `failed` with `outreach_last_error` after guardrail or Gmail failure.
- Document workflow ID, safety status, and validation evidence.

Out of scope:

- Publishing or scheduling the workflow.
- Executing live prospect sends.
- Generating or rewriting copy inside n8n.
- Sending contact-form prospects.
- Sending unapproved rows.

## Checklist

- [x] Create Issue #60 and branch `issue-60-approved-prospect-sender`.
- [x] Read n8n SDK reference and workflow guidance.
- [x] Discover and type n8n nodes.
- [x] Ground Supabase table/column resources and credentials.
- [x] Validate node configs.
- [x] Validate full workflow graph.
- [x] Create n8n workflow draft.
- [x] Run pinned success-path test.
- [x] Run pinned guardrail-failure test.
- [x] Run pinned no-limit branch test.
- [x] Update automation docs.
- [ ] Commit and push branch.
- [ ] Open, merge, and close Issue #60.

## n8n Workflow

```text
Name: Manual Approved Prospect Email Sender
Workflow ID: 5cyJ9A7RaQ1ZGBtJ
URL: https://digidap.dpons.duckdns.org/workflow/5cyJ9A7RaQ1ZGBtJ
Project: Diego digidaps@gmail.com <digidaps@gmail.com>
Status: draft/manual approved sender only
Default batchLimit: 3
Supports noLimit: true via Sender Config
```

## Validation

- `validate_node_config`: passed after switching from dynamic `returnAll` to two explicit fetch branches.
- `validate_workflow`: passed with 13 canvas items.
- Pinned success-path test execution `684`: success.
- Pinned guardrail-failure test execution `685`: success.
- Pinned no-limit branch test execution `686`: success.
- No live prospect emails were sent.

## Next Step

Prepare a 1-3 prospect review batch, run the dry-run workflow, have Diego approve exact rows in Supabase, then manually execute this sender only if the dry-run output is correct.
