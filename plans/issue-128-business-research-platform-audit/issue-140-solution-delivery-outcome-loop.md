# Issue 140 — Connect solution briefs artifacts and measured outcomes

Issue: [#140](https://github.com/dpons222/Business/issues/140)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p2\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Follow a chosen opportunity through a practical deliverable and measurement so the system learns which work benefits clients and is profitable to deliver.

## Dependencies and prior work

- [#133 — Bind outreach approval to reviewed revisions and recover uncertain sends safely](issue-133-version-outreach-approvals.md)
- [#138 — Version research skills and implement evidence-led opportunity design](issue-138-research-skills-opportunity-design.md)
- [#139 — Validate the research workflow with a measured cross-niche pilot](issue-139-cross-niche-research-pilot.md)

Prior work to inspect and preserve: [#127](https://github.com/dpons222/Business/issues/127). These are context, not instructions to rerun completed work.

Audit coverage: F1, F10, F12, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Module-specific implementation briefs, artifact registry/QA, baseline and outcome records, effort/cost tracking, and outcome-review skill.
- Extend existing builder/QA handoffs for apps, workflows, content, analytics, and AI assistance alongside websites.
- Link drafts and optional public assets to the exact recommendation/artifact revision.

Out of scope:

- Building every proposed module, inferring client approval, replacing medical/legal expertise, or claiming synthetic results as real customer impact.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- Canonical recommendation/artifact/experiment/outcome schema extensions
- APP/dossier delivery and outcome views; authorized artifact export/publish metadata
- Repo-owned prospect-demo-builder/prospect-demo-qa updates after inventory; new pilot-outcome-review skill
- ASSETS module-brief/QA templates; PLAYBOOKS delivery/measurement runbooks; BUSINESS_OFFERS shared positioning

## Implementation decisions

- An implementation brief includes problem/evidence, baseline, desired result, scope/out-of-scope, deliverables, systems/access, owner, dependencies, cost, maintenance, acceptance, and stop conditions.
- Public assets get an explicit allowlisted customer-facing projection; internal diagnosis/pricing/instructions remain in private records. Preserve current demo URLs and existing med-spa work.
- Outreach may reference no demo, a private recommendation, or an approved public asset according to the selected flow. Public-URL checks apply when an asset is included; an artifact is not mandatory for research or owner discovery.
- Every AI module defines ground truth/knowledge sources, failure modes, human escalation, quality evaluation, and cost limits; ordinary software is valid when it fits better.
- Record tool/API costs, unpaid research/demo time, delivery effort, recurring support, and actual revenue separately. Customer metric changes are observations with context, not automatic causal proof.

## Implementation checklist

- [ ] 1. Confirm the pilot go decision and choose one small representative deliverable for the platform integration; avoid a catalog-wide build.
- [ ] 2. Define versioned briefs and artifact metadata for each solution family, reusing existing builder/QA strengths.
- [ ] 3. Extend the dossier with scope/access/measurement planning and recommendation-to-artifact links.
- [ ] 4. Implement artifact QA states and tests appropriate to pages, applications, workflows, content, and AI assistance; simulated workflows use synthetic data and internal labels.
- [ ] 5. Connect optional asset revisions to the approval snapshot contract; changed artifacts invalidate dependent approvals when relevant.
- [ ] 6. Add outcome and cost logging linked to the exact pilot/recommendation/module; capture objections and no-sale outcomes as well as wins.
- [ ] 7. Implement pilot-outcome-review and an operator report that proposes continue/revise/stop based on evidence and delivery economics.
- [ ] 8. Demonstrate a complete synthetic or authorized pilot trace and document which real customer outcomes are still pending; update offer/skill/playbook docs.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] A chosen recommendation produces a complete, scoped implementation brief without defaulting to a landing page.
- [ ] At least one non-page example exercises the handoff/QA contract; customer-facing artifacts exclude internal audit language.
- [ ] Artifact changes and optional no-asset outreach obey the approval-version contract without weakening recipient/copy review.
- [ ] Baseline, observed results, review effort, actual revenue/cost, and ongoing support remain linked and distinguish actual from estimated values.
- [ ] The outcome-review skill can produce continue, revise, or stop with cited measurements and unknowns.
- [ ] A complete evidence-to-brief-to-artifact-to-outcome trace is demonstrated; synthetic demonstrations are explicitly excluded from commercial results.

## Migration and compatibility

- Add artifact/outcome fields and tables without overwriting existing demo metadata or campaign history.
- Map existing assets to recommendations only when evidence supports the relationship; otherwise retain an unresolved link.

## Rollback and recovery

- Disable the new delivery/outcome UI while keeping its records; revert skill versions independently.
- Rollback public assets by verified artifact version while retaining approval and outcome history.

## Risks and decision checkpoints

- Building too much unpaid personalization undermines delivery economics; enforce the pilot scope.
- A website, application, workflow, and content asset need different QA evidence; a single generic file-existence gate is inadequate.

## Handoff and completion record

- Module briefs, extended builder/QA contracts, artifact registry, outcome-review skill, and measured-cost reporting.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
