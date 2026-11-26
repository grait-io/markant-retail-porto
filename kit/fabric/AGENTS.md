<!-- Starter template from kit/fabric/ — keep ≤15 lines · navigation memory, not a herdr install -->
# AGENTS.md

- Read `context/<module>/context.md` before searching the codebase (navigation map first).
- Load only conventions that match files in the current plan — do not paste all conventions into always-on rules.
- Specs live under `specs/<feature>/` (`spec.md`, `plan.md`, `tasks.md`, `findings.md`).
- Check `LESSONS.md` before changing shared modules (promote only findings seen twice).
- Never change an existing test to make it pass.
- Never put secrets, tokens, or credentials into `context/` files.
- Test: `npm test` · Lint: `npm run lint` (adjust to your repo).
