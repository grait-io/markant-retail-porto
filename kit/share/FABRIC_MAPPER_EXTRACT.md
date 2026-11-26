# Fabric mapper: give the map tools to a colleague

Use this zip when a colleague does **not** have the workshop kit and only wants
the module map. If you have the kit, use `kit/install_kit.sh` instead
(see `kit/INSTALL_CURSOR_KIT.md`); it installs everything, including this.

Plain Cursor files. No plugin.

## What the zip contains

| Path in the zip | What it is |
|---|---|
| `.cursor/commands/fabric-map.md` + `.cursor/skills/fabric-map/` | `/fabric-map`: writes the module map |
| `.cursor/commands/goldfish.md` + `.cursor/skills/goldfish-review/` + `.cursor/agents/goldfish-map.md` | `/goldfish map`: read-only review of the map in a new chat |
| `.cursor/goldfish_manual_prompt.md` | Prompt 5: the same review without subagents |
| `context/_TEMPLATE_module.md` | Empty map template |
| `context/check_maps.mjs` | Path check for all maps, no AI: `node context/check_maps.mjs` |
| `FABRIC_MAPPER_EXTRACT.md` | This file |

## Install

1. Unzip `fabric-mapper.zip` anywhere.
2. Copy the two folders `.cursor` and `context` into the root of your repository.
   If your repository already has a `.cursor` folder, merge them (keep your own files).
3. In Cursor: `Developer: Reload Window`.

The zip contains no `AGENTS.md` and no `README.md`. It cannot overwrite yours.

## Use

1. Agent chat: `/fabric-map <module>`
   It writes `context/<module>/context.md`. It proposes one line for your `AGENTS.md`
   and adds it only if you agree.
2. Read the map. Correct what is wrong.
3. Open a **new Agent chat** and type:
   `/goldfish map context/<module>/context.md <source folder>`
   No subagents in your Cursor plan? Use Prompt 5 in `.cursor/goldfish_manual_prompt.md`, also in a new chat.
4. Mark each finding accept or reject. Fix the map.

## Not included

Code-graph tools, glossaries and architecture decision records. Add them later,
when a real ticket shows that the map is not enough.
