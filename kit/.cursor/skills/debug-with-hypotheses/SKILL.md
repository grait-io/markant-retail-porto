---
name: debug-with-hypotheses
description: >-
  Debug with written hypotheses and evidence before any fix. Use for bugs, flaky
  tests, Track C debugging, or when the user wants systematic root-cause work.
---
<!-- Pattern adapted from community systematic-debugging skills; matches Day 2 Track C checklist. -->
# Debug-with-hypotheses · Evidence first

**Law:** No fix until symptom + hypotheses are written and at least one hypothesis has evidence.

## Steps

1. **Write** in `specs/<feature>/debug.md` (create the folder if needed): symptom (what you see) + **exactly 3 hypotheses**. Not only in chat.
2. **Probe** with Agent using **read-only** commands (`get` / `describe` / `logs`, read files, run failing tests). One hypothesis at a time.
3. **Record** `confirmed` or `refuted` next to each hypothesis in `debug.md`.
4. **Fix** only after evidence. Add a test that **failed before** the fix (hand off to `.cursor/skills/test-first/SKILL.md`).
5. **Infra (K8s / Flux):** `get` · `describe` · `logs` only — **no** `apply` / `delete` / `patch` in the workshop.

## Do not

- Patch “just one line” before writing hypotheses.
- Cross-link to any plugin skill name — use `.cursor/skills/test-first/SKILL.md` and `.cursor/skills/verify-before-done/SKILL.md` only.
- Bury the only record of hypotheses in a long Agent chat.
