# Issue 135 — Build an evidence-backed dossier for a supplied business

Issue: [#135](https://github.com/dpons222/Business/issues/135)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Give Diego a useful private workspace for one named business or URL before automated batch discovery exists.

## Dependencies and prior work

- [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)

Prior work to inspect and preserve: [#105](https://github.com/dpons222/Business/issues/105), [#120](https://github.com/dpons222/Business/issues/120). These are context, not instructions to rerun completed work.

Audit coverage: F4, F8, F9, F11. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Create/resolve a business by URL or name/location; inspect and edit a structured dossier.
- Evidence review, unknowns, contacts, manual findings, recommendation options, and private export.
- Research queue shell and integration contract for the collection worker.

Out of scope:

- A chat-first interface, autonomous web sourcing, automatic recommendations without evidence, or demo generation as a prerequisite.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New APP/app/dashboard/businesses/ and research-run routes
- New focused dossier, source viewer, findings review, and run-state components
- APP/lib/research/ contracts/data access from the records plan
- Private dossier export templates and applicable README files

## Implementation decisions

- URL and name/location are entry points to entity resolution, not unquestioned identity. Show ambiguous matches for review.
- Dossier sections: identity/services/locations, public journeys, source coverage, evidence/finding state, contacts, unknowns/discovery questions, opportunities, and next action.
- Accept permitted manual source capture/import first; the collection plan later populates the same contract. Manual observations record who verified them and when.
- Use accessible forms, keyboard navigation, explicit saving/errors, and concise source links rather than an opaque AI narrative.
- Exports are private by default. Public demo pages continue to receive a separate approved asset projection.

## Implementation checklist

- [ ] 1. Define the primary URL/name input flow and empty/ambiguous/duplicate states; create or select a business without any local demo entry.
- [ ] 2. Implement authorized dossier routes with optimistic concurrency on edits and visible source/data health.
- [ ] 3. Add source detail with capture time, coverage status, supporting excerpt, and links from each factual finding.
- [ ] 4. Allow reviewers to accept, correct, reject, or mark uncertain findings while preserving originals and revision history.
- [ ] 5. Show contacts with source/verification status and distinguish researched from eligible-for-outreach.
- [ ] 6. Add manual research notes, discovery-required questions, and comparative opportunity slots; keep research completion independent from messaging.
- [ ] 7. Implement a private export and research queue shell using the canonical run contract; add clear entry points for collection once available.
- [ ] 8. Browser-test desktop/mobile and keyboard flows against synthetic no-website, ambiguous-name, multi-location, and source-failure examples.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] A supplied business can be created and reviewed without changing application code or building a demo.
- [ ] Every displayed factual finding opens its source/capture or is explicitly labeled with its evidence category.
- [ ] Unknown, stale, failed, and partial collection states are visible; invalid edits cannot overwrite a newer reviewer revision.
- [ ] A research-only business can complete review with contact information unknown and outreach unapproved.
- [ ] Anonymous access to dossier/export APIs is denied; public aliases do not expose internal findings.
- [ ] The primary flow works with keyboard and mobile layout; saving, retry, not-found, and duplicate-resolution states are tested.

## Migration and compatibility

- Add new internal routes beside the existing dashboard; reuse legacy IDs through the canonical mapping.
- Keep existing demo/draft views operational and link to the dossier incrementally.

## Rollback and recovery

- Disable the new navigation or route feature while retaining created dossiers and source evidence.
- Preserve privacy enforcement and review history even if the UI is reverted.

## Risks and decision checkpoints

- A polished screen without trustworthy source data would hide the main product gap; evidence and unknown states are required in the first slice.

## Handoff and completion record

- Working manual/supplied-business dossier, source review UI, private export, and worker integration contract.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
