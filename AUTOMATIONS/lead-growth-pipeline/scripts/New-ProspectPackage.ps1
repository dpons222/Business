#requires -Version 7.5
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$ExperimentPath,
    [Parameter(Mandatory)][string]$BusinessName,
    [string]$Slug,
    [AllowEmptyString()][string]$Website,
    [AllowEmptyString()][string]$CityState,
    [AllowEmptyString()][string]$ServiceFocus,
    [AllowEmptyString()][string]$RecommendationCategory,
    [AllowEmptyString()][string]$PrimaryRecommendation,
    [AllowEmptyString()][string]$SecondaryRecommendations,
    [AllowEmptyString()][string]$FutureOpportunities,
    [AllowEmptyString()][string]$ObservedIssue,
    [AllowEmptyString()][string]$RecommendedSolution,
    [AllowEmptyString()][string]$OutreachAngle,
    [AllowEmptyString()][string]$ContactMethod,
    [AllowEmptyString()][string]$BrandPaletteSource,
    [AllowEmptyString()][string]$DemoOrRecommendationUrl,
    [AllowEmptyString()][string]$CurrentFlowReviewed,
    [AllowEmptyString()][string]$Assumptions,
    [string]$Status,
    [string]$EvidencePath,
    [string]$ContactVerificationPath,
    [string[]]$ClearField = @(),
    [ValidateRange(1,2147483647)][int]$AdoptRow,
    [string]$ExpectedTrackerHash,
    [switch]$NewRecord,
    [switch]$Regenerate,
    [string]$ReviewHash,
    [switch]$DryRun
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')
Import-Module (Join-Path $PSScriptRoot 'ProspectValidation.psm1')

$root = Get-ExperimentRoot $ExperimentPath
Assert-Meaningful $BusinessName 'business name'
if (-not $PSBoundParameters.ContainsKey('Slug')) { $Slug = ($BusinessName.ToLowerInvariant() -replace '[^a-z0-9]+','-').Trim('-') }
Assert-ProspectSlug $Slug
$recordRelative = "prospects/$Slug/research.json"
$trackerRelative = 'marketing/prospect-tracker.csv'
$trackerPath = Get-SafePath $root $trackerRelative
$recordPath = Get-SafePath $root $recordRelative
$documentPaths = @("prospects/$Slug/README.md", "prospects/$Slug/recommendation.md", "prospects/$Slug/client-summary.md",
    "prospects/$Slug/outreach-email.md", "prospects/$Slug/campaign-tracking-strategy.md", "product/personalized-demos/$Slug-recommendation.md")
