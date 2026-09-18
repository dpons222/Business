# Issue 130 — Local tracker recovery inventory

Inspected 2026-09-17/18 using `Get-ProspectRecoveryReport.ps1`. The [machine-readable inventory](issue-130-recovery-inventory.json) records source SHA-256 values, every data-row number/source line/content hash, malformed record details, and old/proposed/canonical column mappings. All seven original tracker files remain unchanged. No database was read or modified.

| Experiment | Parsed rows | Named rows | Unresolved names | Malformed CSV records |
| --- | ---: | ---: | ---: | ---: |
| 001 Roofing | 199 | 30 | 169 | 0 |
| 002 Restaurants | 1 | 1 | 0 | 0 |
| 003 HVAC | 0 | 0 | 0 | 0 |
| 004 Remodeling | 0 | 0 | 0 | 0 |
| 005 Med spas | 25 | 25 | 0 | 0 |
| 006 Dental | 0 | 0 | 0 | 0 |
| 007 Legal | 0 | 0 | 0 | 0 |
| **Total** | **225** | **56** | **169** | **0** |

These are row counts, not unique verified businesses. Blank physical lines are not CSV data records. The 56 named rows still need identity review before adoption/canonical import. No local record IDs were assigned to real businesses by this audit.

## Roofing findings and narrow repair

Source hash: `bc56819e5e8f2bdf81697ec319b8d776d97e11ce40f9d5d7d45bd9c339ffa2ff`.

All 199 parsed roofing rows have 20 cells. Headers 16–20 are blank. The safe proposed schema repair is to name those columns `legacy_unnamed_column_16` through `legacy_unnamed_column_20`, preserving every original cell, row order, original named column, and contact state. Their actual meanings are unknown; the positional labels deliberately make no semantic claim. The report retains the ordinal mapping.

Data rows **31–199** (169 rows, excluding the header) have no business name. They remain `manual_review` with reason `unresolved_business_identity`. Do not delete, auto-adopt, merge, or invent a business for these rows. Preserve them until source evidence or prior records resolve their identities. Any statuses or contact information already in those rows are retained as supplied, not accepted as proof of identity or approval.

The header-repair tool was applied to a sanitized fixture and verified cell-for-cell with a byte-exact original backup. No real tracker repair was applied. To review a real repair, run `Repair-ProspectTrackerHeader.ps1` with the current inventory hash and `-DryRun`; only remove `-DryRun` after reviewing that scoped change. Generation intentionally stops on the current malformed roofing schema until this review occurs.

## Adoption and canonical import

- Valid named rows can be explicitly adopted using `-AdoptRow` and `-ExpectedTrackerHash`; the exact business name must match. Name/domain matches alone never update a row.
- New package IDs use UUID v4 `local_record_id` and unique `prospect_slug`; old `id` columns remain unchanged.
- Issue #134 must map `(experiment, local_record_id)` to `business_id` / `location_id`, preserving the source hash, row/content hash, legacy ID, contact history, and unresolved exceptions.
- Canonical field aliases are documented in the [contract](../../AUTOMATIONS/lead-growth-pipeline/data-contract.md). The inventory includes every header mapping, including niche-specific service-focus columns and the roofing aliases.
- Recompute the inventory before a later repair/import; changed hashes invalidate the current review. Never apply row numbers from an older file version.

## Recovery evidence

Regression coverage verifies that header repair rejects malformed quoting, row-width differences, duplicate named headers and stale hashes; unnamed rows cannot be adopted by inventing a name. Per-file originals are preserved under a transaction ID before replacement. Recovery verifies backup hashes and refuses to overwrite later operator edits. [Operating instructions](../../AUTOMATIONS/lead-growth-pipeline/README.md#recovery-and-locking) describe the local-filesystem and external-editor limitations.
