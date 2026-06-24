# Marketing

Use this folder for prospect research, outreach, and validation tracking.

## Files

- `prospect-tracker.csv`: active prospect tracker.
- `prospect-tracker.md`: tracker field guide and status values.
- `first-outreach-batch.md`: first 10 shortlisted prospects and audit notes.
- `outreach-script.md`: first message and follow-ups.
- `discovery-call-questions.md`: questions for interested prospects.

## Rule

Keep outreach specific, respectful, and focused on one offer: a storm damage / roof inspection landing page.

Do not claim guaranteed leads, rankings, revenue, or insurance outcomes.

## Pre-Send Checklist

Before sending any outreach email or contact form message:

- Re-open the prospect draft and read the exact message that will be sent.
- Verify every demo link uses the stable production alias: `https://roof-check-preview.vercel.app/...`.
- Do not send immutable Vercel deployment URLs such as `https://roof-check-preview-[random]-dpons222-9388s-projects.vercel.app/...`.
- Open the demo link and confirm it loads the current prospect page.
- Confirm the message still matches the prospect's current site, offer, phone number, and brand colors.
- Confirm the recipient/contact method is current.
- After sending, update Supabase and the prospect tracker with send date, status, and follow-up date.

## Batch Approval Workflow

Use this when preparing 3-5 prospects for an approved outreach batch:

1. Prepare or refresh each prospect demo and outreach draft.
2. Complete the pre-send checklist for each prospect.
3. Store the exact reviewed subject/body, draft path, channel, batch ID, and checklist evidence in Supabase.
4. Mark the row `outreach_send_status = ready_for_review`.
5. Diego reviews the live demo, exact draft, recipient/contact method, and fit.
6. Only after approval, mark `outreach_approved = true` and `outreach_send_status = approved`.
7. n8n may send only approved email rows. Contact-form rows remain manual until a separate workflow exists.

Do not mark a row approved just because a draft exists. Approval means the exact message and demo link are ready to send.
