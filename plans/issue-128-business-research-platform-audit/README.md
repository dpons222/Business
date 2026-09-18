# Business research platform implementation plans

Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Created: 2026-09-17\
Status: Planning complete; #129 locally implemented and verified, hosted cutover pending. Other implementation plans remain not started.

## Start here

This directory contains the original [audit and roadmap](issue-128-business-research-platform-audit.md), fourteen deliverable-sized implementation plans, and this master execution checklist. The plans cover all thirteen audit findings and the product/workflow suggestions. They form seven workstreams; they are not fourteen unrelated projects.

Start with [private access/authentication repair](issue-129-secure-research-dashboard.md), [lossless prospect packages](issue-130-lossless-prospect-packages.md), and [verification](issue-131-restore-project-verification.md). Then follow dependencies below. Security fixes should not wait for a broad toolchain cleanup if a focused regression test can verify the repair.

The first visible research product checkpoint combines [the business dossier](issue-135-single-business-research-dossier.md) and [bounded collection](issue-136-bounded-research-collection.md): one supplied business URL produces inspectable evidence and reviewable findings. The dossier plan first supports manual/approved imported evidence so the UI and review contract can be tested before crawling exists.

## Planning checklist

- [x] Review the audit, current repository instructions, and existing issue/plan overlap.
- [x] Create one implementation issue and plan for each bounded deliverable.
- [x] Define dependencies, acceptance checks, migration/rollback, and handoff outputs.
- [x] Cover every audit finding and the proposed broader research workflow.
- [x] Update moved audit references and preserve existing med-spa work.
- [x] Validate local links, issue metadata, dependency graph, and scope coverage.
- [x] Post final planning status and directory navigation on #128.

## Plan index and dependencies

