#requires -Version 7.5
[CmdletBinding()]
param([Parameter(Mandatory)][string]$ExperimentPath, [Parameter(Mandatory)][string]$TransactionId, [switch]$DryRun)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
$root = Get-ExperimentRoot $ExperimentPath
if ($TransactionId -cnotmatch '^[0-9a-f-]{36}$') { throw 'Invalid transaction ID.' }
$dir = Get-SafePath $root ".prospect-package/transactions/$TransactionId"
$journalPath = Get-SafePath $root ".prospect-package/transactions/$TransactionId/transaction.json"
$journal = Get-Content -LiteralPath $journalPath -Raw | ConvertFrom-Json -AsHashtable -DateKind String
if ($journal.schema_version -ne 1 -or $journal.id -cne $TransactionId) { throw 'Invalid transaction journal.' }
if ($journal.state -eq 'rolled_back') { throw 'Transaction was already rolled back.' }
$journalHash = Get-FileHashOrNull $journalPath
$lock = $null
try {
    if (-not $DryRun) { $lock = Open-ProspectLock $root }
    if ((Get-FileHashOrNull $journalPath) -cne $journalHash) { throw 'Journal changed during recovery.' }
    # Preflight every file before restoring any: never erase a later operator edit.
    $restore = @()
    foreach ($entry in $journal.entries) {
        if ([string]$entry.slot -notmatch '^\d+$') { throw 'Invalid backup slot.' }
        if ($entry.path -like '.prospect-package/*') { throw 'Invalid restore destination.' }
        $path = Get-SafePath $root $entry.path
        $current = Get-FileHashOrNull $path
        if ($current -cne $entry.before_hash -and $current -cne $entry.after_hash) { throw "Later edit detected in $($entry.path). Use an inverse field patch after review." }
        if ($entry.before_hash) {
            $backup = Get-SafePath $root ".prospect-package/transactions/$TransactionId/$($entry.slot).before"
            if ((Get-FileHashOrNull $backup) -cne $entry.before_hash) { throw "Backup checksum failed: $($entry.path)" }
        }
        if ($current -ceq $entry.after_hash) { $restore += $entry }
    }
    if ($DryRun) { @{ dry_run=$true; transaction_id=$TransactionId; restore=$restore } | ConvertTo-Json -Depth 10; return }
    foreach ($entry in $restore) {
        $path = Get-SafePath $root $entry.path
        if ((Get-FileHashOrNull $path) -cne $entry.after_hash) { throw "Concurrent edit in $($entry.path); recovery stopped." }
        if ($entry.before_hash) { Write-AtomicBytes $path ([IO.File]::ReadAllBytes((Join-Path $dir "$($entry.slot).before"))) }
        else { [IO.File]::Delete($path) }
    }
    $journal.state = 'rolled_back'
    Write-Journal $journalPath $journal
    @{ transaction_id=$TransactionId; restored_files=$restore.Count } | ConvertTo-Json
} finally { if ($null -ne $lock) { $lock.Dispose() } }
