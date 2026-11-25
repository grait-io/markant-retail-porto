# Install the Cursor-native workshop kit (1 minute, no plugin needed)

**Full kit + Deck PDF on GitHub:** https://github.com/grait-io/markant-retail-porto  
(Room QR on *Setup check & tandems* → [`START_HERE.md`](https://github.com/grait-io/markant-retail-porto/blob/main/START_HERE.md).)

Everything for the two days ships as plain Cursor files under `kit/.cursor/`:
- **BMAD Analyst skill:** `.cursor/skills/analyst/SKILL.md` (up to 5 questions, one at a time, before specifying)
- **BMAD Advanced Elicitation skill & `/elicit` command:** `.cursor/skills/advanced-elicitation/` (48-method catalog across 6 directions + zero-dep Node selector `pick_methods.mjs`; diagnoses weak spots, proposes 3 methods with you, runs cold read-only subagents, merges into one numbered revision) + `.cursor/commands/elicit.md`
- **spec-kit commands:** `.cursor/commands/speckit.{specify,clarify,plan,tasks,analyze}.md`
- **EGM Goldfish review gate (`/goldfish` + 6 subagents):** `.cursor/skills/goldfish-review/SKILL.md`, `.cursor/commands/goldfish.md`, and `.cursor/agents/goldfish-{structure,readiness,zoom-out,architecture,map,diff}.md` — **read-only on the files they review** (spec/plan/diff/map); they return a findings table in chat; **you** save what you accept (e.g. `findings.md`). Strict isolation, severity tags, human decision gate, `review.md` log, max 2 rounds.

## Copy into your repository (once)

From your project root (or inside a fresh copy of `exercise/pricing-demo/`):

```sh
# macOS / Linux / Git Bash
mkdir -p .cursor
cp -R /path/to/kit/.cursor/* .cursor/
```

```powershell
# PowerShell (Windows)
New-Item -ItemType Directory -Force -Path .cursor | Out-Null
Copy-Item -Recurse -Force "C:\path\to\kit\.cursor\*" ".cursor\"
```

Reload Cursor (`Command Palette → Developer: Reload Window`) if slash commands or subagents do not appear immediately.

## Smoke test

1. Type `/speckit.` in Agent chat → you should see `specify`, `clarify`, `plan`, `tasks`, `analyze`.
2. Type `/elicit` and `/goldfish` → both slash commands should appear.
3. Terminal check (BMAD 48-method selector): `node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs directions` → lists all 6 directions (`wrong`, `missing`, `premise`, `simplify`, `future`, `other-side`).
4. Run `/goldfish specs/<feature>/spec.md specs/<feature>/plan.md` (or paste `kit/review_plan_3_goldfish.md`) → three subagents (`goldfish-structure`, `goldfish-readiness`, `goldfish-zoom-out`) run in parallel, **do not edit** those files, and return one severity-tagged findings table in chat.

## Optional: upstream EGM plugin ZIP

`kit/egm-cursor-plugin_8f16812.zip` (Apache-2.0) is kept as an untouched upstream archive (see `kit/INSTALL_EGM_CURSOR.md`). It is **not required** for the workshop; the native `.cursor/agents/` files above work without local-plugin permissions.

## If subagents are unavailable in your Cursor plan

Open a **new chat**, attach only the document(s), and paste Prompts 1–5 from `kit/goldfish_manual_prompt.md`.
