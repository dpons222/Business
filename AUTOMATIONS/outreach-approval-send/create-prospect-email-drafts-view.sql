create or replace view public.prospect_email_drafts
with (security_invoker = true)
as
select
  business_name,
  contact_email as business_email,
  outreach_draft_subject as email_draft_subject,
  outreach_draft_body as email_draft_body,
  website,
  demo_url,
  status as contact_status
from public.prospects;

comment on view public.prospect_email_drafts is
  'Review-only helper view for prospect email drafts with the business name, business email, website, demo URL, subject, body, and contact status.';
