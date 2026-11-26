# kit/fabric: templates for the module map

A **module map** is one Markdown page in your repository,
`context/<module>/context.md`. It tells an agent or a teammate where things are
in that module and how your team builds there. It stays when the chat is gone.

**Do not copy this whole folder into your repository.** It contains a `README.md` and an
`AGENTS.md` that would replace yours. Install with `kit/install_kit.sh`
(see `kit/INSTALL_CURSOR_KIT.md`); it copies only the map template.

## Day 2 · Module 7 in three steps

1. Agent chat: `/fabric-map <module>`. It writes `context/<module>/context.md`.
2. New Agent chat: `/goldfish map context/<module>/context.md <source folder>`
   (no subagents: Prompt 5 in `.cursor/goldfish_manual_prompt.md`).
3. Mark each finding accept or reject. Fix the map.

Worksheet for the lab: `kit/fabric/inventory_checklist.md`.

## Files in this folder

| File | What it is |
|------|------|
| `context/_TEMPLATE_module.md` | Empty map. `/fabric-map` copies it to `context/<module>/context.md` |
| `context/README.md` | What every map must contain |
| `inventory_checklist.md` | Module 7 worksheet |
| `AGENTS.md` | Starter for a repository that has **no** `AGENTS.md` yet (15 lines or fewer). If you have one, keep it and add one line that points at your map |
| `specs/README.md` | Which files live in `specs/<feature>/` |
| `LESSONS.md` | Table for findings that come back a second time |

## Rules for maps

- One module per map, one page.
- Every path in a map must exist. Give each convention one example file.
- No secrets in `context/` (tokens, passwords, connection strings).
- Review every new or changed map with `/goldfish map …` in a **new** chat.
