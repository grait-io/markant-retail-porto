<!-- Adapted for Cursor from github/spec-kit. -->
# /speckit.plan — Write the implementation plan

Read `specs/<feature>/spec.md` (plus `specs/<feature>/elicitation.md` if present) and inspect only the relevant files in the repository.
Write `specs/<feature>/plan.md`.

## Rules
- Keep the plan short, concrete, and reviewable by someone who has never seen this chat.
- Respect project conventions in `AGENTS.md`, `context/`, and `.cursor/rules/`.
- Do **not** implement code yet.
- Stay strictly inside `spec.md` scope; obey every **Non-goal** and accepted decision from `elicitation.md`.
- If `spec.md` still has unresolved `[OPEN]` markers, list them at the top and stop for a human decision rather than guessing.

## Required sections in `specs/<feature>/plan.md`
1. **Goal & link to spec** — path to `specs/<feature>/spec.md`.
2. **Constraints** — invariants (e.g. integer cents, read-only commands, untouched existing tests).
3. **Files to change (and files NOT to touch)** — exact paths and what changes in each.
4. **Test-first plan** — the **first failing test** (exact input → expected output) plus boundary/edge tests.
5. **Implementation steps** — small, ordered slices (target ≤ 15 changed files total).
6. **Non-goals** — copied/refined from `spec.md`.
7. **Human approval gates** — anything risky or irreversible that requires an explicit yes.

Finish by printing `specs/<feature>/plan.md` and reminding the user to run `/goldfish specs/<feature>/spec.md specs/<feature>/plan.md` (or paste `kit/review_plan_3_goldfish.md`) so the read-only Goldfish subagents (`goldfish-structure`, `goldfish-readiness`, `goldfish-zoom-out`) validate the files in fresh context before coding.
