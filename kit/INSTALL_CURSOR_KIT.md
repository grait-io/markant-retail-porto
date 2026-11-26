# Install the Cursor-native workshop kit (1 minute, no plugin needed)

**Full kit + Deck PDF on GitHub:** https://github.com/grait-io/markant-retail-porto  
(Room QR on *Setup check & tandems* → [`START_HERE.md`](https://github.com/grait-io/markant-retail-porto/blob/main/START_HERE.md).)

## Day 2: install the kit into your own repository

Day 2 runs on **your codebase and your tickets**. Do this once at 09:30.
Run both commands in a terminal at the root of the kit clone (`markant-retail-porto`).

```sh
# macOS / Linux / Git Bash
git pull
bash kit/install_kit.sh /path/to/your-repo
```

```powershell
# PowerShell (Windows)
git pull
powershell -ExecutionPolicy Bypass -File kit\install_kit.ps1 C:\path\to\your-repo
```

Then:

1. Open **your repository** in Cursor and run `Developer: Reload Window`.
2. In Agent chat, type `/fabric-map`. The command must appear.
3. Create a local branch for today (for example `git switch -c workshop/day2`). Do not push the workshop files unless your team agrees.

What the script does: it copies `kit/.cursor/` into `<your-repo>/.cursor/`, the manual
Goldfish prompts to `<your-repo>/.cursor/goldfish_manual_prompt.md`, and the map template
to `<your-repo>/context/_TEMPLATE_module.md`, and the map path check to
`<your-repo>/context/check_maps.mjs`. It never touches your `AGENTS.md`, your
`README.md` or your code. Kit files with the same name are replaced by the new version,
so you can run it again after every `git pull`.

`git pull` reports a conflict? You edited a kit file (for example the checklist).
Run `git stash`, then `git pull`, then `git stash pop`.

No repository you can use today? Work with your tandem partner on their repository.

**Module 7 in three lines:** `/fabric-map <module>` writes `context/<module>/context.md`
and the Cursor rule `.cursor/rules/map-<module>.mdc` that attaches the map to the module's files.
Open a **new Agent chat** and type `/goldfish map context/<module>/context.md <source folder>`.
Checklist: `kit/fabric/inventory_checklist.md`.

## What is in the kit

Everything for the two days ships as plain Cursor files under `kit/.cursor/`:
- **BMAD Analyst skill:** `.cursor/skills/analyst/SKILL.md` (up to 5 questions, one at a time, before specifying)
- **BMAD Advanced Elicitation skill & `/elicit` command:** `.cursor/skills/advanced-elicitation/` (48-method catalog across 6 directions + zero-dep Node selector `pick_methods.mjs`; diagnoses weak spots, proposes 3 methods with you, runs cold read-only subagents, merges into one numbered revision) + `.cursor/commands/elicit.md`
- **spec-kit commands:** `.cursor/commands/speckit.{specify,clarify,plan,tasks,analyze}.md`
- **EGM Goldfish review gate (`/goldfish` + 6 subagents):** `.cursor/skills/goldfish-review/SKILL.md`, `.cursor/commands/goldfish.md`, and `.cursor/agents/goldfish-{structure,readiness,zoom-out,architecture,map,diff}.md` — **read-only on the files they review** (spec/plan/diff/map); they return a findings table in chat; **you** save what you accept (e.g. `findings.md`). Strict isolation, severity tags, human decision gate, `review.md` log, max 2 rounds.
- **Day 2 iron-law skills (plain files, no plugin):** `.cursor/skills/test-first/`, `.cursor/skills/verify-before-done/`, `.cursor/skills/debug-with-hypotheses/` — failing test first, evidence before “done,” hypotheses before a fix.
- **Fabric map author (`/fabric-map`):** `.cursor/skills/fabric-map/` + `.cursor/commands/fabric-map.md` — writes one `context/<module>/context.md`; then, in a **new chat**, `/goldfish map context/<module>/context.md <source folder>`. For a colleague without the kit: `kit/share/fabric-mapper.zip` (`kit/share/FABRIC_MAPPER_EXTRACT.md`).

## Manual copy (if you cannot run the script)

From your project root:

```sh
# macOS / Linux / Git Bash
mkdir -p .cursor
cp -R /path/to/markant-retail-porto/kit/.cursor/. .cursor/
```

```powershell
# PowerShell (Windows)
New-Item -ItemType Directory -Force -Path .cursor | Out-Null
Copy-Item -Recurse -Force "C:\path\to\markant-retail-porto\kit\.cursor\*" ".cursor\"
```

Reload Cursor (`Command Palette → Developer: Reload Window`) if slash commands or subagents do not appear immediately.

## Smoke test

1. Type `/speckit.` in Agent chat → you should see `specify`, `clarify`, `plan`, `tasks`, `analyze`.
2. Type `/elicit` and `/goldfish` → both slash commands should appear.
3. Terminal check (BMAD 48-method selector): `node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs directions` → lists all 6 directions (`wrong`, `missing`, `premise`, `simplify`, `future`, `other-side`).
4. Run `/goldfish specs/<feature>/spec.md specs/<feature>/plan.md` (or paste `kit/review_plan_3_goldfish.md`) → three subagents (`goldfish-structure`, `goldfish-readiness`, `goldfish-zoom-out`) run in parallel, **do not edit** those files, and return one severity-tagged findings table in chat.
5. Confirm the Day 2 skills exist: the folder `.cursor/skills/` contains `test-first`, `verify-before-done`, `debug-with-hypotheses` and `fabric-map` (each has a `SKILL.md`).
6. Type `/fabric-map` → slash command appears (after Reload Window if needed).

### Day 1 practice folders

`exercise/setup_day1.sh` skips `work/pricing-demo-spec` and `work/pricing-demo-worktrees`
when they already exist, so they keep the Day 1 version of the kit. Day 2 does not use
them. To refresh one anyway: `bash kit/install_kit.sh work/pricing-demo-worktrees`.

## Optional: upstream EGM plugin ZIP

`kit/upstream/egm-cursor-plugin_8f16812.zip` (Apache-2.0) is kept as an untouched upstream archive (see `kit/upstream/INSTALL_EGM_CURSOR.md`). It is **not required** for the workshop; the native `.cursor/agents/` files above work without local-plugin permissions.

## If subagents are unavailable in your Cursor plan

Open a **new chat**, attach only the document(s), and paste Prompts 1–5 from `kit/goldfish_manual_prompt.md` (in your own repository after install: `.cursor/goldfish_manual_prompt.md`).
