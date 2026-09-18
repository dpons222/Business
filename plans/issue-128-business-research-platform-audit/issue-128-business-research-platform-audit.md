# Business research platform audit and improvement roadmap

Issue: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Date: 2026-09-17\
Base commit: `1b566a69eeddcc64cca409eb3a8c5ed6053e4503`\
Branch: `develop`

## Objective

Inspect the repository against Diego's goal: research industries and named businesses, preserve evidence, identify valuable applications of AI/software/content/automation, and run the process consistently. This deliverable is an audit and proposed implementation roadmap. It does not implement the platform or change production systems.

Implementation planning follow-up: [master checklist and fourteen deliverable plans](README.md). That index and issues #129–142 now own implementation progress; this audit preserves the original findings and roadmap context.

## Audit checklist

- [x] Read project instructions, operating plan, and relevant existing skills.
- [x] Check existing GitHub work and create an audit issue with a milestone.
- [x] Inventory application code, research records, data contracts, and automation artifacts.
- [x] Trace discovery, diagnosis, recommendation, demo, outreach, and outcome workflows.
- [x] Verify material code findings with focused local checks.
- [x] Define prioritized improvements, reusable skills, workflow gates, and implementation phases.
- [x] Record verification limits, review navigation, and session closeout.

## Work preservation

The session began with existing modifications to three med-spa QA/plan files. Those changes belong to other work and will be left intact. No application code, prospect records, production database, or outreach is changed by this audit.

## Findings and roadmap

### Overall assessment

The repository is a useful foundation for an AI solutions engineering practice. It already contains niche hypotheses, named prospects, customer-facing demos, an internal dashboard, and approval-oriented outreach processes. The next investment should be a repeatable research and diagnosis capability that feeds those assets.

The implemented application is primarily a demo and outreach workbench. Discovery, crawling, evidence collection, recommendation scoring, and business-process analysis are mostly instructions or manual work. Adding more niche folders or prompts alone will not make the research reliable.

Recommended direction: evolve this into a single-operator research workbench with two entry points: research a niche in a market, or analyze a named business/URL. Keep the existing demo assets and operator review steps. Build one complete research-to-recommendation path before increasing volume.

This report distinguishes repository evidence, isolated local reproductions, external documentation, and proposed design. It does not establish the current state of deployed Supabase policies, n8n workflows, or public hosting configuration.

### What is already useful

| Capability | What exists | Assessment |
| --- | --- | --- |
| Business validation | Remote business lab plan, idea scoring, experiment templates, validation playbook | Keep the validation-first approach and one-to-three active experiment limit. |
| Niche knowledge | Seven experiment directories covering roofing, restaurants, HVAC, remodeling, med spas, dental, and personal injury law | Useful starting hypotheses. Several niche research files lack claim-level sources and measured validation. |
| Named prospects | Local CSVs contain 30 named roofing businesses, 25 med spas, and one restaurant | Useful seed records. These are local counts, not live database totals or proof of qualification. |
| Other niche trackers | HVAC, remodeling, dental, and personal injury CSVs contain headers but no records | These niches have scaffolding; they have not reached the same local prospect depth as roofing or med spas. No real-estate experiment was found. |
| Customer-facing assets | Shared Next.js app with roofing, restaurant, and med-spa demos | Preserve reusable components, source facts, brand assets, and public URLs. |
| Operator dashboard | Filtering, search over stored prospects, location grouping, focus list, draft review, contact/follow-up recording | Useful operating UI. Current search does not discover businesses on the web. |
| Prospect state | Supabase REST integration, local fallback data, CSVs, Markdown packages | Several competing representations need explicit ownership and reconciliation. |
| Outreach | Documented n8n draft/send/reminder flows, explicit review UI, stopped-contact states | Preserve review and suppression controls. Local docs report historical executions; live runtime was not inspected. |
| Skills | Installed diagnosis, pipeline, demo-builder, and demo-QA capabilities; repo blueprints | Extend and version the domain instructions rather than accumulating overlapping prompts. |

The roofing CSV imports as 199 rows, but 169 have no business name. It also has five unnamed header columns. Counts should use validated business records rather than raw row totals. The med-spa tracker includes six recommendation categories, so there is already some module variety to preserve.

### Priority findings

P1 means address before adding research volume or giving more operators access. P2 means address as part of the research platform increment. These priorities reflect impact in the intended product, not a claim that production exploitation or data loss has occurred.

Application references below are relative to [the existing demo app](../../EXPERIMENTS/001-roofing-landing-page-service/product/demo-app/README.md). Other references are relative to the repository root unless explicitly identified as installed skills. Line numbers refer to the inspected working tree.

