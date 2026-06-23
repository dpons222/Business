# DigiDap Lead Capture Automation

This directory documents the lead capture workflow for the DigiDap public site.

The workflow connects the sample concept form to n8n, stores the submission in Supabase, and sends an email notification to DigiDap.

## Current Status

- Supabase project created: `digidap-leads`
- Supabase project ref: `uwukaydnmwiwggqoemtc`
- Supabase project URL / n8n host: `https://uwukaydnmwiwggqoemtc.supabase.co`
- Supabase table created: `public.leads`
- n8n workflow draft created: `DigiDap Sample Concept Lead Capture`
- n8n workflow ID: `kfYpaZjDZW0CQGNJ`
- n8n workflow published.
- Supabase n8n credential attached: `Supabase account`
- Gmail notification credential connected: `Gmail account`

## Intended Flow

```text
DigiDap website form
-> n8n webhook
-> Normalize lead fields
-> Insert row into Supabase public.leads
-> Send Gmail notification to digidaps@gmail.com
-> Return JSON success response
```

## n8n URLs

Workflow:

```text
https://digidap.dpons.duckdns.org/workflow/kfYpaZjDZW0CQGNJ
```

Test webhook:

```text
https://digidap.dpons.duckdns.org/webhook-test/digidap-sample-concept
```

Production webhook:

```text
https://digidap.dpons.duckdns.org/webhook/digidap-sample-concept
```

## Related Files

- `workflow-spec.md`: workflow inputs, steps, and node responsibilities.
- `supabase-schema.md`: Supabase table fields and lead statuses.
- `testing-checklist.md`: manual validation steps before publishing.

## Operational Notes

- Do not expose Supabase service role keys in the website.
- The n8n Supabase credential should use the project URL as the host and the `service_role` secret from `Settings > API Keys`.
- The anon key and publishable key are not the right values for the n8n write workflow.
- The public website form now posts to the production n8n webhook.
- Use the n8n workflow as the trusted write path into Supabase.
- Add spam protection before sharing the form widely.

## Latest Test Result

Manual execution `651` confirmed the webhook data normalized correctly, inserted into `public.leads`, sent the Gmail notification, and reached the final response node.

Production execution `653` confirmed the published webhook path works end to end after the workflow cleanup and republish.

Production execution `654` confirmed the production webhook also accepts the URL-encoded payload format used by the website form.

Production execution `668` confirmed the deployed DigiDap site form works from a normal browser.

The static website form is wired to the production webhook and includes a honeypot field.

The test Supabase row was deleted after verification.
