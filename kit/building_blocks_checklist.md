# Ten Cursor building blocks: my checklist

Tick when you have used the block on real work. Rate yourself 1 (never) to
5 (I can show a colleague) on Day 1 at ~10:00 and again on Day 2 at ~16:40.

| # | Building block | After the workshop I can … | Module | Used | Day 1 | Day 2 |
|---:|---|---|---|---|---|---|
| 1 | Elicitation & spec-kit | clarify a ticket (`analyst`), deep-dive with `/elicit`, write `spec.md`, `plan.md`, `tasks.md` | 2, 3 | ☐ | | |
| 2 | Plan Mode & context hygiene | keep one chat per task; hand over via `specs/<feature>/plan.md` and `@Past Chats` | 2 | ☐ | | |
| 3 | Goldfish (read-only on specs) | run `/goldfish` fresh-context reviewers that **do not edit** the files they review (`.cursor/agents/goldfish-*.md`); you save findings | 2, 5, 7, 8 | ☐ | | |
| 4 | Worktrees & parallel agents | split a plan into file-disjoint tasks or run Best-of-N in isolated worktrees | 3, 4 | ☐ | | |
| 5 | Rules & AGENTS.md | pick the right rule type; keep always-on rules short and pointer-based | 5 | ☐ | | |
| 6 | Skills | package a repeatable workflow as `.cursor/skills/<name>/SKILL.md` (incl. Day 2 `test-first`, `verify-before-done`, `debug-with-hypotheses`) | 2, 5, 8, 9 | ☐ | | |
| 7 | Hooks | block risky commands (`beforeShellExecution`); run tests after edits (`afterFileEdit`) | 6 | ☐ | | |
| 8 | MCP | connect tools with least privilege; recognise prompt injection in tool output | 6 | ☐ | | |
| 9 | Inventory fabric (context + conventions) | seed fabric with **`/fabric-map`** so agents/teammates can **navigate** (`context/<module>/context.md` + thin `AGENTS.md`); Goldfish-verify; `.cursorignore` | 7 | ☐ | | |
| 10 | Tests, diff review & CI | run the test-first loop with **evidence before claims**; review a diff against its plan (`goldfish-diff` / your own `goldfish-simplify`, built in Module 8) | 8, 9 | ☐ | | |

*(Cloud agents, Bugbot, and Find Issues are shown as demos — availability depends on your Cursor subscription tier and policy.)*

My level (1–5) Day 1: ___   Day 2: ___
