<!-- Workshop-local fabric-map command. -->
# /fabric-map — Write one module navigation map

Follow the skill `.cursor/skills/fabric-map/SKILL.md`.

1. Treat the first argument after `/fabric-map` as the **module name**. An optional
   second part names a ticket (e.g. `/fabric-map billing` or `/fabric-map billing ticket ABC-214`).
2. Write `context/<module>/context.md` (from `context/_TEMPLATE_module.md` when present).
3. Existing `AGENTS.md`: never rewrite it. Propose one pointer line and add it only if the user agrees.
4. When the map is written, tell the user to open a **new Agent chat** and type
   `/goldfish map context/<module>/context.md <source folder>`
   (no subagents: Prompt 5 in `.cursor/goldfish_manual_prompt.md`). Do **not** review the map here.
