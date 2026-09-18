-- #129: additive, service-only authorization and a bounded, shared login budget.
-- Does not create operators, change prospects, or modify hosted Auth settings.
begin;
create schema if not exists dashboard_private;
revoke all on schema dashboard_private from public, anon, authenticated;
grant usage on schema dashboard_private to service_role;

create table dashboard_private.login_budget (
  id boolean primary key default true check (id),
  window_started_at timestamptz not null,
  attempts integer not null check (attempts between 1 and 11)
);
alter table dashboard_private.login_budget enable row level security;
revoke all on dashboard_private.login_budget from public, anon, authenticated, service_role;

-- Private definer is necessary to inspect Auth's non-exposed tables without granting
-- service_role broad SELECT access to auth.users or auth.sessions.
create function dashboard_private.session_active(p_user_id uuid, p_session_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from auth.sessions s join auth.users u on u.id = s.user_id
    where s.id = p_session_id and s.user_id = p_user_id
      and s.created_at > now() - interval '1 hour'
      and (s.not_after is null or s.not_after > now())
      and u.deleted_at is null
      and (u.banned_until is null or u.banned_until <= now())
      and u.email_confirmed_at is not null
      and u.raw_app_meta_data ->> 'dashboard_role' = 'admin'
      and coalesce(u.raw_app_meta_data ->> 'dashboard_disabled', 'false') = 'false'
  );
$$;
revoke all on function dashboard_private.session_active(uuid, uuid) from public, anon, authenticated;
grant execute on function dashboard_private.session_active(uuid, uuid) to service_role;

create function public.dashboard_session_active(p_user_id uuid, p_session_id uuid)
returns boolean language sql stable security invoker set search_path = '' as $$
  select dashboard_private.session_active(p_user_id, p_session_id);
$$;
revoke all on function public.dashboard_session_active(uuid, uuid) from public, anon, authenticated;
grant execute on function public.dashboard_session_active(uuid, uuid) to service_role;

create function dashboard_private.take_login_attempt()
returns boolean language plpgsql security definer set search_path = '' as $$
declare used integer;
begin
  insert into dashboard_private.login_budget as budget (id, window_started_at, attempts)
  values (true, clock_timestamp(), 1)
  on conflict (id) do update set
    attempts = case when budget.window_started_at <= clock_timestamp() - interval '5 minutes'
      then 1 else least(budget.attempts + 1, 11) end,
    window_started_at = case when budget.window_started_at <= clock_timestamp() - interval '5 minutes'
      then clock_timestamp() else budget.window_started_at end
  returning attempts into used;
  return used <= 10;
end;
$$;
revoke all on function dashboard_private.take_login_attempt() from public, anon, authenticated;
grant execute on function dashboard_private.take_login_attempt() to service_role;

create function public.dashboard_take_login_attempt()
returns boolean language sql volatile security invoker set search_path = '' as $$
  select dashboard_private.take_login_attempt();
$$;
revoke all on function public.dashboard_take_login_attempt() from public, anon, authenticated;
grant execute on function public.dashboard_take_login_attempt() to service_role;
commit;
