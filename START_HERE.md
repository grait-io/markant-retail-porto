# AI Coding Masterclass · Markant / MSI Portugal · workshop kit

Open this folder in Cursor (`File → Open Folder`). Everything a participant
needs for the two days is here — **no plugin install required**. All methods
(BMAD Analyst elicitation, spec-kit commands, EGM Goldfish reviewers, and
project memory) ship as plain Cursor-native files in `kit/.cursor/` and `kit/fabric/`.

| What | Where | Open with |
|---|---|---|
| Slides (handout) | `deck/AI_Coding_Masterclass_Deck_v3_EN.pdf` | PDF |
| Agenda (binding v3) | `agenda/Agenda_AI_Coding_Masterclass_v3_EN.pdf` · `agenda/agenda_v3_en.html` | PDF / browser |
| **Day 1 one-command setup** | `exercise/setup_day1.sh` (Windows: `exercise/setup_day1.ps1`) | Module 1 (prepares `work/pricing-demo-spec` + `work/pricing-demo-worktrees` with git + `.cursor/`) |
| **Cursor-native kit install (2 min)** | `kit/INSTALL_CURSOR_KIT.md` + `kit/.cursor/` | Module 1 / 2 (`cp -R kit/.cursor/* .cursor/`) |
| Three Goldfish reviewers on a plan | `kit/review_plan_3_goldfish.md` | Module 2 (uses `.cursor/agents/goldfish-*.md`) |
| Manual Goldfish prompts 1–5 (fallback) | `kit/goldfish_manual_prompt.md` | New chat, zero subagents needed |
| Project memory starter (`context/`, `specs/`, `LESSONS.md`) | `kit/fabric/` | Module 5, 7 |
| Rules audit | `kit/rules_audit_checklist.md` | Module 5 |
| Example rule, skills, hooks, AGENTS.md, MCP injection | `kit/examples/` | Module 5, 6, 8 |
| Building-block checklist (10 blocks) | `kit/building_blocks_checklist.md` | Day 1 ~10:15, Day 2 ~16:40 |
| Exercise project (baseline) | `exercise/pricing-demo/` (`npm test`) | Module 2, 8 |
| Same project with tiers | `exercise/pricing-demo-tiers/` (`npm test`) | Module 3, 4, 7, 9 |
| Tickets and tasks | `exercise/ticket_demo.md`, `ticket_demo_2.md`, `task_parallel.md`, `plan_large_mr.md` | |

**Times:** Day 1 09:30–17:00 (lunch 12:30–13:30). Day 2 09:30–17:00 (lunch 12:30–13:30 + MSI team meeting 13:30–15:00; your tickets from 15:00).

## First five minutes in Cursor

1. Open this folder in Cursor. `AGENTS.md` tells the agent what the kit is.
2. Run the Day 1 setup script (creates clean git-ready working copies with `kit/.cursor/` installed and runs `npm test` in both):
   ```sh
   bash exercise/setup_day1.sh
   # Windows PowerShell:
   powershell -ExecutionPolicy Bypass -File exercise/setup_day1.ps1
   ```
3. Open `work/pricing-demo-spec/` in Cursor and reload (`Developer: Reload Window`).
4. Verify in Agent chat (`Cmd/Ctrl + I`): typing `/speckit.` shows five commands (`specify`, `clarify`, `plan`, `tasks`, `analyze`), `/elicit` launches BMAD Advanced Elicitation (48-method spec deep-dive), and `/goldfish` runs the parallel EGM review gate (**read-only on the spec/plan files** — returns a findings table; you decide what to save).
5. Optional upstream reference (not required for the room): `kit/egm-cursor-plugin_8f16812.zip` + `kit/INSTALL_EGM_CURSOR.md`.

## Goldfish in one line

A Goldfish subagent **reads** the files you give it and **does not edit them**. It replies with a severity-tagged findings table. You (or the author chat) accept/reject and save what matters (e.g. `specs/<feature>/findings.md`).
