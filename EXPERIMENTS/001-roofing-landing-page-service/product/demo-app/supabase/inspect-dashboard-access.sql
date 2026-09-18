-- Read-only hosted preflight. No emails, passwords, tokens or prospect contents.
select count(*) as operator_count
from auth.users
where raw_app_meta_data ->> 'dashboard_role' = 'admin'
  and coalesce(raw_app_meta_data ->> 'dashboard_disabled', 'false') = 'false';

select n.nspname as schema_name, c.relname as relation_name, c.relkind,
  c.relrowsecurity as rls_enabled, c.reloptions,
  has_table_privilege('anon',c.oid,'select') as anonymous_select,
  has_table_privilege('authenticated',c.oid,'select') as authenticated_select
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relname in ('prospects','dashboard_focus_items','prospect_email_drafts');

select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname='public' and tablename in ('prospects','dashboard_focus_items');

select n.nspname as schema_name, p.proname, p.prosecdef,
  has_function_privilege('anon',p.oid,'execute') as anonymous_execute,
  has_function_privilege('authenticated',p.oid,'execute') as authenticated_execute,
  has_function_privilege('service_role',p.oid,'execute') as server_execute
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname in ('public','dashboard_private')
  and p.proname in ('dashboard_session_active','dashboard_take_login_attempt','session_active','take_login_attempt');
