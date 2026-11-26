---
name: test-first
description: >-
  Write a failing test for the right reason before any production implementation.
  Use when starting a feature or bugfix, before Agent implements, or when the
  user says test-first, red-green, or TDD.
---
<!-- Pattern adapted from community verification/TDD process skills; workshop-local checklist matches Day 2 Mod 8. -->
# Test-first · Fail for the right reason

**Law:** No production code until a new test fails for the **right** reason.

## Steps

1. **Spec first.** Confirm acceptance criteria exist (`specs/<feature>/spec.md` via analyst / `/speckit.specify`). Do not invent criteria in chat only.
2. **Write one failing test** from those criteria. Do **not** change production code yet.
3. **Run the project Verify command** (fabric `Verify:` field, else `npm test` / project test script). Confirm **red** for the expected reason — not a compile error, wrong file, or flaky setup.
4. **Commit the test** (or leave it staged) so the fail is recoverable.
5. **Implement** with Agent if time allows — **without editing existing or new tests** until green. If the room clock stops at red, that still satisfies this law for the lab; finish green later (Mod 9 / take-home).

## Do not

- Edit an existing test to make a change pass.
- Claim green without a fresh test run in **this** chat (see `verify-before-done`).
- Skip the fail because “the agent will write tests later.”
