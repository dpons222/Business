# Lead Growth Pipeline

Local tools for creating research packages, preserving tracker history, checking completeness, and preparing draft-only outreach. Requires **PowerShell 7.5 or newer** (`pwsh`); Windows PowerShell 5.1 is not supported. No extra modules, network requests, database writes, or sending are required.

## Create and update

Run from the repository root. The experiment and its `marketing/prospect-tracker.csv` must already exist. Use `-DryRun` to receive a JSON before/after diff without creating files, directories, locks, or backups.

```powershell
$generator = './AUTOMATIONS/lead-growth-pipeline/scripts/New-ProspectPackage.ps1'
$experiment = './EXPERIMENTS/003-hvac-growth-systems'
& $generator -ExperimentPath $experiment -BusinessName 'Example HVAC' `
  -Slug 'example-hvac-north' -Website 'https://example.invalid' `
  -CityState 'Indianapolis, IN' -DryRun
```

Remove `-DryRun` after reviewing the proposed changes. The default status is `sourced`. A new package includes `research.json`, a README, research/recommendation notes, a client summary, draft outreach, a tracking outline, and an internal personalized recommendation. Unresearched sections contain visible placeholders.

Every record receives a stable `local_record_id` and `prospect_slug`. Reruns preserve existing document bytes and tracker columns, including legacy IDs, comments, contact dates, follow-ups, replies, and notes. Only explicitly supplied fields change. Omitted fields remain untouched; an explicit empty string clears a text field. Alternatively, use canonical names with `-ClearField website,city_state`. Identity and status cannot be cleared.

Use the explicit slug on updates. A name-derived slug cannot silently change an existing business's name, website, or location. Name/domain matches are candidates for review, never merge keys. To create another branch or same-name business, use an unused slug with `-NewRecord`. Blank websites do not match each other.

### Adopt a legacy row

First inspect the recovery inventory below. For a tracker with a valid schema, select the exact one-based **data row**, excluding the header, and its current SHA-256 hash:

```powershell
$trackerHash = (Get-FileHash "$experiment/marketing/prospect-tracker.csv" -Algorithm SHA256).Hash.ToLowerInvariant()
& $generator -ExperimentPath $experiment -BusinessName 'Exact existing business name' `
  -Slug 'reviewed-location-slug' -AdoptRow 3 -ExpectedTrackerHash $trackerHash -DryRun
```

Adoption requires an exact business-name match and an unowned, named row. It preserves the row and records its original hash, data-row number, and legacy ID. Unnamed rows remain unresolved. Existing advanced statuses may need supplied evidence and contact verification before adoption passes validation. Do not rewrite history merely to make validation pass.

### Supply evidence

`-EvidencePath` accepts a JSON array of `{source_url, observed_at, observation}`. `-ContactVerificationPath` accepts `{method, contact_method, source_url, verified_at}`. See the [contract](data-contract.md) and [synthetic examples](tests/fixtures/evidence.json). Timestamps require ISO 8601 with timezone. These inputs record the operator's verification; the scripts do not browse or authenticate the claim.

```powershell
& $generator -ExperimentPath $experiment -BusinessName 'Example HVAC' `
  -Slug 'example-hvac-north' -EvidencePath './reviewed-evidence.json' `
  -ObservedIssue 'A specific observation supported by the supplied source.' `
  -Status researched
```

The generator never fills `current_flow_reviewed` or contact verification automatically. An explicitly supplied reviewed-journey description requires evidence. Research-only records do not need a website, recommendation, demo, or contact method. Evidence may refer to a public listing when the business has no website.

Existing prose remains independent of structured field updates. Edit it deliberately or use reviewed regeneration, then validate the resulting package. A new field value does not prove existing prose is current.

### Deliberately regenerate documents

Adopt/create the stable identity first. Then preview the exact overwrite:

```powershell
$update = @{
  ExperimentPath = $experiment
  BusinessName = 'Example HVAC'
  Slug = 'example-hvac-north'
  PrimaryRecommendation = 'A focused intake workflow'
  Regenerate = $true
}
$diff = & $generator @update -DryRun | ConvertFrom-Json -DateKind String
$diff.changes | Select-Object path, before, after
# Only after reviewing those document changes:
& $generator @update -ReviewHash $diff.review_hash
```

The review hash binds the old and proposed document contents. Later edits invalidate it. Each replaced document is preserved in the transaction backup. Generated outreach always contains review placeholders, so regenerate before progressing to `ready_for_review`.

