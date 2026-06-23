# Workflow Spec

## Purpose

Capture DigiDap sample concept requests from the public website and route them into the lead tracking system.

## Workflow

```text
DigiDap Sample Concept Lead Capture
```

Workflow ID:

```text
kfYpaZjDZW0CQGNJ
```

## Trigger

Node:

```text
Receive Sample Concept Request
```

Method:

```text
POST
```

Test URL:

```text
https://digidap.dpons.duckdns.org/webhook-test/digidap-sample-concept
```

Production URL:

```text
https://digidap.dpons.duckdns.org/webhook/digidap-sample-concept
```

## Expected Input

The webhook should accept JSON or form-style body fields:

```json
{
  "name": "Jane Owner",
  "business_name": "Example Roofing",
  "website": "https://example.com",
  "email": "jane@example.com",
  "phone": "210-555-0100",
  "request": "I want a clearer service page and faster lead response.",
  "source_page": "digidap-homepage",
  "vertical": "general"
}
```

Required fields:

- `name`
- `business_name`
- `website`
- `email`
- `request`

Optional fields:

- `phone`
- `source_page`
- `vertical`

## Workflow Steps

1. `Receive Sample Concept Request`
   - Receives the public website form submission.
   - Uses webhook path `digidap-sample-concept`.
   - Responds through the final `Respond to Webhook` node.

2. `Normalize Lead Fields`
   - Pulls fields from `body` or direct JSON payload.
   - Defaults `source_page` to `digidap-homepage`.
   - Defaults `vertical` to `general`.
   - Sets `status` to `new`.

3. `Save Lead To Supabase`
   - Inserts a row into `public.leads`.
   - Uses n8n Supabase credential `Supabase account`.

4. `Send Lead Notification`
   - Sends an email to `digidaps@gmail.com`.
   - Uses n8n Gmail credential `Gmail account`.
   - Sets reply-to as the submitter email.

5. `Return Success Response`
   - Returns JSON:

```json
{
  "ok": true,
  "message": "Thanks. I received your request and will review it soon."
}
```

## Credentials

Needed:

- `Supabase account`
  - Type: Supabase
  - Project: `digidap-leads`
  - Project ref: `uwukaydnmwiwggqoemtc`
  - Host: `https://uwukaydnmwiwggqoemtc.supabase.co`
  - Table: `public.leads`
  - Service Role Secret: copy from the Supabase dashboard, not from this repo.

Supabase dashboard notes:

- `Settings > General` shows the project ID/ref, but that is not the n8n host value.
- For the n8n `Host`, use the Supabase project URL: `https://uwukaydnmwiwggqoemtc.supabase.co`.
- In the current Supabase dashboard, API key material is under `Settings > API Keys`.
- Use the `service_role` secret for the n8n Supabase credential because n8n is the trusted server-side write path.
- Do not use the anon key or publishable key for this n8n insert workflow.

Already available:

- `Gmail account`
  - Type: Gmail OAuth2
  - Sends notification email to `digidaps@gmail.com`
  - Current status: connected and verified in execution `651`.

## Publish Requirements

- Supabase credential is connected.
- Test webhook submission creates a Supabase row.
- Gmail notification is received.
- Manual execution `651` passes end to end.
- Published production execution `653` passes end to end.
- Published production execution `654` accepts the URL-encoded website form payload format.
- Workflow is published.
- Website form action is updated to the production webhook URL.
