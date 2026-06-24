# 001 Roofing Landing Page Service

Validation experiment for an AI-assisted landing page service aimed at roofing contractors.

## Core Test

```text
Will roofing contractors pay for a conversion-focused storm damage / roof inspection landing page?
```

## Current Offer

```text
Primary offer: Storm damage / roof inspection landing page
Target market: Roofing companies in storm-prone U.S. states
Price test: $1,000 setup
Optional add-on: $300/month
Validation target: 30 prospects
Success signal: 1 paid pilot or 3-5 positive replies
Timebox: 10 days
```

## Start Here

- `plan.md`: experiment plan and checklist.
- `offer.md`: offer details and boundaries.
- `validation.md`: validation process and metrics.
- `marketing/first-outreach-batch.md`: first 10 prospects and audit notes.
- `product/demo-app/`: reusable local demo app.
- `prospects/final-cut-roofing/recommendation.md`: Final Cut Roofing-specific recommendation and pilot rationale.
- `prospects/charger-roofing/recommendation.md`: Charger Roofing-specific recommendation and next outreach rationale.
- `prospects/loa-construction/recommendation.md`: LOA Construction-specific recommendation and next outreach rationale.
- `marketing/remaining-leads.md`: remaining non-shortlisted roofing leads from the 30-prospect tracker.
- `prospects/arrington-roofing/recommendation.md`: Arrington Roofing-specific recommendation for the first remaining-leads batch.
- `prospects/phoenix-storm-restoration/recommendation.md`: Phoenix Storm Restoration-specific recommendation for the first remaining-leads batch.
- `prospects/dynasty-roofing/recommendation.md`: Dynasty Roofing-specific recommendation for the first remaining-leads batch.
- `prospects/sixth-gen-roofing/recommendation.md`: Sixth Gen Roofing-specific recommendation for the first remaining-leads batch.
- `prospects/on-point-roofing/recommendation.md`: On Point Roofing-specific recommendation for the first remaining-leads batch.

## Folders

- `product/`: landing page spec, copy, wireframe, and demo planning.
- `marketing/`: outreach scripts, prospect tracker, and audit notes.
- `prospects/`: company-specific recommendations, audit notes, and outreach rationale.
- `assets/`: experiment-specific images, screenshots, logos, or demo assets.

## Outreach Automation

Approved outreach automation is documented in:

```text
AUTOMATIONS/outreach-approval-send/
```

Use the marketing pre-send checklist and Supabase approval fields before any n8n sender workflow is allowed to send email. Codex may prepare batches and draft evidence, but Diego must approve the exact draft and demo link before `outreach_send_status` becomes `approved`.
