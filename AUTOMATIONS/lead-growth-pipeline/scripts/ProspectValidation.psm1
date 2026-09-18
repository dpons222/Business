#requires -Version 7.5
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'ProspectStore.psm1')

$script:States = @('sourced', 'researched', 'qualified', 'diagnosed', 'recommendation_created', 'demo_created', 'email_drafted', 'ready_for_review', 'approved_to_send', 'sent', 'followed_up', 'positive_reply', 'not_interested', 'bad_fit', 'paused')

function Assert-StateTransition([string]$Before, [string]$After, [switch]$Generator) {
    if ($After -notin $script:States) { throw "Unknown prospect status: $After" }
    if ($Before -eq $After) { return }
    if ($Generator -and $After -in @('approved_to_send', 'sent', 'followed_up', 'positive_reply', 'not_interested')) {
        throw 'Approval, sending, and replies belong to the separately reviewed outreach workflow.'
    }
    if (-not $Before) { return }
    if ($Before -notin $script:States) { throw "Unknown previous status: $Before; review legacy state before changing it." }
    if ($After -in @('paused', 'bad_fit')) { return }
    if ($Before -in @('paused', 'bad_fit', 'not_interested')) {
        if ($After -ne 'sourced') { throw 'Resume a stopped prospect at sourced for re-review.' }
        return
    }
    if ([array]::IndexOf($script:States, $After) -lt [array]::IndexOf($script:States, $Before)) { throw "Invalid backward status transition: $Before -> $After" }
    if ($After -eq 'approved_to_send' -and $Before -ne 'ready_for_review') { throw 'Approval requires ready_for_review.' }
    if ($After -eq 'sent' -and $Before -ne 'approved_to_send') { throw 'Sending requires approved_to_send.' }
    if ($After -in @('followed_up', 'positive_reply', 'not_interested') -and $Before -notin @('sent', 'followed_up')) { throw 'Contact outcome requires a sent message.' }
}

function Assert-Meaningful([string]$Value, [string]$Label) {
    if ([string]::IsNullOrWhiteSpace($Value) -or $Value -match '(?i)\{\{[^}]+\}\}|\b(TODO|TBD|PLACEHOLDER)\b|^\s*#|^\s*(unknown|pending|needs research)\s*$') {
        throw "Missing or unresolved $Label."
    }
}

function Assert-WebUrl([string]$Value, [string]$Label) {
    $uri = $null
    if (-not [uri]::TryCreate($Value, [UriKind]::Absolute, [ref]$uri) -or $uri.Scheme -notin @('http','https') -or -not $uri.Host -or $uri.UserInfo) { throw "Invalid $Label URL." }
}

function Assert-ObservedTime([string]$Value, [string]$Label) {
    $parsed = [DateTimeOffset]::MinValue
    if ($Value -notmatch '^\d{4}-\d{2}-\d{2}T.+(Z|[+-]\d{2}:\d{2})$' -or
        -not [DateTimeOffset]::TryParse($Value, [ref]$parsed) -or $parsed -gt [DateTimeOffset]::UtcNow.AddMinutes(5)) { throw "Invalid $Label timestamp (use ISO 8601 with timezone; no future observations)." }
}

function Assert-Evidence($Evidence) {
    foreach ($item in $Evidence) {
        if ($item -isnot [System.Collections.IDictionary]) { throw 'Each evidence item must be an object.' }
        foreach ($key in @('source_url','observed_at','observation')) {
            if (-not $item.Contains($key)) { throw "Evidence is missing $key." }
            if ($item[$key] -isnot [string]) { throw "Evidence $key must be text." }
            Assert-Meaningful ([string]$item[$key]) "evidence $key"
        }
        Assert-WebUrl $item.source_url 'source'
        Assert-ObservedTime $item.observed_at 'evidence'
    }
}

