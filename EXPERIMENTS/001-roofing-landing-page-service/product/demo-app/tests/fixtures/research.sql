-- Synthetic local-only data for #129. This is NOT a migration or a hosted seed.
create table if not exists public.prospects (
  prospect_slug text primary key, business_name text, contact_email text, status text,
  outreach_send_status text, outreach_send_channel text, outreach_approved boolean default false,
  outreach_approved_at timestamptz, outreach_approved_by text, outreach_draft_subject text,
  outreach_draft_body text, website text, demo_url text, date_contacted date, last_contacted_at timestamptz,
  follow_up_1_due_at timestamptz, follow_up_1_sent_at timestamptz, follow_up_2_due_at timestamptz,
  follow_up_2_sent_at timestamptz, next_follow_up_at timestamptz, follow_up_send_status text,
  follow_up_approved boolean default false, follow_up_approved_at timestamptz, follow_up_approved_by text,
  follow_up_step text, follow_up_draft_subject text, follow_up_draft_body text, follow_up_last_error text,
  reply_status text, notes text, city_state text, vertical text, source_page text, observed_issue text,
  outreach_angle text, metadata jsonb, created_at timestamptz default now()
);
create table if not exists public.dashboard_focus_items (
  prospect_slug text primary key, added_at timestamptz not null, added_by text
);
alter table public.prospects enable row level security;
alter table public.dashboard_focus_items enable row level security;
revoke all on public.prospects, public.dashboard_focus_items from anon, authenticated;
grant all on public.prospects, public.dashboard_focus_items to service_role;
insert into public.prospects (prospect_slug,business_name,status,outreach_draft_subject,outreach_draft_body,observed_issue,metadata)
values
('charger-roofing','Charger Test Fixture','not_contacted','Private subject','PRIVATE_OUTREACH_SENTINEL_129','PRIVATE_RESEARCH_SENTINEL_129','{}'),
('research-private-fixture','Private Research Fixture','not_contacted',null,null,'PRIVATE_RESEARCH_SENTINEL_129','{"package_status":"recommendation_created","primary_recommendation":"Internal workflow discovery"}')
on conflict (prospect_slug) do nothing;
notify pgrst, 'reload schema';
