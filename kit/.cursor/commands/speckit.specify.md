<!-- Adapted for Cursor from github/spec-kit. -->
# /speckit.specify — Write the specification

Create or update `specs/<feature>/spec.md` from the confirmed ticket and analyst
answers in this chat. Derive `<feature>` as a short kebab-case slug (for example
`prc-214-tier-pricing`).

## Rules
- Write **what** and **why**, not implementation details or code.
- Include every confirmed answer from the user; never invent missing business rules.
- If a rule is still unknown, mark it `[OPEN]` instead of guessing.
- Do **not** edit source code or tests.

## Required sections in `specs/<feature>/spec.md`
1. **Goal** — one sentence naming the observable outcome.
2. **Scope & users / callers** — every entry point or view that must agree.
3. **Functional rules & edge cases** — exact boundaries (inclusive/exclusive), rounding, units, error handling.
4. **Acceptance criteria** — testable statements with concrete inputs and expected outputs.
5. **Non-goals** — what must NOT be built, refactored, or added.
6. **Open questions** — any `[OPEN]` items waiting for a human decision.

## Quality self-check before finishing
- Every acceptance criterion has concrete inputs and expected outputs (no vague words like *"looks right"*, *"fast"*, or *"clean"*).
- No implementation leakage (no file names, helper names, or code snippets unless they are an explicit external constraint).

Finish by printing the path `specs/<feature>/spec.md` and suggesting the next step:
1. `/speckit.clarify` if any `[OPEN]` items remain.
2. `/elicit specs/<feature>/spec.md` to deep-dive and stress-test the draft spec with 3 BMAD critique methods before planning.
3. `/speckit.plan` once the spec is solid.
