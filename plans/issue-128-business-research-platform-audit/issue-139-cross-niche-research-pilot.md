# Issue 139 — Validate the research workflow with a measured cross-niche pilot

Issue: [#139](https://github.com/dpons222/Business/issues/139)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Establish whether the first research workflow produces accurate, useful recommendations at acceptable operator effort and cost before expanding scope.

## Dependencies and prior work

- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [#135 — Build an evidence-backed dossier for a supplied business](issue-135-single-business-research-dossier.md)
- [#136 — Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md)
- [#137 — Add sourced niche research and business discovery](issue-137-niche-research-business-discovery.md)
- [#138 — Version research skills and implement evidence-led opportunity design](issue-138-research-skills-opportunity-design.md)

Prior work to inspect and preserve: [#81](https://github.com/dpons222/Business/issues/81). These are context, not instructions to rerun completed work.

Audit coverage: F8, F9, F10, F12. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Ten reviewed businesses across two existing niches, representative edge cases, a manual baseline, repeat-run tests, and a go/no-go report.
- Evaluate evidence quality, identity, recommendation usefulness, time/cost, operator corrections, and portability to a third niche profile.
- Translate failures into bounded fixes and update the rubric using observed results.

Out of scope:

- Sending outreach, claiming paid demand from research quality alone, exhaustive industry research, or expanding the batch before review.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New EXPERIMENTS research-platform pilot record using the existing experiment structure after assigning the next available experiment number
- RESEARCH niche/profile versions and evaluation fixtures
- APP research runs/dossiers and evaluation export; PLAYBOOKS validation reference
- This planning package's master checklist and pilot results link

## Implementation decisions

- Default cohort: five HVAC and five dental businesses in an explicitly recorded market. Confirm or select the market from the active research brief before fetching; the plan does not preselect real businesses.
- Sample intentionally includes strong/weak websites and operational-discovery candidates. Use synthetic fixtures for uncommon edge cases if the real cohort lacks them.
- Include multi-location identity, no website, browser-rendered content, blocked/unavailable sources, stale facts, contradictory claims, and a justified no-action case.
- Use an independent manual review with visible evidence, not the same generation judging itself. Diego's usefulness review is required for that subjective result.
- Proposed gate: all factual claims traceable, no fabricated identity/contact/service, all duplicate ambiguities reviewed, and at least eight of ten dossiers useful with only minor factual corrections. Time/cost targets follow baseline measurement.

## Implementation checklist

- [ ] 1. Create the pilot experiment with question, cohort rules, market, budget, rubric, manual baseline method, and explicit stop criteria.
- [ ] 2. Record a manual baseline on a representative subset using the same scope; track researcher time and evidence coverage.
- [ ] 3. Run the authorized bounded discovery/collection pipeline and capture every version, error, retry, cost, and operator correction.
- [ ] 4. Review each dossier against actual source evidence and identity; separately assess primary/alternative/no-action recommendation usefulness.
- [ ] 5. Run synthetic edge-case and restart/cancellation cases; verify an additional real-estate profile can use the same schema without bespoke code.
- [ ] 6. Collect Diego's judgments and distinguish pending review from passed; summarize quantitative results and recurring failure categories.
- [ ] 7. Revise only the failing modules and rerun affected evaluations once new changes justify it; create follow-up defects when needed.
- [ ] 8. Publish a concise go/revise/stop decision and update downstream readiness rather than automatically advancing every plan.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] Ten dossier records have documented selection, source evidence, reviewer outcomes, and run/version/cost traceability.
- [ ] Identity, citation, and no-fabrication gates pass; failures remain visible until corrected and rechecked.
- [ ] Usefulness review records Diego's actual judgment, with the proposed eight-of-ten target evaluated rather than assumed.
- [ ] Manual baseline and assisted results report time, correction effort, and cost with clear denominators; hypothetical ROI is not reported as actual.
- [ ] Edge-case/recovery evaluations and third-profile portability are documented.
- [ ] Go/revise/stop decision explicitly unlocks or pauses downstream delivery/scale work; research success is not labeled commercial validation.

## Migration and compatibility

- Use separate pilot experiment/run tags and distinguish synthetic fixtures from real businesses.
- Existing outreach/suppression records stay unchanged by research evaluation.

## Rollback and recovery

- Pause runs and preserve all results/costs; a failed pilot is retained as evidence rather than deleted.
- Revert only a demonstrably harmful rubric change and keep its evaluation history.

## Risks and decision checkpoints

- The usefulness gate depends on user judgment; if it is unavailable, report it pending while completing factual review.
- A biased cohort of poor websites could overstate the system's value or hide operational opportunity gaps.

## Handoff and completion record

- Pilot report, reviewed dossiers, measured baseline/results, failure backlog, and downstream go/no-go decision.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
