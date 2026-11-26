# AI Coding Masterclass · Markant / MSI Portugal · workshop kit

Open this folder in Cursor (`File → Open Folder`). Everything a participant
needs for the two days is here — **no plugin install required**. All methods
(BMAD Analyst elicitation, spec-kit commands, EGM Goldfish reviewers, and
project memory) ship as plain Cursor-native files in `kit/.cursor/` and `kit/fabric/`.

**Repo (kit + Deck PDF):** https://github.com/grait-io/markant-retail-porto  
Room QR on *Setup check & tandems* → [`START_HERE.md`](https://github.com/grait-io/markant-retail-porto/blob/main/START_HERE.md) (`deck/assets/qr-kit-repo.png`).

## What is in this folder

```
START_HERE.md      this file
agenda/            agenda for both days (PDF)
deck/              slides (PDF)
kit/               everything you install into a repository  →  kit/README.md
exercise/          Day 1 practice project and tickets (fictional)
```

| What | Where | Open with |
|---|---|---|
| Slides (handout PDF) | `deck/AI_Coding_Masterclass_Deck_v3_EN.pdf` | PDF |
| Agenda (binding v3) | `agenda/Agenda_AI_Coding_Masterclass_v3_EN.pdf` · `agenda/agenda_v3_en.html` | PDF / browser |
| **Day 1 one-command setup** | `exercise/setup_day1.sh` (Windows: `exercise/setup_day1.ps1`) | Module 1 (prepares `work/pricing-demo-spec` + `work/pricing-demo-worktrees` with git + `.cursor/`) |
| **Kit install into your own repository** | `kit/install_kit.sh` / `kit/install_kit.ps1` · details `kit/INSTALL_CURSOR_KIT.md` | Day 2, 09:30 (and at home) |
| Three Goldfish reviewers on a plan | `kit/review_plan_3_goldfish.md` | Module 2 (uses `.cursor/agents/goldfish-*.md`) |
| Manual Goldfish prompts 1–5 (fallback) | `kit/goldfish_manual_prompt.md` | New chat, zero subagents needed |
| Module map (`context/<module>/context.md`) | `/fabric-map` after install · checklist `kit/fabric/inventory_checklist.md` · for a colleague without the kit: `kit/share/fabric-mapper.zip` | Module 7 |
| Rules audit | `kit/rules_audit_checklist.md` | Module 5 |
| Example rule, skills, hooks, AGENTS.md, MCP injection | `kit/examples/` | Module 5, 6, 8 |
| Building-block checklist (10 blocks) | `kit/building_blocks_checklist.md` | Day 1 ~10:15, Day 2 ~16:40 |
| Exercise project (baseline) | `exercise/pricing-demo/` (`npm test`) | Day 1 · Module 2 |
| Same project with tiers | `exercise/pricing-demo-tiers/` (`npm test`) | Day 1 · Module 3, 4 |
| Tickets and tasks | `exercise/ticket_demo.md`, `task_parallel.md` | Day 1 · Module 2, 3, 4 |
| Optional practice after the workshop | `exercise/plan_large_mr.md` + `pricing-demo-large-mr.patch`, `exercise/ticket_demo_2.md` | Day 2 uses your own repository instead |

**Times:** Day 1 09:30–17:00 (lunch 12:30–13:30). Day 2 09:30–17:00 (lunch 12:30–13:30 + MSI team meeting 13:30–15:00; your tickets from 15:00).

## Day 2: your codebase, your tickets

Day 2 does not use the practice project. You work in **your own repository** on
**your own tickets**. No repository you can use today? Work with your tandem partner on theirs.

**Before 09:45, once** (terminal at the root of this kit clone):

```sh
git pull
bash kit/install_kit.sh /path/to/your-repo
# Windows PowerShell:
powershell -ExecutionPolicy Bypass -File kit\install_kit.ps1 C:\path\to\your-repo
```

Then open **your repository** in Cursor, run `Developer: Reload Window`, and type
`/fabric-map` in Agent chat. The command must appear. Work on a local branch
(for example `git switch -c workshop/day2`); do not push the workshop files unless your team agrees.
The script never touches your `AGENTS.md`, `README.md` or code. Details: `kit/INSTALL_CURSOR_KIT.md`.

| Time | Module | In your repository you do | First thing to type |
|---|---|---|---|
| 09:45 – 10:45 | 7 · Map of your codebase | Write a map of one module, then let a fresh reviewer check it | `/fabric-map <module>`, then in a **new chat** `/goldfish map context/<module>/context.md <source folder>` |
| 11:00 – 12:30 | 8 · Tests, review & CI | One failing test for one of your tickets; build your own reviewer; review a real diff | `Use the test-first skill on <your ticket>`; later `/goldfish diff mr.diff <plan or ticket file>` in a **new chat** |
| 15:00 – 16:15 | 9 · Your tickets in tracks | One ticket through the full loop: map, plan, review, test, build, diff | Open `context/<module>/context.md`, then `Use the analyst skill on <your ticket>` |
| 16:15 – 17:00 | Show & review, team setup | 3 minutes per tandem; one shared rule or skill for the team | `kit/building_blocks_checklist.md` |

Skills have no slash command. To use one, name it in Agent chat, for example:
`Use the test-first skill. Ticket: <paste ticket>.`
Day 2 skills: `test-first`, `verify-before-done`, `debug-with-hypotheses` (Track C).
No subagents in your Cursor plan? Use the numbered prompts in `.cursor/goldfish_manual_prompt.md`, always in a new chat.

## Day 1: first five minutes in Cursor


1. Open this folder in Cursor. `AGENTS.md` tells the agent what the kit is.
2. Run the Day 1 setup script (creates clean git-ready working copies with `kit/.cursor/` installed and runs `npm test` in both):
   ```sh
   bash exercise/setup_day1.sh
   # Windows PowerShell:
   powershell -ExecutionPolicy Bypass -File exercise/setup_day1.ps1
   ```
3. Open `work/pricing-demo-spec/` in Cursor and reload (`Developer: Reload Window`).
4. Verify in Agent chat (`Cmd/Ctrl + I`): typing `/speckit.` shows five commands (`specify`, `clarify`, `plan`, `tasks`, `analyze`), `/elicit` launches BMAD Advanced Elicitation (48-method spec deep-dive), and `/goldfish` runs the parallel EGM review gate (**read-only on the spec/plan files** — returns a findings table; you decide what to save).
5. Optional upstream reference (not required for the room): `kit/upstream/`.

## Goldfish in one line

A Goldfish subagent **reads** the files you give it and **does not edit them**. It replies with a severity-tagged findings table. You (or the author chat) accept/reject and save what matters (e.g. `specs/<feature>/findings.md`).
