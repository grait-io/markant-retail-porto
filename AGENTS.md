# AGENTS.md: workshop kit, AI Coding Masterclass (Markant / MSI Portugal)

This folder is a workshop kit, not a product. Two days, English, Cursor.

## Map (binding room sources)

- `deck/slides2.js`: the only source of **room** slide text. `deck/index2.html` renders it; diagrams live in `deck/diagrams.js`. Rebuild with `node deck/build_deck2.js` (reads `slides.js` as input; edit new/changed v2 text in `build_deck2.js`).
- `agenda/agenda_v3_en.html` (`Agenda_AI_Coding_Masterclass_v3_EN.pdf`): binding times and block titles (survey-built v3). Slides must match it.
 - Day 1: **09:30 – 17:00**, lunch **12:30 – 13:30**
 - Day 2: **09:30 – 17:00**, lunch **12:30 – 13:30** + MSI team meeting **13:30 – 15:00**; Module 9 tickets **15:00 – 16:15**
- `kit/`: participant material — Cursor-native kit (`kit/.cursor/` with BMAD `analyst` + `advanced-elicitation` skills & `/elicit` 48-method catalog, five `speckit.*` commands, and EGM `goldfish-review` skill + `/goldfish` command + six `goldfish-*` subagents that are **read-only on the files they review**), `kit/INSTALL_CURSOR_KIT.md`, `kit/fabric/` plain-file memory starter, manual Goldfish prompts 1–5, checklists, examples, plus pinned upstream EGM plugin ZIP (optional reference).
- `exercise/pricing-demo/`: fictional Node project, no dependencies. Test with `npm test`.
- `exercise/ticket_demo.md`: deliberately incomplete ticket. Do **not** fix the ticket; its gaps are the exercise.
- `trainer/` (if present): trainer-only. Not for participants.
- Verify desk checks anytime: `npm run verify` (or `node trainer/verify_workshop.mjs`). Cursor UI: `trainer/CURSOR_LIVE_DRYRUN.md`.

## Archive (superseded for room delivery)

- `deck/slides.js` + `deck/index.html`: older Modules 1–8 deck; still the **generator input** for `build_deck2.js`.
- `agenda/agenda_en.html`, `agenda_v2_en.html`, and time-grid variants: superseded by `agenda_v3_en.html`.

## Rules

- Slides: at most 6 bullets, every number with a source line (`src`), times as in the agenda.
- Room slide style (participant clarity, new-chat cues, numbered work steps): `trainer/SLIDE_STYLE_LEARNING.md`.
- After editing slides, open `deck/check_overflow.html`; it must report `OVERFLOW 0` (loads `index2.html`).
- Everything is fictional. No real Markant or MSI code, numbers or names.
- Prices in `pricing-demo` are integer cents. Never change an existing test to make it pass.
- Do not edit files inside `kit/egm-cursor-plugin_*.zip`; it is a pinned upstream copy (Apache-2.0).
