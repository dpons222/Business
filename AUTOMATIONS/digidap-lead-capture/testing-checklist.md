# Testing Checklist

Use this checklist before connecting the public DigiDap website form to the production n8n webhook.

## Setup

- [ ] Move the workflow into the `DigiDap` n8n folder if needed.
- [x] Create n8n Supabase credential named `Supabase account`.
- [x] Attach `Supabase account` to the `Save Lead To Supabase` node.
- [x] Confirm `Gmail account` is attached to `Send Lead Notification`.
- [x] Reconnect the `Gmail account` credential in n8n.
- [x] Keep the workflow unpublished until the test flow passed.

## Test Webhook

Send sample data to:

```text
https://digidap.dpons.duckdns.org/webhook-test/digidap-sample-concept
```

Sample payload:

```json
{
  "name": "Test Lead",
  "business_name": "DigiDap Test Business",
  "website": "https://example.com",
  "email": "test@example.com",
  "phone": "210-555-0100",
  "request": "Testing the DigiDap lead capture workflow.",
  "source_page": "digidap-homepage",
  "vertical": "general"
}
```

Expected response:

```json
{
  "ok": true,
  "message": "Thanks. I received your request and will review it soon."
}
```

## Supabase Checks

- [x] New row appears in `public.leads`.
- [x] `status` is `new`.
- [x] `source_page` is populated.
- [x] `vertical` is populated.
- [x] `created_at` and `updated_at` are populated.

Latest verified execution:

```text
Execution 651 inserted lead row 85abfd65-b19a-4ad5-bde8-5061e3c1cd17, sent Gmail message 19ee2be75f21985c, and reached the final response node successfully.
```

## Email Checks

- [x] Email sends to `digidaps@gmail.com`.
- [x] Subject includes the business name.
- [x] Email body includes name, business, website, email, phone, request, and source.
- [x] Reply-to is the submitter email.

## Cleanup

- [x] Delete test rows from `public.leads`.
- [x] Confirm the final backend test execution passed.

## Publish

- [x] Publish the workflow.
- [x] Use the production webhook URL:

```text
https://digidap.dpons.duckdns.org/webhook/digidap-sample-concept
```

- [x] Update the website form action.
- [x] Add a honeypot field to the website form.
- [x] Test the published webhook directly.
- [x] Test the URL-encoded payload format used by the website form.
- [x] Test the deployed website form end to end from a normal browser.

Published webhook verification:

```text
Execution 653 inserted lead row 8d7f9ac6-2e7b-4012-a69f-db4b0aaa850a, sent Gmail message 19ee2c87af1158c3, and reached the final response node successfully.
```

Website form payload verification:

```text
Execution 654 accepted URL-encoded form fields, returned the expected success JSON, inserted lead row 001536ba-7945-44c3-911f-e837b393808d, and sent the Gmail notification.
```

The published webhook test row was deleted after verification.

Deployed website form verification:

```text
Execution 668 accepted the form submission from https://digidap.vercel.app/, inserted lead row 4275b5af-4c5a-4a49-a9cb-d815b02108b7, sent Gmail message 19ef170cdd0e1a77, and reached the final response node successfully.
```
