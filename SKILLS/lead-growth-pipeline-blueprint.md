# Lead Growth Pipeline Blueprint

## Purpose

Create a reusable Codex skill and automation foundation for moving niche prospects from public lead research to review-ready draft outreach.

The installed skill lives at:

```text
C:\Users\Diego\.codex\skills\lead-growth-pipeline\
```

The repo-side automation package lives at:

```text
AUTOMATIONS/lead-growth-pipeline/
```

## Pipeline

```text
niche selected
-> source businesses
-> qualify prospects
-> inspect public customer journey
-> diagnose visible gaps
-> choose one primary recommendation
-> preserve secondary recommendations
-> create prospect package
-> create primary demo/preview/content
-> create draft-only outreach
-> Diego reviews
-> optional Gmail draft creation
-> send only after separate approval
```

## Required Prospect State

```text
primary_recommendation
secondary_recommendations
future_opportunities
evidence
assumptions
outreach_angle
draft_email
review_status
contact_method_verification
demo_or_recommendation_url
```

## Skill Responsibilities

- Apply the diagnosis-first process from `niche-growth-system-builder`.
- Choose the strongest first module for the prospect.
- Preserve other recommendations as future notes.
- Prevent generic outreach.
- Keep outreach draft-only.
- Include this default first-touch intro unless it would make the message too long: "My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths."
- Allow one concise alternate-priority sentence after the main ask so prospects can redirect the recommendation without weakening the specific first idea.
- Enforce pre-send checks.

## Script Responsibilities

- Create standard prospect package files.
- Update experiment prospect trackers.
- Validate package structure.

## Workflow Responsibilities

- Orchestrate source -> qualify -> diagnose -> package -> draft.
- Keep Gmail/n8n draft creation separate from sending.
- Maintain human approval as the final gate.
