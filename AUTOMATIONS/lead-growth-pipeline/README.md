# Lead Growth Pipeline Automation

This automation package documents and scaffolds the future lead-to-draft pipeline.

It is not an autonomous cold-email sender. The goal is to help Codex and supporting scripts move a niche prospect from public lead research to a review-ready recommendation package and Gmail draft.

## Current Status

- Codex skill installed locally:

```text
C:\Users\Diego\.codex\skills\lead-growth-pipeline\
```

- Repo-tracked skill blueprint:

```text
SKILLS/lead-growth-pipeline-blueprint.md
```

- Prospect package scripts added:

```text
AUTOMATIONS/lead-growth-pipeline/scripts/New-ProspectPackage.ps1
AUTOMATIONS/lead-growth-pipeline/scripts/Test-ProspectPackage.ps1
```

## Intended Flow

```text
1. Select niche, market, and target count.
2. Source public candidate businesses.
3. Qualify candidates and update the experiment tracker.
4. Diagnose public customer journey gaps.
5. Pick one primary recommendation.
6. Preserve secondary recommendations and future opportunities.
7. Create prospect package files.
8. Create only the demo/preview/assets needed for the primary recommendation.
9. Prepare Gmail draft payload.
10. Diego reviews the exact draft and contact method before any send.
```

## Human Approval Boundary

The pipeline may create drafts, but it must not send outreach automatically.

Before any send:

- exact recipient/contact method must be verified,
- exact subject/body must be reviewed,
- recommendation/demo URL must be opened and checked,
- tracker status must be ready for review,
- Diego must explicitly approve the send.

## Files

- `workflow-spec.md`: end-to-end orchestration plan.
- `data-contract.md`: prospect fields and statuses.
- `gmail-draft-handoff.md`: Gmail/n8n draft-only handoff contract.
- `testing-checklist.md`: validation checks before using the pipeline.
- `scripts/New-ProspectPackage.ps1`: creates prospect docs and updates tracker rows.
- `scripts/Test-ProspectPackage.ps1`: validates required package files.

## Related Experiments

This pipeline is intended to work with growth-system experiments such as:

- `EXPERIMENTS/003-hvac-growth-systems/`
- `EXPERIMENTS/004-remodeler-growth-systems/`
- `EXPERIMENTS/005-med-spa-growth-systems/`
- `EXPERIMENTS/006-dental-implant-cosmetic-growth-systems/`
- `EXPERIMENTS/007-personal-injury-law-growth-systems/`

## Rule

Build one primary recommendation per prospect. Record secondary recommendations as future notes, but do not build multiple unpaid demos unless Diego asks.
