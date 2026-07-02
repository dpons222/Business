alter table public.prospects
  add column if not exists follow_up_send_status text not null default 'not_ready',
  add column if not exists follow_up_approved boolean not null default false,
  add column if not exists follow_up_approved_at timestamptz,
  add column if not exists follow_up_approved_by text,
  add column if not exists follow_up_step text,
  add column if not exists follow_up_draft_subject text,
  add column if not exists follow_up_draft_body text,
  add column if not exists follow_up_pre_send_checked_at timestamptz,
  add column if not exists follow_up_pre_send_checked_by text,
  add column if not exists follow_up_pre_send_checklist jsonb not null default '{}'::jsonb,
  add column if not exists follow_up_last_error text,
  add column if not exists follow_up_last_message_id text;

comment on column public.prospects.follow_up_send_status is
  'Approval-gated automation lifecycle for follow-up outreach: not_ready = draft/checklist incomplete; ready_for_review = stored draft ready for dashboard review; approved = exact follow-up approved for n8n send; queued = picked up by automation; sent = provider confirmed send; failed = send attempt failed; skipped = intentionally skipped.';

comment on column public.prospects.follow_up_approved is
  'Human approval gate for automated follow-up outreach. Must be true, alongside follow_up_send_status = approved and completed follow-up pre-send evidence, before n8n may send a follow-up email.';

comment on column public.prospects.follow_up_step is
  'The follow-up step currently being reviewed or sent: follow_up_1 or follow_up_2.';

comment on column public.prospects.follow_up_draft_subject is
  'Exact stored follow-up subject line approved for n8n sending.';

comment on column public.prospects.follow_up_draft_body is
  'Exact stored follow-up body approved for n8n sending.';

comment on column public.prospects.follow_up_pre_send_checklist is
  'Structured checklist evidence for follow-up approval, separate from first-outreach approval evidence.';
