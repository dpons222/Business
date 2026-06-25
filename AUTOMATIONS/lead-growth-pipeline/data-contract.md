# Lead Growth Pipeline Data Contract

## Prospect Fields

Minimum fields:

```text
business_name
website
city_state
niche_or_service_focus
recommendation_category
contact_method
current_flow_reviewed
observed_issue
recommended_solution
personalized_outreach_angle
brand_palette_source
demo_or_recommendation_url
date_contacted
follow_up_1
follow_up_2
reply
status
notes
```

Recommended extended fields:

```text
primary_recommendation
secondary_recommendations
future_opportunities
evidence
assumptions
draft_subject
draft_body
draft_status
contact_method_verification
source
source_notes
last_reviewed_at
```

## Status Values

```text
sourced
researched
qualified
diagnosed
recommendation_created
demo_created
email_drafted
ready_for_review
approved_to_send
sent
followed_up
positive_reply
not_interested
bad_fit
paused
```

## Recommendation Rule

Each prospect should have one primary recommendation.

Secondary recommendations and future opportunities should be preserved in notes and `recommendation.md`, but the outreach email should lead with one observed opportunity.

## Contact Verification

Use:

```text
unverified
verified_public_email
verified_contact_form
verified_phone_only
verified_social_dm
unknown
```

Do not send or create a Gmail draft with an unverified recipient unless the draft is addressed to Diego for internal review.
