# Personalization Rules

## Principle

Use one strong reusable landing page, then lightly personalize it per prospect so the business owner can visualize the page as theirs.

Rule:

```text
Generic base before interest.
Lightly personalized demo for strong prospects.
Fully tailored version only after positive reply or paid pilot.
```

## Personalize Before Outreach Only When Fast

Before outreach, spend no more than 5-10 minutes per high-priority prospect.

Safe personalization:

```text
Company name
City
Service area
Phone number
Primary CTA phone link
Public rating or review count, if easy to verify
One trust signal, if public and easy to verify
Logo, if easy and appropriate
Approximate brand color, if obvious
```

Do not personalize deeply before interest:

```text
Full copy rewrite
Custom service sections
Custom images
Custom design system
CRM integrations
Analytics setup
Multiple page variants
Full brand matching
```

## Required Personalization Fields

For a lightly personalized demo, collect:

```text
companyName
city
serviceArea
phone
primaryService
```

Recommended optional fields:

```text
logoUrl
primaryColor
rating
reviewCount
trustSignal
yearsInBusiness
website
```

## Example Data Object

```json
{
  "companyName": "Example Roofing Co.",
  "city": "Dallas",
  "serviceArea": "Dallas-Fort Worth",
  "phone": "(555) 123-4567",
  "primaryService": "storm damage roof inspections",
  "rating": "4.9",
  "reviewCount": "250+",
  "trustSignal": "Licensed and insured",
  "yearsInBusiness": "15+",
  "primaryColor": "#1D4ED8",
  "logoUrl": "",
  "website": "https://example.com"
}
```

## Personalization Levels

### Level 0: Generic Base

Use for internal planning or a general demo.

```text
[Company Name]
[City]
[Phone Number]
```

### Level 1: Light Personalization

Use for high-priority outreach prospects.

Personalize:

```text
Company name
City/service area
Phone number
One public trust signal
```

Purpose:

Help the owner quickly imagine the offer applied to their business.

### Level 2: Reply-Based Personalization

Use after a positive reply.

Add:

```text
Their actual service focus
Observed website weakness
Their strongest trust proof
One tailored headline
One tailored section
Their preferred CTA
```

### Level 3: Paid Pilot

Use after payment or explicit approval.

Add:

```text
Full client copy
Real photos
Real testimonials
Brand colors
Tracking setup
Form destination
Deployment plan
Client review cycle
```

## Personalization Guardrails

- Do not imply a company endorsed the demo unless they have agreed.
- Do not publish a personalized demo publicly without permission.
- Do not scrape or reuse copyrighted images without permission.
- Use public business facts carefully.
- Mark demo content clearly if sharing a preview.
- Do not fabricate ratings, reviews, certifications, licenses, or awards.

## Outreach Use

Best outreach asset:

```text
Short audit note + personalized headline idea
```

Example:

```text
I mocked the page direction around this idea:

Storm Damage? Schedule a Free Roof Inspection with [Company Name] in [City].

The main change I would make is giving storm visitors one clear path to call or request an inspection instead of sending them through a general service page.
```

## Time Rule

If personalization takes more than 10 minutes before the prospect replies, stop and use the base version.

The goal is validation, not unpaid custom design work.

