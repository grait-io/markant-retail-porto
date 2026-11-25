<!-- Adapted for Cursor from google/elephant-goldfish-model (commit 8f16812, Apache-2.0). -->
# /goldfish — Fresh-context EGM review gate (parallel read-only subagents)

Follow the skill `.cursor/skills/goldfish-review/SKILL.md`.

1. Identify the target files and preset from the user's arguments:
   - **Plan gate (default):** `/goldfish specs/<feature>/spec.md specs/<feature>/plan.md`
     → runs `goldfish-structure`, `goldfish-readiness`, and `goldfish-zoom-out` **IN PARALLEL**
     *(add `goldfish-architecture` if `AGENTS.md` or `.cursor/rules/` exist)*.
   - **Diff gate:** `/goldfish diff <mr.diff> <plan.md>`
     → runs `goldfish-diff` and `goldfish-zoom-out` **IN PARALLEL**.
   - **Map gate:** `/goldfish map context/<module>/context.md <source-dir>`
     → runs `goldfish-map`.
   - **Architecture gate:** `/goldfish arch <plan.md>`
     → runs `goldfish-architecture` against `AGENTS.md` and `.cursor/rules/`.
2. Enforce **strict Goldfish isolation**: pass **ONLY** the explicit file paths
   to each subagent — zero parent chat history, no summary, no hints. All
   Goldfish subagents are strictly read-only.
3. Wait for every subagent to finish, then merge and deduplicate into **ONE
   numbered severity-tagged findings table** (`Blocker | Major | Nit`).
4. Do **not** edit any files. Ask the user to mark each item `accept`, `reject`,
   or `cannot decide`, then revise the files on disk and log the round in
   `specs/<feature>/review.md` (maximum 2 rounds).
