---
name: verify-before-done
description: >-
  Require fresh command evidence before claiming done, green, fixed, or ready to
  merge. Use when about to commit, open an MR, say tests pass, or finish a lab.
---
<!-- Pattern adapted from community verification-before-completion skills; proof stays on human/hook/CI — never inside goldfish-* agents. -->
# Verify-before-done · Evidence before claims

**Law:** No “done / green / fixed / ready” claim without **fresh** verification output in this chat.

## Steps

1. **Name the proof command.** Prefer the module’s fabric **Verify:** field in `context/<module>/context.md`. Else use project `npm test` / lint scripts from `AGENTS.md`.
2. **Run it now** (full command, this turn). If hooks already ran tests after edits, re-run only when you need a claim — do not invent a third vocabulary.
3. **Read the output.** Exit code, failure count, and whether failures match the change. Partial logs or “should pass” are not evidence.
4. **Then claim.** State the claim **with** what you saw. If red, say red and why — do not soften into “basically done.”
5. **MR / plan gates stay separate.** Diff vs plan = `goldfish-diff` (read-only findings). Packaging = `kit/examples/.cursor/skills/merge-request/SKILL.md`. This skill does **not** replace Goldfish and does **not** run inside `goldfish-*` agents.

## Do not

- Trust an Agent “success” report without the command output.
- Edit tests to force green (see `test-first` and fabric AGENTS).
- Ask a Goldfish subagent to run shell/tests — they stay read-only on files under review.
