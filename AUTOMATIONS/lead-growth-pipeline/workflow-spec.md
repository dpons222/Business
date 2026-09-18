# Lead-To-Draft Workflow Spec

## Purpose

Define the future workflow that sources prospects, qualifies them, diagnoses public customer journey gaps, creates prospect packages, and prepares draft-only outreach.

## Inputs

```text
niche
experiment_path
market
target_count
qualification_rules
sender_identity
draft_only = true
```

Example:

```text
niche = hvac
experiment_path = EXPERIMENTS/003-hvac-growth-systems
market = Indianapolis, IN
target_count = 10
```

## Stages

### 1. Source Candidates

Collect public candidates from search results, local listings, directories, or manually supplied URLs.

Output:

```text
business_name
website
city_state
public_listing_url
source
source_notes
```

### 2. Qualify Candidates

Reject or pause candidates that do not have a public customer journey, contact method, or visible revenue action.

Output status:

```text
sourced
qualified
bad_fit
paused
```

### 3. Diagnose Public Journey

Inspect:

- homepage and CTA,
- service/menu/treatment/practice pages,
- booking/order/contact/quote/intake flow,
- reviews and proof,
- social/profile links,
- public offers, financing, specials, packages, events, or FAQs,
- tracking or follow-up gaps.

Output:

```text
observed_issue
evidence
assumptions
primary_recommendation
secondary_recommendations
future_opportunities
recommended_solution
outreach_angle
```

### 4. Create Prospect Package

Use:

```powershell
AUTOMATIONS/lead-growth-pipeline/scripts/New-ProspectPackage.ps1
```

Required outputs:

```text
prospects/<slug>/README.md
prospects/<slug>/research.json
prospects/<slug>/recommendation.md
prospects/<slug>/client-summary.md
prospects/<slug>/outreach-email.md
prospects/<slug>/campaign-tracking-strategy.md
product/personalized-demos/<slug>-recommendation.md
marketing/prospect-tracker.csv row
```

Use stable `local_record_id` / `prospect_slug` identity and the [versioned local contract](data-contract.md). Create missing files; preserve existing prose and contact history. Apply only supplied field patches. Adopt legacy rows only after reviewing their row identity and current tracker hash. Name/domain matches never merge records automatically. Run the [recovery inventory](README.md#recovery-and-locking) before importing malformed trackers.

Validate `ResearchComplete` for evidence-only research; recommendations and outreach remain optional. Validate `OutreachReady` only after the exact draft and verified contact are supplied. Local validation does not browse sources or authorize sending.

### 5. Build Primary Demo Or Preview

Create only what supports the primary recommendation:

- page preview,
- workflow diagram,
- tracker sample,
- email/SMS sequence,
- copy blocks,
- cleanup checklist,
- recommendation memo.

Record secondary recommendations, but do not build them unless requested.

### 6. Prepare Gmail Draft Handoff

Create a draft payload according to `gmail-draft-handoff.md`.

The workflow must not send.

### 7. Review Gate

Mark a prospect `ready_for_review` only when:

- the exact draft exists,
- contact method is explicitly verified and matches the current contact value,
- demo/recommendation URL is stable,
- pre-send checklist is complete,
- tracker row is current.

An unverified contact may remain in research or draft preparation; it does not pass `OutreachReady`. The generator cannot advance approval/send/reply states. Sending remains in the separately approved workflow.

## Future n8n Shape

Recommended manual-trigger workflow:

```text
Manual Trigger
-> Read ready_for_review prospect rows
-> Validate required fields
-> Create Gmail draft
-> Update tracker/database draft status
-> Stop
```

Do not add an automated send node until the approval workflow is separately designed and tested.
