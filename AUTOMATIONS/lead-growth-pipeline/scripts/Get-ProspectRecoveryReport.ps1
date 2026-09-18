#requires -Version 7.5
[CmdletBinding()]
param([Parameter(Mandatory)][string[]]$ExperimentPath)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
$reports = foreach ($experiment in $ExperimentPath) {
    $root = Get-ExperimentRoot $experiment
    $path = Get-SafePath $root 'marketing/prospect-tracker.csv'
    $hash = Get-FileHashOrNull $path
    $tracker = Read-Tracker $path -Inventory
    $columns = for ($i = 0; $i -lt $tracker.headers.Count; $i++) {
        $old = $tracker.headers[$i]
        $proposed = if ([string]::IsNullOrWhiteSpace($old)) { "legacy_unnamed_column_$($i + 1)" } else { $old }
        $canonical = switch ($old) {
            'business' { 'business_name' }
            { $_ -in @('practice_focus','cuisine_or_concept','niche_or_service_focus') } { 'service_focus' }
            'page_reviewed' { 'current_flow_reviewed' }
            'outreach_angle' { 'personalized_outreach_angle' }
            default { $proposed }
        }
        [ordered]@{ ordinal=$i+1; original=$old; proposed=$proposed; canonical_field=$canonical }
    }
    $nameIndices = @(for ($i=0; $i -lt $tracker.headers.Count; $i++) { if ($tracker.headers[$i] -in @('business','business_name')) { $i } })
    $idIndex = [array]::IndexOf($tracker.headers, 'local_record_id')
    $idCounts = @{}
    if ($idIndex -ge 0) {
        foreach ($row in $tracker.rows) { if ($row.cells.Count -gt $idIndex -and $row.cells[$idIndex]) { $idCounts[$row.cells[$idIndex]]++ } }
    }
    $unnamed = 0
    $rowReports = for ($i = 0; $i -lt $tracker.rows.Count; $i++) {
        $row = $tracker.rows[$i]
        $reasons = @()
        if ($row.cells.Count -ne $tracker.headers.Count) { $reasons += 'column_count_mismatch' }
        if ($nameIndices.Count -ne 1 -or $row.cells.Count -le $nameIndices[0] -or [string]::IsNullOrWhiteSpace($row.cells[$nameIndices[0]])) { $reasons += 'unresolved_business_identity'; $unnamed++ }
        $id = if ($idIndex -ge 0 -and $row.cells.Count -gt $idIndex) { $row.cells[$idIndex] } else { '' }
        if ($id -and $idCounts[$id] -gt 1) { $reasons += 'duplicate_local_record_id' }
        [ordered]@{ data_row=$i+1; source_line=$row.line; cells_sha256=Get-TextHash (ConvertTo-Json -InputObject $row.cells -Compress);
            local_record_id=$id; classification=$(if ($reasons.Count) { 'manual_review' } else { 'identity_review_before_import' }); reasons=$reasons }
    }
    if ((Get-FileHashOrNull $path) -cne $hash) { throw "Tracker changed during inventory: $path" }
    [ordered]@{ experiment=[IO.Path]::GetFileName($root); tracker='marketing/prospect-tracker.csv'; source_sha256=$hash;
        parsed_rows=$tracker.rows.Count; malformed_records=$tracker.errors.Count; unnamed_rows=$unnamed;
        header_issues=$tracker.header_issues; column_map=@($columns); rows=@($rowReports); parse_errors=@($tracker.errors.ToArray());
        policy='Original input retained unchanged. No identity, evidence, contact status, or canonical ID inferred. Review each legacy row before adoption/import.' }
}
[ordered]@{ schema_version=1; trackers=@($reports); canonical_mapping='experiment + local_record_id -> future business_id/location_id; preserve import_origin, legacy id, source hash and data row' } | ConvertTo-Json -Depth 20