foreach ($relative in @($documentPaths) + @($recordRelative, $trackerRelative, '.prospect-package/write.lock')) {
    $path = Get-SafePath $root $relative
    if ([IO.Directory]::Exists($path)) { throw "Expected a file: $relative" }
}
Assert-NoPendingTransaction $root
$readHashes = [ordered]@{}
foreach ($relative in @($documentPaths) + @($recordRelative, $trackerRelative)) { $readHashes[$relative] = Get-FileHashOrNull (Get-SafePath $root $relative) }
$tracker = Read-Tracker $trackerPath
Assert-TrackerIdentity $tracker
$nameColumn = Get-ColumnName $tracker.headers 'business_name'
if ($nameColumn -notin $tracker.headers) { throw 'Tracker needs a business or business_name column.' }
$beforeLogicalCsv = ConvertTo-TrackerCsv $tracker.headers @($tracker.records.ToArray())
$headers = [Collections.Generic.List[string]]::new()
$headers.AddRange([string[]]$tracker.headers)
$record = $null
$target = $null
if ([IO.File]::Exists($recordPath)) {
    if ($AdoptRow -or $NewRecord) { throw 'Existing package identity cannot be replaced using AdoptRow/NewRecord.' }
    $record = Get-Content -LiteralPath $recordPath -Raw | ConvertFrom-Json -AsHashtable -DateKind String
    Assert-ResearchRecord $record
    if ($record.prospect_slug -cne $Slug) { throw 'Package slug disagrees with its research record.' }
    if (-not $PSBoundParameters.ContainsKey('Slug')) {
        foreach ($identityField in @(@('BusinessName','business_name'), @('Website','website'), @('CityState','city_state'))) {
            if ($PSBoundParameters.ContainsKey($identityField[0]) -and $record.fields.Contains($identityField[1]) -and
                $record.fields[$identityField[1]] -and $PSBoundParameters[$identityField[0]] -cne $record.fields[$identityField[1]]) {
                throw 'Identity fields differ from the name-derived package. Supply its explicit Slug to update that record, or a distinct Slug and NewRecord for another business/location.'
            }
        }
    }
    $matches = @($tracker.records | Where-Object { $_.Contains('local_record_id') -and $_['local_record_id'] -ceq $record.local_record_id })
    if ($matches.Count -ne 1) { throw 'Package ID must resolve to exactly one tracker row; review before updating.' }
    $target = $matches[0]
    if (-not $target.Contains('prospect_slug') -or $target['prospect_slug'] -cne $Slug) { throw 'Tracker/package slug mismatch.' }
    if ($target.Contains('status') -and $target['status'] -cne $record.fields.status) {
        Assert-StateTransition $record.fields.status $target['status']
        $record.status_history += @{ from = $record.fields.status; to = $target['status']; at = [DateTimeOffset]::UtcNow.ToString('o'); kind = 'tracker_import' }
        $record.fields.status = $target['status']
    }
    # Import external tracker edits to known fields instead of keeping a stale research snapshot.
    foreach ($field in @('website','city_state','service_focus','recommendation_category','primary_recommendation',
        'secondary_recommendations','future_opportunities','observed_issue','recommended_solution','personalized_outreach_angle',
        'contact_method','brand_palette_source','demo_or_recommendation_url','current_flow_reviewed','assumptions','evidence','contact_verification')) {
        $column = Get-ColumnName $tracker.headers $field
        if ($target.Contains($column) -and ($record.fields.Contains($field) -or $target[$column])) {
            if ($field -in @('evidence','contact_verification')) {
                if (-not $target[$column]) { throw "Structured tracker field $column must contain valid JSON; clear it through the generator." }
                $record.fields[$field] = $target[$column] | ConvertFrom-Json -AsHashtable -DateKind String -NoEnumerate
            } else { $record.fields[$field] = $target[$column] }
        }
    }
} else {
    if ($Regenerate -and @($documentPaths | Where-Object { $null -ne $readHashes[$_] }).Count) { throw 'Adopt/create the stable package identity first, then review regeneration in a separate run.' }
    $slugMatches = @($tracker.records | Where-Object { $_.Contains('prospect_slug') -and $_['prospect_slug'] -ceq $Slug })
    if ($slugMatches.Count) { throw 'Tracker already owns this slug but the package record is missing. Recover it before updating.' }
    if ($AdoptRow) {
        if ($NewRecord) { throw 'AdoptRow and NewRecord are mutually exclusive.' }
        if (-not $ExpectedTrackerHash -or $ExpectedTrackerHash -cne $readHashes[$trackerRelative]) { throw 'Legacy adoption requires the current ExpectedTrackerHash and a reviewed one-based data row.' }
        if ($AdoptRow -gt $tracker.records.Count) { throw 'AdoptRow is outside the tracker.' }
        $target = $tracker.records[$AdoptRow - 1]
        if ([string]::IsNullOrWhiteSpace($target[$nameColumn])) { throw 'Unnamed rows need manual identity review; adoption cannot invent a business.' }
        if ($target[$nameColumn] -cne $BusinessName) { throw 'Adoption BusinessName must exactly match the selected row.' }
        if (($target.Contains('local_record_id') -and $target['local_record_id']) -or ($target.Contains('prospect_slug') -and $target['prospect_slug'])) { throw 'Selected row already has package identity. Restore its package instead.' }
    } else {
        $candidates = @($tracker.records | Where-Object {
            $_[$nameColumn] -eq $BusinessName -or ($Website -and $_.Contains('website') -and $_['website'] -eq $Website)
        })
        if ($candidates.Count -and -not $NewRecord) { throw 'Potential existing business/location. Review and use AdoptRow with ExpectedTrackerHash, or NewRecord with a distinct slug. No name/domain merge is performed.' }
        if ([IO.Directory]::Exists((Get-SafePath $root "prospects/$Slug"))) { throw 'Legacy package has no identity record. Explicitly adopt its tracker row before updating; NewRecord requires an unused slug.' }
        $target = [ordered]@{}
        foreach ($header in $headers) { $target[$header] = '' }
        $tracker.records.Add($target)
    }
    $fields = [ordered]@{}
    foreach ($field in @('business_name','website','city_state','service_focus','recommendation_category','primary_recommendation',
        'secondary_recommendations','future_opportunities','observed_issue','recommended_solution','personalized_outreach_angle',
        'contact_method','brand_palette_source','demo_or_recommendation_url','current_flow_reviewed','assumptions','status','evidence','contact_verification')) {
        $column = Get-ColumnName $tracker.headers $field
        if ($target.Contains($column) -and $target[$column]) {
            $fields[$field] = if ($field -in @('evidence','contact_verification')) {
                $target[$column] | ConvertFrom-Json -AsHashtable -DateKind String -NoEnumerate
            } else { $target[$column] }
        }
    }
    if (-not $fields.Contains('status')) { $fields['status'] = 'sourced' }
    $record = [ordered]@{ schema_version = 1; local_record_id = [guid]::NewGuid().ToString(); prospect_slug = $Slug;
        import_origin = @{ tracker_sha256 = $readHashes[$trackerRelative]; data_row = $(if ($AdoptRow) { $AdoptRow } else { $null }); legacy_id = $(if ($target.Contains('id')) { $target['id'] } else { $null }) };
        fields = $fields; status_history = @(@{ from = ''; to = $fields.status; at = [DateTimeOffset]::UtcNow.ToString('o'); kind = $(if ($AdoptRow) { 'legacy_import' } else { 'created' }) }) }
}
$parameterFields = [ordered]@{
    BusinessName='business_name'; Website='website'; CityState='city_state'; ServiceFocus='service_focus'; RecommendationCategory='recommendation_category';
    PrimaryRecommendation='primary_recommendation'; SecondaryRecommendations='secondary_recommendations'; FutureOpportunities='future_opportunities';
    ObservedIssue='observed_issue'; RecommendedSolution='recommended_solution'; OutreachAngle='personalized_outreach_angle'; ContactMethod='contact_method';
    BrandPaletteSource='brand_palette_source'; DemoOrRecommendationUrl='demo_or_recommendation_url'; CurrentFlowReviewed='current_flow_reviewed'; Assumptions='assumptions'; Status='status'
}
$patch = [ordered]@{}
foreach ($entry in $parameterFields.GetEnumerator()) {
    if ($PSBoundParameters.ContainsKey($entry.Key)) { $patch[$entry.Value] = [string]$PSBoundParameters[$entry.Key] }
}
foreach ($pair in @(@('EvidencePath','evidence'), @('ContactVerificationPath','contact_verification'))) {
    if ($PSBoundParameters.ContainsKey($pair[0])) { $patch[$pair[1]] = Get-Content -LiteralPath $PSBoundParameters[$pair[0]] -Raw | ConvertFrom-Json -AsHashtable -DateKind String -NoEnumerate }
}
foreach ($field in $ClearField) {
    if ($field -notin @($parameterFields.Values) + @('evidence','contact_verification') -or $field -in @('business_name','status')) { throw "Field cannot be cleared: $field" }
    if ($patch.Contains($field)) { throw "Do not both supply and clear $field." }
    if ($field -eq 'evidence') { $patch[$field] = @() }
    elseif ($field -eq 'contact_verification') { $patch[$field] = $null }
    else { $patch[$field] = '' }
}
if ($patch.Contains('status') -and $patch.status -cne $record.fields.status) {
    Assert-StateTransition $record.fields.status $patch.status -Generator
    $record.status_history += @{ from = $record.fields.status; to = $patch.status; at = [DateTimeOffset]::UtcNow.ToString('o'); kind = 'package_update' }
}
foreach ($entry in $patch.GetEnumerator()) { $record.fields[$entry.Key] = $entry.Value }
if ($patch.Contains('current_flow_reviewed') -and $patch.current_flow_reviewed -and
    (-not $record.fields.Contains('evidence') -or -not $record.fields.evidence.Count)) { throw 'A reviewed-journey assertion requires explicit source evidence.' }
