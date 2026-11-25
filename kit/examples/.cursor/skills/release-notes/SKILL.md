---
name: release-notes
description: Write release notes for a merge request from its plan and diff. Use when the user asks for release notes or a merge-request description.
---
<!-- Fictional example – not Markant code -->
# Release notes

1. Read the plan file linked in the branch (`specs/<feature>/plan.md` or `.cursor/plans/`).
2. Run `git diff main...HEAD --stat` and read the changed files.
3. Write three sections: **What changed** (user-visible), **How it was tested**
   (commands and result), **Not included** (non-goals from the plan).
4. Flag anything in the diff that is not in the plan under **Outside the plan**.
5. Do not invent ticket numbers. Ask if one is missing.
