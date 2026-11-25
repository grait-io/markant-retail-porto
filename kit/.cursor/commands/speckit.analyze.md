<!-- Adapted for Cursor from github/spec-kit. -->
# /speckit.analyze — Cross-check spec, plan, and tasks

Read `specs/<feature>/spec.md`, `specs/<feature>/plan.md`, and `specs/<feature>/tasks.md` (if present).

## Check
1. Every acceptance criterion in `spec.md` maps to at least one test in `plan.md` and one task in `tasks.md`.
2. No step in `plan.md` or `tasks.md` violates a **Non-goal** in `spec.md`.
3. No two parallel tasks in `tasks.md` claim write ownership of the same file.
4. No `[OPEN]` markers remain unresolved.

Return a short table:
`| Issue | File | Impact | Fix |`

Do **not** edit code. Remember: this runs in the author chat (Elephant); for independent review, run `/goldfish` (read-only Goldfish subagents).
