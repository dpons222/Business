# Issue 109 - Not-Contacted Email Draft QA

## Goal
Run a narrow `prospect-demo-qa` pass for Supabase prospects where `status = not_contacted`, focused only on email draft accuracy. Create missing drafts when enough verified source/prospect context exists. Do not send outreach or mark any prospect contacted.

## Checklist
- [x] Identify all not-contacted prospects from Supabase.
- [x] Compare Supabase rows with local prospect docs and demo registry.
- [x] QA existing email draft subject/body for business name, stable demo URL, source-backed claims, no stale template language, and no escaped formatting artifacts.
- [x] Create missing draft subject/body for eligible prospects.
- [x] Update Supabase and local `outreach-email.md` files where needed.
- [x] Document per-prospect result, blockers, and final counts.
- [x] Validate changed docs/data and summarize issue status.

## QA Scope
This is intentionally limited to email drafts only. Demo visual/layout QA is out of scope unless needed to verify a draft URL or claim.

## Results
- Supabase returned 29 prospects where `status = not_contacted`.
- All 29 now have a non-empty `outreach_draft_subject` and `outreach_draft_body`.
- 10 of the 29 have a verified email stored in Supabase.
- 12 are set to `outreach_send_status = ready_for_review`: the 10 verified-email prospects plus LOA Construction and Pizabella, which have manual contact paths documented.
- 17 remain `outreach_send_status = not_ready` because they do not have a verified email or ready manual-send path.
- No prospect was marked contacted, no draft was approved, and no outreach was sent.
- Supabase validation found no missing draft fields, old preview-domain URLs, escaped newline artifacts, or stale ask language in the not-contacted draft bodies.
- Local outreach draft files were normalized to use the stable `https://local-growth-preview.vercel.app/...` demo URL where changed.
- This pass used existing prospect packages and Supabase state. It did not perform a fresh full public-site or visual demo QA for all 29 prospects because Diego explicitly requested an email-draft-only check.
