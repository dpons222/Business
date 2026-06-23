# Supabase Schema

## Project

```text
digidap-leads
```

Project ref:

```text
uwukaydnmwiwggqoemtc
```

## Table

```text
public.leads
```

Purpose:

Store form submissions from the DigiDap sample concept request form and future lead capture forms.

## Columns

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | yes | Primary key, defaults to `gen_random_uuid()` |
| `created_at` | `timestamptz` | yes | Defaults to `now()` |
| `updated_at` | `timestamptz` | yes | Updated by trigger |
| `name` | `text` | yes | Submitter name |
| `business_name` | `text` | yes | Business name |
| `website` | `text` | yes | Business website |
| `email` | `text` | yes | Submitter email |
| `phone` | `text` | no | Optional phone |
| `request` | `text` | yes | What they want to improve |
| `source_page` | `text` | no | Example: `digidap-homepage` |
| `vertical` | `text` | no | Example: `general`, `roofing` |
| `status` | `text` | yes | Defaults to `new` |
| `next_follow_up_at` | `timestamptz` | no | Optional follow-up date |
| `notes` | `text` | no | Internal notes |
| `metadata` | `jsonb` | yes | Defaults to `{}` |

## Status Values

```text
new
reviewed
sample_concept_started
sample_sent
followed_up
call_booked
won
lost
not_fit
```

## Security

RLS is enabled on `public.leads`.

No public RLS policies are currently defined. This is intentional for the first version because public browser writes should not go directly to Supabase.

Trusted writes should happen through:

```text
Website form -> n8n webhook -> Supabase credential -> public.leads
```

## Migrations

Applied migrations:

```text
20260619202832_create_leads_table
20260619203022_set_updated_at_function_search_path
```

## Advisor Notes

The Supabase security advisor reports:

```text
RLS Enabled No Policy
```

This is acceptable while the table is only written through trusted backend or n8n credentials.
