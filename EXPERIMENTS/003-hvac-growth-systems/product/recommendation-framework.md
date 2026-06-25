# Recommendation Framework

## Goal

Pick the most useful first improvement for each HVAC company instead of forcing every prospect into the same service.

## Diagnostic Flow

1. Identify the company's core services and service area.
2. Check emergency, replacement, maintenance, financing, and quote-request paths.
3. Look for visible friction, unclear CTAs, missing proof, or weak follow-up expectations.
4. Choose one recommendation category.
5. Write a one-sentence recommendation.
6. Create a light example only when it can be done quickly.

## Selection Rules

Choose `emergency_call_path` when urgent calls are important but the phone/CTA path is unclear.

Choose `replacement_quote_page` when AC/furnace replacement is valuable but the page is generic or weak.

Choose `missed_lead_followup` when forms exist but response expectations and follow-up are unclear.

Choose `maintenance_plan_signup` when recurring service is offered but enrollment is buried.

Choose `financing_rebate_clarity` when financing or rebates are mentioned without a clear explanation.

## Recommendation Format

```text
Observed: [specific public issue or opportunity].
Recommendation: [one focused improvement].
Why it fits: [HVAC-specific reason].
First deliverable: [one module].
What to track: [one to three simple signals].
```
