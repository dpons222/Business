# Issue 141 — Add evidence refresh change detection and research operating controls

Issue: [#141](https://github.com/dpons222/Business/issues/141)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p2\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Keep research usable over time by refreshing evidence deliberately, surfacing meaningful changes, and controlling operating costs and recovery.

## Dependencies and prior work

- [#133 — Bind outreach approval to reviewed revisions and recover uncertain sends safely](issue-133-version-outreach-approvals.md)
- [#136 — Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md)
- [#138 — Version research skills and implement evidence-led opportunity design](issue-138-research-skills-opportunity-design.md)
- [#139 — Validate the research workflow with a measured cross-niche pilot](issue-139-cross-niche-research-pilot.md)

Prior work to inspect and preserve: [#115](https://github.com/dpons222/Business/issues/115), [#118](https://github.com/dpons222/Business/issues/118). These are context, not instructions to rerun completed work.

Audit coverage: F7, F9, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Source-aware freshness rules, budgeted refresh jobs, change detection, stale recommendation queues, run health, and exception handling.
- Versioned operating exports/configuration, retention/deletion procedures, backup/restore drills, and operator notifications when explicitly configured.
- Document manual fallback and reconciliation paths.

Out of scope:

- Unrequested recurring automations, continuous crawling of all prospects, routine noisy notifications, or autonomous outreach on detected changes.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- AUTOMATIONS/business-research-collection/ and discovery adapters
- APP research queue/health/review UI; provenance dependency graph and schema extensions
- PLAYBOOKS research-operations/retention/recovery documentation; sanitized configuration/workflow exports

## Implementation decisions

- Freshness depends on source and claim type; record explicit review intervals rather than assigning all facts the same expiry.
- A changed capture does not automatically invalidate every finding. Compare relevant evidence spans, mark affected claims/recommendations stale, and preserve prior versions.
- Changed contact details or referenced assets invalidate related approvals through the existing snapshot contract.
- Schedules are optional, disabled until explicitly configured, and budgeted. Notifications cover actionable change, failure, completion, or required review; unchanged state remains quiet.
- Retention follows source permission and data purpose. Removing raw captures must leave allowed metadata or a clear unavailable-evidence marker, not a false clickable citation.

## Implementation checklist

- [ ] 1. Use pilot data to propose source/claim freshness defaults and allowed refresh priorities; record budgets and operator overrides.
- [ ] 2. Implement bounded refresh jobs reusing durable collection and source retention rules; deduplicate repeated triggers.
- [ ] 3. Track evidence-to-finding-to-recommendation dependencies and route material changes to review with before/after context.
- [ ] 4. Integrate stale approval invalidation for changed contact/asset references and preserve a record of why it occurred.
- [ ] 5. Add health views for failed/blocked/stale work, retries, provider usage, costs, and manual fallback actions.
- [ ] 6. Create sanitized versioned job/workflow configuration and retention/backup/recovery instructions; rehearse restore with synthetic data.
- [ ] 7. Provide an optional schedule/notification configuration interface that respects explicit user activation and quiet unchanged runs.
- [ ] 8. Test refresh races, identical content, moved/removed pages, expired storage, and budget exhaustion; document operator recovery.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] Unchanged refreshes do not duplicate findings or notify unnecessarily; material changes show source evidence and affected records.
- [ ] Expired/removed evidence is visible and cannot support a newly approved recommendation without revalidation.
- [ ] Changed recipient/asset evidence invalidates dependent approvals consistently.
- [ ] Refresh jobs honor rate and total budget caps and recover without duplicate state changes.
- [ ] Retention and backup/restore behavior is verified on synthetic data and documented.
- [ ] No schedule or external notification is enabled merely by deploying the feature; activation records the chosen cadence, destination, and budget.

## Migration and compatibility

- Add freshness/dependency metadata to existing findings conservatively; old undated facts become freshness-unknown rather than newly verified.
- Apply retention migrations only after a source inventory and recovery record.

## Rollback and recovery

- Pause refresh scheduling and preserve existing captures/results; revert processing while leaving stale states visible.
- Do not reset freshness timestamps or reactivate invalidated approvals during rollback.

## Risks and decision checkpoints

- Over-refreshing is expensive; use measured change rates and operator priorities.
- Raw-source retention may differ across providers and must remain part of adapter behavior.

## Handoff and completion record

- Refresh/change review, operating health dashboard, retention/recovery runbook, and optional activation controls.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
