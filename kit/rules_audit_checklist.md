# Rules audit checklist (Module 5)

Go through every file in `.cursor/rules/` and your `AGENTS.md`.

| # | Question | If "no" |
|---|---|---|
| 1 | Does this rule exist because of a mistake that happened more than once? | Delete it or park it. |
| 2 | Is an always-on rule shorter than one screen? | Split it or move parts to file-specific rules. |
| 3 | Does it point to a canonical file instead of copying code? | Replace the copy with the path. |
| 4 | Does it state the commands to run (test, lint, build)? | Add them. |
| 5 | Does it state never-do items? | Add the two that hurt most. |
| 6 | Is it loaded only where it applies (globs, "apply intelligently")? | Change the rule type. |
| 7 | Does it describe a procedure with steps? | Move it into a skill (`.cursor/skills/<name>/SKILL.md`). |
| 8 | Does it contradict another rule? | Decide once, delete one. |
| 9 | Does it have an owner and a date? | Add both in a comment. |

Result: fewer always-on lines, at least one skill, no contradictions.
