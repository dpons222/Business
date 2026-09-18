#requires -Version 7.5
[CmdletBinding()]
param([Parameter(Mandatory)][string]$ExperimentPath, [Parameter(Mandatory)][string]$ExpectedTrackerHash, [switch]$DryRun)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
$root = Get-ExperimentRoot $ExperimentPath
Assert-NoPendingTransaction $root
$relative = 'marketing/prospect-tracker.csv'
$path = Get-SafePath $root $relative
if ((Get-FileHashOrNull $path) -cne $ExpectedTrackerHash) { throw 'Tracker differs from the reviewed recovery inventory.' }
$tracker = Read-Tracker $path -Inventory
if ($tracker.errors.Count -or @($tracker.rows | Where-Object { $_.cells.Count -ne $tracker.headers.Count }).Count) { throw 'Malformed rows require manual recovery; no header repair applied.' }
$headers = for ($i=0; $i -lt $tracker.headers.Count; $i++) {
    if ([string]::IsNullOrWhiteSpace($tracker.headers[$i])) { "legacy_unnamed_column_$($i+1)" } else { $tracker.headers[$i] }
}
if (@($headers | Group-Object | Where-Object Count -gt 1).Count -or @($headers | Where-Object { $_ -ne $_.Trim() }).Count) { throw 'Ambiguous named headers require manual review.' }
$records = foreach ($row in $tracker.rows) {
    $record = [ordered]@{}
    for ($i=0; $i -lt $headers.Count; $i++) { $record[$headers[$i]] = $row.cells[$i] }
    $record
}
$changes = @()
if (($headers | ConvertTo-Json -Compress) -cne ($tracker.headers | ConvertTo-Json -Compress)) {
    $changes = @(New-FileChange $root $relative (ConvertTo-TrackerCsv $headers @($records)))
}
if ($DryRun) { @{ dry_run=$true; changes=$changes; source_sha256=$ExpectedTrackerHash } | ConvertTo-Json -Depth 15 }
else {
    $transaction = Invoke-ProspectTransaction $root $changes @{ $relative=$ExpectedTrackerHash }
    @{ changed_files=$changes.Count; transaction_id=$transaction; note='Only unnamed columns renamed by position. All cells and row order preserved; unresolved identities remain unresolved.' } | ConvertTo-Json
}
