# Roofing Landing Page Spec

## Purpose

Define the structure, style, UX rules, copy rules, and guardrails for a conversion-focused storm damage / roof inspection landing page for roofing contractors.

This spec is for a demo or client landing page, not a full roofing company website.

## Page Goal

Turn visitors into:

- Phone calls
- Free roof inspection requests
- Quote / estimate requests

Primary conversion:

```text
Schedule Free Roof Inspection
```

Secondary conversion:

```text
Call Now
```

## Target Visitor

Homeowners who may have roof damage from:

- Hail
- Wind
- Storms
- Leaks
- Missing shingles
- Fallen branches or debris

They may be worried, busy, skeptical, or unsure whether the damage is serious.

## Business Goal

Help the roofer capture more qualified inspection requests from existing traffic such as:

- Google Ads
- Local Services Ads
- SEO
- Google Business Profile
- Facebook
- Referral traffic
- Direct visits after a storm

## Visual Direction

The page should feel:

- Modern
- Local
- Trustworthy
- Practical
- Mobile-first
- Fast to understand
- Proof-heavy
- Calm but urgent
- Visually aligned with the contractor's logo and live site colors

Avoid:

- Trendy SaaS styling
- Overly flashy animations
- Generic stock-photo feel
- Huge decorative sections that hide the offer
- Vague visual metaphors
- Dense text blocks
- Dark, dramatic disaster imagery
- Overpromising insurance outcomes

## Brand Color Alignment

For prospect-specific demos or client pages, use the contractor's existing logo/site colors as the starting palette.

Before coding, inspect:

```text
Logo SVG or image colors
Live site CSS colors
Header, button, link, and badge colors
Public brand assets, if available
```

Map those colors into the page's reusable tokens:

```text
primary
primaryDark
accent
accentSoft
```

Do not default to a generic roofing palette when the prospect has clear brand colors. If the logo/site colors are unclear or take too long to recover during a lightweight validation demo, use a restrained neutral palette and document that color matching is pending.

## Optional Tech Direction

If this becomes a coded demo later, a sensible stack would be:

```text
Next.js
Tailwind CSS
shadcn/ui
lucide-react icons
```

This is not required for validation. The first version can be a wireframe, mockup, static HTML, or coded landing page depending on the validation need.

## Page Structure

### 1. Hero

Goal:

Make the offer obvious within the first few seconds.

Required elements:

- Clear headline about storm damage or roof inspection
- Local/service-area signal
- Primary CTA button
- Secondary phone CTA
- Short trust proof
- Simple visual showing roof inspection, roofing crew, or home exterior

Example headline direction:

```text
Storm Damage? Schedule a Free Roof Inspection Today.
```

Example supporting copy:

```text
Fast local roof inspections for hail, wind, leaks, and missing shingles. Get photos, clear next steps, and repair options from a trusted roofing team.
```

CTA rules:

- Primary CTA: `Schedule Free Roof Inspection`
- Secondary CTA: `Call Now`
- Phone number must be visible on mobile.
- CTA must appear above the fold.
- Do not use `Learn More` as the primary CTA.

### 2. Urgency / Problem Section

Goal:

Help homeowners understand why they should act now without fearmongering.

Content should cover:

- Hail damage can be hard to see from the ground.
- Small leaks can become larger problems.
- Missing or lifted shingles can expose the roof.
- A professional inspection helps document visible damage.

Avoid:

- Claiming all storm damage requires replacement.
- Claiming insurance will approve anything.
- Exaggerated scare tactics.

### 3. Inspection Offer

Goal:

Make the free inspection feel concrete and low-friction.

Required elements:

- What the inspection includes
- How long it usually takes
- Whether photos or findings are shared
- What happens after the inspection

Suggested bullets:

```text
- Exterior roof condition check
- Photos of visible damage
- Review of affected areas
- Repair or replacement recommendations
- Clear next steps before any work begins
```

### 4. Trust Proof

Goal:

Reduce skepticism and build confidence before asking for contact information.

Possible proof elements:

- Google rating
- Number of reviews
- Years in business
- Local service area
- Licensed and insured statement
- Certifications
- Before/after photos
- Warranty language
- BBB or association badges if real
- Customer testimonials

Rules:

- Use only real proof from the client.
- Do not fabricate review counts, awards, badges, licenses, or certifications.
- Put at least one trust signal near the first CTA.

### 5. Process

