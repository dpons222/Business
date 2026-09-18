#requires -Version 7.5
[CmdletBinding()]
param([string]$SkillPath = (Join-Path $env:USERPROFILE '.codex/skills/lead-growth-pipeline'), [switch]$Check)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
$root = Get-ExperimentRoot $SkillPath
$skill = Get-SafePath $root 'SKILL.md'
if (-not [IO.File]::Exists($skill) -or [IO.File]::ReadAllText($skill) -notmatch '(?m)^name: lead-growth-pipeline\s*$') { throw 'Destination is not an installed lead-growth-pipeline skill.' }
$files = @('New-ProspectPackage.ps1','Test-ProspectPackage.ps1','ProspectStore.psm1','ProspectValidation.psm1',
    'Get-ProspectRecoveryReport.ps1','Repair-ProspectTrackerHeader.ps1','Restore-ProspectTransaction.ps1')
$differences = @()
$changes = [Collections.Generic.List[object]]::new()
$readHashes = [ordered]@{}
foreach ($file in $files) {
    $relative = "scripts/$file"
    $source = Join-Path $PSScriptRoot $file
    $destination = Get-SafePath $root $relative
    $readHashes[$relative] = Get-FileHashOrNull $destination
    if ($readHashes[$relative] -cne (Get-FileHashOrNull $source)) {
        $differences += $file
        $change = New-FileChange $root $relative ([IO.File]::ReadAllText($source))
        if ($change) { $changes.Add($change) }
    }
}
if ($Check) {
    if ($differences.Count) { throw "Installed pipeline scripts differ: $($differences -join ', '). Review and run this script without -Check to preserve backups and synchronize." }
    Write-Output 'Installed pipeline scripts match repository source (7 files).'
} else {
    $transaction = Invoke-ProspectTransaction $root $changes.ToArray() $readHashes
    @{ synchronized=$differences; transaction_id=$transaction; source=$PSScriptRoot; destination=$root } | ConvertTo-Json -Depth 10
}