| Issue | Implementation plan | Must follow | Delivery status |
| --- | --- | --- | --- |
| [#129](https://github.com/dpons222/Business/issues/129) | [Secure dashboard authentication and private research routes](issue-129-secure-research-dashboard.md) | None | Local implementation verified; hosted cutover pending |
| [#130](https://github.com/dpons222/Business/issues/130) | [Make prospect package generation and tracker updates lossless](issue-130-lossless-prospect-packages.md) | None | Complete locally; 28 regression scenarios passed |
| [#131](https://github.com/dpons222/Business/issues/131) | [Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md) | None | Not started |
| [#132](https://github.com/dpons222/Business/issues/132) | [Decouple prospect operations from demos and make dashboard state reliable](issue-132-decouple-prospect-operations.md) | [#129](issue-129-secure-research-dashboard.md), [#131](issue-131-restore-project-verification.md) | Not started |
| [#133](https://github.com/dpons222/Business/issues/133) | [Bind outreach approval to reviewed revisions and recover uncertain sends safely](issue-133-version-outreach-approvals.md) | [#129](issue-129-secure-research-dashboard.md), [#131](issue-131-restore-project-verification.md), [#132](issue-132-decouple-prospect-operations.md) | Not started |
| [#134](https://github.com/dpons222/Business/issues/134) | [Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md) | [#130](issue-130-lossless-prospect-packages.md), [#131](issue-131-restore-project-verification.md), [#132](issue-132-decouple-prospect-operations.md), [#133](issue-133-version-outreach-approvals.md) | Not started |
| [#135](https://github.com/dpons222/Business/issues/135) | [Build an evidence-backed dossier for a supplied business](issue-135-single-business-research-dossier.md) | [#134](issue-134-canonical-business-research-records.md) | Not started |
| [#136](https://github.com/dpons222/Business/issues/136) | [Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md) | [#131](issue-131-restore-project-verification.md), [#134](issue-134-canonical-business-research-records.md), [#135](issue-135-single-business-research-dossier.md) | Not started |
| [#137](https://github.com/dpons222/Business/issues/137) | [Add sourced niche research and business discovery](issue-137-niche-research-business-discovery.md) | [#134](issue-134-canonical-business-research-records.md), [#136](issue-136-bounded-research-collection.md) | Not started |
| [#138](https://github.com/dpons222/Business/issues/138) | [Version research skills and implement evidence-led opportunity design](issue-138-research-skills-opportunity-design.md) | [#134](issue-134-canonical-business-research-records.md), [#135](issue-135-single-business-research-dossier.md), [#136](issue-136-bounded-research-collection.md) | Not started |
| [#139](https://github.com/dpons222/Business/issues/139) | [Validate the research workflow with a measured cross-niche pilot](issue-139-cross-niche-research-pilot.md) | [#131](issue-131-restore-project-verification.md), [#135](issue-135-single-business-research-dossier.md), [#136](issue-136-bounded-research-collection.md), [#137](issue-137-niche-research-business-discovery.md), [#138](issue-138-research-skills-opportunity-design.md) | Not started |
| [#140](https://github.com/dpons222/Business/issues/140) | [Connect solution briefs artifacts and measured outcomes](issue-140-solution-delivery-outcome-loop.md) | [#133](issue-133-version-outreach-approvals.md), [#138](issue-138-research-skills-opportunity-design.md), [#139](issue-139-cross-niche-research-pilot.md) | Not started |
| [#141](https://github.com/dpons222/Business/issues/141) | [Add evidence refresh change detection and research operating controls](issue-141-research-refresh-operations.md) | [#133](issue-133-version-outreach-approvals.md), [#136](issue-136-bounded-research-collection.md), [#138](issue-138-research-skills-opportunity-design.md), [#139](issue-139-cross-niche-research-pilot.md) | Not started |
| [#142](https://github.com/dpons222/Business/issues/142) | [Move the shared app into a reproducible platform structure](issue-142-shared-platform-portability.md) | [#131](issue-131-restore-project-verification.md), [#132](issue-132-decouple-prospect-operations.md), [#134](issue-134-canonical-business-research-records.md), [#139](issue-139-cross-niche-research-pilot.md) | Not started |

Dependencies refer to the verified completion of the needed contract, not merely an issue being created. If partial delivery makes a dependency independently usable, document its acceptance evidence and update both plans before changing the order. Do not mark an entire plan complete just to unblock another.

## Seven workstreams and release gates

| Workstream | Plans | Exit gate |
| --- | --- | --- |
| 1. Security and review | #129, #133 | Private access enforced; approved messages refer to immutable reviewed revisions; uncertain delivery has a recovery path. |
| 2. Data integrity and verification | #130, #131, #132 | Repeatable non-destructive updates, working checks, database-only prospects, honest data health, atomic focus changes. |
| 3. Research foundation | #134, #135 | Canonical identity/evidence/niche contracts, reviewed import, and an accessible private dossier. |
| 4. Collection and discovery | #136, #137 | Bounded supplied-URL research plus sourced niche/market briefs and reviewed candidate discovery. |
| 5. Diagnosis and skills | #138 | Versioned research skills, operational discovery, and evidence-led solution comparison across deliverable types. |
| 6. Pilot validation | #139 | Reviewed cross-niche results and explicit go/revise/stop decision. |
| 7. Delivery, learning, and scale | #140, #141, #142 | Artifact/outcome traceability, refresh/recovery controls, and a portable shared app with stable public URLs. |

Recommended order: #129/#130/#131 → #132 → #133 → #134 → #135 → #136 → #137/#138 → #139 → #140/#141/#142. A slash groups independent work once shared prerequisites are met; the index is the exact dependency source. Active med-spa work is an additional relocation constraint.

~~~mermaid
flowchart LR
  A[Access and data repairs] --> B[Canonical records and dossier]
  B --> C[Bounded collection]
  C --> D[Discovery and diagnosis]
  D --> E[Measured cross-niche pilot]
  E --> F[Delivery and outcome learning]
  E --> G[Refresh and shared app structure]
~~~

## Master implementation checklist

- [ ] [#129 — Secure dashboard authentication and private research routes](issue-129-secure-research-dashboard.md)
- [x] [#130 — Make prospect package generation and tracker updates lossless](issue-130-lossless-prospect-packages.md)
- [ ] [#131 — Restore lint type checks and automated regression verification](issue-131-restore-project-verification.md)
- [ ] [#132 — Decouple prospect operations from demos and make dashboard state reliable](issue-132-decouple-prospect-operations.md)
- [ ] [#133 — Bind outreach approval to reviewed revisions and recover uncertain sends safely](issue-133-version-outreach-approvals.md)
- [ ] [#134 — Establish canonical business research records and configurable niche profiles](issue-134-canonical-business-research-records.md)
- [ ] [#135 — Build an evidence-backed dossier for a supplied business](issue-135-single-business-research-dossier.md)
- [ ] [#136 — Implement bounded resumable business-site research collection](issue-136-bounded-research-collection.md)
- [ ] [#137 — Add sourced niche research and business discovery](issue-137-niche-research-business-discovery.md)
- [ ] [#138 — Version research skills and implement evidence-led opportunity design](issue-138-research-skills-opportunity-design.md)
- [ ] [#139 — Validate the research workflow with a measured cross-niche pilot](issue-139-cross-niche-research-pilot.md)
- [ ] [#140 — Connect solution briefs artifacts and measured outcomes](issue-140-solution-delivery-outcome-loop.md)
- [ ] [#141 — Add evidence refresh change detection and research operating controls](issue-141-research-refresh-operations.md)
- [ ] [#142 — Move the shared app into a reproducible platform structure](issue-142-shared-platform-portability.md)

Only these implementation statuses and the corresponding issue criteria track delivered work. The audit's original phase checklists are historical roadmap context; do not maintain a second conflicting completion tracker there.

## Audit coverage matrix

| Audit finding | Primary owner | Supporting work |
| --- | --- | --- |
| F1 Private reads/internal pages | #129 | #135 private exports; #140 public artifact projection |
| F2 Authentication defaults/roles | #129 | #131 regression checks |
| F3 Destructive package reruns | #130 | #134 canonical import/identity |
| F4 Database-only prospects rejected | #132 | #134 IDs; #135 dossier |
| F5 Failing/weak checks | #131 code/CI; #130 package validity | #139 research evaluation |
| F6 Approval version/concurrency gaps | #133 | #140 optional artifact revisions; #141 invalidation on refresh |
| F7 Multiple data owners/fallback/focus | #132 current operations; #134 canonical ownership | #133 send ledger; #141 freshness |
| F8 Missing research implementation | #136 supplied-URL worker; #137 niche/discovery | #135 review UI; #139 pilot |
| F9 Weak evidence/freshness contracts | #134 source/finding model; #136 capture | #130 validation; #138 judgment; #141 refresh |
| F10 Narrow qualification/solution scope | #138 process discovery/catalog | #137 inclusive sourcing; #140 delivery breadth |
| F11 Hardcoded niches/shared app coupling | #134 configurable profiles; #142 structure | #132 data boundaries; #135 focused UI |
| F12 Missing outcome/economics learning | #140 delivery/outcomes | #138 cost/rubric; #139 baseline evaluation |
| F13 Reproducibility/skill/workflow/issue drift | #131 checks; #134 migrations; #138 skills; #142 setup | #133 workflow exports; #141 recovery/retention |

Broader product requirements are explicitly owned as follows: niche research and competitor/market evidence (#137); named-business analysis (#135–136); no-website and strong-website opportunities (#137–138); operational discovery (#138); websites/apps/automation/content/AI/analytics (#138 and #140); measurable economics (#139–140); source refresh and budgets (#136/#141).

## Shared architecture and contracts

Retain the existing Next.js app and Supabase/Postgres data layer unless implementation evidence establishes a concrete reason to change them. A small shared domain layer and one research-worker path are sufficient for the first release. n8n remains an integration consumer of explicit contracts. Multi-user SaaS billing, additional discovery providers, and broad agent orchestration are deferred.

APP currently resolves to EXPERIMENTS/001-roofing-landing-page-service/product/demo-app. #142 changes it to apps/local-growth-preview after validation. Plans use APP so earlier work can proceed without prematurely moving active code. All other paths are repository-relative; proposed new paths are labeled as such.

Contract ownership:

| Contract | Owner and initial guarantee |
| --- | --- |
| Operator access/public projection | #129: authenticated admin actions; approved public fields only; explicit missing-config failure. |
| Lossless package/import mapping | #130: parsed schema, stable local IDs, non-destructive changes, staged validity. #134 maps to canonical IDs. |
| Operational prospect/focus reads | #132: persisted identity, pagination, source health, atomic/versioned updates. |
| Message revision and send attempt | #133: exact reviewed snapshot, atomic claim, suppression, uncertainty/reconciliation. |
| Canonical research envelope | #134: schema/run/business/location IDs, input/source references, independent states, timestamps, versions. |
| Evidence and findings | #134 defines; #136 produces; #135 reviews: capture status/hash/time, permitted evidence, observed/inferred/confirmed/unknown, confidence rationale, support/contradiction. |
| Niche/market brief | #134 schema; #137 uses: scope, buyer, geography, sources, query history, hypotheses, budgets, results and unknowns. |
| Process and opportunity | #138: observed problem or discovery requirement, options, fit/access/cost/maintenance, primary/no-action, pilot metric. |
| Artifact and outcomes | #140: recommendation revision, asset type/access/QA, baseline, observed outcome, actual versus estimated effort/revenue/cost. |
| Freshness and dependencies | #141: changes propagate to affected findings/recommendations/approvals without erasing history. |

Change contracts additively where practical. Consumers validate schema versions; unsupported versions fail explicitly. Shared business rules belong in code and tests, not duplicated strings in UI, scripts, and n8n. Skills contribute judgment through the same persistence interfaces.

## Execution rules

1. Read the selected plan, applicable project/skill instructions, and current linked issue. Inspect the current working tree and record a fresh base commit/branch in the session-start update.
2. Work only on that deliverable and its necessary dependencies. These plans record intended changes; they do not authorize outreach, purchases, scheduling, production data mutation, or publication by themselves. Use the actual user's execution instruction to determine scope.
3. Preserve existing prospect history, source evidence, public URLs, and unrelated edits. Root README and the audit were already modified in this conversation; three med-spa QA/plan files had pre-existing changes.
4. Recheck current official documentation before implementing changing platform/auth/provider behavior. The audit's local probes did not verify production Supabase/n8n settings.
5. Prefer additive migrations with measured parity and reversible mappings. Recreate schema/grants/policies in an isolated environment, then test cutover. Keep secrets in ignored environment configuration with sanitized example names.
6. Keep deterministic tests and model/research evaluations distinct. New behavior needs a meaningful regression check; template existence is not factual QA, and a mocked provider test is not a deployed test.
7. Complete local and preview verification before any release requested by the user. Test live side effects only with an explicitly appropriate internal fixture or approved operation; never run a sender to validate a research UI.
8. Update each plan/issue at meaningful checkpoints, recording what changed, actual evidence, remaining work, and limitations. Mark complete only after acceptance and expected delivery; do not mark pending user judgments or untested production behavior passed.
9. Synchronize the master status table/checklist when a deliverable actually completes. Keep #128 as the audit/planning umbrella; each implementation issue owns its changes.
10. If a later plan's assumption is disproved, revise that plan, dependencies, and issue together. Record why the decision changed; do not expand scope silently.

## Existing-work reconciliation

| Existing work | Interpretation for these plans |
| --- | --- |
| #105 Source/draft drawer | Preserve useful UI; #129 repairs read access and #132 removes demo-only lookup. No duplicate drawer rebuild. |
| #106 Draft approval, superseded behavior in closed #112 | #112 intentionally changed the main action to n8n send approval. #133 hardens the current send-approval behavior rather than reverting to the old plan. |
| #114–118 Follow-up tracking/reminders/send/channel policy | Preserve manual reply review, email-only automated follow-ups, separate first/follow-up state, and touch limits. #133 verifies the live workflow/export before hardening. #141 refresh is research freshness, not a duplicate follow-up reminder. |
| #120 Location filters | Reuse filters. #134 improves canonical geographic data and #132 ensures pagination/filter scope is correct. |
| Closed #121 Supabase-first dashboard | Treat as delivered baseline. #132 addresses remaining API/data-health gaps; #134 introduces the richer research model. |
| Closed #122 Shared focus list | Retain global ownership and no artificial cap. #132 fixes atomicity/concurrent reconciliation. |
| #127 Med-spa quality work | Preserve active changes and public-page standard; no new batch rebuild is included here. |
| Legacy plans/issue-127-move-local-growth-preview-app.md | Its number conflicts with actual #127, which excludes the move. #142 is the authoritative replacement plan and issue for relocation. |

Existing issue status is not changed merely because a similarly named local plan is checked off. Reconcile remaining historical status discrepancies in the relevant implementation closeout with evidence.

## Decision checkpoints and assumptions

| Decision | Default for planning | When to resolve |
| --- | --- | --- |
| Authentication | Maintained operator auth using existing Supabase if it satisfies required controls; admin-only initial access. | #129 after inspecting current configuration. |
| Worker runtime | One bounded worker, operator-run first if adequate; durable contract independent of host. | #136 runtime spike before implementation locks in a host. |
| Discovery provider | One authorized source plus manual import fallback; no provider purchase assumed. | #137 small coverage/cost/retention evaluation. |
| Research budgets | Explicit brief limits; ten-page initial per-business collection cap is provisional. | #136 configuration and #139 measured calibration. |
| Pilot market | Two existing niches, initially HVAC/dental, five reviewed businesses each; geography recorded before collection. | #139 pilot brief; no target list invented in this plan. |
| Quality threshold | Traceable facts, no fabricated identity/contact/services, reviewed ambiguity, proposed eight-of-ten usefulness target. | #139 actual Diego review; pending judgment stays pending. |
| Scoring weights | Simple explainable human-reviewed ranking; no claim of objective calibrated ROI. | #138 initial rubric; #139/#140 evidence-based adjustment. |
| App relocation timing | After stable research boundaries and current affected med-spa work is complete or explicitly handed off in isolation. | #142 preflight; update dependencies if moved earlier. |
| Ongoing schedules | Feature support can be built; no schedule is enabled by plan creation. | #141 only when cadence/budget/destination are explicitly chosen. |

## Validation and delivery record

No application implementation or production changes occurred while creating this package. Planning validation passed: 138 local links across 18 checked documents, all 14 issue/file/title/milestone/acceptance mappings, all 13 audit findings covered, no circular dependencies, all required plan sections present, and no implementation checkboxes incorrectly completed. The whitespace check also passed. Application builds/tests are intentionally deferred until code changes warrant them.

Before starting later implementation, inspect the current code again. The baseline audit found failing lint and a TypeScript baseUrl deprecation; diagnostic suppression passed, but this was not a repair.

## Progress log

- 2026-09-17: Audit moved here by Diego. Fourteen linked implementation plans and issues #129–142 created. Planning verification passed; every implementation deliverable remains not started.
- 2026-09-18: #130 completed locally: lossless packages/trackers, stable IDs, reviewed regeneration, transaction recovery, staged validation, and installed-skill synchronization. 28 regression scenarios passed. Recovery inventory accounts for all 225 local rows, including 169 unnamed roofing rows; original trackers remain unchanged. #131 receives the Windows PowerShell test interface; #134 receives identity/column/import mappings. No hosted release is involved.

- 2026-09-17: #129 implemented locally with maintained operator Auth, private API/data guards and public field projection. 43 focused tests, 9 real local integration tests, production build/types, HTTP privacy/auth flow and browser checks passed. Hosted project DNS/SQL access and administrator email remain unresolved; no release occurred and #129 stays open. See its plan for evidence and exact release gates. #131 inherits the focused test conventions, completed baseUrl repair and pinned Next.js security update.

- 2026-09-18: User requested commit and remote synchronization. Implementation commits: [#129 cf64f3b](https://github.com/dpons222/Business/commit/cf64f3b), [#130 76d0aa4](https://github.com/dpons222/Business/commit/76d0aa4), with audit/planning records committed alongside them. #129's hosted release status remains pending.
