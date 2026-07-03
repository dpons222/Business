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

Choose `chatbot_ai_intake` only when the public site has repetitive FAQs, unclear routing, or enough treatment interest to justify assisted intake. Keep the scope narrow and require human handoff.

Choose `ai_phone_followup` only for narrow reminders, missed-call callbacks, or reactivation. Do not use it for medical advice, treatment recommendations, or unsupported claims.

## Recommendation Format

```text
Observed: [specific public issue or opportunity].
Recommendation: [one focused improvement].
Why it fits: [med spa-specific reason].
First deliverable: [one module].
What to track: [one to three simple non-private signals].
```

## Outreach Angle Rule

The outreach angle should be specific to the business. Use the same niche-level message structure, but customize the core observation based on what the prospect's public customer journey shows.
