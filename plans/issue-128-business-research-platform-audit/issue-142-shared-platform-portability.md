# Issue 142 — Move the shared app into a reproducible platform structure

Issue: [#142](https://github.com/dpons222/Business/issues/142)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p2\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Move shared application ownership out of the roofing experiment and make setup/deployment reproducible without changing public URLs or mixing active demo work.

## Dependencies and prior work

- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [#132 — Decouple prospect operations from demos and make dashboard state reliable](issue-132-decouple-prospect-operations.md)
- [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)
- [#139 — Validate the research workflow with a measured cross-niche pilot](issue-139-cross-niche-research-pilot.md)

Prior work to inspect and preserve: [#127](https://github.com/dpons222/Business/issues/127). These are context, not instructions to rerun completed work.

Audit coverage: F11, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Relocate the shared app to apps/local-growth-preview with preserved history and update active paths/configuration.
- Separate server data access, research domain/policy, and UI formatting along demonstrated boundaries.
- Reconcile active issue/plan navigation and document fresh-machine setup, migrations, skill sync, worker, and sanitized workflows.

Out of scope:

- A monorepo toolchain for its own sake, forced microservices, public route renaming, broad styling changes, or rewriting historical plans.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- Current APP -> apps/local-growth-preview
- Root README.md; REMOTE_BUSINESS_LAB_PLAN.md; new apps/README.md; app/experiment/automation README files
- next.config.mjs, package/runtime scripts, CI working directory, hosting root/build configuration
- plans/issue-127-move-local-growth-preview-app.md legacy pointer; canonical skills/workflow/config documentation

## Implementation decisions

- The old app-move plan is mislabeled #127; that issue concerns med-spa QA and explicitly excludes relocation. This plan is the authoritative move scope; preserve the old document as historical context with a pointer.
- Keep the app in its present path through early work. The APP alias in these plans resolves to the current location until this move is verified.
- Use apps/local-growth-preview as the target already described by the existing move plan. Extract shared packages only for actual multi-consumer code; do not add orchestration tooling without a demonstrated need.
- Finish, verify, and commit the active affected med-spa work or obtain an explicit isolated handoff before moving shared paths. Do not relocate files another task is editing.
- Public domain and aliases stay stable. Plan paths can remain here; update active navigation without moving or relabeling completed implementation history.

## Implementation checklist

- [ ] 1. At execution time re-inventory active work and deployment configuration, record a fresh base commit, and verify branch/worktree isolation for the move.
- [ ] 2. List tracked app files, generated dependencies/output, environment files, worker references, static asset paths, aliases, and hosting root assumptions.
- [ ] 3. Split mixed server/client helpers only where a reviewed dependency boundary requires it; retain behavior and tests.
- [ ] 4. Move tracked app files preserving history; exclude node_modules, .next, logs, credentials, and other generated data. Handle local environment migration separately.
- [ ] 5. Update active scripts, CI, worker imports, root/build settings, and docs; leave a pointer in the roofing experiment and update the lab directory plan.
- [ ] 6. Install from the lockfile and replay the database/skill/worker setup in a clean environment using sanitized instructions.
- [ ] 7. Verify private auth, database-only dossier flows, research enqueue/review, focus/drafts, and representative roofing/restaurant/med-spa public routes on desktop/mobile.
- [ ] 8. Prepare a preview release, compare the alias manifest, and perform an authorized production cutover with the old known-good deployment available; reconcile issue/plan status after validation.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] The app runs from apps/local-growth-preview and active instructions no longer depend on the old app directory.
- [ ] Public paths and canonical production domain remain unchanged; internal access controls and research workflows pass regression checks.
- [ ] Fresh-machine setup can reproduce dependencies, schema, skill versions, worker, and sanitized workflow configuration.
- [ ] No generated files/secrets are committed; the old experiment contains a clear pointer rather than a second app copy.
- [ ] Hosting root/build configuration is verified in preview before any authorized production cutover.
- [ ] The legacy #127 move-plan ambiguity is resolved in navigation; actual #127 med-spa work remains separately tracked and preserved.

## Migration and compatibility

- Record deploy root and current alias manifest before moving; stage filesystem/config changes together and test preview output.
- Keep an app-path mapping and old deployment reference for rollback; avoid a concurrent schema rewrite.

## Rollback and recovery

- Restore the previous tracked app location/config via a revert or scoped reverse move and point hosting back to the verified deployment.
- Do not delete newer research data or overwrite active med-spa changes to revert directory structure.

## Risks and decision checkpoints

- Hosting root, CSS/assets, path aliases, and worker references can fail independently; use an explicit compatibility matrix.
- A clean app move is easier after the pilot establishes stable boundaries; pull it earlier only with a documented dependency update.

## Handoff and completion record

- Shared app ownership, fresh-machine setup, active navigation, verified hosting configuration, and preserved public routes.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
