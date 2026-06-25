param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("list", "upsert", "remove")]
    [string]$Action,

    [string]$EnvPath = ".env.local",
    [string]$Username = "",
    [string]$Password = "",
    [ValidateSet("admin", "user")]
    [string]$Role = "admin"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-Sha256Hash {
    param([string]$Value)

    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
        $hashBytes = $sha.ComputeHash($bytes)
        return "sha256:" + (($hashBytes | ForEach-Object { $_.ToString("x2") }) -join "")
    }
    finally {
        $sha.Dispose()
    }
}

function New-Secret {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
        return [Convert]::ToBase64String($bytes).TrimEnd("=").Replace("+", "-").Replace("/", "_")
    }
    finally {
        $rng.Dispose()
    }
}

function Read-EnvMap {
    param([string]$Path)

    $map = [ordered]@{}
    if (-not (Test-Path $Path)) {
        return $map
    }

    foreach ($line in Get-Content -Path $Path) {
        if ([string]::IsNullOrWhiteSpace($line) -or $line.TrimStart().StartsWith("#")) {
            continue
        }

        $index = $line.IndexOf("=")
        if ($index -lt 1) {
            continue
        }

        $key = $line.Substring(0, $index)
        $value = $line.Substring($index + 1)

        if (($value.StartsWith("'") -and $value.EndsWith("'")) -or ($value.StartsWith('"') -and $value.EndsWith('"'))) {
            $value = $value.Substring(1, $value.Length - 2)
        }

        $map[$key] = $value
    }

    return $map
}

function Write-EnvMap {
    param(
        [string]$Path,
        [System.Collections.IDictionary]$Map
    )

    $lines = @()
    foreach ($key in $Map.Keys) {
        $value = $Map[$key]
        if ($key -eq "DASHBOARD_USERS_JSON") {
            $lines += "$key='$value'"
        }
        else {
            $lines += "$key=$value"
        }
    }

    Set-Content -Path $Path -Value $lines -Encoding UTF8
}

$envMap = Read-EnvMap -Path $EnvPath

if (-not $envMap.Contains("DASHBOARD_AUTH_SECRET")) {
    $envMap["DASHBOARD_AUTH_SECRET"] = New-Secret
}

$users = @()
if ($envMap.Contains("DASHBOARD_USERS_JSON") -and -not [string]::IsNullOrWhiteSpace($envMap["DASHBOARD_USERS_JSON"])) {
    $parsedUsers = ConvertFrom-Json -InputObject $envMap["DASHBOARD_USERS_JSON"]
    $users = @($parsedUsers)
}

switch ($Action) {
    "list" {
        if ($users.Count -eq 0) {
            Write-Output "No dashboard users configured in $EnvPath"
            exit 0
        }

        $users | Select-Object username, role
    }
    "upsert" {
        if ([string]::IsNullOrWhiteSpace($Username) -or [string]::IsNullOrWhiteSpace($Password)) {
            throw "Username and Password are required for upsert."
        }

        $remainingUsers = @($users | Where-Object { $_.username -ne $Username })
        $newUser = [pscustomobject]@{
            username = $Username
            role = $Role
            passwordHash = Get-Sha256Hash -Value $Password
        }
        $updatedUsers = @($remainingUsers + $newUser)
        $envMap["DASHBOARD_USERS_JSON"] = ConvertTo-Json -InputObject $updatedUsers -Compress
        Write-EnvMap -Path $EnvPath -Map $envMap
        Write-Output "Upserted dashboard user '$Username' in $EnvPath"
    }
    "remove" {
        if ([string]::IsNullOrWhiteSpace($Username)) {
            throw "Username is required for remove."
        }

        $updatedUsers = @($users | Where-Object { $_.username -ne $Username })
        $envMap["DASHBOARD_USERS_JSON"] = ConvertTo-Json -InputObject $updatedUsers -Compress
        Write-EnvMap -Path $EnvPath -Map $envMap
        Write-Output "Removed dashboard user '$Username' from $EnvPath"
    }
}
