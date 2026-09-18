# Prospect Package Contract — version 1

## Identity and ownership

The experiment tracker retains all original columns and row order. New/adopted package rows add a UUID v4 `local_record_id` and a unique lowercase `prospect_slug`. Legacy `id` values are never replaced. Names and domains are review signals, not identity keys. Branches sharing a domain and businesses without websites stay separate.

`prospects/<slug>/research.json` contains:

```json
{
  "schema_version": 1,
  "local_record_id": "a9a67385-6035-494d-9bde-776ae3e24ce2",
  "prospect_slug": "example-north",
  "import_origin": {"tracker_sha256": "original SHA-256", "data_row": 3, "legacy_id": "old ID or null"},
  "fields": {"business_name": "Example", "status": "sourced"},
  "status_history": [{"from": "", "to": "sourced", "at": "2026-09-01T12:00:00Z", "kind": "legacy_import"}]
}
```

The tracker owns contact history and externally recorded operational state. The generator imports changes to known tracker fields before applying explicit parameters. The validator rejects disagreement between the structured record and its tracker fields. Human prose is independently maintained and is never implicitly regenerated.

Canonical import in Issue #134 must map **experiment + local_record_id** to `business_id` / `location_id`, preserving `import_origin`, source file/row hashes, legacy IDs, slugs, unknown columns, contact history, and unresolved rows. Do not derive a canonical ID from a name, website, or list position. Rows without local IDs require explicit reconciliation first. Never conflate `local_record_id` with the legacy tracker `id`.

## Column compatibility

| Canonical field | Accepted existing column |
| --- | --- |
| `business_name` | `business_name`, roofing `business` |
| `service_focus` | `service_focus`, `practice_focus`, `cuisine_or_concept`, `niche_or_service_focus` |
| `current_flow_reviewed` | `current_flow_reviewed`, roofing `page_reviewed` |
| `personalized_outreach_angle` | `personalized_outreach_angle`, roofing `outreach_angle` |

Multiple aliases for the same field are ambiguous and require review. Existing aliases are retained; an absent explicitly supplied field is added as a column. CSV parsing supports quoted/unquoted headers, quoted commas, quotes, embedded newlines, Unicode, and unknown columns. Blank/duplicate headers or wrong row widths block generation. Initial repair can name blank columns by ordinal without changing their cell values.

Core fields are `business_name`, `website`, `city_state`, `service_focus`, `recommendation_category`, `primary_recommendation`, `secondary_recommendations`, `future_opportunities`, `contact_method`, `current_flow_reviewed`, `observed_issue`, `recommended_solution`, `personalized_outreach_angle`, `brand_palette_source`, `demo_or_recommendation_url`, `assumptions`, `evidence`, `contact_verification`, and `status`.

Keep existing `date_contacted`, `follow_up_1`, `follow_up_2`, `reply`, `notes`, IDs and any custom fields. The generator does not reconstruct or rewrite those values. A no-op rerun preserves tracker bytes. A real field update may normalize CSV quoting/newline representation while preserving parsed values and every original column; the original bytes remain backed up.

## Patch semantics

- Omitted parameter: preserve the existing field.
- Explicit empty text parameter: clear that field.
- `-ClearField <canonical-name>`: clear an allowed field, with `[]` for evidence and `null` for contact verification.
- Supplying and clearing the same field is an error. Identity and status cannot be cleared.
- Documents: create missing files only. Existing files require explicit regeneration with an exact review hash; every replaced file is backed up.

## Evidence and contact verification

Evidence is a JSON array, serialized as JSON in the CSV `evidence` cell:

```json
[{"source_url":"https://example.invalid/services","observed_at":"2026-09-01T12:00:00Z","observation":"A concrete observation from that source."}]
```

Use HTTP(S) source URLs, a timezone-bearing ISO 8601 observation time, and substantive observation text. Future observations and unresolved placeholders fail. Source URLs may reference public listings; a business website is not required. This records supplied evidence, not a crawler or independent verification of truth. Assumptions stay separate. Never populate reviewed-journey or contact-verification claims from the mere existence of a package.

Contact verification is an explicit object (also JSON in the CSV):

```json
{"method":"verified_public_email","contact_method":"team@example.invalid","source_url":"https://example.invalid/contact","verified_at":"2026-09-01T12:00:00Z"}
```

Allowed methods: `verified_public_email`, `verified_contact_form`, `verified_phone_only`, `verified_social_dm`. The exact `contact_method` must match the current package field; changing the recipient/contact value invalidates stale verification. Missing verification is unverified. Phone-only verification does not establish an email recipient; channel-specific sending checks remain in the outreach workflow.

## Status and completeness

Statuses: `sourced`, `researched`, `qualified`, `diagnosed`, `recommendation_created`, `demo_created`, `email_drafted`, `ready_for_review`, `approved_to_send`, `sent`, `followed_up`, `positive_reply`, `not_interested`, `bad_fit`, `paused`.

The generator defaults to `sourced`; forward research stages may be skipped when the supplied research meets completeness checks. Backward transitions fail. `paused`/`bad_fit` may stop work; resuming stopped work begins at `sourced` for review. Recorded approval must follow `ready_for_review`; `sent` must follow approval; follow-ups/replies require prior contact. External legacy initial status is preserved as a `legacy_import` event, not reconstructed contact history. Unknown legacy statuses need manual mapping, not silent conversion.

The generator cannot advance into approval/send/reply states. It may preserve existing states. A package validator offers `Structure`, `ResearchComplete`, and `OutreachReady`; see [the operating guide](README.md#validate-the-right-stage). Research completeness does not require a recommendation or outreach. Readiness checks local content; it is not send approval, evidence truth, or proof a remote URL currently works. No Gmail draft or message is created by these scripts.
