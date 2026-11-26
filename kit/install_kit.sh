#!/usr/bin/env bash
# Install the workshop kit into your own repository (Day 2: your codebase, your tickets).
#
# Usage, from the root of the kit clone:
#   bash kit/install_kit.sh /path/to/your-repo
#
# What it does:
#   - copies kit/.cursor/ (commands, skills, subagents) into <your-repo>/.cursor/
#   - copies the manual Goldfish prompts to <your-repo>/.cursor/goldfish_manual_prompt.md
#   - copies the map template to <your-repo>/context/_TEMPLATE_module.md
# What it never touches: your AGENTS.md, your README.md, your source code.
# Kit files with the same name in <your-repo>/.cursor/ are replaced by the new version.
set -euo pipefail

KIT="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-}"

if [ -z "$TARGET" ] || [ ! -d "$TARGET" ]; then
  echo "Usage: bash kit/install_kit.sh /path/to/your-repo"
  exit 1
fi
TARGET="$(cd "$TARGET" && pwd)"

mkdir -p "$TARGET/.cursor" "$TARGET/context"
cp -R "$KIT/.cursor/." "$TARGET/.cursor/"
cp "$KIT/goldfish_manual_prompt.md" "$TARGET/.cursor/goldfish_manual_prompt.md"
cp "$KIT/fabric/context/_TEMPLATE_module.md" "$TARGET/context/_TEMPLATE_module.md"

echo "Kit installed into: $TARGET"
echo "Next:"
echo "  1. Open that folder in Cursor and run: Developer: Reload Window"
echo "  2. In Agent chat, type /fabric-map  (the command must appear)"
echo "  3. Work on a local branch today. Do not push the workshop files unless your team agrees."
