# Issue 138 — Version research skills and implement evidence-led opportunity design

Issue: [#138](https://github.com/dpons222/Business/issues/138)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Make research judgment consistent and broaden recommendations to valuable AI, software, content, and operational improvements with explicit evidence and economics.

## Dependencies and prior work

- [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)
- [#135 — Build an evidence-backed dossier for a supplied business](issue-135-single-business-research-dossier.md)
- [#136 — Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md)

Prior work to inspect and preserve: [#81](https://github.com/dpons222/Business/issues/81), [#127](https://github.com/dpons222/Business/issues/127). These are context, not instructions to rerun completed work.

Audit coverage: F9, F10, F12, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Canonical repo-owned domain skills, shared output contracts, operational discovery, solution module catalog, ranking, and evaluation examples.
- Extend existing niche/pipeline skills and prepare clear handoffs to existing demo/QA capabilities.
- Compare AI against deterministic software, existing-product configuration, and no-change alternatives.

Out of scope:

- A separate overlapping skill for every industry, creating all possible solution modules, or collecting private business data without an authorized discovery purpose.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New SKILLS/<domain-skill>/SKILL.md and focused references/examples, plus SKILLS/README.md
- Existing installed niche-growth-system-builder and lead-growth-pipeline definitions via reviewed sync/install
- New RESEARCH niche/profile schemas and solution module definitions; PLAYBOOKS/business-process-discovery.md
- APP/lib/research/opportunities and dossier comparison UI; skill evaluation fixtures

## Implementation decisions

- Read the skill-creator instructions before authoring actual skills. Keep entry points focused and put substantial contracts/examples in referenced resources.
- Repo-owned skill definitions are canonical; install/sync from them and record content hashes/versions. Detect a divergent personal copy rather than overwriting it silently.
- Add business-discovery-and-identity, business-evidence-review, business-process-discovery, and solution-opportunity-design. Extend existing niche/pipeline skills; defer the outcome-review skill's implementation to the delivery plan.
- Common outputs include schema/run/business/location IDs, evidence-linked findings, assumptions/unknowns, confidence rationale, blockers, next state, versions, and time/cost use.
- The process map captures trigger, steps, systems, handoffs, volume, time, errors, exceptions, owner, baseline, required access, and data sensitivity. Public observations cannot confirm internal failures.
- Module ranking applies fit/access/risk gates before explainable value/confidence/urgency/effort/support/reuse scoring. No numerical revenue uplift is invented; capacity savings and cash savings are distinct.

## Implementation checklist

- [ ] 1. Inventory installed domain skills, scripts, and repo blueprints; define one canonical source and reviewed synchronization procedure.
- [ ] 2. Implement versioned input/output validators and adapters to persist skill outputs through the canonical repository API.
- [ ] 3. Author the four focused skills and extend niche/pipeline instructions to support research-only completion, no-website prospects, operational discovery, and conditional recommendations.
- [ ] 4. Define a compact module catalog spanning sites, business apps, integrations/workflows, AI assistance, content, and analytics; specify required evidence/access, risks, deliverables, acceptance tests, and maintenance.
- [ ] 5. Implement opportunity comparison and ranked primary/secondary/no-action outcomes in the dossier; show component reasons rather than an unexplained score.
- [ ] 6. Add an owner-discovery worksheet and limited authorized-input ingestion; confirmed answers retain who/when/source alongside the earlier public hypothesis.
- [ ] 7. Evaluate on representative supported, unsupported, conflicting, stale, hidden-process, and existing-tool-fit cases; require evidence validity before a recommendation is review-ready.
- [ ] 8. Update skill READMEs/install guidance, discovery playbooks, niche profiles, and reusable DigiDap positioning to reflect the broader practice without changing public sites during this task.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] Each skill has a narrow trigger, usable contract, versioned examples, and a validated install/sync path with no unreviewed overwrite of personal changes.
- [ ] A missing website can lead to a justified website module; a strong website can lead to discovery-required operational work.
- [ ] Recommendations explicitly compare AI, conventional implementation, existing-product configuration, and no-action where relevant.
- [ ] Every material claim is evidence-linked or clearly hypothetical/owner-confirmed; unsupported CRM/workload/revenue claims are rejected.
- [ ] Primary options include effort, access, recurring cost/support, baseline metric, success/stop conditions, and conditional unknowns.
- [ ] Evaluation cases cover at least two niches and include a justified no-action result; score explanations remain inspectable and no unsupported certainty is produced.

## Migration and compatibility

- Convert blueprints into links to canonical definitions while preserving useful historical context; do not maintain two competing templates.
- Version rubric/module changes so older recommendations can be reproduced and compared.

## Rollback and recovery

- Restore the prior skill version for new runs, while retaining the version and results of previous runs.
- Mark affected recommendations for review when a contract or rubric is withdrawn; do not silently regrade them.

## Risks and decision checkpoints

- Too much instruction can constrain useful judgment; prioritize concise contracts and fixtures over repeated general guidance.
- Public-only discovery must not be stretched into fabricated operational diagnoses.

## Handoff and completion record

- Four new/extended domain capabilities, module catalog, process-discovery playbook, scored opportunity UI, and reproducible skill evaluations.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
