# Recommendation Framework

## Diagnostic Flow

1. Identify treatment categories, booking paths, package pages, and proof surfaces.
2. Review consultation CTAs, booking links, treatment pages, reviews, and promo paths.
3. Look for visible friction that can be fixed without private patient data.
4. Choose one recommendation category.
5. Keep the recommendation practical and non-clinical.

## Selection Rules

Choose `treatment_consultation_flow` when treatment pages exist but the next step is unclear.

Choose `consultation_followup` when forms or booking links exist but expectations are unclear.

Choose `package_membership_clarity` when packages or memberships are visible but confusing.

Choose `lapsed_client_reactivation` when repeat-client potential is strong and promos/list tools are visible or likely.

## Recommendation Format

```text
Observed: [specific public issue or opportunity].
Recommendation: [one focused improvement].
Why it fits: [med spa-specific reason].
First deliverable: [one module].
What to track: [one to three simple non-private signals].
```
