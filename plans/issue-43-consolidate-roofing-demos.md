# Issue 43: Consolidate Roofing Prospect Demos

GitHub Issue: https://github.com/dpons222/Business/issues/43

## Objective

Consolidate all completed roofing prospect demo work into one integration branch and one public production build.

The goal is to end the stacked/separate prospect branch state and have one validated demo app containing every completed prospect route, registry entry, README reference, and prospect package.

## Branch

```text
issue-43-consolidate-roofing-demos
```

## Base Commit

```text
a297b570c972389cd197be7db873a518fcd7386c
```

## Scope

### In Scope

- Merge completed prospect work for:
  - Final Cut Roofing
  - Charger Roofing
  - LOA Construction
  - Rivertop Roofing
  - StormVets
  - Brotherhood Roofing
  - Matthew Lorand Roofing
  - Integrity First Roofing & Construction
  - EDP Roofing
  - Proper Roofing
- Resolve shared `lib/prospects/index.ts` conflicts.
- Resolve product/demo README navigation conflicts.
- Preserve prospect-specific docs and outreach drafts.
- Validate local build and route health.
- Deploy one public production build with all routes.
- Update prospect tracking demo URLs to stable production aliases where needed.
- Open a draft PR and link evidence to Issue #43.

### Out Of Scope

- Sending outreach.
- Creating new prospect demos.
- Changing offer/pricing strategy.
- Reworking the landing page design system beyond necessary integration cleanup.
- Closing old prospect issues or merging all PRs unless explicitly requested.

## Source Branches

```text
issue-27-final-cut-roofing
issue-28-rivertop-roofing
issue-29-stormvets
issue-30-brotherhood-roofing
issue-31-matthew-lorand-roofing
issue-32-integrity-first-roofing-construction
issue-33-edp-roofing
issue-34-proper-roofing
```

Current branch starts from `issue-34-proper-roofing`, which already includes Integrity First, EDP, Proper, and the original Final Cut / Charger / LOA base work. The remaining merge focus is Rivertop, StormVets, Brotherhood, Matthew Lorand, plus any Issue #27 follow-through changes missing from this branch.

## Checklist

- [x] GitHub Issue #43 created.
- [x] Branch `issue-43-consolidate-roofing-demos` created.
- [x] Session-start comment posted.
- [x] Implementation plan created.
- [x] Merge Issue #27 follow-through branch if needed.
- [x] Merge Rivertop branch.
- [x] Merge StormVets branch.
- [x] Merge Brotherhood branch.
- [x] Merge Matthew Lorand branch.
- [x] Resolve registry and README conflicts.
- [x] Confirm all prospect package directories exist.
- [x] Confirm all prospect routes are registered.
- [x] Run `npm run build`.
- [x] Verify all local clean routes return HTTP 200.
- [x] Verify all local `/prospects/*` routes return HTTP 200.
- [x] Deploy public production build.
- [x] Verify all public clean routes return HTTP 200.
- [x] Update Supabase prospect `demo_url` values for stale preview links.
- [ ] Update Issue #43 with deployment evidence.
- [x] Commit and push.
- [x] Open draft PR.

## Route Validation Matrix

| Prospect | Clean route | Internal route | Local | Production |
| --- | --- | --- | --- | --- |
| Final Cut Roofing | `/final-cut-roofing` | `/prospects/final-cut-roofing` | 200 | 200 |
| Charger Roofing | `/charger-roofing` | `/prospects/charger-roofing` | 200 | 200 |
| LOA Construction | `/loa-construction` | `/prospects/loa-construction` | 200 | 200 |
| Rivertop Roofing | `/rivertop-roofing` | `/prospects/rivertop-roofing` | 200 | 200 |
| StormVets | `/stormvets` | `/prospects/stormvets` | 200 | 200 |
| Brotherhood Roofing | `/brotherhood-roofing` | `/prospects/brotherhood-roofing` | 200 | 200 |
| Matthew Lorand Roofing | `/matthew-lorand-roofing` | `/prospects/matthew-lorand-roofing` | 200 | 200 |
| Integrity First | `/integrity-first` | `/prospects/integrity-first` | 200 | 200 |
| EDP Roofing | `/edp-roofing` | `/prospects/edp-roofing` | 200 | 200 |
| Proper Roofing | `/proper-roofing` | `/prospects/proper-roofing` | 200 | 200 |

Production alias: `https://roof-check-preview.vercel.app`

Deployment URL: `https://roof-check-preview-ow30ua1dp-dpons222-9388s-projects.vercel.app`

Draft PR: `https://github.com/dpons222/Business/pull/44`

Vercel production log scan: `vercel logs --level error --since 1h --environment production --no-branch --limit 20` returned no logs.

## Validation Plan

- `npm run build` in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local HTTP 200 checks for all clean routes and `/prospects/*` routes.
- Public production HTTP 200 checks for all clean routes after deployment.
- Inspect `lib/prospects/index.ts` to ensure all prospect data files are imported, exported, and registered once.

## Risks

- The prospect branches modify the same registry and README files, so merge conflicts are expected.
- Some previous Vercel preview deployments returned HTTP 401; production deploy verification is required.
- Public image hotlinking may fail for some prospects; this consolidation should not expand asset usage beyond prior prospect implementations.
