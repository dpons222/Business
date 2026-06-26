param(
    [Parameter(Mandatory = $true)]
    [string]$ExperimentPath,

    [Parameter(Mandatory = $true)]
    [string]$BusinessName,

    [string]$Slug = "",
    [string]$Website = "",
    [string]$CityState = "",
    [string]$ServiceFocus = "",
    [string]$RecommendationCategory = "",
    [string]$PrimaryRecommendation = "",
    [string]$SecondaryRecommendations = "",
    [string]$FutureOpportunities = "",
    [string]$ObservedIssue = "",
    [string]$RecommendedSolution = "",
    [string]$OutreachAngle = "",
    [string]$ContactMethod = "Needs manual verification",
    [string]$BrandPaletteSource = "",
    [string]$DemoOrRecommendationUrl = "",
    [string]$Status = "diagnosed",
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function ConvertTo-Slug {
    param([string]$Value)
    $slug = $Value.ToLowerInvariant()
    $slug = $slug -replace "[^a-z0-9]+", "-"
    $slug = $slug.Trim("-")
    if ([string]::IsNullOrWhiteSpace($slug)) {
        throw "Could not create slug from value: $Value"
    }
    return $slug
}

function Write-TextFile {
    param(
        [string]$Path,
        [string]$Content
    )
    if ($DryRun) {
        Write-Output "DRY RUN write $Path"
        return
    }
    $dir = Split-Path -Parent $Path
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Set-IfHeaderExists {
    param(
        [hashtable]$Row,
        [string[]]$Headers,
        [string]$Name,
        [string]$Value
    )
    if ($Headers -contains $Name) {
        $Row[$Name] = $Value
    }
}

if ([string]::IsNullOrWhiteSpace($Slug)) {
    $Slug = ConvertTo-Slug -Value $BusinessName
}

$experimentFullPath = Resolve-Path -Path $ExperimentPath -ErrorAction SilentlyContinue
if (-not $experimentFullPath -and -not $DryRun) {
    throw "Experiment path does not exist: $ExperimentPath"
}

$prospectDir = Join-Path $ExperimentPath "prospects/$Slug"
$demoPath = Join-Path $ExperimentPath "product/personalized-demos/$Slug-recommendation.md"
$trackerPath = Join-Path $ExperimentPath "marketing/prospect-tracker.csv"

if ([string]::IsNullOrWhiteSpace($DemoOrRecommendationUrl)) {
    $DemoOrRecommendationUrl = $demoPath -replace "\\", "/"
}

$readme = @"
# $BusinessName

Prospect package for `$BusinessName`.

## Status

```text
$Status
```

## Start Here

- `recommendation.md`: internal diagnosis and recommendation.
- `client-summary.md`: client-facing summary.
- `outreach-email.md`: draft-only outreach copy.
- `campaign-tracking-strategy.md`: tracking plan for the recommended module.
"@

$recommendation = @"
# $BusinessName Recommendation

## Observed Evidence

- $ObservedIssue

## Assumptions

- Assumptions must be verified before outreach or implementation.

## Primary Recommendation

```text
$PrimaryRecommendation
```

## Why This First

$RecommendedSolution

## Secondary Recommendations

$SecondaryRecommendations

## Future Opportunities

$FutureOpportunities

## Outreach Angle

$OutreachAngle

## Guardrails

- Do not promise leads, bookings, orders, patients, cases, rankings, reviews, revenue, or ad outcomes.
- Verify contact method before sending.
- Keep demos lightweight until there is interest.
"@

$clientSummary = @"
# $BusinessName Client Summary

I noticed one practical opportunity in the public customer journey:

```text
$ObservedIssue
```

The first improvement I would recommend is:

```text
$PrimaryRecommendation
```

This is meant as a focused first step, not a full rebuild or guaranteed outcome.
"@

$outreach = @"
# $BusinessName Outreach Email

## Draft Status

```text
draft_only
```

## Contact Method

```text
$ContactMethod
```

## Subject

Quick note about $BusinessName

## Body

Hi {{first_name_or_team}},

I was reviewing $BusinessName and noticed one practical opportunity around $ObservedIssue.

I am testing a focused growth package where I inspect the public customer journey and implement one practical improvement.

For $BusinessName, I would start with $PrimaryRecommendation because $RecommendedSolution.

Would it be useful if I sent over a short recommendation outline? If another site priority would be more useful to look at first, I can focus there instead.

{{sender_name}}

## Pre-Send Checklist

- [ ] Re-open the current website/page and verify the observation.
- [ ] Verify contact method.
- [ ] Verify recommendation/demo URL.
- [ ] Confirm no guaranteed outcomes are promised.
- [ ] Confirm Diego approved the exact draft before sending.
"@

$tracking = @"
# $BusinessName Campaign Tracking Strategy

## Primary Recommendation

```text
$PrimaryRecommendation
```

## Signals To Track

- Visits or views of the recommended asset.
- Clicks, calls, form starts, inquiries, bookings, or other relevant action when available.
- Replies and objections from outreach.

## Notes

Tracking depends on the prospect's tools and access. Do not promise performance outcomes.
"@

$demo = @"
# $BusinessName Personalized Recommendation

## Primary Recommendation

```text
$PrimaryRecommendation
```

## Observed Opportunity

$ObservedIssue

## Suggested First Deliverable

$RecommendedSolution

## Secondary Ideas For Later

$SecondaryRecommendations

## Future Opportunities

$FutureOpportunities
"@

Write-TextFile -Path (Join-Path $prospectDir "README.md") -Content $readme
Write-TextFile -Path (Join-Path $prospectDir "recommendation.md") -Content $recommendation
Write-TextFile -Path (Join-Path $prospectDir "client-summary.md") -Content $clientSummary
Write-TextFile -Path (Join-Path $prospectDir "outreach-email.md") -Content $outreach
Write-TextFile -Path (Join-Path $prospectDir "campaign-tracking-strategy.md") -Content $tracking
Write-TextFile -Path $demoPath -Content $demo

if (Test-Path $trackerPath) {
    $headerLine = Get-Content -Path $trackerPath -TotalCount 1
    $headers = $headerLine.Split(",")
    $rows = @()
    if ((Get-Item $trackerPath).Length -gt $headerLine.Length) {
        $rows = @(Import-Csv -Path $trackerPath)
    }

    $row = @{}
    foreach ($header in $headers) {
        $row[$header] = ""
    }

    Set-IfHeaderExists $row $headers "business_name" $BusinessName
    Set-IfHeaderExists $row $headers "website" $Website
    Set-IfHeaderExists $row $headers "city_state" $CityState
    Set-IfHeaderExists $row $headers "service_focus" $ServiceFocus
    Set-IfHeaderExists $row $headers "practice_focus" $ServiceFocus
    Set-IfHeaderExists $row $headers "cuisine_or_concept" $ServiceFocus
    Set-IfHeaderExists $row $headers "recommendation_category" $RecommendationCategory
    Set-IfHeaderExists $row $headers "contact_method" $ContactMethod
    Set-IfHeaderExists $row $headers "current_flow_reviewed" "Public customer journey reviewed from supplied/researched evidence"
    Set-IfHeaderExists $row $headers "observed_issue" $ObservedIssue
    Set-IfHeaderExists $row $headers "recommended_solution" $RecommendedSolution
    Set-IfHeaderExists $row $headers "personalized_outreach_angle" $OutreachAngle
    Set-IfHeaderExists $row $headers "brand_palette_source" $BrandPaletteSource
    Set-IfHeaderExists $row $headers "demo_or_recommendation_url" $DemoOrRecommendationUrl
    Set-IfHeaderExists $row $headers "status" $Status
    Set-IfHeaderExists $row $headers "notes" "Primary: $PrimaryRecommendation; Secondary: $SecondaryRecommendations; Future: $FutureOpportunities"

    $existing = @($rows | Where-Object { $_.business_name -ne $BusinessName -and $_.website -ne $Website })
    $newObject = New-Object PSObject
    foreach ($header in $headers) {
        Add-Member -InputObject $newObject -MemberType NoteProperty -Name $header -Value $row[$header]
    }
    $updatedRows = @($existing + $newObject)

    if ($DryRun) {
        Write-Output "DRY RUN update $trackerPath"
    }
    else {
        $updatedRows | Export-Csv -Path $trackerPath -NoTypeInformation -Encoding UTF8
    }
}
else {
    Write-Warning "Tracker not found: $trackerPath"
}

Write-Output "Prospect package prepared for $BusinessName at $prospectDir"
