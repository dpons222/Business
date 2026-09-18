# Issue 130 — Make prospect package generation and tracker updates lossless

Issue: [#130](https://github.com/dpons222/Business/issues/130)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Completed locally — 28 regression scenarios passed; installed skill synchronized\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Make repeated package generation preserve verified research, identifiers, contact history, and correctly parsed CSV data.

## Dependencies and prior work

No blocking implementation prerequisite. Coordinate test interfaces with [the verification plan](issue-131-restore-project-verification.md); urgent access repairs may add their own focused regression coverage.

No direct prior feature issue was identified; the audit is the source of this deliverable.

Audit coverage: F3, F5, F7, F9. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Repair header parsing, non-destructive updates, identity resolution, and atomic file writes.
- Add meaningful package validation and reviewed recovery/import reports for existing trackers.
- Keep backward compatibility with roofing business and other business_name columns through an explicit mapping.

Out of scope:

- Automatically changing live Supabase data, treating unknowns as facts, rewriting all prospect copy, or adding crawling.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- AUTOMATIONS/lead-growth-pipeline/scripts/New-ProspectPackage.ps1
- AUTOMATIONS/lead-growth-pipeline/scripts/Test-ProspectPackage.ps1
- AUTOMATIONS/lead-growth-pipeline/data-contract.md; testing-checklist.md; README.md
- EXPERIMENTS/*/marketing/prospect-tracker.csv and prospect package docs, only through reviewed transformations
- New isolated PowerShell/script regression fixtures

## Implementation decisions

- Use a parsed header/row schema; never split a raw CSV header by commas.
- Use an explicit stable local record ID until canonical business/location IDs exist; retain a mapping for the later import. Do not merge on business name or domain alone.
- Default to creating missing files and patching explicitly supplied fields. Existing human-written content survives; intentional regeneration requires a reviewable diff and preservation copy.
- Keep structural validity, research completeness, and outreach readiness separate. Optional outreach fields must not block a research-only dossier.

## Implementation checklist

- [x] 1. Create fixtures from sanitized schemas: quoted/unquoted headers, multiline fields, roofing aliases, same-name businesses, same-domain branches, blank websites, and populated history.
- [x] 2. Replace header splitting and replacement-row construction with schema-aware parsing and per-field updates; distinguish omitted values from explicit clearing.
- [x] 3. Validate provided slugs and resolved paths stay inside the selected experiment directory; reject traversal and invalid identity inputs.
- [x] 4. Add per-record write coordination or a fail-fast lock, temporary-file writes, and atomic replacement. Dry-run must produce a diff with no writes.
- [x] 5. Protect existing package files and preserve comments/history; stop writing that the public journey was reviewed without evidence inputs.
- [x] 6. Extend the validator to reject empty required content, invalid state transitions, broken references, duplicate IDs, and unresolved placeholders at the appropriate stage.
- [x] 7. Produce a recovery report for existing malformed/unnamed rows. Preserve original inputs, classify ambiguous records for manual review, and apply only unambiguous, scoped repairs.
- [x] 8. Update the pipeline docs and installed-skill script synchronization contract; retain a mapping to canonical imports in the research-records plan.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [x] Two identical runs make no unintended changes and retain contact date, replies, IDs, and hand-written recommendations.
- [x] Quoted/unquoted CSVs with commas/newlines round-trip through the same schema; roofing aliases are handled without lost columns.
- [x] Same-domain locations and two blank-website businesses stay separate; ambiguous matching fails for review rather than replacing a row.
- [x] Concurrent or interrupted writes do not leave a partially written tracker; dry-run and invalid paths make no changes.
- [x] Empty-file packages cannot pass research-complete validation; missing source/contact verification cannot be silently asserted.
- [x] A recovery report accounts for all source rows, including the audit's 169 unnamed roofing rows, without inventing businesses or contact state.

## Migration and compatibility

- Copy and hash originals before any repairs; inventory all header variants and keep an old-to-new column/ID map.
- Do not require blank/ambiguous rows to become valid records. Preserve them in a quarantine report until resolved.

## Rollback and recovery

- Restore only this operation's backed-up files after verifying no later operator edits; otherwise apply a field-level inverse patch.
- Keep original CSVs and document versions available until canonical import reconciliation passes.

## Risks and decision checkpoints

- The installed personal pipeline may contain a separate script copy; identify ownership so the old implementation cannot silently reappear.
- Schema tightening must permit legitimate research-only records and optional recommendations.

## Handoff and completion record

- Lossless generator, stage-aware validator, regression fixtures, recovery report, and import identity map.

Delivered locally on 2026-09-18. PowerShell 7.5+ is required; actual verification used 7.6.5 on Windows. Runtime scripts are synchronized into the installed `lead-growth-pipeline` skill, with old copies preserved under its `.prospect-package/transactions/` directory. The repository owns future script changes; `Sync-InstalledPipelineScripts.ps1 -Check` passed for all seven runtime files.

| Acceptance area | Actual evidence/result |
| --- | --- |
| Repeatability/history | Quoted-history fixture retained every original field, contact date, follow-up, reply, legacy ID, custom column, and handwritten document; rerun reported zero changed files and unchanged filesystem hashes. |
| CSV and aliases | Quoted/unquoted headers, comma-containing headers/fields, escaped quotes, multiline text/JSON, and roofing aliases passed round-trip and original-cell comparisons. |
| Identity | Same-name businesses/shared-domain branches received separate IDs only after explicit new-record selection; blank websites stayed separate; stale/unnamed/owned adoption and implicit identity changes were rejected. |
| Writes/recovery | Real child-process lock contention failed fast; staged hashes rejected concurrent edits; interrupted multi-file journal blocked writes and recovered the complete tracker; rollback refused later edits. Dry runs and traversal/reserved-name/junction tests made no target changes. |
| Completeness | Research-only dossier passed without outreach/recommendations; missing evidence/contact verification, empty/heading-only research, unresolved drafts, broken references, duplicate IDs, invalid status/history, and unsupported timestamps/URLs failed. |
| Legacy inventory | [Recovery report](issue-130-recovery-report.md) and [per-row inventory](issue-130-recovery-inventory.json) account for 225 rows across seven trackers, including all 169 unnamed roofing rows. All seven original file hashes were rechecked and unchanged. Narrow header repair was applied only to a synthetic fixture and preserved every cell plus the original bytes. |

Verification: `pwsh -NoProfile -File AUTOMATIONS/lead-growth-pipeline/tests/Run-RegressionTests.ps1` passed **28/28** scenarios; [machine-readable results](issue-130-verification.json) record the cases, runtime, platform, and verification time. Syntax parsing passed for nine PowerShell files; scoped whitespace checks and 25 local operating-document links passed. Installed-script smoke testing created a synthetic research-complete package, validated it, and reran with zero changes. A separate pretty-printed JSON adoption check passed without rewriting original evidence cells.

Delivery context: implementation is committed on `develop` as [76d0aa4](https://github.com/dpons222/Business/commit/76d0aa4); no PR, merge, or deployment was required for these local tools. Existing #129 and user edits remain untouched. No real prospect data, hosted database, or outreach was changed. Keep this completed plan with its active parent initiative rather than moving one file away from the grouped plans.

Limits/follow-ups: local filesystem atomic replacement applies per file; interrupted multi-file operations require journal recovery. External editors do not honor the lock; avoid editing during a write. Content checks do not prove source truth or remote URL availability. The real roofing tracker still requires review of the proposed header-only repair before generator use; unresolved row identity belongs to reviewed reconciliation, not automatic repair. #131 owns CI integration; #134 owns canonical ID mapping and legacy reconciliation. Both plans now link the delivered contracts/evidence.

- [x] Required checks pass, with material limitations recorded.
- [x] Relevant README, contract, and operating instructions describe the delivered behavior.
- [x] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [x] Update the matching GitHub issue and master checklist using verified results.
- [x] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
- 2026-09-17: Execution baseline: `develop` at `1b566a69eeddcc64cca409eb3a8c5ed6053e4503`. Existing #129 changes, audit plans, and user edits remain in place. Scope is local package scripts, fixtures, recovery inventory, and documentation; no hosted data changes or outreach.
- 2026-09-18: Delivered lossless field patches/stable IDs, protected documents with reviewed regeneration, local transactions/backups/recovery, stage-aware validation, legacy recovery inventory, and installed-skill synchronization. Final regression run passed 28 scenarios; original tracker hashes remain unchanged. See the completion record for evidence and limits.
- 2026-09-18: [Issue #130 closed with verification and delivery evidence](https://github.com/dpons222/Business/issues/130#issuecomment-5725002154). Master checklist synchronized; code and records were local/uncommitted at initial closeout (superseded by the commit record below).

- 2026-09-18: User authorized Git commit/synchronization. Implementation committed as [76d0aa4](https://github.com/dpons222/Business/commit/76d0aa4); audit plans and evidence included in the accompanying documentation commit. This does not apply real tracker repairs or change hosted data.
