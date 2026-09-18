# Issue 133 — Bind outreach approval to reviewed revisions and recover uncertain sends safely

Issue: [#133](https://github.com/dpons222/Business/issues/133)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Ensure only the exact reviewed recipient, copy, asset version, and follow-up step can be sent, with race-safe claiming and an auditable uncertain-delivery state.

## Dependencies and prior work

- [#129 — Secure dashboard authentication and private research routes](issue-129-secure-research-dashboard.md)
- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [#132 — Decouple prospect operations from demos and make dashboard state reliable](issue-132-decouple-prospect-operations.md)

Prior work to inspect and preserve: [#106](https://github.com/dpons222/Business/issues/106), [#112](https://github.com/dpons222/Business/issues/112), [#114](https://github.com/dpons222/Business/issues/114), [#115](https://github.com/dpons222/Business/issues/115), [#116](https://github.com/dpons222/Business/issues/116), [#118](https://github.com/dpons222/Business/issues/118). These are context, not instructions to rerun completed work.

Audit coverage: F6, F7, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Immutable message revisions, explicit verification/attestation evidence, optimistic concurrency, invalidation, and suppression checks.
- Read-only live workflow inventory and sanitized export; sender claim/recovery design and implementation.
- Preserve first-touch/follow-up separation, email-only automated sends, manual reply review, and existing touch limits.

Out of scope:

- Sending real outreach during implementation, automated reply classification, increasing send volume, or removing user approval.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- APP/lib/prospectDrafts.ts; APP/app/api/prospect-drafts/[slug]/route.ts; APP/components/ProspectPreviewDashboard.tsx
- AUTOMATIONS/outreach-approval-send/; AUTOMATIONS/follow-up-approval-send/; AUTOMATIONS/follow-up-reminder/
- Tracked additive SQL migrations, sanitized n8n exports, sender/policy contract tests

## Implementation decisions

- #112 intentionally changed the UI from draft approval to send approval. Preserve that behavior; #106 is historical context, not authority to revert it.
- Bind approval to immutable revision ID/hash, contact identity, selected asset revision if any, policy version, approver, and timestamp.
- An observed check and a human attestation are different evidence types. Nonempty email does not establish verified contact provenance.
- Use atomic eligible-to-claimed transitions with leases, unique attempt IDs, and a durable outcome ledger. A provider timeout after submission is uncertain, not safely retryable.
- Recheck suppression, reply status, follow-up step, approval validity, and message hash immediately before provider submission. Do not promise exactly-once email if the provider lacks that guarantee.

## Implementation checklist

- [ ] 1. Inspect the current database and actual n8n workflows read-only; export sanitized versions and reconcile documented versus deployed nodes/guardrails.
- [ ] 2. Create additive revision, approval, attempt, and event contracts compatible with existing prospect fields; invalidate legacy approval rather than automatically blessing unknown revisions.
- [ ] 3. Make the drawer submit the exact displayed revision and explicit attestations; reject stale edits with a conflict response and require a fresh review.
- [ ] 4. Implement transactional approval/revoke/claim operations and evidence checks; any material recipient/copy/asset/policy change invalidates approval.
- [ ] 5. Adapt first-touch and follow-up workers to consume the same approved snapshot and state contract; keep manual/contact-form channels outside email sending.
- [ ] 6. Implement reconciliation for provider accepted/database update failed, network timeouts, lease expiry, and duplicate triggers; surface uncertain outcomes for review.
- [ ] 7. Test only synthetic data and mocked delivery by default. An explicitly authorized internal-address test may verify a live provider without involving prospects.
- [ ] 8. Update n8n specs, sanitized exports, migration docs, and related issue references; deploy with sending disabled until the reviewed cutover is complete.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] A draft changed after opening the drawer receives a conflict rather than approval; recipient/copy/asset changes invalidate approval.
- [ ] Only authenticated authorized reviewers can approve a stored revision with required evidence; incomplete checks return actionable reasons.
- [ ] Concurrent workers cannot claim the same approved attempt; duplicate triggers do not make duplicate submissions in the tested contract.
- [ ] Provider acceptance followed by database failure enters recoverable uncertainty/confirmation handling without blind resend.
- [ ] Stopped/replied businesses and invalid follow-up steps cannot approve or send; first-touch and follow-up remain independent.
- [ ] Sanitized exports reproduce the tested workflow and tests cover approved, revoked, queued, sent, failed, uncertain, suppressed, and concurrent cases.

## Migration and compatibility

- Introduce compatibility fields/views without dropping existing history. Snapshot and invalidate outstanding legacy approvals at cutover, returning them for review.
- Confirm service grants/RLS and RPC privileges against the actual schema. Do not infer them from ad hoc SQL files.

## Rollback and recovery

- Disable sender execution first; retain immutable revisions and attempt history. Roll back consumers without replaying uncertain attempts.
- Never restore stale legacy approvals automatically; require a new review after any compatibility rollback.

## Risks and decision checkpoints

- Provider delivery and database persistence are not one transaction; reconciliation is a required product behavior.
- The live n8n runtime was not audited previously, so export/inspection is an entry task, not assumed evidence.

## Handoff and completion record

- Revision-aware approval API, shared eligibility policy, sanitized workflow exports, attempt ledger, and operator recovery runbook.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
