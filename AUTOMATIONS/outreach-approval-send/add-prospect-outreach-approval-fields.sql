alter table public.prospects
  add column if not exists outreach_send_status text not null default 'not_ready',
  add column if not exists outreach_approved boolean not null default false,
  add column if not exists outreach_approved_at timestamptz,
  add column if not exists outreach_approved_by text,
  add column if not exists outreach_batch_id text,
  add column if not exists outreach_send_channel text,
  add column if not exists outreach_draft_subject text,
  add column if not exists outreach_draft_body text,
  add column if not exists outreach_draft_path text,
  add column if not exists outreach_pre_send_checked_at timestamptz,
  add column if not exists outreach_pre_send_checked_by text,
  add column if not exists outreach_pre_send_checklist jsonb not null default '{}'::jsonb,
  add column if not exists outreach_last_error text;

alter table public.prospects
  drop constraint if exists prospects_outreach_send_status_check;

alter table public.prospects
  add constraint prospects_outreach_send_status_check
  check (outreach_send_status in ('not_ready', 'ready_for_review', 'approved', 'queued', 'sent', 'failed', 'skipped'));

alter table public.prospects
  drop constraint if exists prospects_outreach_send_channel_check;

alter table public.prospects
  add constraint prospects_outreach_send_channel_check
  check (outreach_send_channel is null or outreach_send_channel in ('email', 'contact_form', 'manual'));

comment on column public.prospects.outreach_send_status is 'Approval-gated automation status for outbound sends: not_ready, ready_for_review, approved, queued, sent, failed, skipped.';
comment on column public.prospects.outreach_approved is 'True only after Diego explicitly approves the exact draft/demo/contact method for sending.';
comment on column public.prospects.outreach_approved_at is 'Timestamp when the outreach draft was approved for sending.';
comment on column public.prospects.outreach_approved_by is 'Person or operator who approved the outreach draft.';
comment on column public.prospects.outreach_batch_id is 'Human-readable batch ID for grouped outreach review, e.g. roofing-2026-06-batch-01.';
comment on column public.prospects.outreach_send_channel is 'Send path intended for automation: email, contact_form, or manual.';
comment on column public.prospects.outreach_draft_subject is 'Exact approved subject line for email sends, if applicable.';
comment on column public.prospects.outreach_draft_body is 'Exact approved message body for email/contact form sends.';
comment on column public.prospects.outreach_draft_path is 'Repo path to the source outreach draft reviewed before approval.';
comment on column public.prospects.outreach_pre_send_checked_at is 'Timestamp when the pre-send checklist was completed.';
comment on column public.prospects.outreach_pre_send_checked_by is 'Person or operator who completed the pre-send checklist.';
comment on column public.prospects.outreach_pre_send_checklist is 'Structured pre-send checklist evidence, including stable URL, page verified, contact verified, and copy reviewed.';
comment on column public.prospects.outreach_last_error is 'Most recent n8n/send error details if a queued or approved outreach attempt fails.';
