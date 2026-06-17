# Remote Business Experiment Builder Blueprint

## Purpose

Create a future Codex skill or reusable prompt system that can recreate the useful parts of this repo for new remote business experiments.

The goal is not to clone the roofing experiment exactly. The goal is to turn the repeatable workflow into a reusable system:

```text
idea -> scoring -> research -> experiment setup -> prospect workflow -> demo/product assets -> outreach -> tracking
```

## Status

The first system-wide Codex skill has been created at:

```text
C:\Users\Diego\.codex\skills\remote-business-experiment-builder\
```

This blueprint remains the project record for what the skill is based on and how it should evolve.

## Inventory Of What Exists

### Business Lab Structure

Current top-level structure:

```text
IDEAS/
RESEARCH/
EXPERIMENTS/
ASSETS/
SKILLS/
AUTOMATIONS/
PLAYBOOKS/
```

Supporting files:

- `README.md`: top-level directory guide.
- `REMOTE_BUSINESS_LAB_PLAN.md`: business criteria, scoring system, validation process, and structure.
- `GITHUB_ISSUES_GUIDE.md`: implementation workflow.
- `AGENTS.MD`: repo-specific agent instructions.

### Idea And Validation System

Reusable files:

- `IDEAS/backlog.md`
- `IDEAS/idea-template.md`
- `IDEAS/scoring-questionnaire.md`
- `IDEAS/archived.md`
- `PLAYBOOKS/validation-playbook.md`
- `PLAYBOOKS/launch-checklist.md`

What this system does:

- captures raw business ideas,
- groups ideas by business bucket,
- scores ideas against user preferences,
- moves selected ideas into experiments only after review,
- keeps validation before heavy building.

### Current Experiment System

Main example:

```text
EXPERIMENTS/001-roofing-landing-page-service/
```

Reusable experiment files:

- `plan.md`: experiment question, hypothesis, scope, checklist, success criteria, risks, next action.
- `offer.md`: working offer, package, setup scope, monthly scope, buyer profile, boundaries.
- `validation.md`: prospect criteria, metrics, decision rules.
- `finances.md`: pricing and money notes.
- `research.md`: niche and market research.

Reusable folders:

- `marketing/`: prospect tracker, outreach, discovery questions, first batch research.
- `product/`: landing page spec, wireframe, copy deck, personalization rules, demo templates.
- `prospects/`: prospect-specific notes, recommendations, client summaries, campaign strategy.
- `assets/`: experiment-specific assets.

### Marketing And Prospect Workflow

Reusable files:

- `marketing/prospect-tracker.csv`
- `marketing/prospect-tracker.md`
- `marketing/outreach-script.md`
- `marketing/discovery-call-questions.md`
- `marketing/first-outreach-batch.md`

What this system does:

- identifies qualified prospects,
- records observed website issues,
- stores personalized outreach angles,
- tracks contact status and replies,
- supports validation through direct outreach.

### Product And Demo Workflow

Reusable files:

- `product/landing-page-spec.md`
- `product/base-copy-deck.md`
- `product/base-wireframe.md`
- `product/personalization-rules.md`
- `product/personalized-demo-template.md`
- `product/personalized-demos/`
- `product/demo-app/`

What this system does:

- defines the product before coding,
- creates a reusable base page,
- personalizes lightly per prospect,
- avoids unpaid deep custom work before interest,
- uses a multi-prospect demo app when code is useful.

### Multi-Prospect Demo App Pattern

Reusable pattern:

```text
page template + prospect data = personalized demo page
```

Current app structure:

```text
components/RoofingLandingPage.tsx
components/VariantLandingPage.tsx
lib/prospects/
lib/designVariants.ts
public/prospects/
app/prospects/[slug]/page.tsx
app/variants/[variant]/page.tsx
```

Useful concept:

- keep the app reusable,
- keep each business in its own data object,
- keep each prospect's assets under `public/prospects/<slug>/`,
- compare variants internally,
- send only one strongest prospect-specific demo link.

### Final Cut Roofing Prospect Workflow

Prospect-specific files:

- `prospects/final-cut-roofing/recommendation.md`
- `prospects/final-cut-roofing/client-summary.md`
- `prospects/final-cut-roofing/outreach-email.md`
- `prospects/final-cut-roofing/campaign-tracking-strategy.md`

What this system does:

- explains why the demo is worth testing,
- separates internal recommendation from client-facing summary,
- stores reusable email language,
- defines how campaign traffic and tracking should work.

## Reusable Vs Specific

### Reusable Across Future Projects

- top-level lab directory structure,
- idea backlog and scoring process,
- validation-first operating rule,
- experiment folder structure,
- `plan.md`, `offer.md`, `validation.md`, and `finances.md` templates,
- prospect tracker fields,
- outreach message structure,
- discovery call questions,
- client summary structure,
- recommendation document structure,
- campaign tracking strategy structure,
- personalization levels,
- multi-prospect demo app concept,
- template/variant decision pattern,
- README update habit.

### Specific To Roofing Landing Pages

