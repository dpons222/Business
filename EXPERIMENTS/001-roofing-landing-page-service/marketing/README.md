# Marketing

Use this folder for prospect research, outreach, and validation tracking.

## Files

- `prospect-tracker.csv`: active prospect tracker.
- `prospect-tracker.md`: tracker field guide and status values.
- `first-outreach-batch.md`: first 10 shortlisted prospects and audit notes.
- `remaining-leads.md`: non-shortlisted leads from the 30-prospect tracker for future outreach batches.
- `outreach-script.md`: first message and follow-ups.
- `discovery-call-questions.md`: questions for interested prospects.

## Rule

Keep outreach specific, respectful, and focused on one offer: a storm damage / roof inspection landing page.

Do not claim guaranteed leads, rankings, revenue, or insurance outcomes.

## Pre-Send Checklist

Before sending any outreach email or contact form message:

- Re-open the prospect draft and read the exact message that will be sent.
- Verify every demo link uses the stable production alias: `https://local-growth-preview.vercel.app/...`.
- Do not send old `https://roof-check-preview.vercel.app/...` links for new outreach.
- Do not send immutable Vercel deployment URLs such as `https://roof-check-preview-[random]-dpons222-9388s-projects.vercel.app/...` or `https://local-growth-preview-[random]-dpons222-9388s-projects.vercel.app/...`.
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
6. Only after approval for Gmail draft creation, mark `outreach_approved = true` and `outreach_send_status = approved_for_draft`.
7. n8n may create Gmail drafts only for approved email rows, then write `outreach_send_status = draft_created`.
8. Diego sends, edits, or deletes the Gmail draft manually. Contact-form rows remain manual until a separate workflow exists.

Do not approve a row just because a draft exists. Approval means the exact message and demo link are ready for Gmail draft creation, not that outreach was sent.

## Supabase Status Meanings

Use `status` for the prospect relationship/contact lifecycle:

```text
not_contacted = no outbound outreach has been sent yet
contacted = an outbound email or contact form message was actually sent
```

Use `outreach_send_status` for the automation approval/send lifecycle:

```text
not_ready = draft, demo, contact method, or checklist evidence is incomplete
ready_for_review = Codex prepared the draft/demo and Diego needs to review it
approved_for_draft = Diego approved the exact draft and demo URL for Gmail draft creation
draft_created = n8n created the Gmail draft, but no outreach was sent yet
approved = reserved for future direct-send approval
queued = n8n picked up the row and is preparing or attempting the send
sent = the email provider confirmed the message was sent
failed = n8n or the email provider failed the send attempt
skipped = n8n or the operator intentionally skipped the row
```

Do not set `status = contacted` until outreach was actually sent. Do not set `outreach_send_status = approved_for_draft` unless `outreach_approved = true` and Diego has approved the exact draft, stable demo URL, and contact method. Do not use `approved` unless a future direct-send workflow has a separate explicit approval gate.