#### F1 — P1: Private draft reads and internal prospect pages lack access checks

Evidence: app/api/prospect-drafts/[slug]/route.ts:23, app/prospects/page.tsx:5, and app/prospects/[slug]/page.tsx:52 in the demo app.

The draft GET handler calls the data layer without checking the dashboard session. Its PATCH handler checks a session, demonstrating the difference. An isolated execution of the real GET handler with mocked Supabase data returned status 200 with a synthetic email and draft body without reading a session cookie. The data layer prefers the service-role credential when configured, so underlying row policies do not substitute for this application check.

The prospect index is also outside the protected dashboard layout. The generic prospect route can render an explicitly internal recommendation summary, observed issue, and workflow instructions for database-backed prospects. This conflicts with the project's public-page rule.

Fix: protect every internal read and write at the server boundary, place internal research under the dashboard, and expose only explicitly published public asset fields on demo routes. Test anonymous access, authenticated access, and public-demo access separately. Audit deployed exposure as a follow-up; it was not tested here. Supabase describes grants and RLS as separate access-control layers in its [API security documentation](https://supabase.com/docs/guides/api/securing-your-api).

#### F2 — P1: Dashboard authentication falls back to known development credentials in production

Evidence: lib/dashboardAuth.ts:9, :27, :49, :53, and app/api/prospect-drafts/[slug]/route.ts:63.

Missing configuration enables a built-in account and a fixed signing secret regardless of environment. The production-mode isolated probe confirmed that the fallback account authenticates. Password hashes use unsalted SHA-256; sessions are accepted from the signed payload without checking whether the user was removed or their role changed. Mutation routes check session existence but do not enforce the declared admin/user role distinction.

Fix: fail closed on missing production configuration; migrate to maintained authentication/session handling; enforce a documented operator-role policy; add login throttling and revocation coverage. For the first single-user release, an explicit admin-only policy is simpler than partially implemented roles. Do not infer that live credentials are missing: only the fallback behavior was verified.

#### F3 — P1: Re-running the prospect generator can corrupt trackers and overwrite research

Evidence: AUTOMATIONS/lead-growth-pipeline/scripts/New-ProspectPackage.ps1:40, :51, :248, :256, :263, :285, :296.

The generator reads CSV headers by splitting the raw first line. Its own Export-Csv output quotes those headers, so the next run treats the quote characters as part of each column name. It also creates an empty replacement row and rewrites all six package files.

Reproduction in a disposable copy of the HVAC tracker: generate a business, add a contact date and reply, add a hand-written finding, then regenerate the same business. The business_name field became inaccessible under the expected header, contact history disappeared, and the finding was overwritten. No real prospect records were used.

The deduplication predicate also treats an identical website as a replacement even for a different location. An empty website can match other empty websites. This is unsuitable for franchises, multiple locations, and businesses without websites.

Fix: use a real CSV parser for headers; update only explicitly supplied fields; preserve existing documents by default; use stable business/location IDs; resolve ambiguous duplicates for review; implement explicit regeneration with a diff; write atomically. Verify repeated runs, quoted headers, blank URLs, same-domain locations, and existing contact history.

#### F4 — P1: Database-only businesses cannot use the draft API

Evidence: app/api/prospect-drafts/[slug]/route.ts:26 and :72; lib/prospectDrafts.ts:1006 and :1779.

The dashboard reads Supabase prospects, but both draft handlers require a local demo-registry entry. A synthetic database-only business appeared in the real dashboard data function and received 404 from the real draft GET handler. This prevents research-first expansion unless each business also receives a code registration.

Fix: resolve prospect identity from the canonical business record after authorization. Treat demo availability as optional. Test a newly imported business with no demo, a missing business, and a business with multiple assets.

#### F5 — P1: Quality checks do not currently provide a reliable gate

Evidence: package.json:9 and tsconfig.json:20; AUTOMATIONS/lead-growth-pipeline/scripts/Test-ProspectPackage.ps1:11.

- npm run lint fails because it invokes next lint with installed Next.js 16.2.9. Next.js documents that command's removal in the [version 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).
- The normal TypeScript check fails with TS5101 because installed TypeScript 6.0.3 rejects the deprecated baseUrl setting without an explicit suppression. A diagnostic-only run with ignoreDeprecations 6.0 passes; this is not a permanent repair. See [TypeScript 6.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html).
- No tracked application test suite or GitHub Actions workflow was found. Manual testing checklists do exist.
- The package validator accepts seven empty files because it only checks their existence. It is accurately a structure check, but it cannot support a ready-for-review gate.

Fix: restore lint and typecheck commands, pin an intentional supported dependency set while retaining the existing lockfile, add focused regression tests for the defects above, and add CI. Extend package validation to enforce identity, evidence, timestamps, required content, valid states, unresolved placeholders, and tracker linkage. Separate structure-valid, research-complete, and outreach-approved states.

#### F6 — P1: Approval is not bound to the exact reviewed record version

Evidence: lib/prospectDrafts.ts:573, :1115, :1199, :1305, :1339; AUTOMATIONS/outreach-approval-send/workflow-spec.md.

The UI has a useful explicit review checkbox. However, the approval request carries an action rather than the version of the recipient, text, and asset the operator saw. The server reads a current row and then patches by slug alone. A changed record can therefore be approved after the displayed copy became stale, and concurrent state changes are not checked atomically.

The first-touch readiness check calls an email verified when it is merely nonempty and does not read the pre-send evidence fields. A synthetic ready-for-review row without those fields was approved in the isolated probe. The documented sender has further checklist checks, so this does not establish that an email would be sent. It establishes disagreement between approval layers. Follow-up approval writes checklist booleans from a general approval action; these should be recorded as explicit operator attestations and tied to the reviewed version.

Fix: submit an expected revision or immutable draft hash, compare-and-set within a transaction, invalidate approval when recipient/copy/asset changes, persist evidence-backed checks and explicit attestations, and revalidate the approved snapshot before sending. The documented send flows also lack a visible atomic claim/recovery design: inspect the live workflow, export it, then add claim IDs and reconciliation for send-success/database-update-failure. Do not blindly retry uncertain sends.

#### F7 — P2: Operational data has multiple owners and silent fallback behavior

Evidence: lib/prospectDrafts.ts:1006, :1037, :1068, :1074; lib/demoRegistry.ts:64; lead-growth-pipeline/data-contract.md; experiment CSVs.

The app merges database state with local demo state; CSVs and documents have another status vocabulary. A database failure can return local entries and empty summaries without a data-health result. Operators may see incomplete or outdated contact state without understanding why. The dashboard fetch does not paginate, and the code has no continuation mechanism for a dataset larger than the server's response limit.

Fix: make the database authoritative for business identity, research status, contact suppression, and approvals. Treat Markdown/CSV as versioned exports and imports with validation reports. Keep local asset configuration separate. Return data source, last successful sync, error state, and partial-result flags. Paginate with stable ordering. Never infer contact eligibility from fallback demo metadata.

Additional reliability defect: lib/dashboardFocus.ts:118 replaces the shared focus list using a delete-all request followed by a separate insert. Failure or concurrent edits can lose list state. Replace this with a transactional operation or incremental versioned changes.

#### F8 — P2: Research is specified but not implemented as a repeatable capability

Evidence: AUTOMATIONS/lead-growth-pipeline/README.md:3 and workflow-spec.md; the two package scripts; the application route inventory.

The pipeline explicitly calls itself future scaffolding. It can create files and check their presence; it does not discover businesses, crawl pages, capture evidence, classify sources, or execute research jobs. The app has no research-run or crawl endpoint/worker in the inspected source tree.

Fix: implement a narrow discovery/import adapter, bounded crawler, structured extractor, evidence store, and review screen. Research a small batch end-to-end before adding provider integrations or a large agent workflow.

#### F9 — P2: Recommendation inputs are too weak to distinguish fact, inference, and unknown

Evidence: lead-growth-pipeline/data-contract.md:27; New-ProspectPackage.ps1:276; HVAC research.md and product/recommendation-framework.md; med-spa prospect recommendation files.

Evidence and freshness are recommended free-text fields, not a required claim-level contract. The generator writes that the public journey was reviewed even when only a business name was supplied. An inspected med-spa recommendation cites a homepage and a July 3 recheck, but the current system cannot automatically expire or revalidate that observation. Some existing research does contain links and good assumptions sections; preserve those while making evidence verifiable.

Fix: every material factual finding must reference an exact source, capture time, excerpt or permitted snapshot, and confidence rationale. Preserve failed/blocked pages and contrary evidence. Use distinct observed, inferred, owner-confirmed, and unknown categories. Failure to find a booking or CRM feature is not proof that none exists.

#### F10 — P2: Current qualification and scoring favor public conversion work over the requested scope

Evidence: installed lead-growth-pipeline qualification reference; installed niche-growth-system-builder module scoring; HVAC solution modules and discovery questions; BUSINESS_OFFERS/brand/README.md:22.

Qualification currently pauses businesses with no website/meaningful public journey, or opportunities that require private process discovery. This excludes viable website-creation prospects and businesses with strong websites but inefficient internal operations. Module scoring favors visible gaps, demo potential, and low access requirements without a defined weighting or score calibration. The brand positioning still emphasizes landing pages and roofing.

Fix: retain a quick public-growth track and add an operational-discovery track. A missing website can be a qualified opportunity when the business identity and activity are verified elsewhere. A hidden operational problem belongs in discovery-required, not automatically bad-fit. Expand selection to efficiency, errors, capacity, customer experience, accessibility, support burden, and delivery economics. Include buy/configure, conventional software, and no-change alternatives alongside AI.

#### F11 — P2: Shared product architecture remains coupled to one experiment and hardcoded niches

Evidence: the app lives under EXPERIMENTS/001-roofing-landing-page-service/product/demo-app; lib/demoRegistry.ts:4 and :40; lib/prospectDrafts.ts:396; components/ProspectPreviewDashboard.tsx.

The niche union covers roofing, restaurant, med_spa, HVAC, plumbing, and other. Dental, remodeling, personal injury law, and real estate become other in this layer. The isolated dental fixture confirmed this behavior. The dashboard component is 2,815 lines; the draft/data module is 1,781 lines and mixes transport, business policy, formatting, and fallback content. The client dashboard imports a formatting helper from that mixed module. This is a boundary/maintenance concern; it is not evidence that a secret reached the browser.

Fix: define configurable niche profiles and a domain model independent of demos. Separate server data access, state-transition policy, research logic, and client formatting. Add server-only boundaries. Move the shared application only after dependency and deployment-path mapping; preserve current prospect URLs and update the lab plan and READMEs when the directory decision is implemented.

#### F12 — P2: The system cannot yet learn which recommendations are commercially worthwhile

Evidence: experiment validation.md and finances.md files; campaign-tracking-strategy.md packages; approval/follow-up state types.

There are useful hypotheses, price tests, and proposed success criteria, but no implemented link from a specific observation and recommendation to delivery effort, accepted pilot, measured result, and realized margin. Pricing scenarios mostly describe revenue rather than the cost of discovery, unpaid demos, delivery, support, and software.

Fix: connect recommendation versions to experiments and outcomes. Track reasons for rejection, paid-pilot conversion, time spent, recurring tool cost, maintenance time, implementation margin, and the agreed customer metric. Use results to revise niche assumptions and scoring. Research volume and demo count are activity metrics, not validation of willingness to pay.

#### F13 — P2: Important operating artifacts and issue status are difficult to reproduce

Evidence: AUTOMATIONS workflow specs reference remote n8n IDs, but no workflow exports were found; SQL files are ad hoc additions rather than a complete tracked migration chain; SKILLS contains blueprints while domain skills live in a personal Codex directory. The tracked skills lock currently covers two Supabase skills.

GitHub #106 and #118 remained open with unchecked acceptance criteria while similarly named plans were in completed_plans with checked work. Their history needs reconciliation, not automatic closure based on a filename.

Fix: version sanitized workflow exports, complete schema migrations, domain skill sources, and evaluation fixtures. Separate example configuration from secrets. Establish one owner for each artifact and reconcile GitHub status only after checking its final scope and validation. This makes the project resumable on another machine and makes regressions diagnosable.

### Intended product and user experience

The first release should serve Diego as the operator. Multi-user SaaS billing and broad autonomous agent orchestration can wait until the research process is useful and measured.

Two entry points:

1. Research a niche: choose business category, region, service focus, desired count, and research budget. Receive a sourced candidate list, niche brief, and shortlist with reasons.
2. Analyze a business: paste a URL or enter a name and location. Resolve identity, inspect available public evidence, and receive a business dossier with ranked opportunities and the questions needed to validate them.

Suggested screens:

| Screen | Decision it supports |
| --- | --- |
| Research brief | What are we studying, where, why, and with what budget? |
| Candidate review | Is this the correct business/location, and should we investigate it? |
| Business dossier | What does it do, what do we know, and where did each claim come from? |
| Opportunities | Which problem is worth solving first, with what evidence and tradeoffs? |
| Research queue | What completed, failed, needs review, or has become stale? |
| Delivery and outreach | What approved artifact or discovery request is appropriate next? |
| Outcomes | Which niche/module combinations justify continued work? |

A useful business dossier contains services, geography, public customer journeys, verified contacts, source freshness, detected technology with uncertainty, relevant competitor comparisons, observations, assumptions, unanswered questions, primary opportunity, alternatives, delivery/access requirements, and a pilot measurement plan. The existing demo dashboard can remain a downstream view of that dossier.

### Repeatable workflow and stage gates

~~~mermaid
flowchart LR
  A[Niche brief or named business] --> B[Discover and resolve identity]
  B --> C[Collect public evidence]
  C --> D[Review findings and unknowns]
  D --> E[Rank solution options]
  E --> F[Discovery or small pilot]
  F --> G[Build and verify]
  G --> H[Measure results]
  H --> A
~~~

| Stage | Required output | Gate before advancing |
| --- | --- | --- |
| Brief | Niche, market, buyer, research question, inclusion/exclusion rules, budgets | Scope is specific enough to judge candidates and stop the run. |
| Market research | Sourced demand signals, alternatives, buying triggers, competitor sample, reachability, unknowns | Distinguish measured facts from hypotheses; do not label a search-result count as market size. |
| Discovery | Candidate name/location/domain/source and discovery query | Entity matching reviewed; duplicates and branches remain traceable. |
| Collection | Page/source records with capture status, time, coverage, and permitted evidence | Failed or blocked sources are explicit; partial coverage cannot become a strong absence claim. |
| Diagnosis | Observations, contrary evidence, confidence, unknowns, discovery questions | Each material public claim has valid evidence; internal-process claims require confirmation. |
| Prioritization | Primary option, alternatives, dependencies, pilot metric, delivery cost range | Check fit, access, risk, and economics before optimizing the score. Include no-build/buy alternatives. |
| Discovery/pilot | Owner-confirmed problem, baseline, scope, success/stop criteria | Proceed with the smallest useful commitment; do not build expensive unpaid demos by default. |
| Artifact QA | Appropriate website/app/workflow/content artifact and acceptance evidence | User journey works; claims and assets are verified; internal material remains private. |
| Outreach review | Exact recipient, message revision, optional relevant asset, check evidence | Explicit approval bound to that version; suppression state wins over all campaign settings. |
| Outcome review | Response/pilot/result/cost records linked to the recommendation | Decide continue, revise, or stop, and update the niche profile. |

Research completion must not imply outreach approval. A business can be researched with contact information unknown. A recommendation can be ready for discussion without a demo. Retain the existing exact-message approval standard for any actual outreach.

#### Public observations versus operational discovery

Public work can establish that a service page exists, a button leads to a particular destination, a link fails during inspection, or a page makes a stated promise. It usually cannot establish CRM usage, staff workload, missed-call rate, conversion rate, revenue loss, or the quality of internal follow-up.

Add a process-discovery questionnaire covering trigger, steps, systems, handoffs, volume, time per task, common errors, rework, exception handling, data sensitivity, owner, and baseline measures. Request only the minimum authorized information for the selected pilot.

Example: a generic HVAC inquiry form supports a finding about public routing clarity. An estimate-follow-up automation remains conditional until the owner confirms the current process and problem. Likewise, a dental office may have an excellent website and still benefit from internal document or scheduling support; that requires discovery rather than a fabricated website critique.

### Solution catalog to cover the requested breadth

Store modules as configurable records with evidence needed, qualifying conditions, contraindications, required access, deliverables, acceptance tests, baseline metric, estimated effort, recurring costs, and ongoing support. These are hypotheses to assess per business, not findings about every member of a niche.

| Family | Candidate deliverables | Example measure |
| --- | --- | --- |
| Websites and customer journeys | New business site, service pages, quote/request flow, accessibility improvements, calculator | Task completion, qualified requests, abandonment, accessibility defects |
| Business applications | Customer portal, estimate builder, staff dashboard, document workspace, job-status tool | Turnaround time, adoption, rework, support requests |
| Workflow and integrations | CRM routing, estimate follow-up, scheduling handoffs, invoice reminders, reporting sync | Response time, manual touches, exceptions, completed handoffs |
| Practical AI assistance | Grounded internal knowledge search, document extraction, support drafts, classification, call-summary review | Task accuracy, review time, unsupported-answer rate, escalations |
| Digital content | Approved service education, FAQ library, visual assets, listing content, campaign content | Publishing effort, engagement tied to a customer action, content accuracy |
| Analytics and operations | Source attribution, dashboards, process measurement, data cleanup | Data completeness, reporting time, measurable baseline changes |

Example niche profiles:

- Real estate agencies: inquiry routing, listing-content operations, document coordination, client status portals. Verify decision authority and data/platform access before scoping integrations.
- HVAC: dispatch handoffs, maintenance reminders, estimate coordination, field-to-office summaries, service information.
- Dental offices: appointment administration, approved patient education, nonclinical FAQ assistance, document routing. Keep clinical decision-making outside a general business-automation module.
- Roofing: estimate/proposal preparation, inspection-document organization, project updates, scheduling and supplier handoffs, lead qualification.

For every AI candidate, compare a deterministic rule, an existing product configuration, and a custom AI component. Use AI when language or document variability makes it worthwhile, and specify how uncertain results reach a human.

### Recommended skills and ownership

A skill should define judgment and a repeatable contract. Code should enforce state, evidence, budgets, and permissions. A background workflow should execute and recover tasks. These are complementary responsibilities.

| Skill | Action | Inputs → outputs | Mandatory quality rule |
| --- | --- | --- | --- |
| niche-growth-system-builder | Extend | Research brief → sourced niche profile, market hypotheses, module options | Cover operational value as well as public growth; record sources and unknowns. |
| lead-growth-pipeline | Refactor | Brief/profile → candidate and research runs | Stop treating a demo as a prerequisite; separate research, delivery, and outreach state. |
| business-discovery-and-identity | Add | Niche/location or name/URL → resolved businesses and locations | Preserve provenance; flag ambiguous matches; do not merge locations by domain alone. |
| business-evidence-review | Add | Collected pages/listings → verified facts, gaps, confidence, stale flags | Cite claims, track coverage, distinguish unknown from absent, identify contradictory evidence. |
| business-process-discovery | Add | Public dossier + authorized owner answers → process map and measured pain | Never infer private operational failure solely from a website. |
| solution-opportunity-design | Add | Verified findings/process map → ranked options and pilot brief | Compare AI, ordinary software, buy/configure, and no-change options; include delivery economics. |
| prospect-demo-builder and prospect-demo-qa | Extend existing capabilities | Approved brief → appropriate artifact and QA record | Support apps/workflows/content as well as pages; keep internal analysis off public assets. |
| pilot-outcome-review | Add after pilots exist | Baselines, results, effort, objections → continue/revise/stop decision | Separate observed results from assumptions and account for uncertainty. |

Implement the first three research-related contracts before adding the remaining skills. Version canonical definitions and examples in the repository, then install or sync them into Codex. Pin a skill/prompt version on each run. Avoid separate almost-identical skills for each industry: put industry differences in niche profiles.

A common skill output envelope should include schema version, run ID, business/location IDs where applicable, input references, findings with evidence IDs, assumptions, confidence rationale, blockers, recommended next state, tool/model versions, and cost/time use. Persisted free text must not be the only way to recover pipeline state.

### Data and architecture proposal

Reuse Next.js for the operator UI and existing demos, and Supabase/Postgres for canonical records. Start with a small shared domain layer and one worker path. Keep n8n for integration handoffs where it is already useful. Long crawls should run as resumable jobs rather than holding a dashboard request open. This is a design recommendation, not a claim that the current deployment already supports that worker.

Core records, introduced incrementally:

| Record | Responsibility |
| --- | --- |
| Niche profile + research brief | Configurable taxonomy, market boundaries, hypotheses, module menu, run budgets |
| Business + location + identifiers | Stable identity, canonical domain, location distinctions, provenance, alias/merge history |
| Research run + job attempts | Stage, inputs, idempotency key, lease, retry count, errors, cost, timing, versions |
| Source + page capture | URL, provider, fetched time, status, content hash, allowed stored excerpt/snapshot, retention policy |
| Finding + evidence links | Typed claim, observed/inferred/confirmed/unknown, confidence rationale, supporting and conflicting sources |
| Opportunity + recommendation version | Problem, alternatives, score explanation, dependencies, pilot, expected metric, effort/cost assumptions |
| Artifact | Type, public/private access, stable URL, linked recommendation version, QA state, approved asset provenance |
| Contact + outreach revision + approval | Contact source/verification, suppression, exact message/recipient/asset revision, review evidence |
| Experiment + outcome + activity event | Measured results, expenses, operator actions, objections, audit trail |

Keep research status, artifact status, relationship status, and message-send status separate. They change independently. Example: research can be complete while the opportunity still requires discovery and outreach is unapproved.

Initial research states: queued → collecting → needs_review → complete, with explicit blocked, failed, stale, and cancelled paths. Failed pages may produce a partial run; the dossier must show its coverage limits. Human confirmation should enrich an existing finding rather than erase its original public evidence.

A source-aware evidence model is essential. For example, Google Places content has storage and attribution restrictions, while place IDs have a specific storage exception. Choose an authorized discovery provider and implement its retention rules before persisting its payloads; do not assume every provider allows permanent copying. See [Places API policies](https://developers.google.com/maps/documentation/places/web-service/policies). This report does not select or purchase a provider.

#### Collection and job reliability

Proposed initial defaults, to calibrate with the pilot:

- A shallow pass of the homepage, relevant service pages, about/location page, and contact/booking path; begin with a ten-page cap per business.
- Escalate to browser rendering only when the ordinary fetch is insufficient. Preserve a blocked state instead of attempting to evade access controls.
- Respect robots directives, domain rate limits, timeouts, size limits, and explicit run budgets. [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) is the robots protocol reference; it does not replace source-specific permission or retention decisions.
- Permit only public HTTP(S) targets; reject private/local addresses and recheck redirects and resolved targets. A URL-submission feature must not reach the application's internal network.
- Treat page text as evidence, never as instructions that can change tool permissions or trigger messages.
- Do not submit forms, book appointments, or contact businesses during passive inspection.
- Use stable job IDs, checkpoint stages, deduplicate repeated work, record provider errors, and resume only the failed stage.
- Reuse unchanged permitted captures by content hash. Record retrieval freshness separately from the age of a fact.
- Put an explicit research budget on the run. Pause at the cap with partial results rather than spending silently.

#### Scoring and business economics

First apply hard fit checks: the business is real and in scope, the recommendation has evidence or a clear discovery requirement, required access is obtainable, and delivery fits the operator's capabilities.

Then rank value, confidence, urgency, implementation effort, ongoing maintenance, dependencies, reuse, and time to measurable benefit. Use explicit rubric definitions and show the component scores. Start with simple human-reviewed rankings; calibrate weights against real pilot outcomes rather than presenting an arbitrary score as objective truth.

Track customer benefit and Diego's delivery economics separately. A time-saving estimate should expose its inputs: confirmed task volume × measured minutes saved × an agreed value of time, minus ongoing cost. Released staff capacity is not automatically cash savings. Label hypothetical scenarios and do not invent conversion or revenue uplift.

### Implementation sequence and acceptance criteria

The checklist below is proposed future work. No platform feature or application fix has been implemented in this audit. Before implementation, create or reuse one GitHub issue per deliverable and give it a corresponding issue-numbered plan. Reconcile overlap with #105, #106, #114–118, #120, and #127 rather than duplicating their historical scope.

#### Phase 0 — Repair the current foundation

- [ ] Protect private draft/index/recommendation routes and remove production authentication fallbacks.
- [ ] Fix generator round-tripping and non-destructive updates; repair affected tracker data from reviewed source records.
- [ ] Remove the local-demo prerequisite for canonical business operations.
- [ ] Restore lint/typecheck and introduce focused regression tests plus CI.
- [ ] Version approval snapshots and align readiness checks; inspect/export sender workflows before changing their recovery behavior.

Exit checks: anonymous internal requests are denied; public demos still load; missing production auth configuration fails closed; a second package run preserves research/history; new database-only businesses work; checks run successfully; stale approval attempts are rejected.

#### Phase 1 — Establish canonical research records and a business dossier

- [ ] Define business/location identity, source/finding schemas, independent state machines, and database migrations.
- [ ] Add a business manually by URL or name/location without creating a demo.
- [ ] Show a dossier with facts, evidence, confidence, coverage, unknowns, and next action.
- [ ] Import existing CSVs/packages with a dry-run report, duplicate review, provenance, and suppressed-contact preservation.
- [ ] Make database health visible and add pagination.

Exit checks: import the 56 named local records for review without losing originals; report conflicts instead of silently merging them; show a synthetic dental or real-estate business under its actual niche; every imported status has an explicit mapping or unresolved exception. Do not assume 56 records equal 56 unique legal entities.

#### Phase 2 — Deliver one bounded research run

- [ ] Implement one discovery/import adapter and same-site collection with browser fallback.
- [ ] Persist source captures, typed extraction, evidence links, and failed-page coverage.
- [ ] Add run status, retry/resume, cost/time budgets, and operator cancellation.
- [ ] Add evidence-review and recommendation comparison with a no-build option.
- [ ] Enable a reviewable dossier export that does not expose internal notes publicly.

Exit checks: one brief or supplied URL produces a complete inspectable dossier; stopping/restarting does not duplicate the business; a blocked page stays unknown; every displayed factual finding opens its supporting source; cost and coverage are visible. No outreach is triggered by finishing research.

#### Phase 3 — Validate breadth with a small mixed-niche pilot

- [ ] Use two existing niches, initially HVAC and dental, with five businesses per niche selected for variety rather than only weak sites.
- [ ] Include a multi-location business, strong website, missing website, JavaScript-heavy page, and unavailable/blocked page in fixtures or the reviewed sample.
- [ ] Compare assisted research with a manual baseline for accuracy, useful opportunities, operator time, and cost.
- [ ] Exercise public-growth and operational-discovery recommendations, including a justified no-action outcome.
- [ ] Add a real-estate niche profile as a portability check without creating a parallel application.

Suggested go/no-go measures: all factual claims traceable, no fabricated contacts/services, duplicates reviewed, ten dossiers judged by Diego, and at least eight judged useful with only minor factual correction. Record time and cost before setting a performance target. These are proposed acceptance targets, not measured results.

#### Phase 4 — Connect selected opportunities to delivery and learning

- [ ] Add module-specific briefs for websites, applications, automation, content, and AI assistance.
- [ ] Add process discovery, cost/access checks, scope boundaries, pilot metrics, and maintenance plans.
- [ ] Link artifacts and QA records to the approved recommendation version.
- [ ] Track responses, objections, pilot acceptance, effort, ongoing cost, and agreed business outcomes.
- [ ] Revise niche profiles and scoring based on outcomes; stop weak modules early.

Exit checks: at least one authorized pilot can be followed from evidence to scope, delivery acceptance, and measured outcome. A mock or simulation is clearly represented in internal records; a working workflow is tested with authorized synthetic data before using business data.

#### Phase 5 — Improve operating scale only after the pilot

- [ ] Add additional discovery adapters only where coverage gaps justify them.
- [ ] Add evidence refresh policies, change detection, stale-recommendation queues, and useful exception notifications.
- [ ] Reorganize shared app/domain/worker code outside the roofing experiment with preserved deployment paths and public aliases.
- [ ] Introduce further operators, access scopes, or a client-facing portal only if actual usage requires them.

Exit checks: refreshes do not generate duplicate work; budget exhaustion is visible; changed facts invalidate dependent recommendations; public asset routes survive the move; recovered workflows do not repeat side effects.

### Recommended first implementation deliverables

1. Private-data/authentication boundary repair, with focused regression coverage.
2. Lossless prospect import/generator and canonical identity repair.
3. A research dossier for one supplied business URL, with citations and explicit unknowns.

The third deliverable is the first visible product slice. It should work before adding an automated search campaign, new paid research tools, or another large batch of demos. The longer-term architecture should remain broad, while the first implementation stays narrow enough to verify.

### Verification performed and limitations

| Check | Result |
| --- | --- |
| Repository inventory | Reviewed tracked application/scripts/SQL/workflow documents, root instructions, niche assets, selected prospect packages, and open issue state. |
| Local dependency versions | Next.js 16.2.9; React 19.2.7 in lockfile; TypeScript 6.0.3 installed and locked. |
| Lint | Failed: removed next lint command interpreted lint as a project directory. |
| Normal TypeScript check | Failed: TS5101 on baseUrl. |
| Diagnostic TypeScript check with deprecation suppression | Passed. No application source/config changed. |
| Isolated auth and route probes | Confirmed production fallback login, unauthenticated draft GET with mock sensitive fields, database-only business 404, dental mapped to other, and approval without stored verification evidence. |
| Disposable package round-trip | Confirmed quoted-header corruption, lost synthetic contact history, and overwritten hand-written finding. |
| Empty package validation | Seven empty required files passed the structure validator. |
| Test/workflow inventory | No tracked app automated tests, GitHub Actions workflow, n8n JSON exports, or Supabase migration directory found. Existing manual checklists and ad hoc SQL were reviewed. |

The route probes executed the actual TypeScript modules with mocked Next.js response/cookie boundaries and synthetic network responses. They did not start the deployed application, read production credentials, mutate Supabase, or contact a prospect. They establish code behavior, not a production penetration-test result.

No production build, browser usability audit, full dependency vulnerability scan, live schema/RLS audit, n8n runtime audit, or current re-crawl of prospect websites was performed. A full production readiness decision requires those checks under the relevant implementation scope. A few files were already being edited for med-spa QA; their work was preserved.

### Session closeout

- Completed: repository audit, focused defect reproductions, target workflow, skill contracts, data/architecture proposal, phased acceptance criteria, and issue tracking.
- In progress: review of this proposed direction; all implementation phases remain unchecked.
- Blocked: nothing blocks using this audit. Live infrastructure conclusions remain outside the inspected scope.
- Next recommended step: implement Phase 0's access and data-integrity repairs, then the single-business dossier slice.
- Milestone impact: Phase 2 now has a concrete research-platform roadmap. Existing feature issues were not closed or relabeled by this audit.
