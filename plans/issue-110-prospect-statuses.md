# Issue 110 - Prospect Statuses

## Goal
Add explicit prospect relationship statuses for prospects Diego should not contact and prospects who are not interested, then update Final Cut Roofing to the right status.

## Checklist
- [x] Inspect current dashboard/API status handling.
- [x] Add `do_not_contact` and `not_interested` labels, filters, and guardrails.
- [x] Update Supabase schema constraints and status documentation.
- [x] Mark Final Cut Roofing as `do_not_contact`.
- [x] Validate the app and Supabase state.
- [ ] Commit, push, deploy, and close issue.

## Status Semantics
- `not_contacted`: eligible prospect; no outbound message has been sent yet.
- `contacted`: outbound email, contact form, or manual message was sent.
- `do_not_contact`: internal decision not to pursue before outreach.
- `not_interested`: prospect indicated no interest after outreach.

## Notes
- `do_not_contact` and `not_interested` rows should not be eligible for Gmail draft approval.
- Manual contact recording should remain available only for true outreach-eligible rows, not terminal statuses.

## Validation
- `npm run build` passed for the Next.js dashboard app.
- `npm run lint` did not run because this project script calls `next lint`, which the installed Next CLI treats as an invalid `lint` directory.
- Supabase `prospects_status_check` now accepts `do_not_contact` and `not_interested`.
- Final Cut Roofing is set to `status = do_not_contact`, `outreach_send_status = skipped`, and `outreach_approved = false`.
