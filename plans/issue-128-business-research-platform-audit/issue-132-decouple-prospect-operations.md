# Issue 132 — Decouple prospect operations from demos and make dashboard state reliable

Issue: [#132](https://github.com/dpons222/Business/issues/132)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Make a database-only prospect usable immediately and make partial, stale, or failed dashboard data visible to the operator.

## Dependencies and prior work

- [#129 — Secure dashboard authentication and private research routes](issue-129-secure-research-dashboard.md)
- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)

Prior work to inspect and preserve: [#105](https://github.com/dpons222/Business/issues/105), [#120](https://github.com/dpons222/Business/issues/120), [#121](https://github.com/dpons222/Business/issues/121), [#122](https://github.com/dpons222/Business/issues/122). These are context, not instructions to rerun completed work.

Audit coverage: F4, F7, F11. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Resolve private operations through persisted prospect identity rather than local demo registration.
- Paginate dashboard data and preserve database-owned relationship/suppression state.
- Make global focus updates atomic and prevent stale localStorage data from overwriting newer shared state.

Out of scope:

- Full canonical research schema, new discovery providers, changing focus to per-user ownership, or rewriting public demos.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- APP/app/api/prospect-drafts/[slug]/route.ts; APP/lib/prospectDrafts.ts
- APP/lib/demoRegistry.ts; APP/lib/dashboardFocus.ts; APP/app/api/dashboard-focus/route.ts
- APP/components/ProspectPreviewDashboard.tsx; APP/app/dashboard/page.tsx
- AUTOMATIONS/outreach-approval-send/add-dashboard-focus-items.sql and a tracked follow-up migration

## Implementation decisions

- Keep the existing shared, uncapped focus list from #122; fix its write semantics rather than altering ownership.
- Local demo metadata may supply an asset route/logo only. It cannot assert current contact eligibility, review status, or that a database row exists.
- Return source health, partial-result state, and last successful retrieval separately from the entries.
- Use stable pagination ordering with an ID tie-breaker; filters/search must cover the full dataset rather than the first fetched page.

## Implementation checklist

- [ ] 1. Add database-only and not-found route tests; remove local demo checks after authorization and query by a validated identifier.
- [ ] 2. Extract transport/formatting/transition policy boundaries needed by this change, keeping shared client helpers free of server data access.
- [ ] 3. Implement server pagination and full-dataset filtering/count semantics; provide loading, error, retry, and no-results states.
- [ ] 4. Add an explicit degraded-data result; allow inspection of marked local demo assets while disabling state-dependent mutations until canonical state can be verified.
- [ ] 5. Replace delete-all/insert focus updates with a transactional or version-checked operation; preserve audit actor and ordering.
- [ ] 6. Reconcile localStorage changes through explicit versioned operations, including first migration, rather than replacing the server list silently.
- [ ] 7. Verify the existing source links, location filters, draft drawer, public routes, and focus actions still work; document boundaries with #120–122.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] A new persisted business with no code/demo entry supports authorized private reads and permitted actions; missing IDs return 404.
- [ ] Rows beyond one backend response page remain searchable/filterable and counts are correct without duplicates.
- [ ] Database failure is visible and cannot turn unknown or stopped relationships into sendable rows.
- [ ] Concurrent focus edits and a simulated failed replacement preserve confirmed data; old localStorage does not erase newer shared state.
- [ ] Existing shared focus behavior, location filtering, and public demo links pass regression checks.

## Migration and compatibility

- Introduce any focus revision field/RPC additively; migrate existing rows without changing global ownership.
- Do not fabricate canonical records for every local asset; distinguish unmapped assets until the research-record import.

## Rollback and recovery

- Rollback UI/data access changes independently of preserved data; keep writes disabled if integrity cannot be assured.
- Do not reintroduce delete-all replacement or unmarked stale contact fallback.

## Risks and decision checkpoints

- Pagination can silently change search behavior if filtering remains client-only.
- This module overlaps later approval work; complete interface changes before approval-versioning implementation.

## Handoff and completion record

- Database-driven operator API, health/pagination contract, atomic focus operations, and stable identity adapter.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
