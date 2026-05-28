# Extract TobBar tokens from Figma REST API (exact fills, typography, layout).
# Usage:
#   $env:FIGMA_ACCESS_TOKEN = "figd_..."
#   .\scripts\extract-figma-tobbar.ps1

$ErrorActionPreference = "Stop"
$fileKey = "fnNtGRmLq725iOJ9IfngGG"
$nodeIds = "201:62,201:65,201:174,201:201,201:223,201:67,201:232"
$token = $env:FIGMA_ACCESS_TOKEN

if (-not $token) {
  Write-Error "Set FIGMA_ACCESS_TOKEN first. Create token: Figma -> Settings -> Security -> Personal access tokens"
}

$headers = @{ "X-Figma-Token" = $token }
$nodesUrl = "https://api.figma.com/v1/files/$fileKey/nodes?ids=$nodeIds"
$response = Invoke-RestMethod -Uri $nodesUrl -Headers $headers -Method Get
$response.nodes | ConvertTo-Json -Depth 20 | Out-File -Encoding utf8 "figma-tobbar-nodes.json"
Write-Host "Saved figma-tobbar-nodes.json"

$imagesUrl = "https://api.figma.com/v1/images/$fileKey?ids=201:68,201:232&format=svg"
$images = Invoke-RestMethod -Uri $imagesUrl -Headers $headers -Method Get
$images | ConvertTo-Json -Depth 5 | Out-File -Encoding utf8 "figma-tobbar-icons.json"
Write-Host "Saved figma-tobbar-icons.json"
