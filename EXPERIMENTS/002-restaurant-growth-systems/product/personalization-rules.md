# Personalization Rules

## Principle

Use one diagnostic framework, then lightly personalize the recommendation per prospect so the owner can see why it fits their restaurant.

Rule:

```text
Generic module menu before research.
Light personalized recommendation for strong prospects.
Fully tailored implementation only after positive reply or paid pilot.
```

## Personalize Before Outreach Only When Fast

Before outreach, spend no more than 5-10 minutes per high-priority prospect.

Safe personalization:

```text
Restaurant name
City or neighborhood
Cuisine or concept
Observed customer journey gap
Recommended solution module
One public proof point or operational clue
Logo/site color palette if a visual demo is made
```

Do not personalize deeply before interest:

```text
Full copy rewrite
Custom menu strategy
Custom image sourcing
Reservation system integration
Ordering platform setup
Email/SMS platform setup
Review response implementation
Analytics implementation
Multiple solution variants
Full brand system recreation
```

## Brand Color Rule

Before creating or updating a visual prospect demo, inspect the restaurant's live site and logo for color direction.

Use this order of evidence:

```text
Logo SVG or image colors
Live site CSS colors
Visible button/header/link colors
Screenshot sampling, if code colors are not easy to recover
```

The visual demo should use the restaurant's existing logo/site palette for primary, dark, accent, and soft/background color tokens. Do not invent a generic palette when the restaurant already has clear brand colors.

If colors cannot be recovered within the 5-10 minute personalization window, use a restrained neutral palette and add a note that brand color matching is pending.

## Required Personalization Fields

For a lightly personalized recommendation, collect:

```text
restaurantName
cityState
cuisineOrConcept
recommendationCategory
observedIssue
recommendedSolution
sourceReviewed
contactMethod
website
```

Recommended optional fields:

```text
logoUrl
brandColors
brandPaletteSource
address
hoursSummary
menuHighlights
reviewSignals
reservationUrl
orderingUrl
cateringUrl
giftCardUrl
emailSignupUrl
socialLinks
```

## Personalization Levels

### Level 0: Generic Module Menu

Use for internal planning.

```text
[Restaurant Name]
[Observed Issue]
[Recommendation Category]
[Suggested First Module]
```

### Level 1: Light Recommendation

Use for high-priority outreach prospects.

Personalize:

```text
Restaurant name
Observed issue
Recommended module
Why it fits
One public proof point
One next step
```

Purpose:

Help the owner quickly see that the recommendation came from their actual public customer journey.

### Level 2: Reply-Based Recommendation

Use after a positive reply.

Add:

```text
Confirmed business priority
Preferred CTA or workflow outcome
Approved public links
Operational constraints
Real FAQs or process steps
Approved examples
```

### Level 3: Paid Pilot

Use after payment or explicit approval.

Add:

```text
Final client copy
Approved images
Tracking setup
Form or workflow destination
Reservation, ordering, email, SMS, or review tool checks
Deployment or implementation plan
Client review cycle
```

## Personalization Guardrails

- Do not imply the restaurant endorsed the recommendation unless they have agreed.
- Do not reuse copyrighted images without permission.
- Do not fabricate ratings, awards, press, menu items, capacity, hours, policies, list size, or performance results.
- Do not invent catering, private dining, reservation, ordering, or event availability.
- Public demo pages should read like customer-facing restaurant pages, not internal audits. Keep phrases like "audit preview," "cleanup recommendation," "observed issue," "pilot offer," "pricing," and "not a full rebuild" in internal docs or outreach notes.
- When sharing a demo link with the prospect, explain in the email that it is a concept preview; do not put developer-facing disclaimers into the public customer-facing page unless Diego asks.

## Public Demo Copy Rule

For a visual restaurant demo, write the page as if a guest is deciding whether to order, reserve, inquire, join a list, buy a gift card, or visit.

Use public demo copy for:

```text
Guest-facing headline
Menu/service highlights
Ordering, reservation, catering, event, special, or loyalty CTA
Restaurant story and local positioning
Simple next steps for guests
```

Keep internal content out of the public page:

```text
Audit findings
Developer instructions
Observed counts
Before/after critique labels
Pricing strategy
Implementation tasks
Recommendation category names
```

## Outreach Use

Best outreach asset:

```text
Short observed issue + one focused recommendation
```

Example:

```text
I noticed your private dining details are harder to find than the rest of the site. My first recommendation would be a small group dining inquiry flow, not a full website redesign.
```

## Time Rule

If personalization takes more than 10 minutes before the prospect replies, stop and use the base recommendation format.

The goal is validation, not unpaid custom consulting.