function Assert-ResearchRecord($Record, [string]$Stage = 'Structure') {
    if ($Record.schema_version -ne 1) { throw 'Unsupported research record schema version.' }
    Assert-ProspectSlug $Record.prospect_slug
    if ($Record.local_record_id -cnotmatch '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$') { throw 'Invalid research record ID.' }
    $fields = $Record.fields
    if ($fields -isnot [System.Collections.IDictionary]) { throw 'Research fields must be an object.' }
    foreach ($key in $fields.Keys) {
        if ($key -notin @('evidence','contact_verification') -and $fields[$key] -isnot [string]) { throw "Research field $key must be text." }
    }
    Assert-Meaningful $fields.business_name 'business name'
    if ($fields.status -notin $script:States) { throw "Unknown prospect status: $($fields.status)" }
    if (-not $Record.status_history.Count) { throw 'Missing status history.' }
    $previous = ''
    foreach ($event in $Record.status_history) {
        if ($event.from -cne $previous) { throw 'Broken status history chain.' }
        Assert-StateTransition $event.from $event.to
        Assert-ObservedTime $event.at 'status history'
        $previous = $event.to
    }
    if ($previous -cne $fields.status) { throw 'Status does not match recorded history.' }
    $evidence = @(if ($fields.Contains('evidence')) { $fields.evidence })
    if ($fields.Contains('evidence') -and $fields.evidence -isnot [System.Collections.IList]) { throw 'Evidence must be a JSON array.' }
    Assert-Evidence $evidence
    if ($fields.Contains('contact_verification') -and $null -ne $fields.contact_verification) {
        $contact = $fields.contact_verification
        if ($contact -isnot [System.Collections.IDictionary]) { throw 'Contact verification must be an object.' }
        if ($contact.method -notin @('verified_public_email','verified_contact_form','verified_phone_only','verified_social_dm')) { throw 'Invalid contact verification method.' }
        Assert-WebUrl $contact.source_url 'contact source'
        Assert-ObservedTime $contact.verified_at 'contact verification'
        Assert-Meaningful $contact.contact_method 'verified contact'
        if ($contact.method -eq 'verified_public_email') {
            $address = $null
            if (-not [Net.Mail.MailAddress]::TryCreate($contact.contact_method, [ref]$address) -or $address.Address -cne $contact.contact_method) { throw 'Verified email must be an exact email address.' }
        }
        if ($contact.method -in @('verified_contact_form','verified_social_dm')) { Assert-WebUrl $contact.contact_method 'verified contact' }
        if (-not $fields.Contains('contact_method') -or $contact.contact_method -cne $fields.contact_method) { throw 'Contact verification does not match the current contact method.' }
    }
    if ($Stage -in @('ResearchComplete','OutreachReady')) {
        if (-not $evidence.Count) { throw 'Research completeness requires source evidence.' }
        if (-not $fields.Contains('observed_issue')) { throw 'Research completeness requires an observation.' }
        Assert-Meaningful $fields.observed_issue 'observed issue'
        # Recommendations and contact methods are optional for a research-only dossier.
    }
    if ($Stage -eq 'OutreachReady') {
        foreach ($key in @('primary_recommendation','recommended_solution','personalized_outreach_angle','contact_method','demo_or_recommendation_url')) {
            if (-not $fields.Contains($key)) { throw "Outreach readiness requires $key." }
            Assert-Meaningful $fields[$key] $key
        }
        if (-not $fields.Contains('contact_verification') -or $null -eq $fields.contact_verification) { throw 'Outreach readiness requires explicit contact verification.' }
    }
}

function Assert-Document([string]$Root, [string]$Relative, [switch]$Complete) {
    $path = Get-SafePath $Root $Relative
    if (-not [IO.File]::Exists($path)) { throw "Missing required document: $Relative" }
    $content = [IO.File]::ReadAllText($path)
    if ([string]::IsNullOrWhiteSpace($content)) { throw "Empty document: $Relative" }
    if ($Complete) {
        if ($content -match '(?i)\{\{[^}]+\}\}|\b(TODO|TBD|PLACEHOLDER)\b|\[ \]') { throw "Unresolved content/checklist in $Relative" }
        $body = ($content -split '\r?\n' | Where-Object { $_ -notmatch '^\s*(#|```|$)' }) -join "`n"
        if ([string]::IsNullOrWhiteSpace($body)) { throw "No substantive content: $Relative" }
    }
    foreach ($match in [regex]::Matches($content, '\[[^\]]*\]\(([^)]+)\)')) {
        $target = $match.Groups[1].Value.Trim('<','>')
        if ($target -match '^https?://') { Assert-WebUrl $target 'document'; continue }
        if ($target -match '^(mailto:|tel:|#)') { continue }
        $target = [uri]::UnescapeDataString(($target -split '#',2)[0])
        $relativeTarget = [IO.Path]::GetRelativePath($Root, [IO.Path]::GetFullPath([IO.Path]::Combine([IO.Path]::GetDirectoryName($path), $target)))
        $reference = Get-SafePath $Root $relativeTarget
        if (-not (Test-Path -LiteralPath $reference)) { throw "Broken reference in ${Relative}: $target" }
    }
}

function Assert-ResearchDocument([string]$Root, [string]$Relative) {
    Assert-Document $Root $Relative
    $content = [IO.File]::ReadAllText((Get-SafePath $Root $Relative))
    # These slots are optional for research-only work. All other unresolved content fails.
    $content = $content -replace '\{\{(assumptions|primary_recommendation|recommended_solution|secondary_recommendations|future_opportunities)\}\}', ''
    if ($content -match '(?i)\{\{[^}]+\}\}|\b(TODO|TBD|PLACEHOLDER)\b' -or
        -not ($content -split '\r?\n' | Where-Object { $_ -notmatch '^\s*(#|```|$)' })) { throw 'Research notes are incomplete.' }
}

function Assert-OutreachDocuments([string]$Root, [string]$Slug, $Fields) {
    foreach ($relative in @("prospects/$Slug/client-summary.md", "prospects/$Slug/outreach-email.md")) { Assert-Document $Root $relative -Complete }
    $reference = $Fields.demo_or_recommendation_url
    if ($reference -match '^https?://') { Assert-WebUrl $reference 'recommendation' }
    else {
        $path = Get-SafePath $Root $reference
        if (-not [IO.File]::Exists($path) -or (Get-Item -LiteralPath $path).Length -eq 0) { throw 'Recommendation reference is missing or empty.' }
    }
}

Export-ModuleMember -Function Assert-*
