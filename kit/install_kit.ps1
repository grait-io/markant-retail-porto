# Install the workshop kit into your own repository (Day 2: your codebase, your tickets).
#
# Usage, from the root of the kit clone:
#   powershell -ExecutionPolicy Bypass -File kit\install_kit.ps1 C:\path\to\your-repo
#
# What it does:
#   - copies kit\.cursor\ (commands, skills, subagents) into <your-repo>\.cursor\
#   - copies the manual Goldfish prompts to <your-repo>\.cursor\goldfish_manual_prompt.md
#   - copies the map template to <your-repo>\context\_TEMPLATE_module.md
# What it never touches: your AGENTS.md, your README.md, your source code.
# Kit files with the same name in <your-repo>\.cursor\ are replaced by the new version.
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Target
)
$ErrorActionPreference = "Stop"

$Kit = $PSScriptRoot
if (-not (Test-Path -Path $Target -PathType Container)) {
  Write-Host "Usage: powershell -ExecutionPolicy Bypass -File kit\install_kit.ps1 C:\path\to\your-repo"
  exit 1
}
$Target = (Resolve-Path -Path $Target).Path

New-Item -ItemType Directory -Force -Path (Join-Path $Target ".cursor") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Target "context") | Out-Null
Copy-Item -Recurse -Force -Path (Join-Path $Kit ".cursor\*") -Destination (Join-Path $Target ".cursor")
Copy-Item -Force -Path (Join-Path $Kit "goldfish_manual_prompt.md") -Destination (Join-Path $Target ".cursor\goldfish_manual_prompt.md")
Copy-Item -Force -Path (Join-Path $Kit "fabric\context\_TEMPLATE_module.md") -Destination (Join-Path $Target "context\_TEMPLATE_module.md")

Write-Host "Kit installed into: $Target"
Write-Host "Next:"
Write-Host "  1. Open that folder in Cursor and run: Developer: Reload Window"
Write-Host "  2. In Agent chat, type /fabric-map  (the command must appear)"
Write-Host "  3. Work on a local branch today. Do not push the workshop files unless your team agrees."
