#requires -Version 7.5
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$ExperimentPath,
    [Parameter(Mandatory)][string]$Slug,
    [ValidateSet('Structure','ResearchComplete','OutreachReady')][string]$Stage = 'Structure'
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
Import-Module (Join-Path $PSScriptRoot 'ProspectValidation.psm1')
$root = Get-ExperimentRoot $ExperimentPath
Assert-ProspectSlug $Slug
Assert-NoPendingTransaction $root
$record = Get-Content -LiteralPath (Get-SafePath $root "prospects/$Slug/research.json") -Raw | ConvertFrom-Json -AsHashtable -DateKind String
Assert-ResearchRecord $record $Stage
if ($record.prospect_slug -cne $Slug) { throw 'Package path and record slug disagree.' }
$tracker = Read-Tracker (Get-SafePath $root 'marketing/prospect-tracker.csv')
Assert-TrackerIdentity $tracker
$matches = @($tracker.records | Where-Object { $_.Contains('local_record_id') -and $_['local_record_id'] -ceq $record.local_record_id })
if ($matches.Count -ne 1) { throw 'Package ID must resolve to exactly one tracker row.' }
$row = $matches[0]
foreach ($field in @('business_name','status')) {
    $column = Get-ColumnName $tracker.headers $field
    if (-not $row.Contains($column) -or $row[$column] -cne $record.fields[$field]) { throw "Tracker/package $field mismatch." }
}
if (-not $row.Contains('prospect_slug') -or $row['prospect_slug'] -cne $Slug) { throw 'Tracker/package slug mismatch.' }
foreach ($field in $record.fields.Keys) {
    if ($field -in @('business_name','status')) { continue }
    $column = Get-ColumnName $tracker.headers $field
    if (-not $row.Contains($column)) { throw "Research field $field has no tracker column." }
    $expected = if ($field -in @('evidence','contact_verification')) { ConvertTo-Json -InputObject $record.fields[$field] -Depth 20 -Compress } else { [string]$record.fields[$field] }
    $actual = if ($field -in @('evidence','contact_verification')) {
        ConvertTo-Json -InputObject ($row[$column] | ConvertFrom-Json -AsHashtable -DateKind String -NoEnumerate) -Depth 20 -Compress
    } else { $row[$column] }
    if ($actual -cne $expected) { throw "Tracker/package $field mismatch; import the reviewed tracker changes before validating." }
}
foreach ($relative in @("prospects/$Slug/README.md", "prospects/$Slug/recommendation.md")) { Assert-Document $root $relative }
if ($Stage -in @('ResearchComplete','OutreachReady')) {
    Assert-ResearchDocument $root "prospects/$Slug/recommendation.md"
}
if ($Stage -eq 'OutreachReady') {
    Assert-OutreachDocuments $root $Slug $record.fields
}
[ordered]@{ valid=$true; stage=$Stage; local_record_id=$record.local_record_id; note='Local completeness only; source truth, URL availability, and send approval require human review.' } | ConvertTo-Json
