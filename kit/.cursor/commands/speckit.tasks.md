<!-- Adapted for Cursor from github/spec-kit. -->
# /speckit.tasks — Split the validated plan into parallel agent slices

Read the validated `specs/<feature>/spec.md` and `specs/<feature>/plan.md` (check `specs/<feature>/review.md` if present to confirm zero open `Blocker` findings).
Write `specs/<feature>/tasks.md`.

## Rules
- Only slice a **validated** plan (Goldfish findings decided and incorporated).
- Design tasks so parallel agents **do not edit the same files**.
- Every task must have a verifiable command/test that proves completion.
- Do **not** implement code yet.

## Required format per task in `specs/<feature>/tasks.md`
- **Task ID & title** (e.g. `T1 · Pricing core`, `T2 · Display view`)
- **Can run in parallel with:** task IDs (or `after T1`)
- **Files owned (write scope):** exact file paths
- **Must NOT touch:** files owned by other tasks or existing tests
- **Test that proves it:** exact test name / command (must fail first, then pass)
- **Integration step:** final task that merges branches and runs the full test suite

Finish by highlighting two independent tasks suited for one worktree + one Cursor agent each.
