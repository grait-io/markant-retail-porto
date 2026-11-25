<!-- Adapted for Cursor from github/spec-kit. -->
# /speckit.clarify — Resolve open questions in the spec

Read `specs/<feature>/spec.md` (ask for the path if ambiguous).

## Rules
1. List every `[OPEN]` marker or ambiguous term in `spec.md`.
2. Ask the user **one question at a time** (maximum five questions) to resolve the highest-impact gaps.
3. After each answer, update `specs/<feature>/spec.md` in place — move resolved items from **Open questions** into **Functional rules** or **Acceptance criteria**.
4. Do **not** write code or `plan.md` yet.

Note: this runs in the author chat (Elephant). Once `[OPEN]` items are resolved, run `/elicit specs/<feature>/spec.md` to stress-test the draft spec with cold BMAD lenses, then `/speckit.plan` and `/goldfish` (`goldfish-structure`, `goldfish-readiness`, `goldfish-zoom-out`).
