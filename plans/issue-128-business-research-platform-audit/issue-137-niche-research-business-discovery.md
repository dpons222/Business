# Issue 137 — Add sourced niche research and business discovery

Issue: [#137](https://github.com/dpons222/Business/issues/137)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Let Diego research a niche/market, identify named candidates, review identity/fit, and send a selected shortlist through the existing research pipeline.

## Dependencies and prior work

- [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)
- [#136 — Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md)

Prior work to inspect and preserve: [#81](https://github.com/dpons222/Business/issues/81), [#120](https://github.com/dpons222/Business/issues/120). These are context, not instructions to rerun completed work.

Audit coverage: F8, F9, F10. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Niche/market brief and sourced market findings, discovery adapter contract, first approved source, deduplication, and candidate review.
- Differentiate market evidence from individual-business evidence and retain reasons for rejection or deferral.
- Include no-website and operational-discovery opportunities rather than filtering them out by default.

Out of scope:

- Installing many providers, claiming exhaustive market coverage, automatically paying for research, or creating demos for every candidate.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New RESEARCH/markets/ profile/brief/source templates and data definitions
- New AUTOMATIONS/business-discovery/ adapter and source policy documentation
- APP/dashboard research-brief and candidate-review screens; research contracts
- EXPERIMENTS/*/research.md integration/export and discovery evaluation fixtures

## Implementation decisions

- A brief contains niche/profile version, geographic scope, buyer/services, research questions, inclusion/exclusion rules, target count, allowed sources, and budget.
- Market findings cover demand signals, alternatives/competitors, buying triggers, reachability, and unknowns with dated citations. Search counts are not market size and vendor marketing estimates are not verified business economics.
- Start with one authorized provider or approved import source after evaluating coverage, price, retention, attribution, and allowed storage. A CSV/manual import stays available when provider credentials are absent.
- Identity matching uses multiple signals and provider/source identifiers; preserve parent business versus location and require review for ambiguous matches.
- No website means a different evidence path, not automatic rejection. Good website quality does not disqualify operational discovery.

## Implementation checklist

- [ ] 1. Define brief validation and market-research/source contracts; add profile selection and explicit geographic boundaries in the UI.
- [ ] 2. Benchmark one discovery source on a small requested sample; document selection and configure budget/retention before paid requests.
- [ ] 3. Implement the adapter with query logs, provider IDs, source timestamps, pagination/cursors, failure handling, and idempotent import.
- [ ] 4. Normalize candidate names, websites, addresses, and public identifiers while retaining original values; score match confidence and queue ambiguity.
- [ ] 5. Add candidate review with include/reject/defer reasons, no-website support, and explicit contact verification state.
- [ ] 6. Produce a cited niche brief with alternatives and uncertainties, using the same finding-evidence model without falsely attaching market claims to every business.
- [ ] 7. Enqueue only the selected shortlist into bounded collection; display counts as discovered/reviewed/qualified rather than undifferentiated leads.
- [ ] 8. Verify duplicates across repeated queries, branches sharing domains, renamed businesses, out-of-area results, empty/provider-error batches, and incomplete coverage.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] A niche/location brief produces a traceable candidate list and sourced market notes, or an explicit provider/import limitation.
- [ ] Every candidate preserves its query/source/identity provenance; repeated discovery does not create duplicates or merge ambiguous branches.
- [ ] No-website and strong-website businesses can progress when their selected track is justified.
- [ ] Market and prospect findings keep separate scopes, evidence dates, and confidence; unsupported numerical market claims fail review.
- [ ] Only shortlisted businesses incur deep-collection work, and all provider activity honors configured run caps and retention policy.
- [ ] A paused/rejected candidate remains auditable and no research state automatically causes outreach.

## Migration and compatibility

- Add provider identifiers and brief-to-business links additively; map to canonical IDs instead of changing existing public slugs.
- Import historical source notes as historical evidence with original dates, not newly verified observations.

## Rollback and recovery

- Disable a provider adapter and retain permitted identifiers/audit data; manual import and supplied-business research continue.
- Do not delete canonical businesses just because a provider is removed or a search changes.

## Risks and decision checkpoints

- Provider storage/attribution terms differ; review current official terms at selection instead of assuming permanent payload retention.
- Search coverage and selection bias must remain visible in the market conclusions.

## Handoff and completion record

- Niche brief workflow, first source adapter/import, candidate review, entity matching, and selected-batch collection.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
