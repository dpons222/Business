# Issue 131 — Restore lint type checks and automated regression verification

Issue: [#131](https://github.com/dpons222/Business/issues/131)\
Parent: [#128](https://github.com/dpons222/Business/issues/128)\
Milestone: Phase 2 - Production Enhancements\
Priority: priority:p1\
Status: Planned — implementation not started\
Planning date: 2026-09-17\
Planning baseline: 1b566a69eeddcc64cca409eb3a8c5ed6053e4503 on develop. Record a fresh execution baseline before making changes.

## Objective

Provide reproducible checks that catch the audit's defects and keep subsequent platform work verifiable.

## Dependencies and prior work

No blocking implementation prerequisite. Coordinate test interfaces with [the verification plan](issue-131-restore-project-verification.md); urgent access repairs may add their own focused regression coverage.

No direct prior feature issue was identified; the audit is the source of this deliverable.

Audit coverage: F5, F13. See [the audit](issue-128-business-research-platform-audit.md) and [master execution rules](README.md#execution-rules).

## Scope

In scope:

- Repair the installed Next.js/TypeScript toolchain configuration, explicit dependency policy, and CI.
- Add a small meaningful test harness and documented local verification workflow.
- Validate clean installation, environment isolation, and secret-free examples.

Out of scope:

- Broad framework upgrades, cosmetic refactors, exhaustive snapshot tests, or executing live n8n send workflows.

## Affected areas

APP means the current shared app path recorded in the master README. Proposed new files/directories below are design targets, not claims that they already exist.

- APP/package.json; package-lock.json; tsconfig.json; next.config.mjs
- New APP lint configuration and tests
- New .github/workflows verification definition
- APP/README.md; root .gitignore and environment example allowlist if necessary

## Implementation decisions

- Retain the existing package lock; replace latest specifications with an intentional supported version policy after checking the installed versions and official guidance.
- Replace removed next lint with a maintained lint CLI and fix baseUrl configuration instead of permanently suppressing deprecations.
- Choose one TypeScript test runner and a browser smoke-test runner only where needed. Prefer observable route/policy/data behavior over implementation mirroring.
- CI uses synthetic credentials, mocked transports, or an isolated local database; it must never fall through to production.

## Implementation checklist

- [ ] 1. Record installed and locked versions; reproduce lint and type failures and inventory generated-file/fixture exclusions.
- [ ] 2. Repair lint/type commands and environment validation; add explicit lint, typecheck, test, and build scripts plus a check aggregator.
- [ ] 3. Choose and document the smallest compatible test setup; import the prior audit's failure scenarios as committed synthetic regression fixtures.
- [ ] 4. Run package-script tests in disposable directories; cover auth/API boundaries and approval transitions without network side effects.
- [ ] 5. Add CI with a pinned runtime, clean install from the lockfile, independent check results, and build smoke verification.
- [ ] 6. Document how local database integration tests and browser checks run; fail clearly when their isolated prerequisites are missing.
- [ ] 7. Verify a fresh checkout can run required checks and generate a production build with safe test configuration.

## Acceptance and verification

Record the actual check, fixture/environment, result, and evidence for each criterion. A description of intended behavior does not count as a passed test.

- [ ] Clean install, lint, typecheck without a deprecation override, tests, and build pass from the documented app directory.
- [ ] Introducing a missing auth guard or package round-trip corruption makes a relevant regression check fail.
- [ ] CI runs on proposed changes and reports each failed check clearly; no external sending or production data access occurs.
- [ ] The committed environment example lists required names without secret values and is not accidentally ignored.
- [ ] Test artifacts, dependencies, generated Next.js files, and credentials are excluded from commits.

## Migration and compatibility

- Coordinate lockfile changes with active app work. Inspect release guidance before changing a major version; this plan is not an instruction to upgrade to latest.
- Keep runtime constraints documented for both local development and CI.

## Rollback and recovery

- Revert the narrow toolchain/config changes using the recorded baseline if compatibility breaks; keep regression fixtures and do not declare unrun checks passed.
- Do not hide failures with ignored errors or a permanently disabled CI step.

## Risks and decision checkpoints

- A build may load environment values or generate routes; isolate it from real services.
- New tests must not become a large maintenance project before the research slice exists.

## Handoff and completion record

- Working verification scripts/CI, fixture conventions, dependency policy, and fresh-checkout instructions.

- [ ] Required checks pass, with material limitations recorded.
- [ ] Relevant README, contract, and operating instructions describe the delivered behavior.
- [ ] Record commit/PR and deployment references when applicable; do not infer deployment from a local build.
- [ ] Update the matching GitHub issue and master checklist using verified results.
- [ ] Close only when this plan's acceptance criteria and the repository's delivery rules are met.

## Progress log

- 2026-09-17: Implementation plan created from the audit and current issue history. No implementation performed.
- 2026-09-18: #130 handoff: the standalone package regression runner is `AUTOMATIONS/lead-growth-pipeline/tests/Run-RegressionTests.ps1` (PowerShell 7.5+, Windows for junction containment). Run it as a separate CI check with a pinned compatible runtime. It uses synthetic temporary fixtures, child-process concurrency/recovery tests, and no network/credentials. A failure exits nonzero and retains fixtures. Keep its package-integrity coverage separate from the app's Vitest/security checks.


- 2026-09-17: #129 prerequisite handoff (not completion of #131): Next.js is now pinned to 16.3.5 with its security fixes; deprecated tsconfig baseUrl was removed and production build/type checking pass. Reuse the new Vitest security suite (43 focused + 9 local Supabase integration tests), explicit local fixture/cleanup rules and production HTTP harness. The existing next-lint script still fails. Latest npm audit: 12 remaining findings (5 moderate, 7 high, zero critical); investigate and resolve in #131. The flagged undici dependency comes through the pre-existing shadcn/dotenvx CLI, not the new Auth SDK. Avoid redoing the finished security checks without a relevant change.
