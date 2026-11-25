<!-- Fictional example – not Markant code -->
# AGENTS.md

Pricing service. TypeScript, Node 22.

## Commands
- Install: `npm ci`
- Test: `npm test` (one file: `npm test -- path/to/file.test.ts`)
- Lint: `npm run lint`

## Conventions
- Prices are integer cents. Never floats.
- New API handlers follow `src/api/tiers.ts`.
- Plans and specs live in `specs/<feature>/` (or `.cursor/plans/`). Write the plan before code.

## Never
- Never change a test to make it pass.
- Never run `git push --force` or touch `infra/` without asking.
