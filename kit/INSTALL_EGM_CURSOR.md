# Install the upstream EGM plugin in Cursor (optional — not required for the workshop)

> **Workshop participants:** you do **not** need this plugin. Use the Cursor-native kit in [`kit/INSTALL_CURSOR_KIT.md`](INSTALL_CURSOR_KIT.md) (`cp -R kit/.cursor/* .cursor/`) — it gives you BMAD Analyst elicitation, spec-kit commands, and all six read-only Goldfish subagents as plain Markdown files with zero plugin policy friction.

Source of the pinned upstream copy: `google/elephant-goldfish-model`, commit `8f16812`
(2026-11-10), plugin version 0.1.1, Apache-2.0. The Cursor adapter is marked
**experimental** upstream. Your organisation's policy decides whether local
plugins are allowed. Do not disable a policy to install it.

## Steps

1. Unzip `egm-cursor-plugin_8f16812.zip`. You get a folder `egm`.
2. Move it so that this path exists:
   - macOS / Linux: `~/.cursor/plugins/local/egm/.cursor-plugin/plugin.json`
   - Windows: `%USERPROFILE%\.cursor\plugins\local\egm\.cursor-plugin\plugin.json`

   ```sh
   mkdir -p ~/.cursor/plugins/local
   unzip egm-cursor-plugin_8f16812.zip -d ~/.cursor/plugins/local/
   ```
3. Reload Cursor (Command Palette → "Developer: Reload Window").
4. Open Customize and check: **7 skills, 8 reviewers, 1 rule** (`egm`).
5. In a new Agent chat, send as the first message (use your real path):

   ```text
   EGM_ROOT: /Users/<you>/.cursor/plugins/local/egm
   ```

## Smoke test

Save this as `plan_smoke.md`, then paste the prompt from `review_plan_3_goldfish.md`
with the path of that file:

```md
# Plan: show a tier price
Goal: show the tier price for a quantity.
Steps: read the quantity, look up the tier, show the price.
```

You should see reviewers start as separate tasks and return findings
(for example: no currency, no tier boundaries, no test).

## If it does not work

| Symptom | Do this |
|---|---|
| Plugin does not appear in Customize | Check the path in step 2. Reload again. |
| Policy blocks local plugins | Stop. Use `goldfish_manual_prompt.md` in a new chat. |
| Want the full pipeline later | `/egm-review <file>` asks two intake questions, offers presets and runs several stages into report files. Not used in the workshop. |
| Reviewers run inside the same chat | That is not a fresh context. Use the manual Goldfish in a new chat. |
| Review takes too long | Use Prompt 1 in `goldfish_manual_prompt.md` in a new chat. |

Remove it again: delete `~/.cursor/plugins/local/egm` and reload.
