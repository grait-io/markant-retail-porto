# Prepare clean, git-initialized Day 1 working folders with the Cursor-native kit (Windows PowerShell).
# Leaves exercise/pricing-demo/ and exercise/pricing-demo-tiers/ completely untouched.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File exercise/setup_day1.ps1 [target_dir]
param(
  [string]$TargetDir = ""
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$KitRoot = Split-Path -Parent $ScriptDir
if ([string]::IsNullOrWhiteSpace($TargetDir)) {
  $TargetDir = Join-Path $KitRoot "work"
}

$SpecDir = Join-Path $TargetDir "pricing-demo-spec"
$WtDir = Join-Path $TargetDir "pricing-demo-worktrees"

Write-Host "== Preparing Day 1 working copies in: $TargetDir"
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

function Setup-Repo {
  param([string]$Src, [string]$Dest, [string]$Label)

  if (Test-Path $Dest) {
    Write-Host "  SKIP  $Dest already exists (delete it to recreate a clean copy)"
    return
  }

  Copy-Item -Recurse -Force $Src $Dest
  $CursorDest = Join-Path $Dest ".cursor"
  New-Item -ItemType Directory -Force -Path $CursorDest | Out-Null
  Copy-Item -Recurse -Force (Join-Path $KitRoot "kit\.cursor\*") $CursorDest

  Push-Location $Dest
  try {
    git init -q
    git checkout -B base -q
    $name = git config user.name 2>$null
    if (-not $name) { git config user.name "Workshop Participant" }
    $email = git config user.email 2>$null
    if (-not $email) { git config user.email "participant@workshop.local" }
    git add -A
    git commit -qm "base"
    Write-Host "  PASS  $Label initialized on git branch 'base' with .cursor/ kit"
    npm test | Out-Null
    Write-Host "  PASS  $Label npm test green"
  } finally {
    Pop-Location
  }
}

Setup-Repo (Join-Path $KitRoot "exercise\pricing-demo") $SpecDir "pricing-demo-spec (Mod 2 · 10:15)"
Setup-Repo (Join-Path $KitRoot "exercise\pricing-demo-tiers") $WtDir "pricing-demo-worktrees (Mod 3 & 4 · 11:40 / 13:30)"

Write-Host ""
Write-Host "Ready for Day 1:"
Write-Host "  1. Module 2 (10:15): Open $SpecDir in Cursor"
Write-Host "  2. Modules 3 & 4 (11:40 / 13:30): Open $WtDir in Cursor (git branch 'base' ready for Worktrees)"
