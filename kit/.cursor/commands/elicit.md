<!-- Adapted for Cursor from bmad-code-org/BMAD-METHOD (MIT License). -->
# /elicit — BMAD Advanced Elicitation (propose methods, cold readers, one revision)

Follow the skill `.cursor/skills/advanced-elicitation/SKILL.md`.

1. Identify the target file, section, or recent decision in this conversation
   (if the user passed arguments after `/elicit`, treat them as target and/or
   named methods — e.g. `/elicit specs/prc-214/spec.md` or
   `/elicit with Pre-mortem and Red Team`).
2. Query the 48-method catalog via:
   `node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --tier core`
3. Diagnose 1–2 likely weak spots in the target and **propose 3 complementary
   methods from 3 different directions** (or run named methods directly if the
   user already specified them).
4. Once the user confirms or adjusts the methods, run each method in a **fresh,
   read-only subagent in parallel** with only the 5-part cold-reader brief.
5. Merge the findings into **one numbered proposed revision** + **decisions only
   the user can make** + **set-aside list**. Do **not** edit the target until
   the user chooses what to apply.
