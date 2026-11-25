#!/usr/bin/env bash
# Fictional example – not Markant code.
# Replace the two npm lines with the lint and test commands of YOUR project.
# Runs after the agent edited a file. Keep it fast: lint and the quick tests only.
cat > /dev/null
npm run lint --silent 2>&1 | tail -n 20
npm test --silent 2>&1 | tail -n 20
exit 0
