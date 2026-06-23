# Supabase Schema

## Project

```text
digidap-leads
```

Project ref:

```text
uwukaydnmwiwggqoemtc
```

## Tables

### `public.leads`

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

### `public.prospects`

Purpose:

Track outbound prospects before and after manual outreach. This is separate from `public.leads`, which is for inbound form submissions.

Current first prospect:

```text
Charger Roofing
status: contacted
reply_status: contact_form_sent
demo: https://roof-check-preview.vercel.app/charger-roofing
```

## Prospect Columns

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | yes | Primary key, defaults to `gen_random_uuid()` |
| `created_at` | `timestamptz` | yes | Defaults to `now()` |
| `updated_at` | `timestamptz` | yes | Updated by trigger |
| `business_name` | `text` | yes | Prospect business name |
| `website` | `text` | yes | Prospect website or reviewed page |
| `contact_email` | `text` | no | Public email or outreach target |
| `phone` | `text` | no | Public phone number |
| `city_state` | `text` | no | Example: `San Antonio, TX` |
| `vertical` | `text` | yes | Defaults to `general` |
| `prospect_slug` | `text` | no | Unique when present, example: `charger-roofing` |
| `demo_url` | `text` | no | Client-facing demo URL |
| `digidap_url` | `text` | no | Defaults to DigiDap credibility site |
| `source_page` | `text` | no | Internal source label |
| `page_reviewed` | `text` | no | Page or offer reviewed |
| `observed_issue` | `text` | no | Short audit note |
| `outreach_angle` | `text` | no | Outreach positioning |
| `status` | `text` | yes | Defaults to `not_contacted` |
| `date_contacted` | `timestamptz` | no | Initial send date |
| `follow_up_1_due_at` | `timestamptz` | no | First follow-up due |
| `follow_up_1_sent_at` | `timestamptz` | no | First follow-up sent |
| `follow_up_2_due_at` | `timestamptz` | no | Second follow-up due |
| `follow_up_2_sent_at` | `timestamptz` | no | Second follow-up sent |
| `reply_status` | `text` | no | Optional reply classification |
| `last_contacted_at` | `timestamptz` | no | Most recent outbound contact |
| `next_follow_up_at` | `timestamptz` | no | Next planned follow-up |
| `notes` | `text` | no | Internal notes |
| `metadata` | `jsonb` | yes | Flexible non-critical details |
| `reply_summary` | `text` | no | Short summary of the prospect reply or conversation |
| `objection` | `text` | no | Main objection, hesitation, or reason they did not move forward |
| `interest_reason` | `text` | no | Reason the prospect showed interest or accepted the offer |
| `loss_reason` | `text` | no | Reason the opportunity was lost, if known |
| `decision_notes` | `text` | no | Additional decision context from replies, calls, or follow-up |

## Prospect Status Values

```text
not_contacted
contacted
follow_up_1_due
follow_up_1_sent
follow_up_2_due
follow_up_2_sent
positive_reply
neutral_reply
negative_reply
call_booked
won
lost
not_fit
```

## Prospect Security

RLS is enabled on `public.prospects`.

No public RLS policies are currently defined. This is intentional because prospect management should be private and operated through authenticated tools/admin workflows.

## Prospect Migrations

Applied migrations:

```text
create_prospects_table
add_prospect_response_learning_fields
```
