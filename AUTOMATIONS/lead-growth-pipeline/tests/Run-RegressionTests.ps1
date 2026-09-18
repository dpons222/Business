#requires -Version 7.5
[CmdletBinding()]
param([switch]$KeepFixtures)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$scripts = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../scripts'))
Import-Module (Join-Path $scripts 'ProspectStore.psm1')
$testRoot = Join-Path ([IO.Path]::GetTempPath()) ('prospect-regression-' + [guid]::NewGuid().ToString('N'))
[IO.Directory]::CreateDirectory($testRoot) | Out-Null
$results = [Collections.Generic.List[object]]::new()
$evidence = Join-Path $PSScriptRoot 'fixtures/evidence.json'
$contact = Join-Path $PSScriptRoot 'fixtures/contact-verification.json'

function New-Fixture([string]$Schema = 'unquoted.csv') {
    $dir = Join-Path $testRoot ([guid]::NewGuid().ToString('N'))
    [IO.Directory]::CreateDirectory((Join-Path $dir 'marketing')) | Out-Null
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot "fixtures/$Schema") -Destination (Join-Path $dir 'marketing/prospect-tracker.csv')
    $dir
}
function Generate($Arguments) { & (Join-Path $scripts 'New-ProspectPackage.ps1') @Arguments | ConvertFrom-Json -AsHashtable -DateKind String }
function Validate($Dir, $Slug, $Stage = 'Structure') { & (Join-Path $scripts 'Test-ProspectPackage.ps1') -ExperimentPath $Dir -Slug $Slug -Stage $Stage | Out-Null }
function Assert($Condition, [string]$Message) { if (-not $Condition) { throw $Message } }
function Reject([scriptblock]$Action, [string]$Pattern) {
    $message = ''
    try { & $Action | Out-Null } catch { $message = $_.Exception.Message }
    Assert ($message -match $Pattern) "Expected rejection /$Pattern/; received '$message'."
}
function Snapshot($Dir) {
    @(Get-ChildItem -LiteralPath $Dir -Recurse -Force | Sort-Object FullName | ForEach-Object {
        [ordered]@{ path=[IO.Path]::GetRelativePath($Dir,$_.FullName); hash=$(if (-not $_.PSIsContainer) { Get-FileHashOrNull $_.FullName } else { 'directory' }) }
    }) | ConvertTo-Json -Depth 5 -Compress
}
function Run([string]$Name, [scriptblock]$Action) {
    try { & $Action; $results.Add(@{name=$Name; passed=$true}); Write-Host "PASS $Name" }
    catch { $results.Add(@{name=$Name; passed=$false; error=$_.Exception.Message; location=$_.ScriptStackTrace}); Write-Host "FAIL $Name : $($_.Exception.Message)" }
}
function Start-Worker([string]$Code, [string[]]$Arguments) {
    $path = Join-Path $testRoot ([guid]::NewGuid().ToString('N') + '.ps1')
    [IO.File]::WriteAllText($path, $Code)
    $start = [Diagnostics.ProcessStartInfo]::new((Join-Path $PSHOME $(if ($IsWindows) {'pwsh.exe'} else {'pwsh'})))
    $start.UseShellExecute=$false; $start.CreateNoWindow=$true; $start.WindowStyle='Hidden'
    foreach ($arg in @('-NoProfile','-File',$path) + $Arguments) { $start.ArgumentList.Add($arg) }
    [Diagnostics.Process]::Start($start)
}
function Wait-Marker($Process, $Path) {
    $timer = [Diagnostics.Stopwatch]::StartNew()
    while (-not [IO.File]::Exists($Path) -and -not $Process.HasExited -and $timer.Elapsed.TotalSeconds -lt 15) { Start-Sleep -Milliseconds 20 }
    Assert ([IO.File]::Exists($Path)) 'Worker did not reach the expected write boundary.'
}

