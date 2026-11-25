#!/usr/bin/env bash
# Prepare clean, git-initialized Day 1 working folders with the Cursor-native kit.
# Leaves exercise/pricing-demo/ and exercise/pricing-demo-tiers/ completely untouched.
#
# Usage:
#   bash exercise/setup_day1.sh [target_dir]
#   (defaults to ./work inside the workshop kit folder)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KIT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_DIR="${1:-$KIT_ROOT/work}"

SPEC_DIR="$TARGET_DIR/pricing-demo-spec"
WT_DIR="$TARGET_DIR/pricing-demo-worktrees"

echo "== Preparing Day 1 working copies in: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

setup_repo() {
  local src="$1"
  local dest="$2"
  local label="$3"

  if [ -e "$dest" ]; then
    echo "  SKIP  $dest already exists (delete it to recreate a clean copy)"
    return 0
  fi

  cp -R "$src" "$dest"
  mkdir -p "$dest/.cursor"
  cp -R "$KIT_ROOT/kit/.cursor/"* "$dest/.cursor/"

  (
    cd "$dest"
    if git init -b base -q 2>/dev/null; then
      :
    else
      git init -q
      git checkout -B base -q
    fi
    git config user.name >/dev/null 2>&1 || git config user.name "Workshop Participant"
    git config user.email >/dev/null 2>&1 || git config user.email "participant@workshop.local"
    git add -A
    git commit -qm "base"
    echo "  PASS  $label initialized on git branch 'base' with .cursor/ kit"
    npm test --silent >/dev/null
    echo "  PASS  $label npm test green"
  )
}

setup_repo "$KIT_ROOT/exercise/pricing-demo" "$SPEC_DIR" "pricing-demo-spec (Mod 2 · 10:15)"
setup_repo "$KIT_ROOT/exercise/pricing-demo-tiers" "$WT_DIR" "pricing-demo-worktrees (Mod 3 & 4 · 11:40 / 13:30)"

cat <<EOF

Ready for Day 1:
  1. Module 2 (10:15 · Ticket → Spec → Goldfish):
     Open folder in Cursor: $SPEC_DIR
     Reload Window if needed, then paste exercise/ticket_demo.md with the analyst skill.

  2. Module 3 (11:40 · Split & Delegate) & Module 4 (13:30 · Best of N):
     Open folder in Cursor: $WT_DIR
     Git branch 'base' is ready so Cursor Worktrees work out of the box.
EOF
