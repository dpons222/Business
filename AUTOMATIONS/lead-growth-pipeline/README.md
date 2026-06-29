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

## How To Use

Use this package when you want to move from a niche experiment to review-ready prospect outreach.

### 1. Pick The Experiment

Start with one existing growth-system experiment:

```text
EXPERIMENTS/003-hvac-growth-systems/
EXPERIMENTS/004-remodeler-growth-systems/
EXPERIMENTS/005-med-spa-growth-systems/
EXPERIMENTS/006-dental-implant-cosmetic-growth-systems/
EXPERIMENTS/007-personal-injury-law-growth-systems/
```

Example prompt:

```text
Use lead-growth-pipeline for HVAC prospects in Indianapolis. Do not send outreach. Find and qualify 10 candidates, then create packages only for the strongest 3.
```

### 2. Source And Qualify Prospects

For each candidate business, collect enough public information to decide whether it is worth a prospect package:

- business name,
- website,
- city/state,
- service focus,
- contact method,
- current public customer journey reviewed,
- observed issue,
- likely recommendation category.

Add or update rows in:

```text
<experiment>/marketing/prospect-tracker.csv
```

Use statuses such as:

```text
sourced
researched
qualified
bad_fit
paused
```

### 3. Diagnose The Public Journey

Use the installed skill:

```text
C:\Users\Diego\.codex\skills\lead-growth-pipeline\
```

The diagnosis should choose one best first recommendation and preserve other useful ideas:

```text
Primary recommendation:
- replacement_quote_page

Secondary recommendations:
- missed_lead_followup
- financing_rebate_clarity

Future opportunities:
- maintenance_plan_signup after the first pilot
```

Only build a demo, preview, workflow, copy, or tracker sample for the primary recommendation unless Diego asks for more.

### 4. Generate A Prospect Package

Use the package generator after the primary recommendation is chosen:

```powershell
.\AUTOMATIONS\lead-growth-pipeline\scripts\New-ProspectPackage.ps1 `
  -ExperimentPath "EXPERIMENTS\003-hvac-growth-systems" `
  -BusinessName "Example HVAC Co" `
  -Website "https://example.com" `
  -CityState "Indianapolis, IN" `
  -ServiceFocus "Residential HVAC" `
  -RecommendationCategory "replacement_quote_page" `
  -PrimaryRecommendation "Replacement quote page" `
  -SecondaryRecommendations "missed_lead_followup; financing_rebate_clarity" `
  -FutureOpportunities "maintenance_plan_signup after first pilot" `
  -ObservedIssue "Replacement service path is visible but the quote CTA is not specific." `
  -RecommendedSolution "Create a focused replacement quote path with financing FAQs and tracking." `
  -OutreachAngle "The first fix is improving replacement quote clarity instead of pitching a full redesign." `
  -Status "recommendation_created"
```

This creates:

```text
prospects/<prospect-slug>/README.md
prospects/<prospect-slug>/recommendation.md
prospects/<prospect-slug>/client-summary.md
prospects/<prospect-slug>/outreach-email.md
prospects/<prospect-slug>/campaign-tracking-strategy.md
product/personalized-demos/<prospect-slug>-recommendation.md
```

It also updates the experiment's `marketing/prospect-tracker.csv` when that file exists.

### 5. Validate The Package

Run:

```powershell
.\AUTOMATIONS\lead-growth-pipeline\scripts\Test-ProspectPackage.ps1 `
  -ExperimentPath "EXPERIMENTS\003-hvac-growth-systems" `
  -Slug "example-hvac-co"
```

The validator checks that the required prospect files and tracker exist.

### 6. Prepare Draft-Only Outreach

Review:

```text
prospects/<prospect-slug>/outreach-email.md
```

Before creating a Gmail draft, verify:

- the contact method is current,
- the exact draft is approved for draft creation,
- the recommendation/demo URL opens,
- the message mentions one observed opportunity,
- first-touch outreach includes the default DigiDap intro unless it would make the message too long: "My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.",
- the message may include one short alternate-priority sentence after the main ask, for example: "If another site priority would be more useful to look at first, I can focus there instead.",
- no guaranteed outcomes are promised.

Use `gmail-draft-handoff.md` when wiring this into n8n or the Gmail API.

### 7. Review Before Sending

The safe operating states are:

```text
email_drafted
ready_for_review
approved_to_send
sent
```

Do not move a prospect to `approved_to_send` until Diego has reviewed the exact recipient, subject, body, recommendation, and URL.

This package can prepare Gmail drafts later, but sending belongs to a separate approval-gated workflow.

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