Goal:

Show that requesting an inspection is simple.

Recommended steps:

```text
1. Request your inspection
2. We inspect visible roof damage
3. You receive photos and findings
4. You choose the repair or replacement option that fits
```

UX rule:

Keep process steps short and scannable.

### 6. Services

Goal:

Clarify what storm-related roofing needs the company handles.

Possible services:

- Storm damage inspection
- Hail damage repair
- Wind damage repair
- Roof leak repair
- Missing shingle repair
- Roof replacement
- Emergency tarping, if offered
- Insurance documentation support, if offered

Compliance rule:

If insurance is mentioned, phrase carefully:

```text
We can provide photos and documentation you may use when speaking with your insurance provider.
```

Avoid:

```text
We guarantee insurance approval.
We will get your roof paid for.
```

### 7. Lead Form

Goal:

Capture enough information to schedule or qualify an inspection without creating friction.

Recommended fields:

```text
Name
Phone
Email
Address or ZIP code
What happened? / What are you seeing?
Preferred inspection time
```

Rules:

- Keep the form short.
- Phone should be required.
- Do not ask for insurance carrier or claim number in the first form unless the roofer specifically needs it.
- Put privacy/reassurance copy near the form.

Example reassurance:

```text
No pressure. We will contact you to confirm the inspection time and answer questions before any work begins.
```

### 8. FAQ

Goal:

Answer common objections before the final CTA.

Recommended questions:

```text
Is the roof inspection free?
How soon can someone inspect my roof?
What if I am not sure there is damage?
Will I receive photos?
Do you help with insurance documentation?
Do I need to be home during the inspection?
What areas do you serve?
```

### 9. Final CTA

Goal:

Give the visitor one last direct action.

Required elements:

- Short reminder of the offer
- Primary CTA
- Phone CTA
- Service-area reminder

Example:

```text
Not sure if the last storm damaged your roof?
Schedule a free inspection and get clear next steps.
```

## Mobile UX Rules

- Phone CTA must be easy to tap.
- Form fields must be full-width and readable.
- CTA buttons must be large enough for thumb taps.
- Avoid side-by-side content on small screens.
- Keep headline readable without awkward wrapping.
- Reviews or trust proof should appear before the visitor reaches the form.
- Avoid sticky elements that cover form fields.

## Desktop UX Rules

- Hero should show offer, CTA, phone number, and trust proof without scrolling.
- Form can appear in the hero or shortly after the hero.
- Use sections with clear spacing.
- Keep page width constrained for readability.
- Do not bury the CTA below long text.

## Copy Rules

Use:

- Clear, direct language
- Local trust language
- Homeowner-friendly wording
- Specific storm, hail, wind, leak, and inspection terms
- Short paragraphs
- Benefit-driven section headings

Avoid:

- Generic marketing claims
- Complicated roofing jargon
- Guaranteed outcomes
- Fear-based language
- Overly polished corporate language

Good phrases:

```text
Schedule a free roof inspection
Get photos of visible damage
Know what needs attention
Fast local response after storms
Clear next steps before any work begins
```

Avoid phrases:

```text
Guaranteed insurance approval
We will get your roof paid for
Best roofer in Texas
Act now or your home is at risk
```

## Conversion Rules

- One primary action: schedule inspection.
- One secondary action: call now.
- Repeat CTAs after major sections.
- Keep the form short.
- Put trust proof near CTAs.
- Match the page to one service and one market.
- Do not make visitors choose from too many services before contacting.
- Do not send ad traffic to a generic homepage.

## Required Client Inputs

Before building a real client page, collect:

```text
Company name
Logo
Logo/site brand colors
Phone number
Service areas
Inspection offer details
Roofing services offered
Reviews/testimonials
Licenses/certifications
Photos or project examples
Warranty information
Preferred contact method
Form destination / CRM / email
Tracking requirements
```

## Demo Page Assumptions

If creating a generic demo, use placeholder company data clearly marked as demo content.

Do not imply the demo company is real unless it is based on an actual client with permission.

## Success Criteria For The Page

A good page should make these answers obvious:

```text
What is being offered?
Who is it for?
Where is the service available?
Why should the homeowner trust this roofer?
What happens after requesting an inspection?
How can the homeowner call or schedule quickly?
```

## Next Step

Create one of the following before coding:

- Wireframe
- Copy deck
- Section-by-section mock content
- Demo landing page outline
