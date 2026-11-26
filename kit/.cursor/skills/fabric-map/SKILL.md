---
name: fabric-map
description: >-
  Write a navigation map for one module of an existing codebase: fill
  context/<module>/context.md (entry points, callers, Verify command,
  conventions with example files, related repositories). Use when the user asks
  for fabric-map, codebase map, module map, or inventory fabric.
---
<!-- Workshop-local. Map shape matches context/_TEMPLATE_module.md. Code-graph tools and glossaries are out of scope. -->
# Fabric-map · One module navigation map

You help a human leave **files** that let any agent (and teammate) find their way
in this codebase after the chat is gone. You write the map. You do **not** review it.

**Rule:** One module now. Prefer following **one real ticket** through the module
(from the code that calls it to its tests). Do not put the whole repository into one map.

## Inputs (ask once if missing)

1. **Module name** (becomes the folder name under `context/`) and its **source folder**.
2. **Optional ticket** that touches this module, to ground callers and the Verify command.

## Steps

1. **Create the map file.** Copy `context/_TEMPLATE_module.md` to
   `context/<module>/context.md`. If the template is missing, create the file from
   the "Map shape" section below.

2. **Explore the code (read-only).** Use search and open files to find:
   - Entry points (CLI, HTTP, jobs, public APIs)
   - **Callers / consumers** of this module
   - Data, schemas or events it owns
   - One **Verify** command that tests this module (the project's real test command)
   - Up to **3 conventions**, each with the path of one existing file that follows it (the exemplar)
   - `related:` a second repository, or `n/a mono` if there is only one repository
   - Traps: legacy paths, exceptions, files that must not be changed

3. **Write the map** to `context/<module>/context.md`. Fill every bullet. No secrets,
   tokens, or connection strings. Every path you write must exist.

4. **`AGENTS.md`: add one line, never rewrite.**
   - If `AGENTS.md` exists: do **not** shorten, reorder or replace it. Show the user this
     one line and add it only after they agree:
     `- Read context/<module>/context.md before searching the codebase.`
   - If no `AGENTS.md` exists: ask the user before creating one. If they agree, create it
     with that single line.

5. **Hand off to the human.** Tell them to open a **new Agent chat** and type:
   `/goldfish map context/<module>/context.md <source folder>`
   (no subagents: Prompt 5 in `.cursor/goldfish_manual_prompt.md`, in a new chat).
   Do not say the map is verified. Only that fresh review can say so.

## Map shape (must match)

```markdown
---
area: <module>
related:
  - <path-or-url-or-"n/a mono">
updated: YYYY-MM-DD
---

# <Module> map

- **Purpose:** …
- **Entry points:** `…` · `…`
- **Callers / consumers:** … · note cross-repo in `related:`
- **Data owned:** …
- **Verify:** `command`
- **Conventions (max 3):**
  1. … · exemplar: `path/that/exists`
  2. …
  3. …
- **Out of scope / traps:** …
```

## Do not

- Invent paths. Every exemplar path must exist in the repository.
- Edit production code.
- Rewrite or shorten an existing `AGENTS.md` or `README.md`.
- Run or imitate `goldfish-map` inside this chat.
- Install tools or indexes.

## Done when

- `context/<module>/context.md` exists and every bullet is filled.
- `AGENTS.md` has the one pointer line (or the user declined it).
- The user has the exact `/goldfish map …` line to run in a new chat.
