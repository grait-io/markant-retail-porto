# Module map checklist (Day 2 · Module 7)

**Outcome:** a map of one module of *your* codebase that you would open before
changing unfamiliar code there.

Work in your own repository. No repository today? Work with your tandem partner on theirs.

- [ ] Kit installed in your repository (`kit/INSTALL_CURSOR_KIT.md`, section "Day 2"); `/fabric-map` appears in Agent chat
- [ ] Chose **one module**: one folder or service you will change this week, small enough for one page. If you can, also one real ticket that touches it
- [ ] Ran `/fabric-map <module>` (or filled `context/_TEMPLATE_module.md` by hand and saved it as `context/<module>/context.md`)
- [ ] The map has: purpose, entry points, callers, data owned, a **Verify** command (your real test command), up to 3 conventions each with an example file that exists, `related:`, traps
- [ ] Your `AGENTS.md` was **not rewritten**; it has one new line that points at the map
- [ ] Opened a **new Agent chat** and typed `/goldfish map context/<module>/context.md <source folder>` (no subagents: Prompt 5 in `.cursor/goldfish_manual_prompt.md`)
- [ ] Marked every finding accept or reject and fixed the map (zero findings is a pass)
