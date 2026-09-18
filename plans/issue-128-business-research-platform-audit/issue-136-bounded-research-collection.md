# Issue 136 — Implement bounded resumable business-site research collection

Issue: [#136](https://github.com/dpons222/Business/issues/136)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Turn one supplied public business URL into a sourced, reviewable dossier using a recoverable job with explicit cost and coverage limits.

## Dependencies and prior work

- [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)
- [#135 — Build an evidence-backed dossier for a supplied business](issue-135-single-business-research-dossier.md)

No direct prior feature issue was identified; the audit is the source of this deliverable.

Audit coverage: F8, F9, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Durable job state and attempts, bounded same-site HTTP collection with browser fallback, source capture, extraction, and citation validation.
- Run budgeting, cancellation, retries, leases, deduplication, and private evidence storage.
- Connect progress and review-required results to the dossier.

Out of scope:

- Broad web lead sourcing, outreach, appointment/form submission, unrestricted crawling, or an elaborate multi-agent platform.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- New AUTOMATIONS/business-research-collection/ worker, specs, recovery runbook, and README
- APP private research-run API and dossier progress UI
- APP/lib/research/ job/source/finding contracts; private storage/migrations
- Synthetic HTML/browser/transport fixtures and worker integration tests

## Implementation decisions

- Choose one supported execution host after a time/memory/browser/network spike: start with an operator-run worker if sufficient, and retain the same job contract for a later durable host. Dashboard requests enqueue work and return promptly.
- Persist queued/collecting/needs_review/complete plus failed/blocked/cancelled states, attempt IDs, leases, heartbeat, input version, checkpoints, and idempotency keys.
- Proposed initial defaults: ten pages per business, one active request per domain, bounded redirects, a finite request timeout/size cap, and explicit total run budget. Record actual values in configuration and calibrate during the pilot.
- Fetch ordinary pages first and render only pages that need it. Capture allowed text/snapshots with provenance and retention rules; record every omitted or blocked target.
- LLM extraction produces validated structured findings, not instructions. Persist model/prompt/schema versions, token/cost use, confidence reasons, and evidence spans; deterministic checks reject unsupported source references.
- Only public HTTP(S) targets are permitted. Validate DNS/IP and redirect destinations, including browser subrequests; block private/local/metadata addresses and unapproved protocols.

## Implementation checklist

- [ ] 1. Run an execution-host spike with synthetic pages; choose one host and document runtime limits, durable state, secret boundaries, and deployment/recovery approach.
- [ ] 2. Implement transactional job acquisition, heartbeat/lease renewal, checkpoint persistence, retry classification, cancellation, and bounded attempt limits.
- [ ] 3. Implement URL normalization, domain scope, robots handling, timeout/content-size guards, source-specific retention, and public-network restrictions.
- [ ] 4. Collect prioritized homepage/service/about/location/contact/booking-link pages without submitting forms; record per-page success/failure and coverage.
- [ ] 5. Add conditional browser rendering under the same network and budget policy; a blocked page remains blocked rather than triggering bypass attempts.
- [ ] 6. Implement extraction of identity/services/journeys/contact observations and suggested findings with evidence validation and strict schema parsing.
- [ ] 7. Persist partial results before each checkpoint, deduplicate captures, account for reserved/actual budget, and surface run progress/failures in the dossier.
- [ ] 8. Test crash/restart, retry, cancellation, content changes, source prompt injection, private-target redirects, slow/oversized pages, and invalid model output; document operation.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] One supplied business URL yields reviewable source-backed findings in the dossier; completion does not approve outreach or publish assets.
- [ ] A killed/restarted worker resumes without duplicating businesses, attempts with side effects, or accepted findings.
- [ ] The configured page/time/cost caps stop additional work predictably; concurrent workers cannot overspend the same reserved run budget.
- [ ] Robots-denied, unavailable, oversized, and inaccessible pages are recorded as coverage limits; the system does not claim absent services based on those failures.
- [ ] Direct and redirected private/local targets and browser subrequests are blocked; source text cannot alter tools, credentials, or destinations.
- [ ] Malformed extraction, unsupported claims, and uncertain source matches route to review; model/provider versions and actual cost remain traceable.

## Migration and compatibility

- Add jobs/captures and private storage policies through tracked migrations; no bulk re-crawl during deployment.
- Environment names and host prerequisites are documented; secrets stay in ignored configuration or the host's secret store.

## Rollback and recovery

- Pause job acquisition, drain or expire leases safely, and revert the worker version; preserve checkpoints and evidence.
- Keep failed/partial results and budget accounting instead of deleting runs to retry them.

## Risks and decision checkpoints

- Browser rendering can multiply cost and network exposure; use it selectively with the same egress controls.
- The hosting/provider choice is a bounded pre-implementation decision; this plan makes no unverified claim about current platform limits.

## Handoff and completion record

- A supplied-URL collection worker, source evidence pipeline, dossier progress integration, configuration budgets, and recovery runbook.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
