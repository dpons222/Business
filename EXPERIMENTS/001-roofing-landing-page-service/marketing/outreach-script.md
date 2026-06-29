# Outreach Script

## First Message

```text
Subject: Quick idea for your storm damage / roof inspection page

Hi [Name],

My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.

I was looking at roofing companies in [City] and noticed [specific observation about their site/page].

I am testing a focused landing page offer for roofers: a storm damage / roof inspection page designed to turn more visitors into calls or inspection requests.

The idea is simple: one page, clear trust proof, strong mobile layout, and a direct call/request-inspection flow.

Would you be open to seeing a quick example or a short audit of what I would improve on your current page? If another site priority would be more useful to look at first, I can focus there instead.

Best,
[Your Name]
```

## Follow-Up 1

```text
Hi [Name],

Quick follow-up. The reason I reached out is that storm damage and roof inspection traffic can be expensive, so even a small improvement in calls or form submissions can matter.

If useful, I can send over 3 quick notes on how I would improve your current page.
```

## Follow-Up 2

```text
Hi [Name],

Last note from me. I am validating a fixed-price landing page package for roofing companies:

- Storm damage / inspection page
- Built around calls and quote requests
- $1,000 setup
- Optional $300/month for tracking and small tests

Worth a quick look, or should I leave it here?
```

## Personalization Notes

Use one specific observation in the first message, such as:

- No dedicated storm damage page.
- Page has weak call to action.
- Phone number is hard to find on mobile.
- Service area is unclear.
- Reviews are not visible near the form.
- Form is buried too low.
- Page talks about services but does not ask for an inspection.

The first message may include one short alternate-priority sentence after the main ask:

```text
If another site priority would be more useful to look at first, I can focus there instead.
```

Use this to invite redirection without turning the outreach into a generic "anything we can help with" pitch.

Default intro line for first-touch emails:

```text
My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.
```

Keep this line short and factual. If the niche is not a service business, lightly adjust it while preserving the same meaning.

## Pre-Send Draft Check

Run this check before every outbound send:

```text
1. Read the final draft exactly as it will be sent.
2. Confirm every demo link uses the current stable production preview alias, such as https://local-growth-preview.vercel.app/... .
3. Reject any generated deployment URL such as roof-check-preview-[random]-dpons222-9388s-projects.vercel.app or local-growth-preview-[random]-dpons222-9388s-projects.vercel.app.
4. Open the demo link and confirm the current prospect page loads.
5. Confirm the draft still matches the prospect's site, offer, phone number, and brand colors.
6. Confirm recipient/contact method.
7. After sending, update Supabase and the prospect tracker.
```

## Supabase Approval Fields

When preparing a reviewed batch, use these `public.prospects` fields:

```text
outreach_send_status: ready_for_review -> approved -> sent
outreach_approved: false until Diego approves
outreach_batch_id: shared label for a 3-5 prospect batch
outreach_send_channel: email, contact_form, or manual
outreach_draft_subject: exact subject reviewed
outreach_draft_body: exact body reviewed
outreach_draft_path: repo path to draft
outreach_pre_send_checklist: structured checklist evidence
```

n8n must not send drafts with `outreach_send_status = ready_for_review`. It may only send email rows after Diego approval sets `outreach_send_status = approved` and `outreach_approved = true`.
