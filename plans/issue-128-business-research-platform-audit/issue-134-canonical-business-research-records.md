# Issue 134 — Establish canonical business research records and configurable niche profiles

Issue: [#134](https://github.com/dpons222/Business/issues/134)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Provide one authoritative model for business/location identity, evidence, research state, and niche configuration without losing existing prospect history.

## Dependencies and prior work

- [#130 — Make prospect package generation and tracker updates lossless](issue-130-lossless-prospect-packages.md)
- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [#132 — Decouple prospect operations from demos and make dashboard state reliable](issue-132-decouple-prospect-operations.md)
- [#133 — Bind outreach approval to reviewed revisions and recover uncertain sends safely](issue-133-version-outreach-approvals.md)

Prior work to inspect and preserve: [#81](https://github.com/dpons222/Business/issues/81), [#120](https://github.com/dpons222/Business/issues/120), [#121](https://github.com/dpons222/Business/issues/121), [#122](https://github.com/dpons222/Business/issues/122). These are context, not instructions to rerun completed work.

Audit coverage: F7, F9, F10, F11, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Versioned business, location, identifiers, niche profiles, research briefs/runs, source captures, findings, and recommendation skeletons.
- Reviewed import of existing CSV/Markdown/database records with provenance, aliases, and suppression preservation.
- Complete reproducible schema/migration baseline and database access tests.

Out of scope:

- Crawling, paid provider integration, forced duplicate resolution, moving the app, or activating new outreach.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New canonical schema/contracts under APP/lib/research/ and server data-access modules
- New supabase migration/configuration baseline after inspecting actual schema
- AUTOMATIONS/lead-growth-pipeline/data-contract.md and import tooling
- RESEARCH/markets/ niche profile definitions and README; EXPERIMENTS/* source records
- APP/lib/demoRegistry.ts; APP/lib/prospectDrafts.ts compatibility adapters

## Implementation decisions

- Use stable business and location IDs; keep old prospect slugs as aliases for URLs and legacy integrations. Same domain may belong to multiple locations.
- Database owns operational state; Markdown/CSV become traceable exports/imports. Corrections create provenance rather than silently rewriting source history.
- Separate research state, artifact state, relationship state, and message-send state. Never map research-complete to approved.
- Minimum evidence schema includes source URL/provider, fetched time/status, content hash, permitted excerpt/snapshot pointer, coverage/retention metadata, claim type, confidence rationale, and support/contradiction links.
- Niche profiles are versioned data: category, buyer, geography, service taxonomy, source strategy, process hypotheses, module candidates, and evaluation rules. Unknown geography remains unknown.
- Limit initial schema to this contract; add delivery/outcome extensions later through migrations rather than speculative tables.

## Implementation checklist

- [ ] 1. Inventory live schema/grants/policies and existing rows read-only; establish a sanitized baseline and resolve migration-history discrepancies.
- [ ] 2. Define versioned types and runtime validators for the common envelopes; document required/optional fields and stage transition rules.
- [ ] 3. Implement additive tables/constraints/indexes and a compatibility mapping from legacy prospects/aliases; make private access explicit.
- [ ] 4. Create configurable profiles for existing niches and real estate without hardcoded UI unions; tag hypotheses separately from sourced facts.
- [ ] 5. Implement import preview with row counts, source hashes, proposed links, confidence, suppressed-contact conflicts, and an exception queue.
- [ ] 6. Apply reviewed unambiguous mappings in an isolated environment; preserve all source rows and historical events, including malformed/quarantined inputs.
- [ ] 7. Implement a resumable, idempotent import and export manifest; cut over reads only after parity and suppression checks pass.
- [ ] 8. Test schema replay and authorization from a fresh local database; update READMEs, data ownership docs, and old workflow adapters.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] Fresh database setup reproduces the schema and grants; unauthorized clients cannot access private research or approval records.
- [ ] Repeated imports create no duplicate business/location IDs and preserve all source row accounting, contact history, and suppression.
- [ ] The audit's 56 named local records are accounted for as imported, matched, or reviewed exceptions; the live database may contain additional records and is reconciled separately.
- [ ] Dental, remodeling, legal, and real estate retain their configured niche identity without code changes for each business.
- [ ] Every finding can be traced to source capture(s) or is explicitly owner-confirmed/inferred/unknown; failed pages cannot become unsupported absence claims.
- [ ] Old public slugs, active workflow lookups, and existing asset links remain compatible; operational state has a documented owner.

## Migration and compatibility

- Snapshot live counts and relation/approval state before cutover; establish reversible ID/slug mappings and a temporary compatibility adapter.
- Use additive migrations, backfill in bounded batches, verify parity, then switch readers. Keep old fields until all consumers are mapped.
- #130 handoff: map `(experiment, local_record_id)` to canonical business/location IDs; retain `prospect_slug`, legacy `id`, `research.json.import_origin`, tracker source hashes/data-row references, and all contact history. Do not use name/domain as a merge key. [Recovery inventory and column map](issue-130-recovery-report.md) account for 225 local rows, including 56 named rows and 169 unresolved roofing rows. The original trackers were not changed; reconcile all exceptions before canonical import.

## Rollback and recovery

- Switch readers back through the compatibility adapter while retaining new provenance/import history.
- Never delete new research or reset suppression to repair a migration; use reviewed compensating mappings.

## Risks and decision checkpoints

- Live schema is not yet verified and can differ from repository SQL; baseline inspection is required before design is finalized.
- Automated merges of franchise locations or similar names are a greater risk than preserving an unresolved duplicate.

## Handoff and completion record

- Canonical contracts/schema, verified migration chain, niche profiles, import reconciliation report, and compatibility mapping.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
