# Extract TobBar tokens from Figma REST API (exact fills, typography, layout).
# Usage:
#   $env:FIGMA_ACCESS_TOKEN = "figd_..."
#   .\scripts\extract-figma-tobbar.ps1

param(
  [string]$FileKey = "01IsSXHltfUiM8fAQvXgAj",
  [string]$NodeIds = "201:62,201:65,201:174,201:201,201:223,201:67,201:68,201:232"
)

$ErrorActionPreference = "Stop"
$token = $env:FIGMA_ACCESS_TOKEN

if (-not $token) {
  Write-Error "Set FIGMA_ACCESS_TOKEN first. Create token: Figma -> Settings -> Security -> Personal access tokens"
}

$outDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$nodesPath = Join-Path $outDir "figma-tobbar-nodes.json"
$nodesUrl = "https://api.figma.com/v1/files/$FileKey/nodes?ids=$NodeIds&geometry=paths"

curl.exe -s -H "X-Figma-Token: $token" $nodesUrl -o $nodesPath
Write-Host "Saved $nodesPath"
