create table if not exists public.dashboard_focus_items (
  prospect_slug text primary key,
  added_at timestamptz not null default now(),
  added_by text
);

alter table public.dashboard_focus_items enable row level security;

create index if not exists dashboard_focus_items_added_at_idx
  on public.dashboard_focus_items (added_at desc);

comment on table public.dashboard_focus_items is
  'Global dashboard focus list. One row per focused prospect or local demo slug, managed through trusted dashboard API routes.';

comment on column public.dashboard_focus_items.prospect_slug is
  'Dashboard entry slug currently in focus. May reference a Supabase prospect row or a local-only demo entry.';

comment on column public.dashboard_focus_items.added_at is
  'Timestamp when this prospect was added to the dashboard focus list.';

comment on column public.dashboard_focus_items.added_by is
  'Dashboard username or operator who added this prospect to the focus list.';
