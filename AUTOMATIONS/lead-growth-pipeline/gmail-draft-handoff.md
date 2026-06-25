# Gmail Draft Handoff

## Purpose

Define how the pipeline should hand a reviewed outreach draft to Gmail or n8n without sending.

## Draft-Only Contract

Required payload:

```json
{
  "to": "recipient@example.com",
  "subject": "Quick note about the consultation flow",
  "body_text": "Plain text email body",
  "body_html": "<p>Optional HTML body</p>",
  "experiment_path": "EXPERIMENTS/003-hvac-growth-systems",
  "prospect_slug": "example-hvac",
  "business_name": "Example HVAC",
  "demo_or_recommendation_url": "EXPERIMENTS/003-hvac-growth-systems/product/personalized-demos/example-hvac-recommendation.md",
  "draft_status": "draft_ready_for_gmail",
  "send_status": "not_sent"
}
```

## n8n Draft Workflow Outline

Recommended manual-trigger-only workflow:

```text
Manual Trigger
-> Load one approved draft payload
-> Validate recipient, subject, body, prospect slug, and send_status
-> Gmail: Create Draft
-> Record Gmail draft ID
-> Update tracker/database status to email_drafted
-> Stop
```

## Prohibited Behavior

- Do not use Gmail Send in this workflow.
- Do not schedule or publish the workflow until tested.
- Do not process unlimited rows by default.
- Do not create drafts for unverified recipients unless the recipient is Diego for internal review.

## Review Checklist

Before draft creation:

- exact draft reviewed,
- contact method verified,
- demo/recommendation URL checked,
- no guaranteed outcomes,
- no private data,
- status is `ready_for_review` or equivalent,
- Diego has asked to create the Gmail draft.
