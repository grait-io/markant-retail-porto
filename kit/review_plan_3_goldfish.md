# Three Goldfish on one spec & plan (Cursor-native subagents)

Copy `kit/.cursor/` into your repo's `.cursor/` once (`kit/INSTALL_CURSOR_KIT.md`).

**Fastest way:** type `/goldfish specs/<feature>/spec.md specs/<feature>/plan.md` in Agent chat (uses `.cursor/commands/goldfish.md` + `.cursor/skills/goldfish-review/SKILL.md`).

**Explicit paste prompt** (works even without slash commands — replace the paths):

```text
Review specs/<feature>/spec.md and specs/<feature>/plan.md with three Goldfish subagents.
Run goldfish-structure, goldfish-readiness, and goldfish-zoom-out IN PARALLEL.
Give each subagent ONLY the paths of spec.md and plan.md. Do not pass any of our
conversation, no summary, and no hints about what I think is wrong.
They are read-only on those files: return a findings table in chat; do not edit
spec.md, plan.md, or any other project file.
When all three finish, return ONE combined findings table in this chat:
| # | Severity | Finding | Reviewer | Why it matters | Question to the author |
Do not edit any files. I decide on each finding (accept · reject · cannot decide).
```

You should see three subagent tasks run in parallel (no edits to the repo), then one combined findings table. You save accepted findings yourself (e.g. to `specs/<feature>/findings.md`).

If subagents do not start as separate tasks, or the answer references things only your chat
knows: it was not a fresh context. Open a **new chat** and use Prompt 1 in
`kit/goldfish_manual_prompt.md` instead.