## Validate the right stage

```powershell
./AUTOMATIONS/lead-growth-pipeline/scripts/Test-ProspectPackage.ps1 `
  -ExperimentPath $experiment -Slug 'example-hvac-north' -Stage ResearchComplete
```

| Stage | Checks |
| --- | --- |
| `Structure` (default) | Supported record schema, valid ID/slug/history, matching tracker row and fields, nonempty README/research notes, local references, no interrupted transaction. |
| `ResearchComplete` | Structure plus dated source evidence, a substantive observation, and research notes with required sections resolved. Recommendations/contact/outreach remain optional. |
| `OutreachReady` | Research plus primary recommendation, rationale, outreach angle, matching contact verification, resolved client summary and exact draft, completed draft checklist, and a syntactically valid web URL or nonempty local recommendation. |

Validation is local completeness checking. It does not verify factual truth, remote URL availability, deliverability, permission to contact, or approval to send. `ready_for_review` is a review queue, not sending authorization. The generator cannot advance approval/send/reply states. Diego must review the exact recipient, subject, body, live asset, and current sources before any send. Follow [the Gmail handoff](gmail-draft-handoff.md).

## Recovery and locking

Inventory an experiment without changing it:

```powershell
./AUTOMATIONS/lead-growth-pipeline/scripts/Get-ProspectRecoveryReport.ps1 -ExperimentPath $experiment
```

The report includes every parsed row's source line, data-row index, content hash, identity classification, malformed records, source-file hash, and old/proposed/canonical column mappings. The [Issue #130 inventory](../../plans/issue-128-business-research-platform-audit/issue-130-recovery-report.md) accounts for the current seven trackers. Originals remain unchanged.

The only automated legacy repair is positional naming of blank headers (`legacy_unnamed_column_N`). It preserves every cell and row, including unresolved identities. Duplicate named headers, invalid quoting, and mismatched widths stop for manual review.

```powershell
./AUTOMATIONS/lead-growth-pipeline/scripts/Repair-ProspectTrackerHeader.ps1 `
  -ExperimentPath $experiment -ExpectedTrackerHash $trackerHash -DryRun
# After reviewing that narrow repair, repeat without -DryRun.
```

All writers share a fail-fast experiment lock and verify hashes before applying. Files are staged, flushed, backed up, then replaced by same-directory rename. Readers see complete old or new files. A multi-file package is **not** one filesystem-wide atomic transaction: an interruption leaves a journal and blocks subsequent writes/validation until recovery. These guarantees target a local filesystem; network/cloud-synchronized folders are not supported for concurrent writes. External editors do not participate in the lock, so avoid editing during an operation; hashes catch changes observed before replacement.

Backups and journals live under `<experiment>/.prospect-package/transactions/<id>/` and remain on disk, ignored by Git. They contain private research/history. Do not remove them while recovery or canonical import reconciliation is pending. The harmless `write.lock` file can remain after completion; ownership is the OS file handle, not the file's existence.

```powershell
./AUTOMATIONS/lead-growth-pipeline/scripts/Restore-ProspectTransaction.ps1 `
  -ExperimentPath $experiment -TransactionId '<reported-id>' -DryRun
# Review, then repeat without -DryRun.
```

Recovery verifies all backup checksums and current file versions before restoring any file. Later operator edits stop restoration; use a reviewed inverse field patch instead. Already restored files are recognized on retry. Abandoned same-directory `.package-*.tmp` files from a hard kill are not authoritative and can be reviewed/removed after recovery.

## Verification and installed skill ownership

```powershell
pwsh -NoProfile -File ./AUTOMATIONS/lead-growth-pipeline/tests/Run-RegressionTests.ps1
./AUTOMATIONS/lead-growth-pipeline/scripts/Sync-InstalledPipelineScripts.ps1 -Check
```

The **repository scripts are authoritative**. The installed personal skill has copies of seven runtime scripts/modules. Run the sync script without `-Check` to preserve its old copies in a transaction and update them; then run `-Check` again. Use `-SkillPath` for an alternate installed location. Never copy an older personal script back over repository source. The test fixtures are synthetic and do not contact real businesses. See [testing details](testing-checklist.md).

Files: [data contract](data-contract.md), [workflow](workflow-spec.md), [Gmail handoff](gmail-draft-handoff.md), [skill blueprint](../../SKILLS/lead-growth-pipeline-blueprint.md), and [scripts](scripts/).