- roofing contractor target market,
- storm damage / free roof inspection offer,
- roofing prospect criteria,
- roofing state list,
- roofing landing page copy,
- roofing compliance guardrails,
- hail/wind/leak messaging,
- roof inspection form fields,
- insurance claim wording,
- roofing demo app visuals and sections.

### Specific To Final Cut Roofing

- Final Cut Roofing name,
- phone numbers,
- Frisco/DFW market,
- logo and project photos,
- current-site observations,
- Final Cut-specific recommendation,
- Final Cut-specific client summary,
- Final Cut-specific outreach email,
- Final Cut-specific campaign tracking note.

## Future Skill Scope

Proposed skill name:

```text
remote-business-experiment-builder
```

The skill should help Codex create and manage remote business experiments, including:

- idea collection,
- idea scoring,
- research planning,
- experiment folder setup,
- validation planning,
- offer definition,
- prospect tracking,
- outreach materials,
- demo/product planning,
- client-facing summaries,
- tracking strategy.

## Skill Intake Questions

Before creating files, the skill should ask for or infer:

```text
What is the business idea?
Who is the target customer?
What problem or desire does it address?
What is the offer?
Is this a product, service, content business, ecommerce idea, automation, or app?
What is the validation goal?
What is the timebox?
Should code be created now, or planning only?
Is this a new repo/project or a new experiment inside an existing repo?
```

If the user does not know, the skill should help brainstorm and recommend defaults.

## Skill Workflow

### Phase 1: Project Or Experiment Setup

Create or update:

- top-level directory guide,
- idea template,
- scoring questionnaire,
- validation playbook,
- launch checklist,
- experiment folder if an idea has been selected.

### Phase 2: Idea And Research

Create or update:

- idea backlog,
- scoring notes,
- market research,
- niche research,
- competitor notes,
- channel notes.

### Phase 3: Experiment Definition

Create:

- `plan.md`,
- `offer.md`,
- `validation.md`,
- `finances.md`,
- experiment `README.md`.

Each experiment should include:

- experiment question,
- hypothesis,
- target customer,
- offer,
- pricing test,
- scope,
- checklist,
- success criteria,
- decision rules.

### Phase 4: Marketing And Prospecting

Create:

- `marketing/README.md`,
- `marketing/prospect-tracker.csv`,
- `marketing/prospect-tracker.md`,
- `marketing/outreach-script.md`,
- `marketing/discovery-call-questions.md`.

If the experiment is prospect-driven, research prospects and create:

- first outreach batch,
- observed issues,
- personalized angles,
- contact status fields.

### Phase 5: Product Or Demo Planning

Create:

- `product/README.md`,
- product spec,
- base copy deck,
- base wireframe,
- personalization rules,
- personalized demo template.

Only create code if:

- the user asks for code,
- a demo is needed for validation,
- or a prospect-specific prototype is justified.

### Phase 6: Prospect-Specific Package

For each strong prospect, create:

```text
prospects/<prospect-slug>/
  README.md
  recommendation.md
  client-summary.md
  outreach-email.md
  campaign-tracking-strategy.md
```

Recommended separation:

- `recommendation.md`: internal rationale.
- `client-summary.md`: client-facing summary.
- `outreach-email.md`: sendable email and follow-up.
- `campaign-tracking-strategy.md`: how the page/product should be tested.

### Phase 7: Tracking And Decision

Track:

- contacts,
- replies,
- calls booked,
- paid pilots,
- objections,
- traffic source,
- conversions,
- next action.

At the end of the timebox, decide:

- continue,
- revise,
- archive,
- change niche,
- create the next experiment.

## Candidate Skill Resources

If this becomes a real Codex skill, use this structure:

```text
remote-business-experiment-builder/
  SKILL.md
  references/
    directory-structure.md
    idea-scoring.md
    experiment-workflow.md
    prospect-workflow.md
    landing-page-service.md
    tracking-and-campaigns.md
  assets/
    templates/
      idea-template.md
      scoring-questionnaire.md
      experiment-plan.md
      offer.md
      validation.md
      prospect-tracker.csv
      outreach-email.md
      client-summary.md
      recommendation.md
      campaign-tracking-strategy.md
```

Keep `SKILL.md` short. Put detailed reusable templates in `assets/templates/` and detailed process notes in `references/`.

## Important Guardrails

- Do not create code unless the user asks for code or agrees code is the next step.
- Prefer validation before heavy building.
- Do not promise guaranteed leads, rankings, revenue, or platform outcomes.
- Keep client-facing language specific, conservative, and measurable.
- Separate internal strategy from client-facing summaries.
- Keep prospect-specific assets separate from reusable templates.
- Update relevant `README.md` files when adding new folders, files, or workflows.

## First Skill Version Recommendation

The first version should automate documentation and project setup, not full app generation.

Include:

- business lab setup,
- idea scoring,
- experiment setup,
- prospect workflow,
- outreach/client templates,
- campaign tracking templates.

Defer:

- full Next.js demo app starter,
- paid ads management workflow,
- CRM integrations,
- analytics implementation scripts.

Those can be added after the business experiment workflow is stable.
