#requires -Version 7.5
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-TextHash([string]$Text) {
    [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($Text))).ToLowerInvariant()
}

function Get-FileHashOrNull([string]$Path) {
    if ([IO.File]::Exists($Path)) { (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant() }
    else { $null }
}

function Assert-NoLink([string]$Path) {
    $current = $Path
    while ($current) {
        $item = Get-Item -LiteralPath $current -Force -ErrorAction SilentlyContinue
        if ($item -and ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
            throw "Links/junctions are not supported in package paths: $current"
        }
        $current = [IO.Path]::GetDirectoryName($current)
    }
}

function Get-ExperimentRoot([string]$Path) {
    $full = [IO.Path]::GetFullPath($Path)
    if (-not [IO.Directory]::Exists($full)) { throw "Experiment directory does not exist: $full" }
    Assert-NoLink $full
    $full.TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
}

function Get-SafePath([string]$Root, [string]$Relative) {
    if ([IO.Path]::IsPathRooted($Relative) -or $Relative -match '[:\x00-\x1f]') { throw "Invalid relative path: $Relative" }
    $full = [IO.Path]::GetFullPath([IO.Path]::Combine($Root, $Relative))
    $comparison = if ($IsWindows) { [StringComparison]::OrdinalIgnoreCase } else { [StringComparison]::Ordinal }
    if (-not $full.StartsWith($Root + [IO.Path]::DirectorySeparatorChar, $comparison)) { throw "Path leaves experiment: $Relative" }
    Assert-NoLink $full
    $full
}

function Assert-ProspectSlug([string]$Slug) {
    if ($Slug -cnotmatch '^[a-z0-9]+(?:-[a-z0-9]+)*$' -or $Slug.Length -gt 100 -or
        $Slug -match '^(con|prn|aux|nul|com[0-9]|lpt[0-9])$') { throw "Invalid prospect slug: $Slug" }
}

function Read-Tracker([string]$Path, [switch]$Inventory) {
    if (-not [IO.File]::Exists($Path)) { throw "Tracker missing: $Path" }
    $parser = [Microsoft.VisualBasic.FileIO.TextFieldParser]::new($Path, [Text.UTF8Encoding]::new($false, $true), $true)
    $parser.SetDelimiters(',')
    $parser.HasFieldsEnclosedInQuotes = $true
    $parser.TrimWhiteSpace = $false
    $rows = [Collections.Generic.List[object]]::new()
    $errors = [Collections.Generic.List[object]]::new()
    try {
        if ($parser.EndOfData) { throw 'Tracker has no header.' }
        $headers = $parser.ReadFields()
        while (-not $parser.EndOfData) {
            $line = $parser.LineNumber
            try { $cells = $parser.ReadFields(); $rows.Add(@{ cells = $cells; line = $line }) }
            catch [Microsoft.VisualBasic.FileIO.MalformedLineException] {
                if (-not $Inventory) { throw }
                $errors.Add(@{ line = $parser.ErrorLineNumber; raw = $parser.ErrorLine; error = $_.Exception.Message })
            }
        }
    } finally { $parser.Dispose() }
    $headerIssues = @()
    if (@($headers | Where-Object { [string]::IsNullOrWhiteSpace($_) }).Count) { $headerIssues += 'Blank header(s)' }
    if (@($headers | Group-Object | Where-Object Count -gt 1).Count) { $headerIssues += 'Duplicate header(s)' }
    if (@($headers | Where-Object { $_ -ne $_.Trim() }).Count) { $headerIssues += 'Header whitespace' }
    $widthIssues = @($rows | Where-Object { $_.cells.Count -ne $headers.Count })
    if (-not $Inventory -and ($headerIssues.Count -or $widthIssues.Count)) {
        throw 'Tracker schema needs recovery review (blank/duplicate headers or mismatched row widths). Run Get-ProspectRecoveryReport.ps1.'
    }
    $records = [Collections.Generic.List[object]]::new()
    if (-not $headerIssues.Count -and -not $widthIssues.Count) {
        foreach ($row in $rows) {
            $record = [ordered]@{}
            for ($i = 0; $i -lt $headers.Count; $i++) { $record[$headers[$i]] = $row.cells[$i] }
            $records.Add($record)
        }
    }
    @{ headers = $headers; rows = $rows; records = $records; header_issues = $headerIssues; errors = $errors }
}

function ConvertTo-TrackerCsv([string[]]$Headers, [object[]]$Records) {
    $lines = [Collections.Generic.List[string]]::new()
    $lines.Add((($Headers | ForEach-Object { '"' + $_.Replace('"', '""') + '"' }) -join ','))
    foreach ($record in $Records) {
        $values = foreach ($header in $Headers) {
            $value = if ($record.Contains($header)) { [string]$record[$header] } else { '' }
            '"' + $value.Replace('"', '""') + '"'
        }
        $lines.Add(($values -join ','))
    }
    ($lines -join "`r`n") + "`r`n"
}

function Get-ColumnName([string[]]$Headers, [string]$Field) {
    $aliases = @{
        business_name = @('business_name', 'business')
        service_focus = @('service_focus', 'practice_focus', 'cuisine_or_concept', 'niche_or_service_focus')
        current_flow_reviewed = @('current_flow_reviewed', 'page_reviewed')
        personalized_outreach_angle = @('personalized_outreach_angle', 'outreach_angle')
    }
    $options = if ($aliases.ContainsKey($Field)) { $aliases[$Field] } else { @($Field) }
    $matches = @($Headers | Where-Object { $_ -in $options })
    if ($matches.Count -gt 1) { throw "Ambiguous columns for ${Field}: $($matches -join ', ')" }
    if ($matches.Count) { $matches[0] } else { $Field }
}

function Assert-TrackerIdentity($Tracker) {
    foreach ($column in @('local_record_id', 'prospect_slug')) {
        $values = @($Tracker.records | Where-Object { $_.Contains($column) -and $_[$column] } | ForEach-Object { $_[$column] })
        if (@($values | Group-Object | Where-Object Count -gt 1).Count) { throw "Duplicate $column in tracker." }
        foreach ($value in $values) {
            if ($column -eq 'prospect_slug') { Assert-ProspectSlug $value }
            elseif ($value -cnotmatch '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$') { throw 'Invalid local_record_id.' }
        }
    }
}

function Write-DurableBytes([string]$Path, [byte[]]$Bytes) {
    $stream = [IO.FileStream]::new($Path, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
    try { $stream.Write($Bytes, 0, $Bytes.Length); $stream.Flush($true) } finally { $stream.Dispose() }
}

function Write-AtomicBytes([string]$Path, [byte[]]$Bytes) {
    $temp = Join-Path ([IO.Path]::GetDirectoryName($Path)) ('.package-' + [guid]::NewGuid().ToString('N') + '.tmp')
    try {
        Write-DurableBytes $temp $Bytes
        # Same-directory rename: readers see the complete old file or complete new file.
        [IO.File]::Move($temp, $Path, $true)
    } finally { if ([IO.File]::Exists($temp)) { [IO.File]::Delete($temp) } }
}

function Write-Journal([string]$Path, $Journal) {
    Write-AtomicBytes $Path ([Text.Encoding]::UTF8.GetBytes(($Journal | ConvertTo-Json -Depth 30)))
}

function Assert-NoPendingTransaction([string]$Root) {
    $dir = Get-SafePath $Root '.prospect-package/transactions'
    if ([IO.Directory]::Exists($dir)) {
        foreach ($journalPath in [IO.Directory]::GetFiles($dir, 'transaction.json', [IO.SearchOption]::AllDirectories)) {
            Assert-NoLink $journalPath
            $journal = Get-Content -LiteralPath $journalPath -Raw | ConvertFrom-Json -AsHashtable -DateKind String
            if ($journal.state -notin @('complete', 'rolled_back')) {
                throw "Unfinished transaction $($journal.id). Use Restore-ProspectTransaction.ps1 before writing."
            }
        }
    }
}

function Open-ProspectLock([string]$Root) {
    $path = Get-SafePath $Root '.prospect-package/write.lock'
    [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($path)) | Out-Null
    try { [IO.FileStream]::new($path, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None) }
    catch { throw 'Another prospect/tracker write is running. Retry when it finishes.' }
}

function New-FileChange([string]$Root, [string]$Relative, [string]$After) {
    $path = Get-SafePath $Root $Relative
    if ([IO.Directory]::Exists($path)) { throw "Expected a file, found directory: $Relative" }
    $before = if ([IO.File]::Exists($path)) { [IO.File]::ReadAllText($path) } else { $null }
    if ($before -ceq $After) { return }
    @{ path = $Relative; before_hash = Get-FileHashOrNull $path; after_hash = Get-TextHash $After; before = $before; after = $After }
}

function Invoke-ProspectTransaction([string]$Root, [object[]]$Changes, [System.Collections.IDictionary]$ReadHashes) {
    if (-not $Changes.Count) { return }
    $lock = Open-ProspectLock $Root
    try {
        Assert-NoPendingTransaction $Root
        foreach ($entry in $ReadHashes.GetEnumerator()) {
            $path = Get-SafePath $Root $entry.Key
            if ((Get-FileHashOrNull $path) -cne $entry.Value) { throw "Input changed while preparing update: $($entry.Key). Rerun." }
        }
        # Verify all destinations before preserving or changing any data.
        foreach ($change in $Changes) {
            $path = Get-SafePath $Root $change.path
            if ([IO.Directory]::Exists($path) -or (Get-FileHashOrNull $path) -cne $change.before_hash) { throw "Destination changed: $($change.path)" }
        }
        $id = [guid]::NewGuid().ToString()
        $dir = Get-SafePath $Root ".prospect-package/transactions/$id"
        [IO.Directory]::CreateDirectory($dir) | Out-Null
        $journal = @{ schema_version = 1; id = $id; state = 'preparing'; created_at = [DateTimeOffset]::UtcNow.ToString('o'); entries = @() }
        $journalPath = Join-Path $dir 'transaction.json'
        Write-Journal $journalPath $journal
        for ($i = 0; $i -lt $Changes.Count; $i++) {
            $change = $Changes[$i]
            $path = Get-SafePath $Root $change.path
            if ($null -ne $change.before_hash) { Write-DurableBytes (Join-Path $dir "$i.before") ([IO.File]::ReadAllBytes($path)) }
            Write-DurableBytes (Join-Path $dir "$i.after") ([Text.Encoding]::UTF8.GetBytes($change.after))
            $journal.entries += @{ path = $change.path; before_hash = $change.before_hash; after_hash = $change.after_hash; slot = $i }
        }
        $journal.state = 'prepared'
        Write-Journal $journalPath $journal
        foreach ($entry in $journal.entries) {
            $path = Get-SafePath $Root $entry.path
            if ((Get-FileHashOrNull $path) -cne $entry.before_hash) { throw "Concurrent edit to $($entry.path). Transaction $id needs recovery." }
            [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($path)) | Out-Null
            Write-AtomicBytes $path ([IO.File]::ReadAllBytes((Join-Path $dir "$($entry.slot).after")))
        }
        $journal.state = 'complete'
        Write-Journal $journalPath $journal
        $id
    } finally { $lock.Dispose() }
}

Export-ModuleMember -Function *