$stage = if ($record.fields.status -in @('ready_for_review','approved_to_send','sent','followed_up','positive_reply','not_interested')) { 'OutreachReady' }
    elseif ($record.fields.status -in @('researched','qualified','diagnosed','recommendation_created','demo_created','email_drafted')) { 'ResearchComplete' } else { 'Structure' }
Assert-ResearchRecord $record $stage

$trackerPatch = [ordered]@{ local_record_id = $record.local_record_id; prospect_slug = $Slug }
if (-not $target.Contains('status') -or -not $target['status']) { $trackerPatch['status'] = $record.fields.status }
foreach ($entry in $patch.GetEnumerator()) {
    $column = Get-ColumnName $tracker.headers $entry.Key
    $trackerPatch[$column] = if ($entry.Key -in @('evidence','contact_verification')) { ConvertTo-Json -InputObject $entry.Value -Compress -Depth 20 } else { $entry.Value }
}
foreach ($entry in $trackerPatch.GetEnumerator()) {
    if (-not $headers.Contains($entry.Key)) { $headers.Add($entry.Key) }
    $target[$entry.Key] = [string]$entry.Value
}

function Field([string]$Name) {
    if ($record.fields.Contains($Name) -and $record.fields[$Name]) { [string]$record.fields[$Name] } else { '{{' + $Name + '}}' }
}
$name = $record.fields.business_name
$evidenceText = if ($record.fields.Contains('evidence') -and $record.fields.evidence.Count) {
    ($record.fields.evidence | ForEach-Object { "- $($_.observation) — [source]($($_.source_url)), observed $($_.observed_at)." }) -join "`n"
} else { '{{source_evidence}}' }
$documents = [ordered]@{}
$documents[$documentPaths[0]] = "# $name`n`nLocal record: $($record.local_record_id)`n`n[Research record](research.json) · [Research notes](recommendation.md)`n`nThe research record stores current fields and status history. Existing prose is maintained separately.`n"
$documents[$documentPaths[1]] = "# $name research and recommendation`n`n## Supplied evidence`n`n$evidenceText`n`n## Observation`n`n$(Field 'observed_issue')`n`n## Assumptions / unknowns`n`n$(Field 'assumptions')`n`n## Primary recommendation (optional)`n`n$(Field 'primary_recommendation')`n`n## Proposed solution`n`n$(Field 'recommended_solution')`n`n## Secondary recommendations`n`n$(Field 'secondary_recommendations')`n`n## Future opportunities`n`n$(Field 'future_opportunities')`n"
$documents[$documentPaths[2]] = "# $name summary draft`n`nProposed opportunity, pending review:`n`n$(Field 'observed_issue')`n`n$(Field 'primary_recommendation')`n`n$(Field 'recommended_solution')`n`nNo performance outcome is guaranteed.`n"
$documents[$documentPaths[3]] = "# $name outreach — draft only`n`n## Contact method`n`n$(Field 'contact_method')`n`n## Subject`n`nQuick note about $name`n`n## Body`n`nHi {{first_name_or_team}},`n`nMy name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.`n`n{{reviewed_observation_sentence}}`n`n$(Field 'primary_recommendation')`n`nWould a short recommendation outline be useful? If another site priority would be more useful to look at first, I can focus there instead.`n`n{{sender_name}}`n`n## Review checklist`n`n- [ ] Re-open sources and verify the observation.`n- [ ] Verify contact method and exact recipient.`n- [ ] Open the stable recommendation/demo URL.`n- [ ] Review the exact subject and body; remove unsupported claims.`n`nSending requires separate explicit approval.`n"
$documents[$documentPaths[4]] = "# $name tracking draft`n`n$(Field 'primary_recommendation')`n`n{{baseline_metric_and_measurement_plan}}`n"
$documents[$documentPaths[5]] = "# $name proposed deliverable`n`n$(Field 'primary_recommendation')`n`n$(Field 'recommended_solution')`n`nThis is an internal recommendation, pending review.`n"
$changes = [Collections.Generic.List[object]]::new()
$regenerationReview = @()
$preserved = @()
foreach ($entry in $documents.GetEnumerator()) {
    $exists = $null -ne $readHashes[$entry.Key]
    if (-not $exists -or $Regenerate) {
        $change = New-FileChange $root $entry.Key $entry.Value
        if ($change) {
            $changes.Add($change)
            if ($exists) { $regenerationReview += [ordered]@{ path=$change.path; before_hash=$change.before_hash; after_hash=$change.after_hash } }
        }
    } else { $preserved += $entry.Key }
}
$requiredReview = if ($regenerationReview.Count) { Get-TextHash ($regenerationReview | ConvertTo-Json -Depth 10 -Compress) } else { $null }
if ($requiredReview -and -not $DryRun -and $ReviewHash -cne $requiredReview) { throw 'Regeneration requires the ReviewHash from the same -Regenerate -DryRun diff. Existing documents were not changed.' }
if ($stage -eq 'OutreachReady') {
    if ($Regenerate) { throw 'Generated outreach contains review placeholders; regenerate at an earlier stage before reviewing.' }
    Assert-OutreachDocuments $root $Slug $record.fields
}
$newCsv = ConvertTo-TrackerCsv $headers.ToArray() $tracker.records.ToArray()
if ($newCsv -cne $beforeLogicalCsv) { $changes.Add((New-FileChange $root $trackerRelative $newCsv)) }
$recordChange = New-FileChange $root $recordRelative (($record | ConvertTo-Json -Depth 30) + "`n")
if ($recordChange) { $changes.Add($recordChange) }
if ($DryRun) {
    [ordered]@{ dry_run=$true; review_hash=$requiredReview; local_record_id=$record.local_record_id; preserved_documents=$preserved; changes=$changes.ToArray() } | ConvertTo-Json -Depth 35
} else {
    $transaction = Invoke-ProspectTransaction $root $changes.ToArray() $readHashes
    [ordered]@{ local_record_id=$record.local_record_id; changed_files=$changes.Count; transaction_id=$transaction; preserved_documents=$preserved } | ConvertTo-Json -Depth 10
}
