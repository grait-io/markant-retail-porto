# kit/: what is in here

Everything is plain files. No plugin.

| Path | What it is | When |
|---|---|---|
| `install_kit.sh` · `install_kit.ps1` | Installs the kit into **your own repository**. One command | Day 2, 09:30 · at home |
| `INSTALL_CURSOR_KIT.md` | The install explained, with a check that it worked | when the script is not enough |
| `.cursor/commands/` | Slash commands: `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/elicit`, `/goldfish`, `/fabric-map` | both days |
| `.cursor/skills/` | Skills: `analyst`, `advanced-elicitation`, `goldfish-review`, `fabric-map`, `test-first`, `verify-before-done`, `debug-with-hypotheses` | both days |
| `.cursor/agents/` | Six read-only Goldfish reviewers (`goldfish-structure`, `-readiness`, `-zoom-out`, `-architecture`, `-diff`, `-map`) | both days |
| `fabric/` | Templates and worksheet for the module map | Day 2 · Module 7 |
| `goldfish_manual_prompt.md` | Prompts 1–5: Goldfish reviews without subagents, in a new chat | fallback, both days |
| `review_plan_3_goldfish.md` | Paste prompt: three reviewers on one plan | Day 1 · Module 2 |
| `building_blocks_checklist.md` | Ten Cursor building blocks; rate yourself | Day 1 morning · Day 2 close |
| `rules_audit_checklist.md` | Audit your rules and `AGENTS.md` | Day 1 · Module 5 |
| `examples/` | Example rule, two skills, hooks, an `AGENTS.md`, an MCP injection case | Day 1 · Module 5, 6 |
| `share/` | `fabric-mapper.zip`: only the map tools, for a colleague without the kit | after the workshop |
| `upstream/` | Untouched upstream EGM plugin archive. Reference only; you do not need it | optional |

**In your own repository after install:** `.cursor/` (commands, skills, reviewers,
`goldfish_manual_prompt.md`), `context/_TEMPLATE_module.md` and `context/check_maps.mjs`
(path check for your maps, no AI: `node context/check_maps.mjs`). Nothing else is added.
Your `AGENTS.md`, `README.md` and code are not touched.

Words used in the kit:

- **Goldfish**: a reviewer subagent that sees only the files you name, not your chat. It returns a table of findings and changes no file.
- **Module map**: `context/<module>/context.md`, one page that says where things are in one module.
- **Verify command**: the test command written in a module map.
- **New Agent chat**: an empty chat, so the model has no memory of your earlier conversation.
