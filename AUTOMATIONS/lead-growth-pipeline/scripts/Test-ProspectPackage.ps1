param(
    [Parameter(Mandatory = $true)]
    [string]$ExperimentPath,

    [Parameter(Mandatory = $true)]
    [string]$Slug
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$required = @(
    "prospects/$Slug/README.md",
    "prospects/$Slug/recommendation.md",
    "prospects/$Slug/client-summary.md",
    "prospects/$Slug/outreach-email.md",
    "prospects/$Slug/campaign-tracking-strategy.md",
    "product/personalized-demos/$Slug-recommendation.md",
    "marketing/prospect-tracker.csv"
)

$missing = @()
foreach ($relative in $required) {
    $path = Join-Path $ExperimentPath $relative
    if (-not (Test-Path $path)) {
        $missing += $relative
    }
}

if ($missing.Count -gt 0) {
    Write-Error ("Missing required files:`n" + ($missing -join "`n"))
    exit 1
}

Write-Output "Prospect package structure is valid for $Slug"