Run 'Quoted headers, multiline fields, history, unknown columns, handwritten docs and identical reruns' {
    $dir = New-Fixture 'quoted-history.csv'
    $path = Join-Path $dir 'marketing/prospect-tracker.csv'
    $before = Read-Tracker $path
    $first = Generate @{ExperimentPath=$dir;BusinessName='Example Services';AdoptRow=1;ExpectedTrackerHash=(Get-FileHashOrNull $path)}
    $notes = Join-Path $dir 'prospects/example-services/recommendation.md'
    [IO.File]::AppendAllText($notes,"`nHuman recommendation — keep this exactly.`n")
    $snapshot = Snapshot $dir
    $again = Generate @{ExperimentPath=$dir;BusinessName='Example Services'}
    Assert ($again.changed_files -eq 0 -and (Snapshot $dir) -ceq $snapshot) 'Identical rerun wrote files.'
    Assert ($first.local_record_id -ceq $again.local_record_id) 'Identity changed.'
    $after = Read-Tracker $path
    foreach ($column in $before.headers) { Assert ($before.records[0][$column] -ceq $after.records[0][$column]) "Lost original $column" }
    Validate $dir 'example-services'
}
Run 'Omitted values preserve fields; empty string and ClearField are explicit clearing' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Website='https://alpha.invalid';CityState='North, IN'} | Out-Null
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';PrimaryRecommendation='A focused intake workflow'} | Out-Null
    $row=(Read-Tracker (Join-Path $dir 'marketing/prospect-tracker.csv')).records[0]
    Assert ($row.website -eq 'https://alpha.invalid' -and $row.city_state -eq 'North, IN') 'Omitted fields were cleared.'
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Slug='alpha';Website='';ClearField=@('city_state')} | Out-Null
    $row=(Read-Tracker (Join-Path $dir 'marketing/prospect-tracker.csv')).records[0]
    Assert ($row.website -ceq '' -and $row.city_state -ceq '') 'Explicit clear did not apply.'
}
Run 'Roofing aliases preserve original IDs and do not add conflicting columns' {
    $dir=New-Fixture 'roofing.csv'; $path=Join-Path $dir 'marketing/prospect-tracker.csv'
    Generate @{ExperimentPath=$dir;BusinessName='Sample Roofing';AdoptRow=1;ExpectedTrackerHash=(Get-FileHashOrNull $path);OutreachAngle='Clearer quote path';CurrentFlowReviewed='Services page';EvidencePath=$evidence} | Out-Null
    $csv=Read-Tracker $path
    Assert ($csv.records[0].id -ceq 'legacy-7' -and $csv.records[0].outreach_angle -ceq 'Clearer quote path') 'Alias or ID lost.'
    Assert ('business_name' -notin $csv.headers -and 'personalized_outreach_angle' -notin $csv.headers -and 'current_flow_reviewed' -notin $csv.headers) 'Duplicate alias columns added.'
}
Run 'Same-name businesses and same-domain branches require explicit distinct identity' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Shared';Slug='shared-north';Website='https://shared.invalid'} | Out-Null
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Shared';Slug='shared-south';Website='https://shared.invalid'} } 'Potential existing'
    Generate @{ExperimentPath=$dir;BusinessName='Shared';Slug='shared-south';Website='https://shared.invalid';NewRecord=$true} | Out-Null
    Generate @{ExperimentPath=$dir;BusinessName='Shared';Slug='shared-north';CityState='North'} | Out-Null
    $rows=(Read-Tracker (Join-Path $dir 'marketing/prospect-tracker.csv')).records
    Assert ($rows.Count -eq 2 -and $rows[0].local_record_id -cne $rows[1].local_record_id -and $rows[1]['city_state'] -ceq '') 'Branches merged or cross-updated.'
}
Run 'Different businesses with blank websites remain separate' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Website=''} | Out-Null
    Generate @{ExperimentPath=$dir;BusinessName='Beta';Website=''} | Out-Null
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';CityState='North'} | Out-Null
    Assert ((Read-Tracker (Join-Path $dir 'marketing/prospect-tracker.csv')).records.Count -eq 2) 'Blank websites merged.'
}
Run 'Name-derived slugs cannot silently replace a different location or colliding name' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';CityState='North'} | Out-Null
    $snapshot=Snapshot $dir
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';CityState='South'} } 'Identity fields differ'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha!'} } 'Identity fields differ'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Identity conflict changed files.'
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Slug='alpha';CityState='South'} | Out-Null
}
Run 'External tracker edits are preserved and reconciled before completeness validation' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';CityState='North'} | Out-Null
    $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $csv=Read-Tracker $path
    $csv.records[0]['city_state']='South'; $csv.records[0]['reply']='Please call in October'
    [IO.File]::WriteAllText($path,(ConvertTo-TrackerCsv $csv.headers $csv.records.ToArray()))
    Reject { Validate $dir 'alpha' } 'city_state mismatch'
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Slug='alpha'} | Out-Null
    Validate $dir 'alpha'
    Assert ((Read-Tracker $path).records[0].reply -ceq 'Please call in October') 'Reply was overwritten.'
}
Run 'Explicit evidence clearing is retained as an array without manufacturing verification' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$evidence} | Out-Null
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';ClearField=@('evidence')} | Out-Null
    $again=Generate @{ExperimentPath=$dir;BusinessName='Alpha'}
    Assert ($again.changed_files -eq 0) 'Empty evidence was not stable.'
    Reject { Validate $dir 'alpha' 'ResearchComplete' } 'source evidence'
}
Run 'Legacy adoption rejects stale inventory and unnamed or already owned rows' {
    $dir=New-Fixture 'roofing.csv'; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $snapshot=Snapshot $dir
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Sample Roofing';AdoptRow=1;ExpectedTrackerHash=('a'*64)} } 'current ExpectedTrackerHash'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Rejected adoption wrote files.'
    Generate @{ExperimentPath=$dir;BusinessName='Sample Roofing';AdoptRow=1;ExpectedTrackerHash=(Get-FileHashOrNull $path)} | Out-Null
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Sample Roofing';Slug='different';AdoptRow=1;ExpectedTrackerHash=(Get-FileHashOrNull $path)} } 'already has package identity'
}
Run 'Legacy adoption imports existing structured evidence and verification unchanged' {
    $dir=New-Fixture; $path=Join-Path $dir 'marketing/prospect-tracker.csv'
    $row=[ordered]@{business_name='Research Company';status='researched';observed_issue='General contact path.';contact_method='team@example.invalid';evidence=[IO.File]::ReadAllText($evidence);contact_verification=[IO.File]::ReadAllText($contact)}
    [IO.File]::WriteAllText($path,(ConvertTo-TrackerCsv @($row.Keys) @($row)))
    Generate @{ExperimentPath=$dir;BusinessName='Research Company';AdoptRow=1;ExpectedTrackerHash=(Get-FileHashOrNull $path)} | Out-Null
    Validate $dir 'research-company' 'ResearchComplete'
    $after=(Read-Tracker $path).records[0]
    Assert ($after.evidence -ceq $row.evidence -and $after.contact_verification -ceq $row.contact_verification) 'Adoption altered verified research.'
}
Run 'Dry-run contains before/after diff and creates no files or directories' {
    $dir=New-Fixture; $snapshot=Snapshot $dir
    $result=Generate @{ExperimentPath=$dir;BusinessName='Alpha';DryRun=$true}
    Assert ($result.changes.Count -eq 8 -and $result.changes[-1].after -match 'local_record_id') 'Missing review diff.'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Dry-run changed the filesystem.'
}
Run 'Traversal, reserved names, absolute slugs and missing experiments cannot write' {
    $dir=New-Fixture; $snapshot=Snapshot $dir
    foreach ($slug in @('../escape','..\escape','/outside','C:\outside','CON','con','a:b','alpha/other','')) {
        Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';Slug=$slug} } 'Invalid prospect slug'
    }
    Reject { Generate @{ExperimentPath=(Join-Path $dir 'missing');BusinessName='Alpha';DryRun=$true} } 'does not exist'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Invalid path changed files.'
}
Run 'Junction path escape is rejected before writes' {
    if (-not $IsWindows) { throw 'This Windows acceptance fixture requires a junction-capable platform.' }
    $dir=New-Fixture; $outside=New-Fixture
    New-Item -ItemType Junction -Path (Join-Path $dir 'prospects') -Target $outside | Out-Null
    $snapshot=Snapshot $outside
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha'} } 'Links/junctions'
    Assert ((Snapshot $outside) -ceq $snapshot) 'Wrote through junction.'
    [IO.Directory]::Delete((Join-Path $dir 'prospects'))
}
Run 'Reviewed regeneration preserves a backup and rejects stale review hashes' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha'} | Out-Null
    $notes=Join-Path $dir 'prospects/alpha/recommendation.md'; [IO.File]::AppendAllText($notes,"`nHuman text`n")
    $old=[IO.File]::ReadAllText($notes); $snapshot=Snapshot $dir
    $generation=@{ExperimentPath=$dir;BusinessName='Alpha';Regenerate=$true;PrimaryRecommendation='New proposal'}
    Reject { Generate $generation } 'ReviewHash'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Unreviewed regeneration wrote files.'
    $diff=Generate ($generation + @{DryRun=$true})
    [IO.File]::AppendAllText($notes,"`nLater edit`n")
    Reject { Generate ($generation + @{ReviewHash=$diff.review_hash}) } 'ReviewHash'
    [IO.File]::WriteAllText($notes,$old)
    $result=Generate ($generation + @{ReviewHash=$diff.review_hash})
    $journal=Get-Content -LiteralPath (Join-Path $dir ".prospect-package/transactions/$($result.transaction_id)/transaction.json") -Raw | ConvertFrom-Json -AsHashtable -DateKind String
    $entry=@($journal.entries | Where-Object path -eq 'prospects/alpha/recommendation.md')[0]
    $backup=Join-Path $dir ".prospect-package/transactions/$($result.transaction_id)/$($entry.slot).before"
    Assert ([IO.File]::ReadAllText($backup) -ceq $old) 'Original document backup missing.'
}
Run 'Structural scaffolds do not claim research or contact verification' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha'} | Out-Null
    Validate $dir 'alpha'
    Reject { Validate $dir 'alpha' 'ResearchComplete' } 'source evidence'
    $row=(Read-Tracker (Join-Path $dir 'marketing/prospect-tracker.csv')).records[0]
    Assert (-not $row.Contains('current_flow_reviewed') -and -not $row.Contains('contact_verification')) 'Unsupported verification assertion.'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';CurrentFlowReviewed='Reviewed journey'} } 'requires explicit source'
}
Run 'Research-only dossier passes without optional recommendations or outreach' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$evidence;ObservedIssue='Services page has a general contact path.';Status='researched'} | Out-Null
    [IO.File]::Delete((Join-Path $dir 'prospects/alpha/outreach-email.md'))
    [IO.File]::Delete((Join-Path $dir 'prospects/alpha/client-summary.md'))
    Validate $dir 'alpha' 'ResearchComplete'
    Reject { Validate $dir 'alpha' 'OutreachReady' } 'primary_recommendation'
}
Run 'Empty and heading-only research documents cannot pass completeness' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$evidence;ObservedIssue='General contact path.';Status='researched'} | Out-Null
    $notes=Join-Path $dir 'prospects/alpha/recommendation.md'
    [IO.File]::WriteAllText($notes,'')
    Reject { Validate $dir 'alpha' 'ResearchComplete' } 'Empty document'
    [IO.File]::WriteAllText($notes,'# Only a heading')
    Reject { Validate $dir 'alpha' 'ResearchComplete' } 'incomplete'
}
Run 'Broken local references and duplicate IDs are rejected' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha'} | Out-Null
    $notes=Join-Path $dir 'prospects/alpha/recommendation.md'; $old=[IO.File]::ReadAllText($notes)
    [IO.File]::AppendAllText($notes,"`n[Missing source](missing.md)")
    Reject { Validate $dir 'alpha' } 'Broken reference'
    [IO.File]::WriteAllText($notes,$old)
    $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $csv=Read-Tracker $path
    [IO.File]::WriteAllText($path,(ConvertTo-TrackerCsv $csv.headers @($csv.records[0],$csv.records[0])))
    Reject { Validate $dir 'alpha' } 'Duplicate local_record_id'
}
Run 'Unsupported source URLs and future timestamps are rejected' {
    $dir=New-Fixture; $bad=Join-Path $dir 'bad-evidence.json'
    [IO.File]::WriteAllText($bad,'[{"source_url":"file:///private","observed_at":"2026-01-01T00:00:00Z","observation":"Example observation"}]')
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$bad} } 'Invalid source URL'
    [IO.File]::WriteAllText($bad,'[{"source_url":"https://example.invalid","observed_at":"2999-01-01T00:00:00Z","observation":"Example observation"}]')
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$bad} } 'timestamp'
}
Run 'Outreach readiness requires verification and resolved exact draft content' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$evidence;ObservedIssue='General contact path.';PrimaryRecommendation='Focused intake';RecommendedSolution='Add a clear intake form';OutreachAngle='Clearer inquiries';ContactMethod='team@example.invalid';DemoOrRecommendationUrl='https://example.invalid/preview';Status='email_drafted'} | Out-Null
    Reject { Validate $dir 'alpha' 'OutreachReady' } 'explicit contact verification'
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';ContactVerificationPath=$contact} | Out-Null
    Reject { Validate $dir 'alpha' 'OutreachReady' } 'Unresolved'
    $outreach=Join-Path $dir 'prospects/alpha/outreach-email.md'
    [IO.File]::WriteAllText($outreach,"# Draft only`n`nSubject: A clearer intake path`n`nHello Alpha team, a focused intake form may help visitors describe their request. Would a short outline be useful?`n`nDiego`n")
    Validate $dir 'alpha' 'OutreachReady'
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';Status='ready_for_review'} | Out-Null
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';ContactMethod='other@example.invalid'} } 'does not match'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';Status='sent'} } 'separately reviewed'
}
Run 'Backward transitions and tampered history cannot validate' {
    $dir=New-Fixture
    Generate @{ExperimentPath=$dir;BusinessName='Alpha';EvidencePath=$evidence;ObservedIssue='General contact path.';Status='diagnosed'} | Out-Null
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha';Status='sourced'} } 'backward status'
    $path=Join-Path $dir 'prospects/alpha/research.json'; $record=Get-Content -LiteralPath $path -Raw | ConvertFrom-Json -AsHashtable -DateKind String
    $record.status_history[-1].from='qualified'
    [IO.File]::WriteAllText($path,($record|ConvertTo-Json -Depth 20))
    Reject { Validate $dir 'alpha' } 'Broken status history'
}
Run 'Recovery inventory accounts for unnamed records without inventing values' {
    $dir=New-Fixture 'malformed-roofing.csv'; $snapshot=Snapshot $dir
    $report=& (Join-Path $scripts 'Get-ProspectRecoveryReport.ps1') -ExperimentPath $dir | ConvertFrom-Json -AsHashtable -DateKind String
    Assert ($report.trackers[0].parsed_rows -eq 2 -and $report.trackers[0].unnamed_rows -eq 1) 'Incorrect inventory counts.'
    Assert ($report.trackers[0].rows[1].reasons -contains 'unresolved_business_identity') 'Unnamed row not quarantined.'
    Assert ((Snapshot $dir) -ceq $snapshot) 'Report changed inputs.'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha'} } 'schema needs recovery'
}
Run 'Reviewed header-only repair preserves every cell, order, original bytes and unresolved rows' {
    $dir=New-Fixture 'malformed-roofing.csv'; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $hash=Get-FileHashOrNull $path
    $before=Read-Tracker $path -Inventory; $snapshot=Snapshot $dir
    & (Join-Path $scripts 'Repair-ProspectTrackerHeader.ps1') -ExperimentPath $dir -ExpectedTrackerHash $hash -DryRun | Out-Null
    Assert ((Snapshot $dir) -ceq $snapshot) 'Repair dry-run wrote files.'
    $result=& (Join-Path $scripts 'Repair-ProspectTrackerHeader.ps1') -ExperimentPath $dir -ExpectedTrackerHash $hash | ConvertFrom-Json -AsHashtable -DateKind String
    $after=Read-Tracker $path
    Assert (($before.rows|ConvertTo-Json -Depth 8 -Compress) -ceq ($after.rows|ConvertTo-Json -Depth 8 -Compress)) 'Repair changed cells or order.'
    Assert ((Get-FileHashOrNull (Join-Path $dir ".prospect-package/transactions/$($result.transaction_id)/0.before")) -ceq $hash) 'Original bytes not backed up.'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Unidentified Company';AdoptRow=2;ExpectedTrackerHash=(Get-FileHashOrNull $path)} } 'Unnamed rows'
    Reject { & (Join-Path $scripts 'Repair-ProspectTrackerHeader.ps1') -ExperimentPath $dir -ExpectedTrackerHash $hash } 'differs'
}
Run 'Malformed quoting, mismatched widths and duplicate named headers stop automatic repair' {
    foreach ($text in @("business_name,status`nAlpha,sourced,extra`n", "business_name,business_name`nAlpha,Beta`n", "business_name,status`n`"unclosed,sourced`n")) {
        $dir=New-Fixture; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; [IO.File]::WriteAllText($path,$text)
        $snapshot=Snapshot $dir
        Reject { & (Join-Path $scripts 'Repair-ProspectTrackerHeader.ps1') -ExperimentPath $dir -ExpectedTrackerHash (Get-FileHashOrNull $path) } 'manual'
        Assert ((Snapshot $dir) -ceq $snapshot) 'Ambiguous repair changed files.'
    }
}
Run 'Concurrent process lock fails fast and leaves tracker untouched' {
    $dir=New-Fixture; $marker=Join-Path $testRoot 'lock.ready'; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $hash=Get-FileHashOrNull $path
    $worker=Start-Worker 'param($Module,$Root,$Marker); Import-Module $Module; $lock=Open-ProspectLock $Root; try { [IO.File]::WriteAllText($Marker,"ready"); Start-Sleep -Seconds 30 } finally { $lock.Dispose() }' @((Join-Path $scripts 'ProspectStore.psm1'),$dir,$marker)
    try { Wait-Marker $worker $marker; Reject { Generate @{ExperimentPath=$dir;BusinessName='Alpha'} } 'Another prospect/tracker write'; Assert ((Get-FileHashOrNull $path) -ceq $hash) 'Concurrent writer changed tracker.' }
    finally { if (-not $worker.HasExited) { $worker.Kill(); $worker.WaitForExit() }; $worker.Dispose() }
    Generate @{ExperimentPath=$dir;BusinessName='Alpha'} | Out-Null
}
Run 'Optimistic hash checks reject edits made after planning' {
    $dir=New-Fixture; $relative='marketing/prospect-tracker.csv'; $path=Join-Path $dir $relative; $hash=Get-FileHashOrNull $path
    $change=New-FileChange $dir $relative "business_name,status`nAlpha,sourced`n"
    [IO.File]::AppendAllText($path,"Human,sourced`n")
    $current=Get-FileHashOrNull $path
    Reject { Invoke-ProspectTransaction $dir @($change) @{ $relative=$hash } } 'Input changed'
    Assert ((Get-FileHashOrNull $path) -ceq $current) 'Later edit overwritten.'
}
Run 'Completed transactions roll back exactly and refuse later edits' {
    $dir=New-Fixture; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $hash=Get-FileHashOrNull $path
    $first=Generate @{ExperimentPath=$dir;BusinessName='Alpha'}
    [IO.File]::AppendAllText($path,"`n")
    Reject { & (Join-Path $scripts 'Restore-ProspectTransaction.ps1') -ExperimentPath $dir -TransactionId $first.transaction_id } 'Later edit'
    $journal=Get-Content -LiteralPath (Join-Path $dir ".prospect-package/transactions/$($first.transaction_id)/transaction.json") -Raw | ConvertFrom-Json -AsHashtable -DateKind String
    $entry=@($journal.entries | Where-Object path -eq 'marketing/prospect-tracker.csv')[0]
    [IO.File]::WriteAllBytes($path,[IO.File]::ReadAllBytes((Join-Path $dir ".prospect-package/transactions/$($first.transaction_id)/$($entry.slot).after")))
    & (Join-Path $scripts 'Restore-ProspectTransaction.ps1') -ExperimentPath $dir -TransactionId $first.transaction_id | Out-Null
    Assert ((Get-FileHashOrNull $path) -ceq $hash) 'Tracker bytes were not restored.'
    Assert (-not [IO.File]::Exists((Join-Path $dir 'prospects/alpha/research.json'))) 'New package file survived rollback.'
}
Run 'Interrupted multi-file transaction blocks new writes and restores applied files' {
    $dir=New-Fixture; $path=Join-Path $dir 'marketing/prospect-tracker.csv'; $before=Get-FileHashOrNull $path
    $marker=Join-Path $testRoot 'interrupted.ready'; $id=[guid]::NewGuid().ToString()
    $code=@'
param($Module,$Root,$Marker,$Id)
Import-Module $Module
$lock=Open-ProspectLock $Root
$path=Join-Path $Root 'marketing/prospect-tracker.csv'
$dir=Join-Path $Root ".prospect-package/transactions/$Id"
[IO.Directory]::CreateDirectory($dir) | Out-Null
$after="business_name,status`r`nAlpha,sourced`r`n"
$beforeHash=Get-FileHashOrNull $path
Write-DurableBytes (Join-Path $dir '0.before') ([IO.File]::ReadAllBytes($path))
Write-DurableBytes (Join-Path $dir '0.after') ([Text.Encoding]::UTF8.GetBytes($after))
$journal=@{schema_version=1;id=$Id;state='prepared';entries=@(@{path='marketing/prospect-tracker.csv';slot=0;before_hash=$beforeHash;after_hash=(Get-TextHash $after)},@{path='prospects/alpha/research.json';slot=1;before_hash=$null;after_hash=(Get-TextHash '{}')})}
Write-Journal (Join-Path $dir 'transaction.json') $journal
Write-AtomicBytes $path ([Text.Encoding]::UTF8.GetBytes($after))
[IO.File]::WriteAllText($Marker,'ready')
Start-Sleep -Seconds 30
'@
    $worker=Start-Worker $code @((Join-Path $scripts 'ProspectStore.psm1'),$dir,$marker,$id)
    try { Wait-Marker $worker $marker; $worker.Kill(); $worker.WaitForExit() } finally { if (-not $worker.HasExited) { $worker.Kill() }; $worker.Dispose() }
    Assert ((Read-Tracker $path).records.Count -eq 1) 'Interrupted tracker was partial.'
    Reject { Generate @{ExperimentPath=$dir;BusinessName='Beta'} } 'Unfinished transaction'
    & (Join-Path $scripts 'Restore-ProspectTransaction.ps1') -ExperimentPath $dir -TransactionId $id | Out-Null
    Assert ((Get-FileHashOrNull $path) -ceq $before) 'Interrupted transaction did not restore original tracker.'
}

$failed=@($results | Where-Object { -not $_.passed })
[ordered]@{passed=$results.Count-$failed.Count;failed=$failed.Count;results=$results.ToArray();fixture_root=$testRoot} | ConvertTo-Json -Depth 8
if ($failed.Count -or $KeepFixtures) { Write-Host "Fixtures retained: $testRoot" }
else {
    $resolved=[IO.Path]::GetFullPath($testRoot)
    $tempBase=[IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd([IO.Path]::DirectorySeparatorChar)
    if (-not $resolved.StartsWith($tempBase+[IO.Path]::DirectorySeparatorChar) -or [IO.Path]::GetFileName($resolved) -notlike 'prospect-regression-*') { throw 'Unsafe fixture cleanup path.' }
    Remove-Item -LiteralPath $resolved -Recurse -Force
}
if ($failed.Count) { exit 1 }
